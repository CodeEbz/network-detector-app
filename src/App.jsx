import React from "react";
import NetworkDetector from "./NetworkDetector";

export default function App() {
  return (
    <div className="app">
      <header>
        <p className="eyebrow">React app</p>
        <h1>Neeza Network Detector</h1>
      </header>
      <main>
        <NetworkDetector />
      </main>
    </div>
  );
}
