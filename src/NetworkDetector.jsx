import React, { useState } from "react";

const NETWORK_PREFIXES = {
  MTN: ["0703", "0706", "0803", "0806", "0810", "0813", "0814", "0816", "0903", "0906", "0913", "0916"],
  Airtel: ["0701", "0708", "0802", "0808", "0812", "0901", "0902", "0907", "0911", "0912"],
  Glo: ["0705", "0805", "0807", "0811", "0815", "0905", "0915"],
  "9mobile": ["0809", "0817", "0818", "0908", "0909", "0918", "0919"],
};

function normalizePhoneNumber(input) {
  const trimmed = input.trim();

  if (!trimmed) {
    return { isValid: false, message: "Enter a phone number to detect the network." };
  }

  const digitsOnly = trimmed.replace(/\D/g, "");

  if (!digitsOnly) {
    return { isValid: false, message: "No digits were found. Please enter a phone number." };
  }

  let normalized = digitsOnly;

  if (digitsOnly.startsWith("234") && digitsOnly.length === 13) {
    normalized = "0" + digitsOnly.slice(3);
  } else if (digitsOnly.startsWith("0") && digitsOnly.length === 11) {
    normalized = digitsOnly;
  } else if (digitsOnly.length === 10) {
    normalized = "0" + digitsOnly;
  } else if (digitsOnly.length === 11) {
    normalized = digitsOnly.startsWith("0") ? digitsOnly : `0${digitsOnly}`;
  }

  if (normalized.length !== 11) {
    return {
      isValid: false,
      message: "This does not look like a valid Nigerian mobile number. Try 11 digits or a +234 number.",
    };
  }

  return { isValid: true, number: normalized };
}

function detectNetwork(phoneNumber) {
  const prefix = phoneNumber.substring(0, 4);

  for (const [network, prefixes] of Object.entries(NETWORK_PREFIXES)) {
    if (prefixes.includes(prefix)) {
      return network;
    }
  }

  return "Unknown";
}

function validateAndDetect(input) {
  const normalized = normalizePhoneNumber(input);

  if (!normalized.isValid) {
    return normalized.message;
  }

  const network = detectNetwork(normalized.number);
  return `Detected network: ${network}\nNormalized number: ${normalized.number}`;
}

export default function NetworkDetector() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const testNumbers = [
    "09034345609",
    "+2348120790470",
    "07012345678",
    "2348051234567",
    "0809-123-4567",
    "(0803) 123-4567",
    "+234-703-123-4567",
  ];

  function runDetection() {
    setResult(validateAndDetect(input));
  }

  function runAllTests() {
    const out = testNumbers.map((number) => `${number} -> ${validateAndDetect(number)}`);
    setResult(out.join("\n\n"));
  }

  return (
    <div className="detector-card">
      <div className="hero">
        <p className="eyebrow">Nigerian mobile number lookup</p>
        <h2>Neeza Network Detector</h2>
        <p>Paste any phone number format and we will normalize it and identify the likely network.</p>
      </div>

      <label className="input-group" htmlFor="phone-number">
        <span>Phone number</span>
        <input
          id="phone-number"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. 0803 123 4567 or +2348031234567"
        />
      </label>

      <div className="buttons">
        <button onClick={runDetection}>Detect</button>
        <button className="secondary" onClick={() => { setInput(""); setResult(""); }}>
          Clear
        </button>
        <button className="success" onClick={runAllTests}>
          Run Samples
        </button>
      </div>

      <p className="helper-text">Supports formats like 0803 123 4567, +2348031234567, 2348051234567, and 0809-123-4567.</p>

      <div className="result-panel">
        <h3>Result</h3>
        <pre>{result || "Your detection result will appear here."}</pre>
      </div>
    </div>
  );
}
