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

<!--
* **💾 Auto-Save Drafts:** Accidentally closed the app? Your notes are safely restored the next time you open it.
-->

## Prerequisites

Because Scribe runs AI locally, you must have [Ollama](https://ollama.com/) installed on your machine.

1. Download and install [Ollama](https://ollama.com/download).
2. Open your terminal and pull the required model:
   ```bash
   ollama run qwen3:8b

## Installation

You don't need to install any additional dependencies to use Scribe.

1. Go to the [latest release](../../releases/latest).
2. Download the appropriate archive for your operating system:
   * `Scribe-Windows.zip` — Windows
   * `Scribe-macOS.zip` — macOS
3. Extract the downloaded archive.
4. Run the Scribe application.

## 🧠 Customizing AI Behavior

Scribe allows you to customize its AI behavior without modifying the source code.

You can define naming conventions, terminology, and known formatting mistakes using local JSON configuration files.

These files are stored in Scribe's application data directory:

### `glossary.json`

Use this file to define company- or project-specific terminology and acronyms.

For example:

```json
{
  "GTB": "Go-To-Market Board"
}
```

This allows Scribe to understand and consistently use terminology that may not be part of the model's default vocabulary.

### `failures.json`

Use this file to provide examples of common mistakes that the AI should avoid.

You can define a **wrong** example alongside the **correct** version, allowing Scribe to use these examples when generating or correcting text.

---

## Privacy

Scribe is designed with privacy in mind.

* **No telemetry**
* **No tracking**
* **No third-party AI API calls**
* **No data sent to OpenAI, Anthropic, or other external AI providers**

Scribe's AI processing is performed using the configured local AI setup.

The only external network request made by Scribe is an **anonymous request to GitHub** to check whether a newer version of the application is available.

No user-generated content is transmitted as part of this update check.

