from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import pandas as pd
import numpy as np
import os
import re
from werkzeug.utils import secure_filename
import smtplib
from email.message import EmailMessage
from dotenv import load_dotenv

# ================= LOAD ENV =================
load_dotenv()

GMAIL_USER = os.getenv("GMAIL_USER")
GMAIL_APP_PASSWORD = os.getenv("GMAIL_APP_PASSWORD")

EMAIL_REGEX = r"^[\w\.-]+@[\w\.-]+\.\w+$"

# ================= APP INIT =================
app = Flask(__name__)
CORS(app)

UPLOAD_DIR = "uploads"
OUTPUT_DIR = "outputs"

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)

# ================= HEALTH CHECK =================
@app.route("/")
def health():
    return jsonify({"status": "TOPSIS backend running"})

# ================= TOPSIS LOGIC =================
def run_topsis(df, weights, impacts):
    data = df.iloc[:, 1:].values.astype(float)
    weights = np.array(weights)

    norm = np.sqrt((data ** 2).sum(axis=0))
    normalized = data / norm
    weighted = normalized * weights

    ideal_best = []
    ideal_worst = []

    for i, impact in enumerate(impacts):
        if impact == "+":
            ideal_best.append(weighted[:, i].max())
            ideal_worst.append(weighted[:, i].min())
        else:
            ideal_best.append(weighted[:, i].min())
            ideal_worst.append(weighted[:, i].max())

    d_best = np.sqrt(((weighted - ideal_best) ** 2).sum(axis=1))
    d_worst = np.sqrt(((weighted - ideal_worst) ** 2).sum(axis=1))

    df["Topsis Score"] = d_worst / (d_best + d_worst)
    df["Rank"] = df["Topsis Score"].rank(ascending=False).astype(int)

    return df

# ================= EMAIL FUNCTION =================
def send_email(receiver_email, file_path):
    if not GMAIL_USER or not GMAIL_APP_PASSWORD:
        raise Exception("Email credentials not configured")

    msg = EmailMessage()
    msg["From"] = GMAIL_USER
    msg["To"] = receiver_email
    msg["Subject"] = "TOPSIS Result"
    msg.set_content("Attached is your TOPSIS result file.")

    with open(file_path, "rb") as f:
        msg.add_attachment(
            f.read(),
            maintype="text",
            subtype="csv",
            filename="topsis_result.csv"
        )

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(GMAIL_USER, GMAIL_APP_PASSWORD)
        server.send_message(msg)

# ================= API =================
@app.route("/api/topsis", methods=["POST"])
def topsis_api():
    file = request.files.get("file")
    weights = request.form.get("weights")
    impacts = request.form.get("impacts")
    email = request.form.get("email")
    send_mail = request.form.get("send_mail") == "true"

    if not file:
        return jsonify({"error": "CSV file required"}), 400

    if send_mail:
        if not email or not re.match(EMAIL_REGEX, email):
            return jsonify({"error": "Invalid email address"}), 400

    try:
        weights = list(map(float, weights.split(",")))
        impacts = impacts.split(",")
    except:
        return jsonify({"error": "Invalid weights or impacts format"}), 400

    if not all(i in ["+", "-"] for i in impacts):
        return jsonify({"error": "Impacts must be + or -"}), 400

    input_path = os.path.join(UPLOAD_DIR, secure_filename(file.filename))
    file.save(input_path)

    df = pd.read_csv(input_path)

    if len(weights) != df.shape[1] - 1:
        return jsonify({"error": "Weights count must match number of criteria"}), 400

    result_df = run_topsis(df, weights, impacts)

    output_filename = f"topsis_result_{os.getpid()}.csv"
    output_path = os.path.join(OUTPUT_DIR, output_filename)
    result_df.to_csv(output_path, index=False)

    email_sent = False
    email_error = None

    if send_mail:
        try:
            send_email(email, output_path)
            email_sent = True
        except Exception as e:
            email_error = "Email sending failed"

    return jsonify({
        "table": result_df.to_dict(orient="records"),
        "download": f"/api/download/{output_filename}",
        "emailSent": email_sent,
        "emailError": email_error
    })

# ================= DOWNLOAD =================
@app.route("/api/download/<filename>")
def download_file(filename):
    return send_file(os.path.join(OUTPUT_DIR, filename), as_attachment=True)

# ================= RUN =================
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
