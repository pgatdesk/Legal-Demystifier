# Contributing to Legal Demystifier

Thank you for your interest in contributing to **Legal Demystifier**! We welcome contributions from developers, legal tech researchers, designers, and open-source enthusiasts.

---

## 📋 Code of Conduct

By participating in this project, you agree to uphold our [Code of Conduct](CODE_OF_CONDUCT.md). Please treat fellow contributors with respect, empathy, and professional courtesy.

---

## 🛠️ How to Contribute

### 1. Reporting Bugs
- Search existing [GitHub Issues](https://github.com/pgatdesk/Legal-Demystifier/issues) to ensure the bug hasn't already been reported.
- Open a new issue with a clear title, reproduction steps, sample document (if non-confidential), and expected behavior.

### 2. Suggesting Enhancements
- We love feature requests! Whether it's support for new contract types, improved prompt heuristics, or UI accessibility, open an issue labeled `enhancement`.

### 3. Pull Requests
1. **Fork the repository** and clone your fork:
   ```bash
   git clone https://github.com/<your-username>/Legal-Demystifier.git
   cd Legal-Demystifier
   ```
2. **Create a descriptive topic branch**:
   ```bash
   git checkout -b feature/enhanced-risk-filters
   ```
3. **Make your changes** following our guidelines:
   - Write clean, modern, well-commented code.
   - Adhere to the vanilla CSS design system and avoid adding heavy build tool chains unless strictly justified.
   - Run syntax tests before committing:
     ```bash
     npm test
     ```
4. **Commit your changes**:
   ```bash
   git commit -m "feat: add risk filter by contract clause category"
   ```
5. **Push and open a PR** targeting `main`:
   ```bash
   git push origin feature/enhanced-risk-filters
   ```

---

## 🧪 Development Workflow

- Run the zero-dependency local dev server:
  ```bash
  npm run dev
  ```
- Open [http://localhost:3000](http://localhost:3000) in your web browser.
- Use the built-in **Demo Mode** or configure your own free [Google Gemini API Key](https://aistudio.google.com/app/apikey).

Thank you for helping demystify the law for everyone! ⚖️
