# UnderSeal — Confidential Underwriter for On‑Chain Term Loans on Midnight

## Overview
UnderSeal is a privacy‑preserving underwriting protocol built on Midnight Network.
It lets lenders offer fixed‑term, under‑collateralized loans based on private cash‑flow signals (income stability, liquidity buffer, and recent distress), verified via zero‑knowledge proofs. Midnight stores only a discrete risk tier and eligibility flag per borrower and product; raw financials never leave the user’s machine.

## Problem
Over‑collateralized, perpetual DeFi loans dominate because protocols cannot assess borrower risk safely.
• Traditional underwriting relies on exposing bank statements and centralized KYC, creating privacy and breach risks.
• Emerging‑market borrowers and SMEs often need term working‑capital loans, but don’t want to doxx their full financial lives on public chains. 

UnderSeal addresses that gap.

## Solution
UnderSeal introduces a confidential underwriter:
• Borrowers privately submit net inflows and liquidity data to the local dApp/wallet.
• The dApp runs the Midnight Compact circuit to compute three signals in zero‑knowledge: income stability, liquidity buffer vs debt service, and trailing 3‑period distress.
• A Compact contract verifies the ZK proof that the borrower meets the tier criteria and updates a private tier + eligibility credential on Midnight's ledger.
• Loan contracts query `isEligible` to approve or reject borrowers without accessing raw cash‑flow data.

## Credit Model
UnderSeal uses three explainable checks inside the ZK circuit:
• **Income stability**: Proxy evaluated by ensuring the minimum inflow is at least 70% of the average over the period.
• **Liquidity buffer**: Liquid assets must cover at least 2× monthly debt service (3× for Tier A).
• **No recent distress**: Net cash flow must be non‑negative in each of the trailing 3 periods.

Midnight sees only the resulting tier (A/B/C) and an eligibility flag.

## Architecture
1. **`UnderSealUnderwriter.compact`**: The core ZK circuit defining the evaluation rules and updating the public ledger state.
2. **`UnderSealLoan.compact`**: A simple demo contract acting as the loan product gate.
3. **Next.js Frontend**: The UI with a Borrower portal to generate local proofs, and a Lender portal to view aggregated stats.
