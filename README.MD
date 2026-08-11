# Scribe

Scribe is a privacy-first, desktop-based meeting minutes generator. Built with [Wails](https://wails.io/) (Go + React), it uses local AI via Ollama to instantly transform your messy meeting notes into structured, professional summaries without ever sending your data to the cloud.

<!--
<p align="center">
  <img src="assets/logos/wails.svg" alt="Wails" height="50"/>
  &nbsp;&nbsp;
  <img src="assets/logos/go.svg" alt="Go" height="50"/>
  &nbsp;&nbsp;
  <img src="assets/logos/react.svg" alt="React" height="50"/>
  &nbsp;&nbsp;
  <img src="assets/logos/ollama.svg" alt="Ollama" height="50"/>
</p>
-->

<!-- [Hero GIF / Screenshot] -->

---

## Features

* **100% Local & Private:** Your meeting notes never leave your computer. Everything runs locally on your own hardware.
* **AI-Powered:** Uses local LLMs (defaults to `qwen3:8b`) to intelligently format notes, identify action items, and flag things that need confirmation.
* **Smart Glossary & Auto-Correction:** Reads from custom local JSON files to enforce company-specific acronyms, vocabulary, and grammar rules.
* **Keyboard-First Workflow:** 
  * `Ctrl + Enter` / `Cmd + Enter` to Generate
  * `Ctrl + S` / `Cmd + S` to Save as Markdown
  * `Ctrl + C` / `Cmd + C` to Smart-Copy Output
* **Auto-Updates:** Built-in checker notifies you when a new release is available on GitHub.

<!--
* **💾 Auto-Save Drafts:** Accidentally closed the app? Your notes are safely restored the next time you open it.
-->


---

## Project Background

Scribe originally started as a tool built at the request of a friend who needed a way to improve and standardize Indonesian-language text using a local AI model.

The project is developed free of charge as a personal project. At the same time, it serves as an opportunity for me to explore and learn more about local Large Language Models (LLMs), prompt engineering, AI-assisted text processing, and building applications around locally hosted AI.

As a result, Scribe is both a practical tool for its original use case and a learning project for experimenting with local AI technologies.

---
<!--
## 📸 Screenshots

### Main Interface
[image]

### AI Customization
[image]

### Before & After
[image]

---
-->

## Prerequisites

Scribe currently uses Qwen3 8B through Ollama for its AI processing.

Because the model runs locally on your own hardware, performance depends on your system's CPU, GPU, RAM, and available resources.

> **⚠️ Performance Note:** Qwen3 8B is a relatively large local model. Lower-end laptops and desktops may experience slower response times, longer processing times, or higher system resource usage. Systems with more RAM and a capable GPU will generally provide a smoother experience.

1. Download and install [Ollama](https://ollama.com/download).
2. Open your terminal and pull the required model:
   ```bash
   ollama run qwen3:8b

---

## Installation

You don't need to install any additional dependencies to use Scribe.

1. Go to the [latest release](../../releases/latest).
2. Download the appropriate archive for your operating system:
   * `Scribe-Windows.zip` — Windows
   * `Scribe-macOS.zip` — macOS
3. Extract the downloaded archive.
4. Run the Scribe application.

### macOS: Opening Scribe

Because Scribe is currently distributed without Apple Developer ID notarization, macOS may prevent the application from opening the first time you launch it.

If macOS displays a warning that Scribe cannot be opened, follow these steps:

1. Open the app normally so the error pops up, then click Done or Cancel
2. Click the Apple menu in the top left corner and select **System Settings**.
3. Click on **Privacy & Security** in the left sidebar.
4. Scroll down to the security section. You will see a message saying the app was blocked from use.
5. Click the Open Anyway button next to it.

After completing these steps, you should be able to open Scribe normally.

> **Note:** This warning is caused by macOS security protections for applications that have not been notarized by Apple. It does not necessarily indicate that there is a problem with Scribe.

---

## Customizing AI Behavior

Scribe is currently designed primarily for **Indonesian-language text** and provides built-in tools for customizing how the AI processes and generates text.

### Glossary

Add custom terminology, abbreviations, and acronyms that are specific to your organization or project.

This helps Scribe understand terms that may not be part of the AI model's default vocabulary and maintain consistent terminology throughout its output.

### Normalization

Define common variations, slang, or informal Indonesian expressions and their preferred forms.

This allows Scribe to normalize inconsistent input before it is processed by the AI, helping produce cleaner and more consistent results.

Both features can be managed directly through Scribe's interface without modifying configuration files or source code.


### Failures

Provide examples of common mistakes that the AI should avoid.

You can define a **wrong** example alongside the **correct** version, allowing Scribe to use these examples when generating or correcting text.

---

## Privacy

* **No tracking**
* **No third-party AI API calls**
* **No data sent to OpenAI, Anthropic, or other external AI providers**

Scribe's AI processing is performed using a locally hosted AI model, keeping the text processing on the user's machine.

The only external network request made by Scribe is an anonymous request to GitHub to check whether a newer version of the application is available.

No user-generated content is transmitted as part of this update check.
