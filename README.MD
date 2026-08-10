# Scribe

Scribe is a privacy-first, desktop-based meeting minutes generator. Built with [Wails](https://wails.io/) (Go + React), it uses local AI via Ollama to instantly transform your messy meeting notes into structured, professional summaries without ever sending your data to the cloud.

## Features

* **100% Local & Private:** Your meeting notes never leave your computer. Everything runs locally on your own hardware.
* **AI-Powered:** Uses local LLMs (defaults to `qwen3:8b`) to intelligently format notes, identify action items, and flag things that need confirmation.
* **Smart Glossary & Auto-Correction:** Reads from custom local JSON files (`glossary.json` and `failures.json`) to enforce company-specific acronyms, vocabulary, and grammar rules.
* **Keyboard-First Workflow:** 
  * `Ctrl + Enter` / `Cmd + Enter` to Generate
  * `Ctrl + S` / `Cmd + S` to Save as Markdown
  * `Ctrl + C` / `Cmd + C` to Smart-Copy Output
* **🔄 Auto-Updates:** Built-in checker notifies you when a new release is available on GitHub.

<!-- This is a single-line comment -->
* **💾 Auto-Save Drafts:** Accidentally closed the app? Your notes are safely restored the next time you open it.

## 🚀 Prerequisites

Because Scribe runs AI locally, you must have [Ollama](https://ollama.com/) installed on your machine.

1. Download and install [Ollama](https://ollama.com/download).
2. Open your terminal and pull the required model:
   ```bash
   ollama run qwen3:8b
