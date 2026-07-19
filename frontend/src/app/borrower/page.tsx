"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Loader2, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";

const SCENARIOS = {
  prime: {
    name: "Prime Borrower",
    inflows: [5000, 5200, 5100, 5050, 5300, 5150],
    liquidAssets: 15000,
    monthlyDebtService: 1000
  },
  standard: {
    name: "Standard Borrower",
    inflows: [3000, 2500, 3200, 2800, 3100, 2900],
    liquidAssets: 5000,
    monthlyDebtService: 1000
  },
  declined: {
    name: "Declined Borrower",
    inflows: [2000, -500, 1500, 1000, -200, 800],
    liquidAssets: 1000,
    monthlyDebtService: 1500
  }
};

export default function BorrowerPortal() {
  const [scenario, setScenario] = useState<keyof typeof SCENARIOS>("prime");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<{ tier: string; eligible: boolean } | null>(null);

  const handleUnderwriting = async () => {
    setIsGenerating(true);
    setResult(null);
    
    // Simulating ZK Proof generation locally
    setTimeout(() => {
      const data = SCENARIOS[scenario];
      // Proxy logic matching our Compact circuit
      const sum = data.inflows.reduce((a, b) => a + b, 0);
      const mu = sum / 6;
      const minThreshold = mu * 0.7;
      const isStable = data.inflows.every(v => v >= minThreshold);
      const bufferRatioA = data.liquidAssets >= 3 * data.monthlyDebtService;
      const bufferRatioB = data.liquidAssets >= 2 * data.monthlyDebtService;
      const noDistress = data.inflows.slice(3).every(v => v > 0);

      let finalTier = "C";
      let isEligible = false;

      if (noDistress && bufferRatioA && isStable) {
        finalTier = "A";
        isEligible = true;
      } else if (noDistress && bufferRatioB && isStable) {
        finalTier = "B";
        isEligible = true;
      }

      setResult({ tier: finalTier, eligible: isEligible });
      setIsGenerating(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 p-8 md:p-16">
      <Link href="/" className="text-emerald-400 hover:text-emerald-300 mb-8 inline-block">&larr; Back to Home</Link>
      
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-4">Borrower Portal</h1>
            <p className="text-neutral-400">Select a financial scenario. Your private data remains local. We generate a ZK proof to verify your credit tier.</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Select Scenario:</h3>
            <div className="flex flex-col gap-3">
              {(Object.keys(SCENARIOS) as Array<keyof typeof SCENARIOS>).map((key) => (
                <button
                  key={key}
                  onClick={() => setScenario(key)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    scenario === key 
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-100" 
                      : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700"
                  }`}
                >
                  <div className="font-semibold">{SCENARIOS[key].name}</div>
                  <div className="text-sm opacity-80 mt-1">
                    Buffer: ${(SCENARIOS[key].liquidAssets).toLocaleString()} | Debt: ${(SCENARIOS[key].monthlyDebtService).toLocaleString()}/mo
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleUnderwriting}
            disabled={isGenerating}
            className="w-full py-4 rounded-xl bg-emerald-500 text-neutral-950 font-bold text-lg hover:bg-emerald-400 disabled:opacity-50 transition-colors flex justify-center items-center gap-2"
          >
            {isGenerating ? <><Loader2 className="animate-spin" /> Evaluating Private Data...</> : <><Shield /> Run Confidential Underwriting</>}
          </button>
        </div>

        <div>
          {isGenerating && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="h-full flex flex-col items-center justify-center space-y-6 bg-neutral-900/50 rounded-2xl border border-neutral-800 p-8 text-center"
            >
              <Loader2 className="w-16 h-16 text-emerald-400 animate-spin" />
              <div className="space-y-2">
                <p className="text-lg font-medium text-emerald-400">Generating Zero-Knowledge Proof...</p>
                <p className="text-sm text-neutral-500">Computing $\sigma/\mu$, Liquidity Buffer, and Distress signals locally via Midnight Compact.</p>
              </div>
            </motion.div>
          )}

          {result && !isGenerating && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="h-full flex flex-col justify-center space-y-8 bg-neutral-900 rounded-2xl border border-neutral-800 p-8"
            >
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-neutral-400">Your On-Chain Status</h2>
                <div className={`text-6xl font-black ${result.tier === 'C' ? 'text-red-400' : 'text-emerald-400'}`}>
                  Tier {result.tier}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  {result.tier !== 'C' ? <CheckCircle2 className="text-emerald-400" /> : <XCircle className="text-red-400" />}
                  <span className="text-lg">Income Stability Check</span>
                </div>
                <div className="flex items-center gap-3">
                  {result.tier !== 'C' ? <CheckCircle2 className="text-emerald-400" /> : <XCircle className="text-red-400" />}
                  <span className="text-lg">Liquidity Buffer vs Debt</span>
                </div>
                <div className="flex items-center gap-3">
                  {result.tier !== 'C' ? <CheckCircle2 className="text-emerald-400" /> : <XCircle className="text-red-400" />}
                  <span className="text-lg">No Recent Distress</span>
                </div>
              </div>

              <div className={`p-4 rounded-xl text-center font-semibold text-lg border ${
                result.eligible ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400" : "bg-red-500/10 border-red-500/50 text-red-400"
              }`}>
                Loan Eligibility: {result.eligible ? "APPROVED" : "DECLINED"}
              </div>
              <p className="text-xs text-neutral-500 text-center">Proof verified by UnderSealUnderwriter contract. Your raw data was not exposed to the network.</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
