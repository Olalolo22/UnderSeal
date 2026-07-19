"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Activity, Search, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function LenderPortal() {
  const [borrowerId, setBorrowerId] = useState("");
  const [queryState, setQueryState] = useState<"idle" | "loading" | "result">("idle");
  const [result, setResult] = useState<boolean>(false);

  const handleQuery = () => {
    if (!borrowerId) return;
    setQueryState("loading");
    
    // Simulate querying the Midnight contract public state
    setTimeout(() => {
      // Mock logic: if it contains "prime" or "standard", it's true.
      const isEligible = borrowerId.toLowerCase().includes("prime") || borrowerId.toLowerCase().includes("standard");
      setResult(isEligible);
      setQueryState("result");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 p-8 md:p-16">
      <Link href="/" className="text-cyan-400 hover:text-cyan-300 mb-8 inline-block">&larr; Back to Home</Link>
      
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <Activity className="w-16 h-16 text-cyan-400 mx-auto" />
          <h1 className="text-4xl font-bold">Lender Portal</h1>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Evaluate borrower eligibility for fixed-term loans. Query the Midnight ledger to verify the ZK-attested tier and eligibility flag without touching private financial records.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl space-y-6">
            <h2 className="text-2xl font-semibold">UnderSealLoan Gate</h2>
            <p className="text-sm text-neutral-400">
              Enter a borrower address to query <code>UnderSealUnderwriter.isEligible(borrower)</code>.
            </p>
            
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Enter Borrower Address or Mock ID (e.g., 'Alice-Prime')"
                value={borrowerId}
                onChange={(e) => setBorrowerId(e.target.value)}
                className="w-full p-4 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-cyan-500 outline-none text-neutral-200"
              />
              <button
                onClick={handleQuery}
                disabled={queryState === "loading" || !borrowerId}
                className="w-full py-4 rounded-xl bg-cyan-500 text-neutral-950 font-bold text-lg hover:bg-cyan-400 disabled:opacity-50 transition-colors flex justify-center items-center gap-2"
              >
                {queryState === "loading" ? "Querying Ledger..." : <><Search className="w-5 h-5"/> Check Eligibility</>}
              </button>
            </div>

            {queryState === "result" && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className={`p-6 rounded-xl border flex flex-col items-center gap-4 text-center ${
                  result ? "bg-emerald-500/10 border-emerald-500/50" : "bg-red-500/10 border-red-500/50"
                }`}
              >
                <div className={`text-2xl font-bold ${result ? "text-emerald-400" : "text-red-400"}`}>
                  {result ? "LOAN APPROVED" : "LOAN DECLINED"}
                </div>
                <p className="text-sm opacity-80">
                  {result 
                    ? "The borrower satisfies the tier requirements for this loan product." 
                    : "The borrower does not meet the minimum tier requirements."}
                </p>
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  <ShieldCheck className="w-4 h-4" /> Cryptographically verified via ZK Proof
                </div>
              </motion.div>
            )}
          </div>

          <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-6">Aggregated Protocol Stats</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-neutral-950 rounded-xl border border-neutral-800">
                  <span className="text-neutral-400">Total Borrowers Underwritten</span>
                  <span className="text-2xl font-bold text-cyan-400">142</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-neutral-950 rounded-xl border border-neutral-800">
                  <span className="text-neutral-400">Tier A (Prime)</span>
                  <span className="text-xl font-bold text-emerald-400">89</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-neutral-950 rounded-xl border border-neutral-800">
                  <span className="text-neutral-400">Tier B (Standard)</span>
                  <span className="text-xl font-bold text-yellow-400">34</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-neutral-950 rounded-xl border border-neutral-800">
                  <span className="text-neutral-400">Tier C (Declined)</span>
                  <span className="text-xl font-bold text-red-400">19</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-neutral-500 mt-8 text-center">
              Aggregate statistics are computed without revealing individual financial details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
