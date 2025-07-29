
"use client";
import './styles.css';
import React, { useEffect } from 'react';

/**
 * Login page for all‑in‑one online labour app
 * Behaviour: one‑time edge click to ENTER fullscreen (no toggle), with white background
 * Lines 1–6 + util-line fade in on first hover; masks sit *beneath* them to avoid covering.
 */
export default function LoginPage() {
  useEffect(() => {
    const EDGE_MARGIN = 11;

    function edgeClickHandler({ clientX: x, clientY: y }: MouseEvent) {
      const { innerWidth: w, innerHeight: h } = window;
      const nearEdge =
        x <= EDGE_MARGIN ||
        x >= w - EDGE_MARGIN ||
        y <= EDGE_MARGIN ||
        y >= h - EDGE_MARGIN;

      if (nearEdge && !document.fullscreenElement) {
        document.documentElement.style.background = "#ffffff";
        document.documentElement.requestFullscreen()
          .then(() => {
            // After entering fullscreen, we no longer need the click handler
            document.removeEventListener("click", edgeClickHandler);
          })
          .catch(() => {});
      }
    }

    document.addEventListener("click", edgeClickHandler);
    document.body.classList.add("non-fullscreen");

    // Cleanup if component unmounts before fullscreen entered
    return () => {
      document.removeEventListener("click", edgeClickHandler);
      document.body.classList.remove("non-fullscreen");
    };
  }, []);

  return (
    <>
      {/* Fixed white mask layers – lower z-index so guidelines remain visible */}
      <div className="layer-one" />
      <div className="layer-two" />
      <div className="layer-three" />
      <div className="layer-four" />
      <div className="layer-five" />
      <div className="layer-six" />

      {/* ------- Login UI ------- */}
      <div className="page-content">
        {/* ...existing login form content unchanged... */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "24rem",
          padding: "2.5rem",
          border: "1px solid #ddd",
          borderRadius: "0.75rem",
          background: "#fff",
          boxShadow: "0 6px 12px rgba(0,0,0,0.08)"
        }}>
          <h1 style={{
            marginBottom: "1.5rem",
            fontSize: "1.25rem",
            textAlign: "center",
            fontFamily: "sans-serif",
            letterSpacing: "0.08rem"
          }}>
            Sign in
          </h1>
          <form>
            <label style={{ display: "block", fontSize: "0.875rem", marginBottom: "0.25rem" }}>Email</label>
            <input type="email" style={{
              width: "100%",
              padding: "0.5rem 0.75rem",
              marginBottom: "1rem",
              border: "1px solid #ccc",
              borderRadius: "0.375rem"
            }} />
            <label style={{ display: "block", fontSize: "0.875rem", marginBottom: "0.25rem" }}>Password</label>
            <input type="password" style={{
              width: "100%",
              padding: "0.5rem 0.75rem",
              marginBottom: "1.5rem",
              border: "1px solid #ccc",
              borderRadius: "0.375rem"
            }} />
            <button type="submit" style={{
              width: "100%",
              padding: "0.65rem 0",
              fontSize: "0.9375rem",
              fontWeight: 600,
              borderRadius: "0.5rem",
              border: "none",
              background: "#111",
              color: "#fff",
              cursor: "pointer"
            }}>
              Login
            </button>
          </form>
        </div>

        {/* Guidelines – retain original ordering */}
        <div className="line original" />
        <div className="line second" />
        <div className="line third" />
        <div className="line fourth" />
        <div className="line fifth" />
        <div className="line sixth" />
        <div className="line util-line" />
      </div>
    </>
  );
}
