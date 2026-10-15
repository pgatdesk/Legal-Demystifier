import { sampleContracts } from './demo-data.js';

// ============================================================================
// State Management
// ============================================================================
const state = {
  file: null,
  rawText: '',
  persona: 'student',
  language: 'English',
  model: 'gemini-2.0-flash',
  apiKey: localStorage.getItem('gemini_api_key') || '',
  activeTab: 'summaryTab',
  activeRiskFilter: 'all',
  riskSearchQuery: '',
  analysis: null,
  activeSample: null,
  isAnalyzing: false,
  chartInstance: null,
  chatMessages: []
};

// ============================================================================
// DOM Elements
// ============================================================================
const els = {
  // Navigation & Settings
  apiKeyModalBtn: document.getElementById('apiKeyModalBtn'),
  apiStatusDot: document.getElementById('apiStatusDot'),
  apiStatusText: document.getElementById('apiStatusText'),
  themeToggleBtn: document.getElementById('themeToggleBtn'),
  exportReportBtn: document.getElementById('exportReportBtn'),
  apiKeyModal: document.getElementById('apiKeyModal'),
  closeApiKeyModalBtn: document.getElementById('closeApiKeyModalBtn'),
  apiKeyInput: document.getElementById('apiKeyInput'),
  toggleKeyVisibilityBtn: document.getElementById('toggleKeyVisibilityBtn'),
  saveApiKeyBtn: document.getElementById('saveApiKeyBtn'),
  clearApiKeyBtn: document.getElementById('clearApiKeyBtn'),
  footerSettingsLink: document.getElementById('footerSettingsLink'),
  
  // Export Modal
  exportModal: document.getElementById('exportModal'),
  closeExportModalBtn: document.getElementById('closeExportModalBtn'),
  exportMarkdownBtn: document.getElementById('exportMarkdownBtn'),
  exportPrintBtn: document.getElementById('exportPrintBtn'),
  copySummaryBtn: document.getElementById('copySummaryBtn'),

  // Intake Controls
  personaSelect: document.getElementById('personaSelect'),
  languageSelect: document.getElementById('languageSelect'),
  modelSelect: document.getElementById('modelSelect'),
  dropZone: document.getElementById('dropZone'),
  fileInput: document.getElementById('fileInput'),
  filePreview: document.getElementById('filePreview'),
  fileName: document.getElementById('fileName'),
  fileSize: document.getElementById('fileSize'),
  removeFileBtn: document.getElementById('removeFileBtn'),
  analyzeBtn: document.getElementById('analyzeBtn'),
  statusIndicator: document.getElementById('statusIndicator'),
  statusText: document.getElementById('statusText'),
  samplePills: document.querySelectorAll('.sample-pill'),

  // Results & KPIs
  kpiRibbon: document.getElementById('kpiRibbon'),
  kpiFairness: document.getElementById('kpiFairness'),
  kpiHighRisks: document.getElementById('kpiHighRisks'),
  kpiMedRisks: document.getElementById('kpiMedRisks'),
  kpiLowRisks: document.getElementById('kpiLowRisks'),
  resultsContainer: document.getElementById('resultsContainer'),

  // Tabs
  tabBtns: document.querySelectorAll('.tab-btn'),
  tabPanes: document.querySelectorAll('.tab-pane'),
  riskCountBadge: document.getElementById('riskCountBadge'),

  // Summary Tab
  summaryContent: document.getElementById('summaryContent'),
  balanceChartCanvas: document.getElementById('balanceChart'),
  balanceExplanation: document.getElementById('balanceExplanation'),
  proactiveQuestionsList: document.getElementById('proactiveQuestionsList'),

  // Risk Tab
  filterBtns: document.querySelectorAll('.filter-btn'),
  clauseSearchInput: document.getElementById('clauseSearchInput'),
  clausesContainer: document.getElementById('clausesContainer'),
  allFilterCount: document.getElementById('allFilterCount'),
  highFilterCount: document.getElementById('highFilterCount'),
  medFilterCount: document.getElementById('medFilterCount'),
  lowFilterCount: document.getElementById('lowFilterCount'),

  // Demystify Tab
  demystifyAccordion: document.getElementById('demystifyAccordion'),

  // Roadmap Tab
  mermaidRenderArea: document.getElementById('mermaidRenderArea'),

  // Persona Advice Tab
  personaAdviceGrid: document.getElementById('personaAdviceGrid'),

  // AI Chat Tab
  chatHistory: document.getElementById('chatHistory'),
  chatForm: document.getElementById('chatForm'),
  chatInput: document.getElementById('chatInput'),
  chatSendBtn: document.getElementById('chatSendBtn'),
  chatSuggestions: document.getElementById('chatSuggestions')
};

