import api from "../api";
import { useState, useRef } from "react";
import api from "../services/api";
import ResultTable from "./ResultTable";

export default function TopsisForm() {
  const formRef = useRef();

  const [weights, setWeights] = useState("");
  const [impacts, setImpacts] = useState("");
  const [result, setResult] = useState([]);
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
      setResult(res.data.table);
    } catch (err) {
      setError(err.response?.data?.error || "Server error");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    formRef.current.reset();
    setWeights("");
    setImpacts("");
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
          <label className="form-label">Weights (comma separated)</label>
          <input
            type="text"
            name="weights"
            className="form-control"
            placeholder="1,1,1,1"
            value={weights}
            onChange={(e) => setWeights(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Impacts (comma separated)</label>
          <input
            type="text"
            name="impacts"
            className="form-control"
            placeholder="+,+,-,+"
            value={impacts}
            onChange={(e) => setImpacts(e.target.value)}
            required
          />
        </div>

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
          <h5 className="text-center">Result</h5>
          <ResultTable data={result} />
        </>
      )}
    </div>
  );
}
