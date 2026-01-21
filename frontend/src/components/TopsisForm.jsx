import { useState, useRef } from "react";
import api from "../services/api";
import { sendResultEmail } from "../services/email";
import ResultTable from "./ResultTable";

export default function TopsisForm() {
  const formRef = useRef();

  const [weights, setWeights] = useState("");
  const [impacts, setImpacts] = useState("");
  const [email, setEmail] = useState("");
  const [sendMail, setSendMail] = useState(false);

  const [result, setResult] = useState([]); // ALWAYS array
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult([]);
    setLoading(true);

    const formData = new FormData(e.target);

    try {
      const res = await api.post("/api/topsis", formData);

      const table = Array.isArray(res.data.table) ? res.data.table : [];
      setResult(table);

      if (sendMail && email) {
        const link =
          import.meta.env.VITE_API_BASE_URL + res.data.download;
        await sendResultEmail(email, link);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Server error");
      setResult([]); // 🔑 prevents white screen
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    formRef.current.reset();
    setWeights("");
    setImpacts("");
    setEmail("");
    setSendMail(false);
    setResult([]);
    setError("");
  };

  return (
    <div className="card p-4 shadow">
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Upload CSV File</label>
          <input type="file" name="file" className="form-control" required />
        </div>

        <div className="mb-3">
          <label className="form-label">Weights</label>
          <input
            type="text"
            name="weights"
            className="form-control"
            value={weights}
            onChange={(e) => setWeights(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Impacts</label>
          <input
            type="text"
            name="impacts"
            className="form-control"
            value={impacts}
            onChange={(e) => setImpacts(e.target.value)}
            required
          />
        </div>

        <div className="form-check mb-2">
          <input
            className="form-check-input"
            type="checkbox"
            checked={sendMail}
            onChange={(e) => setSendMail(e.target.checked)}
          />
          <label className="form-check-label">
            Send result to email
          </label>
        </div>

        {sendMail && (
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        )}

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="d-grid gap-2">
          <button className="btn btn-primary" disabled={loading}>
            {loading ? "Processing..." : "Calculate TOPSIS"}
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </form>

      {result.length > 0 && (
        <>
          <hr />
          <ResultTable data={result} />
        </>
      )}
    </div>
  );
}