// ============================================================================
// Initialization
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  updateApiStatusUI();
  setupEventListeners();

  // Pre-load the first sample in Demo Mode by default for instant delight
  loadSampleContract('lease');
});

// ============================================================================
// Theme Management (Dark / Light)
// ============================================================================
function initTheme() {
  const savedTheme = localStorage.getItem('ld_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('ld_theme', newTheme);
  updateThemeIcon(newTheme);

  // Redraw chart if active to match theme colors
  if (state.analysis?.balance) {
    renderBalanceChart(state.analysis.balance);
  }
}

function updateThemeIcon(theme) {
  if (els.themeToggleBtn) {
    els.themeToggleBtn.textContent = theme === 'dark' ? '🌙' : '☀️';
  }
}

// ============================================================================
// API Key & Settings Modal
// ============================================================================
function updateApiStatusUI() {
  if (state.apiKey && state.apiKey.trim().length > 0) {
    els.apiKeyModalBtn.classList.add('connected');
    els.apiStatusText.textContent = 'Gemini Connected';
    els.apiStatusDot.style.background = 'var(--success)';
  } else {
    els.apiKeyModalBtn.classList.remove('connected');
    els.apiStatusText.textContent = 'Demo Mode (Sample)';
    els.apiStatusDot.style.background = 'var(--warning)';
  }
}

function openApiKeyModal() {
  els.apiKeyInput.value = state.apiKey;
  els.apiKeyModal.classList.add('open');
}

function closeApiKeyModal() {
  els.apiKeyModal.classList.remove('open');
}

function saveApiKey() {
  const key = els.apiKeyInput.value.trim();
  state.apiKey = key;
  if (key) {
    localStorage.setItem('gemini_api_key', key);
  } else {
    localStorage.removeItem('gemini_api_key');
  }
  updateApiStatusUI();
  closeApiKeyModal();
}

function clearApiKey() {
  state.apiKey = '';
  localStorage.removeItem('gemini_api_key');
  els.apiKeyInput.value = '';
  updateApiStatusUI();
  closeApiKeyModal();
}

// ============================================================================
// Event Listeners Setup
// ============================================================================
function setupEventListeners() {
  // Theme Toggle
  els.themeToggleBtn?.addEventListener('click', toggleTheme);

  // API Key Modal
  els.apiKeyModalBtn?.addEventListener('click', openApiKeyModal);
  els.footerSettingsLink?.addEventListener('click', (e) => { e.preventDefault(); openApiKeyModal(); });
  els.closeApiKeyModalBtn?.addEventListener('click', closeApiKeyModal);
  els.saveApiKeyBtn?.addEventListener('click', saveApiKey);
  els.clearApiKeyBtn?.addEventListener('click', clearApiKey);
  els.toggleKeyVisibilityBtn?.addEventListener('click', () => {
    els.apiKeyInput.type = els.apiKeyInput.type === 'password' ? 'text' : 'password';
  });

  // Export Modal
  els.exportReportBtn?.addEventListener('click', () => els.exportModal.classList.add('open'));
  els.closeExportModalBtn?.addEventListener('click', () => els.exportModal.classList.remove('open'));
  els.exportMarkdownBtn?.addEventListener('click', exportMarkdownReport);
  els.exportPrintBtn?.addEventListener('click', () => { els.exportModal.classList.remove('open'); window.print(); });
  els.copySummaryBtn?.addEventListener('click', copySummaryToClipboard);

  // Dropzone and File inputs
  els.dropZone?.addEventListener('click', (e) => {
    if (e.target !== els.removeFileBtn && !els.removeFileBtn?.contains(e.target)) {
      els.fileInput.click();
    }
  });
  els.fileInput?.addEventListener('change', onFileChosen);
  els.removeFileBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    resetFile();
  });

  ['dragenter', 'dragover'].forEach(name => {
    els.dropZone?.addEventListener(name, (e) => {
      e.preventDefault();
      els.dropZone.classList.add('drag-active');
    });
  });

  ['dragleave', 'drop'].forEach(name => {
    els.dropZone?.addEventListener(name, (e) => {
      e.preventDefault();
      els.dropZone.classList.remove('drag-active');
    });
  });

  els.dropZone?.addEventListener('drop', (e) => {
    const file = e.dataTransfer?.files?.[0];
    if (file) handleSelectedFile(file);
  });

  // Intake select controls
  els.personaSelect?.addEventListener('change', (e) => {
    state.persona = e.target.value;
    if (state.analysis) renderPersonaAdvice(state.analysis);
  });

  els.languageSelect?.addEventListener('change', (e) => {
    state.language = e.target.value;
  });

  els.modelSelect?.addEventListener('change', (e) => {
    state.model = e.target.value;
  });

  // Sample document buttons
  els.samplePills?.forEach(pill => {
    pill.addEventListener('click', () => {
      const sampleId = pill.getAttribute('data-sample');
      loadSampleContract(sampleId);
    });
  });

  // Analyze Button
  els.analyzeBtn?.addEventListener('click', executeAnalysis);

  // Tabs navigation
  els.tabBtns?.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      switchTab(targetTab);
    });
  });

  // Risk filters & search
  els.filterBtns?.forEach(btn => {
    btn.addEventListener('click', () => {
      els.filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.activeRiskFilter = btn.getAttribute('data-filter') || 'all';
      renderRiskClauses();
    });
  });

  els.clauseSearchInput?.addEventListener('input', (e) => {
    state.riskSearchQuery = e.target.value.toLowerCase();
    renderRiskClauses();
  });

  // AI Chat form
  els.chatForm?.addEventListener('submit', onChatSubmit);

  // Chat suggestions
  els.chatSuggestions?.addEventListener('click', (e) => {
    const chip = e.target.closest('.chat-suggestion-chip');
    if (chip) {
      const q = chip.getAttribute('data-q');
      if (q) {
        els.chatInput.value = q;
        onChatSubmit(new Event('submit'));
      }
    }
  });
}

