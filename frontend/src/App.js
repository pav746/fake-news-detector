import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkNews = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const apiUrl = "https://fake-news-detector-backend-ecdy.onrender.com";
      const response = await fetch(`${apiUrl}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      alert("Error connecting to API. Make sure FastAPI is running!");
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Fake News Detector</h1>
      <p style={styles.subtitle}>Paste a news article below to check if it's real or fake</p>

      <textarea
        style={styles.textarea}
        placeholder="Paste news article here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={8}
      />

      <button style={styles.button} onClick={checkNews} disabled={loading}>
        {loading ? "Checking..." : "Check News"}
      </button>

      {result && (
        <div style={{
          ...styles.resultCard,
          backgroundColor: result.label === "FAKE" ? "#ffe5e5" : "#e5ffe8",
          borderColor: result.label === "FAKE" ? "#ff4d4d" : "#2ecc71",
        }}>
          <h2 style={{ color: result.label === "FAKE" ? "#cc0000" : "#1a8c3e" }}>
            {result.label === "FAKE" ? "🔴 FAKE NEWS" : "🟢 REAL NEWS"}
          </h2>
          <p style={styles.confidence}>
            Confidence: <strong>{(result.confidence * 100).toFixed(0)}%</strong>
          </p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "700px",
    margin: "60px auto",
    padding: "0 20px",
    fontFamily: "sans-serif",
  },
  title: {
    fontSize: "2rem",
    textAlign: "center",
    marginBottom: "8px",
  },
  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: "24px",
  },
  textarea: {
    width: "100%",
    padding: "16px",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    resize: "vertical",
    boxSizing: "border-box",
  },
  button: {
    marginTop: "16px",
    width: "100%",
    padding: "14px",
    fontSize: "1rem",
    backgroundColor: "#2c3e50",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  resultCard: {
    marginTop: "24px",
    padding: "24px",
    borderRadius: "8px",
    border: "2px solid",
    textAlign: "center",
  },
  confidence: {
    fontSize: "1.1rem",
    color: "#333",
  },
};

export default App;