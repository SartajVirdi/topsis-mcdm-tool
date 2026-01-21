# TOPSIS MCDM Tool – Web & Python Implementation

A complete **Multi-Criteria Decision Making (MCDM)** solution implementing the  
**TOPSIS (Technique for Order of Preference by Similarity to Ideal Solution)** algorithm.

This project provides:
- A **full-stack web application** for interactive TOPSIS analysis
- A **Python CLI tool (published on PyPI)**
- **Deployed frontend & backend** using Render
- **Optional email delivery** of results
- **Sample dataset support** for quick testing

---

## Academic Details

- **Course:** UCS654 – Predictive Analytics using Statistics  
- **Assignment:** Assignment-1 (TOPSIS)  
- **Author:** Sartaj Singh Virdi  
- **Roll Number:** 102303259  

---

## Important Links

- **GitHub Repository:**  
  https://github.com/SartajVirdi/topsis-mcdm-tool

- **PyPI Package:**  
  https://pypi.org/project/topsis-decision-analysis/

- **Live Deployment:**  
  Frontend (Static) + Backend (Python Flask) deployed on Render

---

## What is TOPSIS?

**TOPSIS (Technique for Order of Preference by Similarity to Ideal Solution)** is a widely used  
**Multi-Criteria Decision Making (MCDM)** method.

It ranks alternatives based on:
- Minimum distance from the **ideal best** solution
- Maximum distance from the **ideal worst** solution

### Applications
- Product and model comparison  
- Engineering decision making  
- Supplier selection  
- Business analytics  
- Decision support systems  

---

## Features

### Web Application
- Upload CSV file containing alternatives and criteria
- **Sample input dataset available** for instant testing
- Faded example placeholders for:
  - Weights: `e.g. 1,2,3,4`
  - Impacts: `e.g. +,+,-,+`
- Automatic computation of:
  - Normalized decision matrix
  - Weighted normalized matrix
  - Ideal best and worst solutions
  - TOPSIS score
  - Final ranking
- Results displayed in a clean table
- Optional **email delivery of results**
- Responsive and user-friendly UI

### Python CLI Tool
- Lightweight and easy to use
- Supports CSV and Excel files
- Automatic input validation
- Generates ranked output file

---

## Application Screenshots

### TOPSIS Web Service – User Interface

![TOPSIS Web Interface](assets/topsis-web-ui.png)

*Web interface allowing users to upload CSV files, test with a sample dataset, enter weights and impacts, and compute TOPSIS rankings instantly.*

### Email Result Delivery

![TOPSIS Email Result](assets/topsis-email-result.png)

*Automated email sent to the user containing the TOPSIS results and download link.*

---

## Tech Stack

### Frontend
- React (Vite)
- HTML, CSS, JavaScript
- Bootstrap
- EmailJS

### Backend
- Python 3
- Flask
- NumPy
- Pandas

### Deployment & Tools
- Render
- GitHub
- PyPI

---

## Project Structure
```
topsis-mcdm-tool/
│
├── assets/                # Logos & screenshots
│
├── backend/               # Flask backend
│   └── app.py
│
├── frontend/
│   ├── public/
│   │   └── sample_input.csv
│   └── src/
│       ├── components/
│       │   ├── TopsisForm.jsx
│       │   └── ResultTable.jsx
│       └── App.jsx
│
├── topsis/                # Python package
│   ├── __init__.py
│   └── topsis.py
│
├── sample.csv
├── output.csv
├── setup.py
├── README.md
├── LICENSE
└── .gitignore
```

---

## Web App Usage

1. Upload a CSV file or download the sample dataset
2. Enter weights (comma-separated numeric values)
3. Enter impacts (+ for benefit, - for cost)
4. (Optional) Enable "Send result to email"
5. Click "Calculate TOPSIS"
6. View TOPSIS scores and rankings instantly

---

## Python Package Installation

### Requirements
- Python 3.7 or higher

### Install from PyPI
```bash
pip install topsis-decision-analysis
```

### Local Installation
```bash
pip install .
```

---

## Command Line Usage
```bash
topsis <inputFile> <weights> <impacts> <outputFile>
```

### Example
```bash
topsis sample.csv "1,2,3,4" "+,+,-,+" result.csv
```

---

## Sample Input Format
```csv
Model,Price,Performance,Camera,Battery
A,25000,8,7,4000
B,30000,9,8,4500
C,20000,7,6,3800
```

---

## Output Columns

- **Topsis Score** – Closeness coefficient
- **Rank** – Final ranking (Rank 1 = Best)

---

## Challenges & Learnings

- Handling inconsistent CSV inputs
- Validating weights and impacts
- Email integration using environment variables
- Full-stack deployment on Render
- Publishing and maintaining a PyPI package

---

## Future Enhancements

- Graphical visualization of rankings
- Support for additional MCDM techniques (AHP, VIKOR)
- Downloadable PDF reports
- User authentication
- Dockerized deployment

---

## License

This project is licensed under the MIT License.

---

If you find this project useful, please consider starring the repository!
