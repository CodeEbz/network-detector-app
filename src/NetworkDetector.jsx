import React, { useState } from "react";

function detectNetwork(phoneNumber) {
  const prefix = phoneNumber.substring(0, 4);

  const mtnPrefixes = ["0703", "0706", "0803", "0806", "0810", "0813", "0814", "0816", "0903", "0906"];
  const airtelPrefixes = ["0701", "0708", "0802", "0808", "0812", "0901", "0902", "0907"];
  const gloPrefixes = ["0705", "0805", "0807", "0811", "0815", "0905"];
  const nineMobilePrefixes = ["0809", "0817", "0818", "0908", "0909"];

  if (mtnPrefixes.includes(prefix)) return "MTN";
  if (airtelPrefixes.includes(prefix)) return "Airtel";
  if (gloPrefixes.includes(prefix)) return "Glo";
  if (nineMobilePrefixes.includes(prefix)) return "9mobile";
  return "Unknown";
}

function validateAndDetect(input) {
  let cleanedString = input.replace(/[\s-]/g, "");
  let stringToCheck = cleanedString.startsWith("+") ? cleanedString.substring(1) : cleanedString;
  if (/[^0-9]/.test(stringToCheck)) {
    return "Invalid input: Phone number must contain only digits (and an optional leading +).";
  }

  if (stringToCheck.length !== 11 && stringToCheck.length !== 13) {
    return "Invalid input: Phone number length must be 11 or 13 digits.";
  }

  let finalNumber = cleanedString;
  if (finalNumber.startsWith("+234")) {
    finalNumber = "0" + finalNumber.substring(4);
  } else if (finalNumber.length === 13 && finalNumber.startsWith("234")) {
    finalNumber = "0" + finalNumber.substring(3);
  } else if (finalNumber.length === 13) {
    return "Invalid input: 13-digit numbers must start with +234 or 234.";
  }

  if (finalNumber.length !== 11) return "Invalid input: Could not clean to an 11-digit format.";

  const network = detectNetwork(finalNumber);
  return `Network: ${network}`;
}

export default function NetworkDetector() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const testNumbers = [
    "09034345609",
    "+2348120790470",
    "07012345678",
    "234805 123 4567",
    "0809-123-4567",
    "0803abc4567",
    "1234567",
    "+2347061234567",
  ];

  function runDetection() {
    setResult(validateAndDetect(input.trim()));
  }

  function runAllTests() {
    const out = testNumbers.map((n) => `${n} -> ${validateAndDetect(n)}`);
    setResult(out.join("\n"));
  }

  return (
    <div className="detector">
      <label>
        Phone number
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. 08031234567 or +2348031234567"
        />
      </label>
      <div className="buttons">
        <button onClick={runDetection}>Detect</button>
        <button onClick={() => { setInput(""); setResult(""); }}>Clear</button>
        <button onClick={runAllTests}>Run Tests</button>
      </div>

      <div className="result">
        <h3>Result</h3>
        <pre>{result}</pre>
      </div>
    </div>
  );
}
