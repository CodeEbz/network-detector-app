import React from "react";
import NetworkDetector from "./NetworkDetector";

export default function App() {
  return (
    <div className="app">
      <header>
        <h1>Network Detector</h1>
      </header>
      <main>
        <NetworkDetector />
      </main>
    </div>
  );
}
