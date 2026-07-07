import { useState } from "react";
import { supabase } from "./supabaseClient";

const TEAL = "#00A0A6";
const M = { fontFamily: "'Montserrat',sans-serif" };
const BG = {
  background: "radial-gradient(ellipse at 25% 15%, #00c8cf 0%, #00A0A6 45%, #007a7f 100%)",
  minHeight: "100vh", color: "#fff", ...M,
  display: "flex", alignItems: "center", justifyContent: "center",
};
const card = {
  background: "rgba(0,0,0,0.35)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
  border: "1px solid rgba(255,255,255,0.18)", borderRadius: 10,
  boxShadow: "0 4px 24px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.1)",
  padding: 32, width: 340, maxWidth: "90vw",
};
const inputStyle = {
  ...M, width: "100%", boxSizing: "border-box", padding: "10px 12px", marginBottom: 12,
  background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.25)",
  borderRadius: 6, color: "#fff", fontSize: 13,
};

export default function Login({ onAuthed }) {
  const [mode, setMode] = useState("signIn"); // signIn | signUp
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      if (mode === "signIn") {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        onAuthed(data.session);
      } else {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        if (data.session) {
          onAuthed(data.session);
        } else {
          setMessage("Check your email to confirm your account, then sign in.");
        }
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={BG}>
      <form onSubmit={handleSubmit} style={card}>
        <div style={{ ...M, fontSize: 10, color: TEAL, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, marginBottom: 4 }}>
          MicroBiz &middot; Tech Tuesdays
        </div>
        <div style={{ ...M, fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 18 }}>
          {mode === "signIn" ? "Sign in" : "Create account"}
        </div>

        <input
          style={inputStyle}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          style={inputStyle}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />

        {error && (
          <div style={{ ...M, fontSize: 12, color: "#ffb3b3", marginBottom: 10 }}>{error}</div>
        )}
        {message && (
          <div style={{ ...M, fontSize: 12, color: "#c9f7f7", marginBottom: 10 }}>{message}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            ...M, width: "100%", background: `${TEAL}33`, border: `2px solid ${TEAL}`, color: "#fff",
            borderRadius: 7, padding: "10px 0", fontSize: 12, fontWeight: 800, letterSpacing: 2,
            cursor: loading ? "default" : "pointer", marginBottom: 12,
          }}
        >
          {loading ? "PLEASE WAIT..." : mode === "signIn" ? "SIGN IN →" : "SIGN UP →"}
        </button>

        <div
          style={{ ...M, fontSize: 12, color: "rgba(255,255,255,0.7)", textAlign: "center", cursor: "pointer" }}
          onClick={() => { setMode(mode === "signIn" ? "signUp" : "signIn"); setError(""); setMessage(""); }}
        >
          {mode === "signIn" ? "Need an account? Sign up" : "Already have an account? Sign in"}
        </div>
      </form>
    </div>
  );
}