// ============================================================================
// File Handling
// ============================================================================
function onFileChosen(e) {
  const file = e.target.files?.[0];
  if (file) handleSelectedFile(file);
}

function handleSelectedFile(file) {
  const ext = file.name.split('.').pop()?.toLowerCase();
  if (!['pdf', 'txt'].includes(ext)) {
    showStatus('Please select a valid .pdf or .txt file.', true);
    return;
  }

  state.file = file;
  state.activeSample = null;

  els.fileName.textContent = file.name;
  els.fileSize.textContent = formatBytes(file.size);
  els.filePreview.style.display = 'flex';
  els.analyzeBtn.disabled = false;
  showStatus(`Ready to demystify: ${file.name}`);
}

function resetFile() {
  state.file = null;
  state.rawText = '';
  state.activeSample = null;
  els.fileInput.value = '';
  els.filePreview.style.display = 'none';
  els.analyzeBtn.disabled = true;
  showStatus('Select a sample document above or upload your own contract.');
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function showStatus(msg, isError = false) {
  if (els.statusText) {
    els.statusText.textContent = msg;
    els.statusText.style.color = isError ? 'var(--danger)' : 'var(--text-muted)';
  }
}

// ============================================================================
// Sample Contracts Loading
// ============================================================================
function loadSampleContract(sampleId) {
  const sample = sampleContracts[sampleId];
  if (!sample) return;

  state.activeSample = sampleId;
  state.file = null;
  state.analysis = sample;

  // Update UI intake
  els.fileName.textContent = sample.filename;
  els.fileSize.textContent = 'Sample Document';
  els.filePreview.style.display = 'flex';
  els.analyzeBtn.disabled = false;

  showStatus(`Sample loaded: ${sample.name}. Click "Demystify Document" to view full intelligence.`);

  // Render the pre-analyzed demo data
  renderCompleteAnalysis(sample);
}

// ============================================================================
// Text Extraction (PDF & TXT)
// ============================================================================
async function extractText(file) {
  const ext = file.name.split('.').pop()?.toLowerCase();
  if (ext === 'txt') {
    return await file.text();
  }
  if (ext === 'pdf') {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageStrings = textContent.items.map(item => item.str);
      fullText += pageStrings.join(' ') + '\n';
    }
    return fullText;
  }
  throw new Error('Unsupported format');
}

