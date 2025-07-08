'use client';
import React from 'react';

export default function LoginPage() {
  return (
    <main className="non-fullscreen stage-login">
      {/* Static decorative lines */}
      <div className="line original" />
      <div className="line second" />
      <div className="line third" />

      {/* Layer overlays */}
      <div className="layer layer-one" />
      <div className="layer layer-two" />

      {/* Login prompts */}
      <span className="login-text username hidden">USERNAME</span>
      <span className="login-text password hidden">PASSWORD</span>

      {/* Input underscore lines */}
      <div className="line login-line hidden" />
      <div className="line login-line-second hidden" />
    </main>
  );
}
