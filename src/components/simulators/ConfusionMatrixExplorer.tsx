"use client";

import React, { useState } from "react";
import { Sliders, ShieldAlert, Sparkles, CheckCircle2, AlertOctagon } from "lucide-react";

export function ConfusionMatrixExplorer() {
  const [threshold, setThreshold] = useState<number>(0.5);

  // Simulated dataset of 100 sample messages (70 Clean, 30 Spam)
  // Higher threshold -> fewer predicted positive -> higher precision, lower recall
  const totalClean = 70;
  const totalSpam = 30;

  // Modeling threshold dynamics
  // At threshold = 0.5: TP = 26, FN = 4, FP = 3, TN = 67
  const tp = Math.round(30 * Math.max(0, 1 - Math.pow(threshold, 1.4)));
  const fn = totalSpam - tp;
  const fp = Math.round(70 * Math.max(0, 0.25 * Math.pow(1 - threshold, 2)));
  const tn = totalClean - fp;

  const accuracy = ((tp + tn) / (totalClean + totalSpam)) * 100;
  const precision = tp + fp > 0 ? (tp / (tp + fp)) * 100 : 100;
  const recall = tp + fn > 0 ? (tp / (tp + fn)) * 100 : 0;
  const f1 =
    precision + recall > 0 ? (2 * (precision * recall)) / (precision + recall) : 0;

  return (
    <div className="rounded-xl border border-slate-300 bg-white p-5 shadow-sm text-slate-800">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <Sliders className="h-4 w-4 text-blue-600" />
          <h3 className="text-sm font-bold text-slate-900">
            Interactive Decision Threshold & Metric Trade-Off Explorer
          </h3>
        </div>
        <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-mono font-bold text-blue-700 border border-blue-200">
          Threshold: {threshold.toFixed(2)}
        </span>
      </div>

      {/* Threshold Slider */}
      <div className="my-4 rounded-lg bg-slate-50 p-4 border border-slate-200">
        <div className="flex items-center justify-between text-xs font-medium text-slate-600 mb-2">
          <span>0.00 (Aggressive / Flag Everything)</span>
          <span className="font-bold text-blue-700">Cutoff: {threshold.toFixed(2)}</span>
          <span>1.00 (Conservative / Flag Nothing)</span>
        </div>
        <input
          type="range"
          min="0.05"
          max="0.95"
          step="0.05"
          value={threshold}
          onChange={(e) => setThreshold(parseFloat(e.target.value))}
          className="w-full accent-blue-600 cursor-pointer"
        />
        <p className="mt-2 text-[11px] text-slate-500 leading-relaxed">
          Drag the slider to see how raising the certainty required before flagging a threat dramatically shifts the balance between <strong>Precision</strong> (fewer false alarms) and <strong>Recall</strong> (fewer missed threats).
        </p>
      </div>

      {/* Grid: Confusion Matrix & Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Confusion Matrix Table */}
        <div className="rounded-lg border border-slate-200 p-3.5 bg-white">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 text-center">
            Resulting Confusion Matrix (100 Samples)
          </h4>
          <div className="grid grid-cols-2 gap-2 text-center text-xs">
            <div className="rounded border border-emerald-200 bg-emerald-50/80 p-3">
              <span className="text-[10px] uppercase font-bold text-emerald-800 block">
                True Negatives (TN)
              </span>
              <span className="text-xl font-extrabold text-emerald-900">{tn}</span>
              <span className="text-[10px] text-emerald-700 block mt-0.5">Clean Emails Allowed</span>
            </div>

            <div className="rounded border border-amber-200 bg-amber-50/80 p-3">
              <span className="text-[10px] uppercase font-bold text-amber-800 block">
                False Positives (FP)
              </span>
              <span className="text-xl font-extrabold text-amber-900">{fp}</span>
              <span className="text-[10px] text-amber-700 block mt-0.5">Clean Emails Flagged</span>
            </div>

            <div className="rounded border border-rose-200 bg-rose-50/80 p-3">
              <span className="text-[10px] uppercase font-bold text-rose-800 block">
                False Negatives (FN)
              </span>
              <span className="text-xl font-extrabold text-rose-900">{fn}</span>
              <span className="text-[10px] text-rose-700 block mt-0.5">Spam Missed!</span>
            </div>

            <div className="rounded border border-blue-200 bg-blue-50/80 p-3">
              <span className="text-[10px] uppercase font-bold text-blue-800 block">
                True Positives (TP)
              </span>
              <span className="text-xl font-extrabold text-blue-900">{tp}</span>
              <span className="text-[10px] text-blue-700 block mt-0.5">Spam Blocked</span>
            </div>
          </div>
        </div>

        {/* Dynamic Metric Cards */}
        <div className="flex flex-col justify-between rounded-lg border border-slate-200 p-3.5 bg-white">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 text-center">
            Calculated Performance Metrics
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="rounded bg-slate-50 p-2.5 border border-slate-200 text-center">
              <span className="text-[10px] font-semibold text-slate-500 block">Accuracy</span>
              <span className="text-base font-bold text-slate-800">{accuracy.toFixed(1)}%</span>
            </div>

            <div className="rounded bg-blue-50/70 p-2.5 border border-blue-200 text-center">
              <span className="text-[10px] font-semibold text-blue-700 block">Precision (Purity)</span>
              <span className="text-base font-bold text-blue-900">{precision.toFixed(1)}%</span>
            </div>

            <div className="rounded bg-emerald-50/70 p-2.5 border border-emerald-200 text-center">
              <span className="text-[10px] font-semibold text-emerald-700 block">Recall (Coverage)</span>
              <span className="text-base font-bold text-emerald-900">{recall.toFixed(1)}%</span>
            </div>

            <div className="rounded bg-purple-50/70 p-2.5 border border-purple-200 text-center">
              <span className="text-[10px] font-semibold text-purple-700 block">F1-Score</span>
              <span className="text-base font-bold text-purple-900">{f1.toFixed(1)}%</span>
            </div>
          </div>

          <div className="mt-3 rounded bg-slate-100 p-2 text-[11px] text-slate-600 leading-tight">
            {threshold >= 0.7 ? (
              <span className="text-blue-900 font-medium">
                🎯 <strong>High Precision Mode:</strong> Very few false alarms, but you miss subtle threats (low recall).
              </span>
            ) : threshold <= 0.3 ? (
              <span className="text-rose-900 font-medium">
                🚨 <strong>High Recall Mode:</strong> Catches nearly all spam, but generates many false alarms (low precision).
              </span>
            ) : (
              <span className="text-slate-800 font-medium">
                ⚖️ <strong>Balanced Mode:</strong> Balances false positives against missed threats near maximum F1.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