// ============================================================================
// Execution & Gemini AI Engine
// ============================================================================
async function executeAnalysis() {
  // If user has chosen a sample contract and no custom file, re-render demo instantly
  if (state.activeSample && !state.file) {
    const sample = sampleContracts[state.activeSample];
    renderCompleteAnalysis(sample);
    return;
  }

  // If user uploaded a custom document without setting an API key
  if (!state.apiKey) {
    openApiKeyModal();
    showStatus('Please configure your free Gemini API key to analyze custom files.', true);
    return;
  }

  try {
    state.isAnalyzing = true;
    els.analyzeBtn.disabled = true;
    showStatus('Extracting document text...');

    state.rawText = await extractText(state.file);

    showStatus(`Demystifying with ${state.model}...`);

    const result = await analyzeWithGemini(state.rawText, state.persona, state.language, state.model, state.apiKey);

    state.analysis = result;
    renderCompleteAnalysis(result);
    showStatus('Analysis complete!');
  } catch (err) {
    console.error('Demystification failed:', err);
    showStatus(`Analysis failed: ${err.message || 'API error'}`, true);
  } finally {
    state.isAnalyzing = false;
    els.analyzeBtn.disabled = false;
  }
}

async function analyzeWithGemini(documentText, persona, language, model, apiKey) {
  const prompt = `You are Legal Demystifier, a world-class contract attorney and plain-language specialist.
Analyze the following legal document with extreme rigor and return a single valid JSON object.

TARGET AUDIENCE & PERSONA: ${persona.toUpperCase()}
TARGET LANGUAGE: ${language}

JSON STRUCTURE REQUIREMENT:
{
  "docType": "Document Title / Type",
  "parties": ["Party A (Role)", "Party B (Role)"],
  "metrics": {
    "fairnessScore": 0-100,
    "highRisks": number,
    "mediumRisks": number,
    "lowRisks": number,
    "readingTime": "X min read",
    "complexity": "Low|Medium|High|Very High"
  },
  "summary": "Detailed 3-4 paragraph explanation. Include a relatable analogy starting with 'Think of this like...'. Explain what each party gives up and what they gain.",
  "balance": {
    "giver_percent": number,
    "receiver_percent": number,
    "explanation": "Clear explanation of why the contract favors one side."
  },
  "proactive_questions": [
    "4-6 concrete questions the user should ask the other party before signing."
  ],
  "risk_analysis": [
    {
      "text": "Exact text or summary of the risky clause",
      "risk_level": "high|medium|low",
      "category": "Liability|Financial|IP|Privacy|Termination",
      "explanation": "Why this clause is problematic or dangerous in plain language.",
      "negotiation_tip": "Specific recommended counter-clause or compromise to ask for."
    }
  ],
  "demystification": [
    {
      "section": "Section Name or Clause Title",
      "summary": "Plain English translation in 2-3 sentences.",
      "what_it_means_for_you": "Direct consequence for this specific person.",
      "key_takeaway": "One-line rule of thumb."
    }
  ],
  "persona_advice": {
    "student": ["3-4 actionable tips for students"],
    "business_owner": ["3-4 actionable tips for business owners"],
    "lawyer": ["3-4 statutory/case law points for legal counsel"],
    "freelancer": ["3-4 actionable tips for contractors"]
  },
  "mermaid": "flowchart TD\\n  A[Document Upload] --> B[Risk Assessment]\\n  ..."
}

CRITICAL RULES:
1. Provide the response in strict JSON format only. Do not wrap in commentary outside JSON.
2. Ensure translations into ${language} are natural, professional, and clear.
3. Every high/medium risk clause MUST have a realistic, actionable negotiation counter-clause.

LEGAL DOCUMENT TEXT:
${documentText.slice(0, 45000)}
`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 6000,
        responseMimeType: 'application/json'
      }
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Google Gemini Error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const rawJson = data?.candidates?.[0]?.content?.parts?.[0]?.text || '{}';

  return cleanAndParseJson(rawJson);
}

function cleanAndParseJson(raw) {
  let cleaned = raw.trim();
  // Strip markdown code fences if present
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
  }
  return JSON.parse(cleaned);
}

