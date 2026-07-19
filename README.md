# UnderSeal — Confidential Underwriting for On-Chain Credit

> **Borrowers prove they qualify for a loan without revealing their financial data. Lenders receive only a verified risk tier.**

---

## Overview

UnderSeal is a confidential underwriting layer built on **Midnight Network**.

Today's DeFi lending relies heavily on over-collateralization because protocols have no safe way to evaluate a borrower's financial health. Traditional underwriting solves this by collecting sensitive financial information, creating privacy risks and centralized data silos.

UnderSeal offers a different model.

Instead of exposing bank statements, balances, or income history, borrowers generate a zero-knowledge proof that they satisfy an underwriting policy. Midnight verifies the proof, and lending protocols receive only a confidential credit credential—a verified risk tier and eligibility decision.

The borrower's financial data never becomes part of the blockchain.

---

## The Problem

Most on-chain lending protocols avoid credit risk by requiring borrowers to lock up more value than they borrow.

When under-collateralized lending is available, it usually depends on centralized underwriting that requires applicants to reveal sensitive financial information.

This creates two problems:

* **Privacy:** Borrowers must expose their financial lives to qualify for credit.
* **Accessibility:** Privacy-conscious users and emerging-market businesses are often excluded from traditional underwriting models.

Transparent blockchains make this even harder because smart contract state is publicly visible.

---

## Our Solution

UnderSeal transforms underwriting into a confidential computation.

A borrower submits their financial information locally, where a Midnight Compact circuit evaluates three explainable credit signals:

* **Income stability**
* **Liquidity buffer**
* **Recent financial distress**

The circuit generates a zero-knowledge proof that the borrower satisfies the lending policy.

Midnight verifies this proof and stores only the underwriting outcome:

* **Tier A** — Prime
* **Tier B** — Standard
* **Tier C** — Declined

The lender never learns the borrower's monthly inflows, liquid assets, debt service, or financial ratios—only the verified result.

---

## Credit Model

UnderSeal intentionally uses transparent, explainable underwriting rules rather than opaque scoring models.

The confidential circuit evaluates:

### Income Stability

The borrower's minimum monthly inflow must remain at least **70% of their average inflow**, ensuring reasonably stable cash flow over time.

### Liquidity Buffer

Liquid assets must cover monthly debt obligations.

* **Tier A:** ≥ 3× monthly debt service
* **Tier B:** ≥ 2× monthly debt service

### Recent Financial Distress

The borrower must not have experienced negative net cash flow during the most recent three reporting periods.

These rules execute inside the confidential circuit.

Only the resulting credit tier and eligibility credential become available to lending contracts.

---

## Architecture

UnderSeal consists of four primary components:

### UnderSealUnderwriter.compact

The confidential underwriting circuit.

It verifies the borrower's proof and updates their confidential underwriting credential on Midnight.

### UnderSealLoan.compact

A demonstration lending contract.

Rather than implementing a complete lending protocol, it simply queries the underwriting credential to determine whether a borrower qualifies.

### Attestation Service

A backend service that signs borrower financial profiles using Jubjub Schnorr signatures before proof generation.

### Frontend

A React-based interface that demonstrates both sides of the protocol:

* **Borrower Portal** — Generate confidential underwriting proofs.
* **Lender Portal** — Query verified eligibility and lending outcomes without accessing sensitive borrower information.

---

## Why Midnight?

Transparent blockchains can encrypt financial data, but they cannot keep contract execution itself confidential.

Midnight's confidential execution model allows UnderSeal to verify a borrower's creditworthiness without ever exposing the financial information used to reach that decision.

The blockchain learns only **what** was proven—not **how** it was proven.

---

## Future Work

Our long-term vision is for UnderSeal to become a reusable underwriting layer for on-chain finance.

Future work includes richer underwriting policies, integration with real financial attestation providers, multiple lending products, and reusable confidential credit credentials that any lending protocol can consume while preserving borrower privacy.
