# 🤖 NextLeap MF Assistant (RAG Chatbot)

This project, developed for the NextLeap AI Bootcamp, is a **Facts-Only Mutual Fund Assistant**. Its sole purpose is to retrieve verified, factual data about selected HDFC Mutual Fund schemes and refuse any query asking for investment advice or opinion.

## 🎯 Project Scope & Constraints
* **Product Context:** Groww
* **AMC Focus:** HDFC Mutual Fund
* **Schemes Covered:**
    1.  HDFC large cap fund
    2.  HDFC Flexi Cap Fund
    3.  HDFC ELSS Tax Saver Fund
* **Data Source:** Strictly official public pages from AMC, SEBI, and AMFI.
* **Goal:** Answer factual queries (Expense Ratio, Exit Load, Lock-in, etc.) with a single, clear citation link.

---

## ⚙️ Technology & Architecture

| Component | Tool / Service | Reasoning |
| :--- | :--- | :--- |
| **Orchestration** | **n8n** | Chosen for its visual workflow editor, allowing for easy logic mapping, debugging, and transparent flow execution. |
| **Vector DB / RAG** | **Pinecone.io (Free Tier)** | Handles the heavy lifting of vector embedding, semantic search, and document retrieval, freeing the LLM from knowledge constraints. |
| **Large Language Model** | **Google Gemini** | Used for the final Retrieval-Augmented Generation (RAG) step: synthesizing the retrieved facts into a concise, cited answer. |
| **Frontend** | **Telegram** | Chosen to avoid the hassle and time-sink of building a separate web UI. Provides a simple, accessible chat interface. |

---

## 🚀 How to Use the Bot

1.  **Prerequisite:** You need to have the Telegram app installed on your device.
2.  **Access:** Go to the bot link: [@NextLeap_Atman_bot](https://t.me/NextLeap_Atman_bot)
3.  **Start:** Click the **'/Start'** button in the chat window.
4.  **Query:** Ask a factual question about one of the three schemes (e.g., "What is the exit load for the Flexi Cap Fund?" or "What is the benchmark for the HDFC large cap fund?").

### ⚠️ Disclaimer
The bot will strictly refuse any investment advice (e.g., "Should I buy/sell?").