// ============================================================================
// Render Complete Analysis
// ============================================================================
function renderCompleteAnalysis(analysis) {
  if (!analysis) return;

  // Reveal KPI Ribbon and Results
  els.kpiRibbon.style.display = 'grid';
  els.resultsContainer.style.display = 'block';

  // Render KPIs
  renderKPIs(analysis);

  // Render Tabs Content
  renderSummary(analysis);
  renderBalanceChart(analysis.balance);
  renderProactiveQuestions(analysis.proactive_questions || []);
  renderRiskClauses();
  renderDemystification(analysis.demystification || []);
  renderMermaidRoadmap(analysis.mermaid);
  renderPersonaAdvice(analysis);

  // Initialize Chat
  initChatGrounded(analysis);

  // Smooth scroll down to KPIs
  els.kpiRibbon.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ============================================================================
// KPI Ribbon Rendering
// ============================================================================
function renderKPIs(analysis) {
  const metrics = analysis.metrics || {};
  const risks = analysis.risk_analysis || [];

  const highCount = metrics.highRisks ?? risks.filter(r => r.risk_level === 'high').length;
  const medCount = metrics.mediumRisks ?? risks.filter(r => r.risk_level === 'medium').length;
  const lowCount = metrics.lowRisks ?? risks.filter(r => r.risk_level === 'low').length;
  const score = metrics.fairnessScore ?? (100 - (highCount * 18 + medCount * 8));

  els.kpiFairness.textContent = `${Math.max(10, Math.min(95, score))}/100`;
  els.kpiHighRisks.textContent = highCount;
  els.kpiMedRisks.textContent = medCount;
  els.kpiLowRisks.textContent = lowCount;
  els.riskCountBadge.textContent = risks.length;

  // Update filter pill counts
  els.allFilterCount.textContent = risks.length;
  els.highFilterCount.textContent = highCount;
  els.medFilterCount.textContent = medCount;
  els.lowFilterCount.textContent = lowCount;
}

// ============================================================================
// Summary Tab Rendering
// ============================================================================
function renderSummary(analysis) {
  const summaryText = analysis.summary || 'Summary unavailable.';
  const paragraphs = summaryText.split('\n\n');

  let html = '';
  paragraphs.forEach((p, idx) => {
    if (p.includes('Think of this like') || p.includes('Analogy:')) {
      html += `
        <div class="analogy-callout">
          <div class="analogy-title">💡 Plain-Language Analogy</div>
          <p>${escapeHtml(p)}</p>
        </div>
      `;
    } else {
      html += `<p>${escapeHtml(p)}</p>`;
    }
  });

  if (analysis.parties && analysis.parties.length > 0) {
    html += `
      <div style="margin-top: 1.25rem; padding-top: 1rem; border-top: 1px solid var(--border-subtle);">
        <strong>Identified Parties:</strong>
        <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem; flex-wrap: wrap;">
          ${analysis.parties.map(party => `<span class="sample-pill" style="font-size: 0.8rem; cursor: default;">${escapeHtml(party)}</span>`).join('')}
        </div>
      </div>
    `;
  }

  els.summaryContent.innerHTML = html;
}

function renderBalanceChart(balance) {
  if (!balance) return;

  const giver = balance.giver_percent || 65;
  const receiver = balance.receiver_percent || 35;
  els.balanceExplanation.textContent = balance.explanation || 'Distribution of contractual obligations between parties.';

  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const textColor = isDark ? '#94a3b8' : '#475569';

  if (state.chartInstance) {
    state.chartInstance.destroy();
  }

  const ctx = els.balanceChartCanvas.getContext('2d');
  state.chartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Obligations on You', 'Obligations on Counterparty'],
      datasets: [{
        data: [giver, receiver],
        backgroundColor: ['#ef4444', '#3b82f6'],
        hoverBackgroundColor: ['#dc2626', '#2563eb'],
        borderWidth: 2,
        borderColor: isDark ? '#111827' : '#ffffff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '70%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: textColor,
            font: { family: 'Inter', size: 12, weight: '600' },
            padding: 14
          }
        },
        tooltip: {
          callbacks: {
            label: (item) => ` ${item.label}: ${item.raw}%`
          }
        }
      }
    }
  });
}

function renderProactiveQuestions(questions) {
  els.proactiveQuestionsList.innerHTML = '';
  questions.forEach(q => {
    const li = document.createElement('li');
    li.className = 'question-item';
    li.innerHTML = `
      <span class="question-icon">❓</span>
      <span>${escapeHtml(q)}</span>
    `;
    els.proactiveQuestionsList.appendChild(li);
  });
}

