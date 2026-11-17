"use client";

import React, { useState } from "react";
import { Play, Download, Copy, Check, ShieldCheck, ShieldAlert, FileCode2 } from "lucide-react";

export function StreamlitSimulator() {
  const [activeTab, setActiveTab] = useState<"live-demo" | "download-files">("live-demo");
  const [messageInput, setMessageInput] = useState<string>(
    "URGENT: Your account has been suspended due to suspicious activity. Click here to verify credentials and claim prize!"
  );
  const [threshold, setThreshold] = useState<number>(0.5);
  const [hasScanned, setHasScanned] = useState<boolean>(true);
  const [copiedFile, setCopiedFile] = useState<string | null>(null);

  // Compute simulated threat probability
  const keywords = ["urgent", "suspended", "click here", "verify", "prize", "free", "winner", "reward"];
  const lower = messageInput.toLowerCase();
  const matched = keywords.filter((kw) => lower.includes(kw));
  const threatScore = Math.min(0.99, Math.max(0.04, matched.length * 0.22 + (lower.length > 80 ? 0.08 : 0)));
  const isThreat = threatScore >= threshold;

  const handleCopy = async (filename: string, content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedFile(filename);
      setTimeout(() => setCopiedFile(null), 2000);
    } catch {
      // Ignore
    }
  };

  const appPyCode = `# app.py
# Center of Excellence: Data Science & Artificial Intelligence
# Workshop 9: Streamlit Threat Scanner Interface

import streamlit as st
import joblib

st.set_page_config(page_title="Inbox Guardian ML", page_icon="🛡️", layout="wide")

st.title("🛡️ Inbox Guardian: AI Message Threat Scanner")
st.caption("Official Educational Platform | Center of Excellence: Data Science & AI")

# Sidebar settings
st.sidebar.header("Scanner Settings")
threshold = st.sidebar.slider("Threat Decision Cutoff", 0.1, 0.9, 0.5, 0.05)

# Pre-loaded sample selector
sample_choice = st.selectbox(
    "Choose a sample message or type your own below:",
    [
        "Custom Message",
        "Sample 1 (Phishing Alert): URGENT: Click here to verify your credentials!",
        "Sample 2 (Legitimate Work): Reminder: Team project review meeting at 3 PM today.",
        "Sample 3 (Promo Spam): Congratulations! You won a free gift card prize."
    ]
)

default_text = "Congratulations! You won a FREE gift prize. Click here to claim!"
if "Phishing" in sample_choice:
    default_text = "URGENT: Your account has been suspended. Click here to verify credentials immediately."
elif "Legitimate" in sample_choice:
    default_text = "Hi team, please find attached the revised presentation deck for tomorrow's workshop."

with st.form("scanner_form"):
    user_text = st.text_area("Message Body:", default_text, height=130)
    submitted = st.form_submit_button("🔍 Run Security Scan", type="primary")

if submitted or user_text:
    keywords = ["free", "click here", "urgent", "prize", "suspended", "verify", "winner"]
    matched = [kw for kw in keywords if kw in user_text.lower()]
    score = min(0.99, max(0.05, len(matched) * 0.24))
    
    col1, col2 = st.columns(2)
    with col1:
        st.metric("Threat Probability", f"{score * 100:.1f}%")
        st.progress(score)
    with col2:
        st.metric("Status", "POTENTIALLY MALICIOUS" if score >= threshold else "SAFE")
        
    if score >= 0.7:
        st.error("🚨 HIGH RISK THREAT: Exercise extreme caution. Do not click links.")
    elif score >= threshold:
        st.warning("⚠️ CAUTION: Suspicious urgency or reward indicators detected.")
    else:
        st.success("✅ CLEAN: No high-confidence threats detected.")
        
    if matched:
        st.write("**Matched Indicators:**", ", ".join(matched))
`;

  const requirementsTxtCode = `# requirements.txt
streamlit>=1.35.0
scikit-learn>=1.4.0
pandas>=2.2.0
numpy>=1.26.0
joblib>=1.3.0
`;

  return (
    <div className="rounded-xl border border-slate-300 bg-white shadow-md overflow-hidden text-slate-800">
      {/* Top Navigation Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("live-demo")}
            className={`rounded-md px-3 py-1.5 text-xs font-bold transition-colors ${
              activeTab === "live-demo"
                ? "bg-blue-600 text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-200"
            }`}
          >
            Streamlit Interactive Webview
          </button>
          <button
            onClick={() => setActiveTab("download-files")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-bold transition-colors ${
              activeTab === "download-files"
                ? "bg-blue-600 text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-200"
            }`}
          >
            <Download className="h-3.5 w-3.5" />
            Download Production Files
          </button>
        </div>

        <span className="text-[11px] font-mono text-slate-400">Streamlit v1.35 Engine</span>
      </div>

      {activeTab === "live-demo" ? (
        <div className="p-5 bg-[#F8FAFC]">
          {/* Simulated Browser Chrome Bar */}
          <div className="mb-4 flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 border border-slate-200 text-xs text-slate-500 font-mono">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400 inline-block" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400 inline-block" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 inline-block" />
            <span className="ml-2 text-slate-400 select-none">http://localhost:8501 (Streamlit App)</span>
          </div>

          {/* Streamlit Main Viewport */}
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-xs">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              🛡️ Inbox Guardian: AI Message Threat Scanner
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Official Interactive Web Interface | Center of Excellence: Data Science & AI
            </p>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Column: Input Form */}
              <div className="md:col-span-2 space-y-4">
                {/* Preloaded sample pills */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Preloaded Samples:
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      onClick={() =>
                        setMessageInput(
                          "URGENT: Your account has been suspended due to suspicious activity. Click here to verify credentials and claim prize!"
                        )
                      }
                      className="rounded bg-rose-50 border border-rose-200 px-2 py-1 text-[11px] font-semibold text-rose-800 hover:bg-rose-100"
                    >
                      Sample 1: Phishing Urgent
                    </button>
                    <button
                      onClick={() =>
                        setMessageInput(
                          "Congratulations! You won a FREE gift prize. Click here to claim your reward today!"
                        )
                      }
                      className="rounded bg-amber-50 border border-amber-200 px-2 py-1 text-[11px] font-semibold text-amber-800 hover:bg-amber-100"
                    >
                      Sample 2: Prize Lottery
                    </button>
                    <button
                      onClick={() =>
                        setMessageInput(
                          "Hi team, please find attached the revised presentation deck for tomorrow's workshop schedule. Best regards."
                        )
                      }
                      className="rounded bg-emerald-50 border border-emerald-200 px-2 py-1 text-[11px] font-semibold text-emerald-800 hover:bg-emerald-100"
                    >
                      Sample 3: Legitimate Work
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Message Body to Inspect:
                  </label>
                  <textarea
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    rows={4}
                    className="w-full rounded border border-slate-300 p-2.5 text-xs text-slate-800 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setHasScanned(true)}
                    className="rounded-md bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition-colors flex items-center gap-1.5"
                  >
                    <Play className="h-3.5 w-3.5 fill-white" />
                    Run AI Security Scan
                  </button>
                  <span className="text-xs text-slate-400">
                    Threshold cutoff: {threshold.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Right Column: Dynamic Results Display */}
              <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                    Threat Assessment
                  </h3>

                  {hasScanned && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="rounded bg-white p-2.5 border border-slate-200">
                          <span className="text-[10px] text-slate-500 uppercase block font-semibold">
                            Probability
                          </span>
                          <span className="text-xl font-extrabold text-slate-900">
                            {(threatScore * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="rounded bg-white p-2.5 border border-slate-200">
                          <span className="text-[10px] text-slate-500 uppercase block font-semibold">
                            Status
                          </span>
                          <span
                            className={`text-xs font-bold block mt-1 ${
                              isThreat ? "text-rose-600" : "text-emerald-600"
                            }`}
                          >
                            {isThreat ? "POTENTIALLY SUSPICIOUS" : "SAFE"}
                          </span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div>
                        <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                          <div
                            className={`h-2.5 rounded-full transition-all duration-300 ${
                              isThreat ? "bg-rose-500" : "bg-emerald-500"
                            }`}
                            style={{ width: `${threatScore * 100}%` }}
                          />
                        </div>
                      </div>

                      {/* Alert banner */}
                      {threatScore >= 0.65 ? (
                        <div className="rounded bg-rose-100 p-2 text-xs font-medium text-rose-900 border border-rose-300">
                          🚨 <strong>HIGH THREAT:</strong> Multiple phishing markers identified.
                        </div>
                      ) : threatScore >= threshold ? (
                        <div className="rounded bg-amber-100 p-2 text-xs font-medium text-amber-900 border border-amber-300">
                          ⚠️ <strong>CAUTION:</strong> Suspicious wording detected. Verify sender.
                        </div>
                      ) : (
                        <div className="rounded bg-emerald-100 p-2 text-xs font-medium text-emerald-900 border border-emerald-300">
                          ✅ <strong>CLEAN:</strong> Low probability of security threat.
                        </div>
                      )}

                      {/* Indicators */}
                      {matched.length > 0 && (
                        <div className="text-xs">
                          <span className="font-semibold text-slate-700 block mb-1">
                            Matched Indicators ({matched.length}):
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {matched.map((m) => (
                              <span
                                key={m}
                                className="rounded bg-slate-200 px-1.5 py-0.5 text-[10px] font-mono text-slate-800"
                              >
                                {m}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Download Files View */
        <div className="p-5 space-y-6">
          <div className="rounded-lg bg-blue-50 border border-blue-200 p-4 text-xs text-blue-950">
            <h4 className="font-bold text-blue-900 mb-1">Local Execution Instructions:</h4>
            <p className="leading-relaxed">
              To run this application locally on your computer with a full Streamlit server, follow these terminal steps:
            </p>
            <pre className="mt-2 rounded bg-slate-900 p-3 font-mono text-xs text-slate-100">
              {`# 1. Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\\Scripts\\activate

# 2. Install dependencies
pip install -r requirements.txt

# 3. Launch Streamlit
streamlit run app.py`}
            </pre>
          </div>

          {/* app.py code card */}
          <div className="rounded-lg border border-slate-300 bg-white shadow-xs overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-2 text-xs">
              <span className="font-mono font-bold text-slate-800">app.py</span>
              <button
                onClick={() => handleCopy("app.py", appPyCode)}
                className="flex items-center gap-1 text-slate-600 hover:text-blue-600 font-medium"
              >
                {copiedFile === "app.py" ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedFile === "app.py" ? "Copied" : "Copy app.py"}</span>
              </button>
            </div>
            <pre className="max-h-64 overflow-y-auto p-4 font-mono text-xs text-slate-800 bg-slate-50/50 leading-relaxed">
              {appPyCode}
            </pre>
          </div>

          {/* requirements.txt code card */}
          <div className="rounded-lg border border-slate-300 bg-white shadow-xs overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-2 text-xs">
              <span className="font-mono font-bold text-slate-800">requirements.txt</span>
              <button
                onClick={() => handleCopy("requirements.txt", requirementsTxtCode)}
                className="flex items-center gap-1 text-slate-600 hover:text-blue-600 font-medium"
              >
                {copiedFile === "requirements.txt" ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedFile === "requirements.txt" ? "Copied" : "Copy requirements.txt"}</span>
              </button>
            </div>
            <pre className="p-4 font-mono text-xs text-slate-800 bg-slate-50/50 leading-relaxed">
              {requirementsTxtCode}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
