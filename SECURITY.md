# Security Policy & Privacy Architecture

## 🛡️ Client-Side Privacy Guarantees

Legal Demystifier is built with a **strict client-first privacy architecture**:

1. **Zero Intermediate Backend**:
   - Legal Demystifier runs entirely within your browser.
   - We do not operate any middleman servers, proxy loggers, or telemetry databases that ingest your documents.
2. **Direct HTTPS Communication**:
   - When using Google Gemini AI, your document text is sent over encrypted HTTPS directly between your browser and Google's official Gemini API endpoint (`generativelanguage.googleapis.com`).
3. **Local Credential Storage**:
   - Your Gemini API Key is stored solely in your browser's private `localStorage`. It is never transmitted to us or any third party.
4. **Document Retention**:
   - Neither this application nor its contributors retain copies of uploaded contracts. Once you refresh or close your browser tab, memory state is discarded.

---

## 🔒 Reporting a Vulnerability

If you discover a security vulnerability or privacy concern:

1. **Do not** disclose it publicly via GitHub Issues.
2. Please send a detailed security report via email to the project maintainers:
   - `priyans23bcs186@iiitkottayam.ac.in`
3. Provide reproduction steps, potential impact, and suggested remediations.
4. We will acknowledge receipt within 48 hours and work on a prompt patch.

---

## ⚖️ Legal Disclaimer

Legal Demystifier provides AI-assisted analysis for educational, informational, and general consumer guidance. It does not establish an attorney-client relationship and should not replace qualified legal counsel for binding agreements.