// ============================================================================
// Risk Intelligence Tab Rendering
// ============================================================================
function renderRiskClauses() {
  const risks = state.analysis?.risk_analysis || [];
  els.clausesContainer.innerHTML = '';

  const filtered = risks.filter(item => {
    const matchesFilter = state.activeRiskFilter === 'all' || item.risk_level === state.activeRiskFilter;
    const matchesSearch = !state.activeRiskSearchQuery ||
      item.text.toLowerCase().includes(state.riskSearchQuery) ||
      item.explanation.toLowerCase().includes(state.riskSearchQuery) ||
      (item.category && item.category.toLowerCase().includes(state.riskSearchQuery));
    return matchesFilter && matchesSearch;
  });

  if (filtered.length === 0) {
    els.clausesContainer.innerHTML = `
      <div style="text-align: center; padding: 2.5rem; color: var(--text-muted);">
        No clauses match the selected risk filter or search term.
      </div>
    `;
    return;
  }

  filtered.forEach(item => {
    const card = document.createElement('div');
    card.className = `clause-card risk-${item.risk_level || 'medium'}`;

    card.innerHTML = `
      <div class="clause-header">
        <div class="clause-badges">
          <span class="badge-risk ${item.risk_level}">${item.risk_level} Risk</span>
          ${item.category ? `<span class="badge-category">${escapeHtml(item.category)}</span>` : ''}
        </div>
      </div>

      <div class="clause-original">
        "${escapeHtml(item.text)}"
      </div>

      <div class="clause-explanation">
        <strong>⚠️ Hidden Trap / Danger:</strong> ${escapeHtml(item.explanation)}
      </div>

      ${item.negotiation_tip ? `
        <div class="counter-clause-box">
          <div class="counter-clause-header">
            <span class="counter-title">🛡️ Recommended Counter-Clause</span>
            <button type="button" class="btn-copy-counter" data-tip="${encodeURIComponent(item.negotiation_tip)}">
              📋 Copy Counter-Clause
            </button>
          </div>
          <p class="counter-text">${escapeHtml(item.negotiation_tip)}</p>
        </div>
      ` : ''}
    `;

    // Copy counter clause listener
    const copyBtn = card.querySelector('.btn-copy-counter');
    copyBtn?.addEventListener('click', () => {
      const tip = decodeURIComponent(copyBtn.getAttribute('data-tip'));
      navigator.clipboard.writeText(tip).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '✅ Copied!';
        setTimeout(() => { copyBtn.textContent = originalText; }, 2000);
      });
    });

    els.clausesContainer.appendChild(card);
  });
}

// ============================================================================
// Demystification Tab (Accordion)
// ============================================================================
function renderDemystification(items) {
  els.demystifyAccordion.innerHTML = '';

  if (!items || items.length === 0) {
    els.demystifyAccordion.innerHTML = `
      <div style="text-align: center; padding: 2.5rem; color: var(--text-muted);">
        No section breakdowns available for this document.
      </div>
    `;
    return;
  }

  items.forEach((item, index) => {
    const wrap = document.createElement('div');
    wrap.className = 'demystify-item' + (index === 0 ? ' open' : '');

    wrap.innerHTML = `
      <div class="demystify-header">
        <span>${escapeHtml(item.section || `Section ${index + 1}`)}</span>
      </div>
      <div class="demystify-body">
        <p style="margin-bottom: 0.75rem; line-height: 1.6;">${escapeHtml(item.summary)}</p>
        ${item.what_it_means_for_you ? `
          <div style="margin-top: 0.75rem; padding: 0.85rem; background: var(--bg-surface); border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
            <strong>📌 What this means for you:</strong> ${escapeHtml(item.what_it_means_for_you)}
          </div>
        ` : ''}
        ${item.key_takeaway ? `
          <div class="demystify-takeaway">
            ⚡ <strong>Takeaway:</strong> ${escapeHtml(item.key_takeaway)}
          </div>
        ` : ''}
      </div>
    `;

    wrap.querySelector('.demystify-header').addEventListener('click', () => {
      wrap.classList.toggle('open');
    });

    els.demystifyAccordion.appendChild(wrap);
  });
}

