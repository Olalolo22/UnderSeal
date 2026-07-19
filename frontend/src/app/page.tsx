"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, UserCheck, Activity } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 flex flex-col items-center justify-center p-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl text-center space-y-8"
      >
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-emerald-500/10 rounded-full border border-emerald-500/20">
            <ShieldCheck className="w-16 h-16 text-emerald-400" />
          </div>
        </div>
        
        <h1 className="text-6xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          UnderSeal
        </h1>
        <p className="text-xl text-neutral-400 leading-relaxed">
          Confidential Underwriter for On-Chain Term Loans. Prove your creditworthiness in zero-knowledge without doxxing your financial history.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
          <Link href="/borrower">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-emerald-500/50 transition-colors flex flex-col items-center text-center space-y-4"
            >
              <UserCheck className="w-12 h-12 text-emerald-400" />
              <h2 className="text-2xl font-semibold">Borrower Portal</h2>
              <p className="text-neutral-400">Generate a zero-knowledge proof of your income stability and liquidity to secure a private credit tier.</p>
            </motion.div>
          </Link>

          <Link href="/lender">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-cyan-500/50 transition-colors flex flex-col items-center text-center space-y-4"
            >
              <Activity className="w-12 h-12 text-cyan-400" />
              <h2 className="text-2xl font-semibold">Lender Portal</h2>
              <p className="text-neutral-400">Query borrower eligibility securely on the Midnight Network without ever seeing raw financial data.</p>
            </motion.div>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