// ============================================================================
// Mermaid Roadmap Rendering
// ============================================================================
async function renderMermaidRoadmap(code) {
  const defaultDiagram = `flowchart TD
    A["📄 Document Uploaded"] --> B["🔍 AI Risk Analysis"]
    B --> C{"⚠️ Critical Red Flags?"}
    C -->|"Yes"| D["❌ Request Counter-Clauses"]
    C -->|"No"| E["✅ Review Standard Terms"]
    D --> F{"Counterparty Concedes?"}
    F -->|"Yes"| G["📝 Update Contract & Execute"]
    F -->|"No"| H["🛑 Escalate to Attorney / Walk Away"]
    E --> G
    
    style A fill:#e0f2fe,stroke:#0284c7
    style D fill:#fee2e2,stroke:#ef4444
    style G fill:#dcfce7,stroke:#22c55e
    style H fill:#fef2f2,stroke:#b91c1c`;

  const diagram = (code && code.trim().length > 10) ? code.trim() : defaultDiagram;

  els.mermaidRenderArea.innerHTML = '<div style="color: var(--text-muted); padding: 2rem;">Generating visual decision roadmap...</div>';

  try {
    const id = 'mermaid_' + Math.random().toString(36).substring(2, 9);
    const { svg } = await mermaid.render(id, diagram);
    els.mermaidRenderArea.innerHTML = svg;
  } catch (err) {
    console.warn('Mermaid rendering issue:', err);
    els.mermaidRenderArea.innerHTML = `
      <div style="padding: 1.5rem; text-align: left; background: var(--bg-surface-alt); border-radius: var(--radius-md);">
        <strong>Execution Workflow Summary:</strong>
        <pre style="margin-top: 0.75rem; font-size: 0.85rem; font-family: monospace; white-space: pre-wrap;">${escapeHtml(diagram)}</pre>
      </div>
    `;
  }
}

// ============================================================================
// Persona Advice Rendering
// ============================================================================
function renderPersonaAdvice(analysis) {
  const adviceData = analysis.persona_advice || {};
  const persona = state.persona;

  let adviceList = [];
  if (Array.isArray(adviceData)) {
    adviceList = adviceData;
  } else if (adviceData[persona]) {
    adviceList = adviceData[persona];
  } else {
    adviceList = adviceData.student || adviceData.business_owner || [];
  }

  els.personaAdviceGrid.innerHTML = `
    <div class="advice-card">
      <div class="advice-card-header">
        <span>💡</span>
        <span>Tailored Action Plan for: ${persona.replace('_', ' ').toUpperCase()}</span>
      </div>
      <ul class="checklist">
        ${adviceList.map(item => `
          <li class="checklist-item">
            <input type="checkbox" class="checklist-check" />
            <span>${escapeHtml(item)}</span>
          </li>
        `).join('')}
      </ul>
    </div>
  `;
}

// ============================================================================
// Interactive AI Chat ("Ask Demystifier")
// ============================================================================
function initChatGrounded(analysis) {
  els.chatHistory.innerHTML = `
    <div class="chat-msg bot">
      <div class="chat-avatar">⚖️</div>
      <div class="chat-bubble">
        Hello! I have demystified <strong>${escapeHtml(analysis.docType || 'this contract')}</strong>. Ask me anything about specific clauses, liability risks, or how to negotiate better terms.
      </div>
    </div>
  `;
}

async function onChatSubmit(e) {
  e.preventDefault();
  const q = els.chatInput.value.trim();
  if (!q) return;

  // Add user bubble
  appendChatBubble('user', q);
  els.chatInput.value = '';

  // Show thinking indicator
  const thinkingId = appendChatBubble('bot', '<em>Analyzing document clauses...</em>');

  try {
    let answer = '';
    // If user has API key, call live Gemini
    if (state.apiKey) {
      answer = await askGeminiAboutDoc(q);
    } else {
      // Offline fallback for demo mode
      answer = getOfflineDemoAnswer(q);
    }
    updateChatBubble(thinkingId, answer);
  } catch (err) {
    updateChatBubble(thinkingId, `Sorry, couldn't retrieve answer: ${err.message}`);
  }
}

function appendChatBubble(role, text) {
  const id = 'msg_' + Math.random().toString(36).substr(2, 9);
  const div = document.createElement('div');
  div.id = id;
  div.className = `chat-msg ${role}`;
  div.innerHTML = `
    <div class="chat-avatar">${role === 'bot' ? '⚖️' : '👤'}</div>
    <div class="chat-bubble">${text}</div>
  `;
  els.chatHistory.appendChild(div);
  els.chatHistory.scrollTop = els.chatHistory.scrollHeight;
  return id;
}

function updateChatBubble(id, text) {
  const el = document.getElementById(id);
  if (el) {
    const bubble = el.querySelector('.chat-bubble');
    if (bubble) bubble.innerHTML = text;
    els.chatHistory.scrollTop = els.chatHistory.scrollHeight;
  }
}

async function askGeminiAboutDoc(question) {
  const context = state.rawText || JSON.stringify(state.analysis);
  const prompt = `You are Legal Demystifier. A user has a question about their legal document.
Answer clearly, concisely, and directly in plain everyday language based on the contract context. Highlight traps or give practical negotiation counter-clauses if relevant.

DOCUMENT CONTEXT:
${context.slice(0, 30000)}

USER QUESTION:
${question}
`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${state.model}:generateContent?key=${encodeURIComponent(state.apiKey)}`;
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }]
    })
  });

  if (!resp.ok) throw new Error(await resp.text());
  const data = await resp.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated.';
}

function getOfflineDemoAnswer(q) {
  const query = q.toLowerCase();
  const sample = sampleContracts[state.activeSample || 'lease'];

  if (query.includes('financial') || query.includes('money') || query.includes('cost')) {
    return `In this <strong>${sample.docType}</strong>, the main financial risk is: ${sample.risk_analysis[0]?.explanation || 'Unilateral fees and steep deposit penalties.'} <br><br>💡 <strong>Recommended Counter:</strong> ${sample.risk_analysis[0]?.negotiation_tip || 'Cap all fees upfront.'}`;
  }
  if (query.includes('terminate') || query.includes('cancel') || query.includes('end')) {
    return `Under this agreement, early termination triggers severe liquidated damages or deposit forfeiture. You should insist that termination for convenience includes reasonable notice (30 days) and pro-rata settlement without punitive forfeiture.`;
  }
  if (query.includes('delete') || query.includes('strike')) {
    const topRisks = sample.risk_analysis.filter(r => r.risk_level === 'high');
    return `You should immediately request to strike or renegotiate these high-risk provisions:<br>• ${topRisks.map(r => r.text.slice(0, 70) + '...').join('<br>• ')}`;
  }
  return `Based on this <strong>${sample.docType}</strong>, the agreement is one-sided (${sample.balance.giver_percent}% of burdens fall on you). Make sure to demand bilateral protections and cap personal financial liabilities before putting pen to paper!`;
}

// ============================================================================
// Tabs Navigation
// ============================================================================
function switchTab(tabId) {
  state.activeTab = tabId;

  els.tabBtns.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
  });

  els.tabPanes.forEach(pane => {
    pane.classList.toggle('active', pane.id === tabId);
  });
}

// ============================================================================
// Export & Sharing
// ============================================================================
function exportMarkdownReport() {
  if (!state.analysis) return;
  const a = state.analysis;

  let md = `# Legal Demystifier Report: ${a.docType || 'Contract Analysis'}\n\n`;
  md += `**Date:** ${new Date().toLocaleDateString()}\n`;
  md += `**Fairness Score:** ${a.metrics?.fairnessScore || 50}/100\n\n`;
  md += `## Executive Summary\n${a.summary}\n\n`;
  md += `## Obligation Balance\n${a.balance?.explanation || ''}\n\n`;
  md += `## Critical Risk Analysis\n`;

  (a.risk_analysis || []).forEach((r, i) => {
    md += `### ${i + 1}. [${r.risk_level.toUpperCase()}] ${r.category || 'Clause'}\n`;
    md += `> "${r.text}"\n\n`;
    md += `**Why It's Risky:** ${r.explanation}\n\n`;
    if (r.negotiation_tip) {
      md += `**Recommended Counter-Clause:** ${r.negotiation_tip}\n\n`;
    }
  });

  md += `## Proactive Questions Before Signing\n`;
  (a.proactive_questions || []).forEach(q => {
    md += `- ${q}\n`;
  });

  md += `\n---\n*Generated by Legal Demystifier (Powered by Google Gemini)*\n`;

  const blob = new Blob([md], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.download = `legal-demystifier-report-${Date.now()}.md`;
  downloadLink.click();
  URL.revokeObjectURL(url);
  els.exportModal.classList.remove('open');
}

function copySummaryToClipboard() {
  if (!state.analysis?.summary) return;
  navigator.clipboard.writeText(state.analysis.summary).then(() => {
    els.copySummaryBtn.textContent = '✅ Copied to Clipboard!';
    setTimeout(() => {
      els.copySummaryBtn.textContent = '📋 Copy Executive Summary to Clipboard';
      els.exportModal.classList.remove('open');
    }, 1500);
  });
}

function escapeHtml(str) {
  return (str || '').replace(/[&<>"']/g, m => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[m]);
}
