const STEP7_STYLE_ID = 'step7-compliance-styles';

const STEP7_COMPLIANCE_RULES = [
  {
    id: 'pricing',
    label: 'No pricing or promotions',
    suggestedFix: 'Remove pricing or promotional language. A+ content is for storytelling, not transactions.',
    patterns: [
      /\bprice\b/i, /\bsale\b/i, /\bdiscount\b/i, /\bdeal\b/i,
      /\bfree\b/i, /\boff\b/i, /\bsavings\b/i, /\bpromotion\b/i,
      /\blimited time\b/i, /\bact now\b/i,
    ],
  },
  {
    id: 'superlative',
    label: 'No superlative claims',
    suggestedFix: 'Remove or replace with specific, verifiable language. Avoid unsubstantiated claims.',
    patterns: [
      /\bbest\b/i, /\btop[-\s]?rated\b/i, /\bnumber one\b/i, /#\s?1\b/,
      /\bleading\b/i, /\bmost popular\b/i, /\bgreatest\b/i,
      /\bfinest\b/i, /\bultimate\b/i,
    ],
  },
  {
    id: 'competitor',
    label: 'No competitor references',
    suggestedFix: 'Remove competitor comparisons entirely. A+ content cannot compare to other authors or titles.',
    patterns: [
      /\b[A-Z][A-Za-z]+\s+(vs\.?|versus|compared to)\b/,
    ],
  },
  {
    id: 'review-quotes',
    label: 'No customer review quotes',
    suggestedFix: 'Remove. Only up to 4 endorsements from recognized publications or public figures with clear attribution are allowed.',
    customCheck: function (text) {
      const found = [];
      // Only flag when the text contains a quoted segment AND one of the
      // attribution phrases below. General quoted dialogue or quoted phrases
      // mid-sentence with no attribution are intentionally not flagged.
      const hasQuote = /["“”'][^"“”']{1,400}["“”']/.test(text);
      if (!hasQuote) return found;
      const attributionPatterns = [
        /\bsays\b/i,
        /\bsaid\b/i,
        /\baccording to\b/i,
        /\bwrites\b/i,
        /\breviewed\b/i,
        /\breader says\b/i,
        /\bcustomer says\b/i,
        /\bas seen in reviews\b/i,
      ];
      attributionPatterns.forEach(function (p) {
        const match = text.match(p);
        if (match) found.push(match[0]);
      });
      return found;
    },
  },
  {
    id: 'external-links',
    label: 'No external links',
    suggestedFix: 'Remove. A+ content must keep shoppers on Amazon — no off-Amazon URLs or domains.',
    patterns: [
      /\bhttps?:\/\//i, /\bwww\./i, /\.com\b/i, /\.net\b/i, /\.org\b/i,
    ],
  },
  {
    id: 'non-evergreen',
    label: 'No non-evergreen language',
    suggestedFix: 'Replace with evergreen alternatives. A+ content stays live indefinitely — avoid time-bound phrasing.',
    patterns: [
      /\bnew release\b/i, /\bjust released\b/i, /\bthis year\b/i,
      /\bthis month\b/i, /\bnow available\b/i, /\bcoming soon\b/i,
      /\bpre[-\s]?order\b/i,
    ],
  },
  {
    id: 'off-amazon-cta',
    label: 'No calls to action off Amazon',
    suggestedFix: 'Remove. A+ content cannot drive traffic off Amazon — no website, social, or newsletter prompts.',
    patterns: [
      /\bvisit my website\b/i, /\bfollow me\b/i,
      /\bjoin my newsletter\b/i, /\bsign up\b/i,
      /\bsubscribe\b/i, /\bfind me at\b/i,
    ],
  },
];

const step7Styles = `
  .step7 {
    max-width: 760px;
    margin: 0 auto 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    font-family: 'Work Sans', system-ui, sans-serif;
  }
  .step7__panel {
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 12px 36px rgba(71, 16, 30, 0.14);
    background: var(--v-surface);
    border: 1px solid var(--v-soft);
  }
  .step7__header {
    background:
      radial-gradient(circle at 70% 10%, rgba(255, 255, 255, 0.12), transparent 18rem),
      linear-gradient(145deg, #8f1b3f, #5c1428 72%);
    color: var(--v-text);
    padding: 1.5rem 2.25rem 1.25rem;
  }
  .step7__eyebrow {
    margin: 0 0 0.4rem;
    font-family: 'Instrument Serif', Georgia, serif;
    font-size: 1rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    opacity: 0.85;
    color: #fff7ea;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  }
  .step7__title {
    margin: 0;
    font-family: 'Instrument Serif', Georgia, serif;
    font-weight: 400;
    font-size: 1.85rem;
    letter-spacing: 0.08em;
    line-height: 1.15;
    color: #fff7ea;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  }
  .step7__body {
    padding: 1.75rem 2.25rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .step7__section-title {
    margin: 0;
    color: var(--v-bg);
    font-family: 'Instrument Serif', Georgia, serif;
    font-weight: 400;
    font-size: 1.4rem;
    letter-spacing: 0.04em;
  }
  .step7__compliance {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .step7__summary {
    padding: 1rem 1.25rem;
    border-radius: 8px;
    font-size: 1rem;
    line-height: 1.5;
    font-weight: 700;
  }
  .step7__summary--pass {
    background: var(--v-surface);
    color: var(--v-accent-2);
    border-left: 4px solid var(--v-accent-2);
  }
  .step7__summary--fail {
    background: var(--v-surface);
    color: var(--v-bg);
    border-left: 4px solid var(--v-bg);
  }
  .step7__rules {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }
  .step7__rule {
    background: var(--v-surface);
    border: 1px solid var(--v-soft);
    border-radius: 8px;
    padding: 0.85rem 1.1rem;
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
  }
  .step7__rule-header {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }
  .step7__rule-status {
    font-weight: 700;
    font-size: 0.78rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 0.18rem 0.6rem;
    border-radius: 999px;
  }
  .step7__rule-status--pass {
    color: var(--v-accent-2);
    border: 1px solid var(--v-accent-2);
    background: rgba(169, 180, 141, 0.12);
  }
  .step7__rule-status--fail {
    color: var(--v-bg);
    border: 1px solid var(--v-bg);
    background: rgba(111, 24, 48, 0.08);
  }
  .step7__rule-icon {
    font-size: 1.05rem;
    line-height: 1;
  }
  .step7__rule-icon--pass { color: var(--v-accent-2); }
  .step7__rule-icon--fail { color: var(--v-bg); }
  .step7__rule-label {
    font-weight: 600;
    color: var(--v-bg);
    font-size: 0.95rem;
  }
  .step7__violations {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-left: 1.6rem;
  }
  .step7__violation {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.55rem 0.75rem;
    background: #ffffff;
    border: 1px solid var(--v-soft);
    border-left: 3px solid var(--v-bg);
    border-radius: 6px;
  }
  .step7__violation-source {
    font-size: 0.78rem;
    color: var(--v-bg);
    text-decoration: underline;
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    text-align: left;
    font-family: inherit;
    font-weight: 600;
  }
  .step7__violation-source:hover { filter: brightness(0.85); }
  .step7__violation-text {
    color: var(--v-bg);
    font-size: 0.9rem;
    line-height: 1.45;
    word-break: break-word;
  }
  .step7__violation-text-flag {
    background: rgba(243, 198, 91, 0.4);
    padding: 0.05rem 0.25rem;
    border-radius: 3px;
    font-weight: 700;
  }
  .step7__violation-fix {
    margin: 0;
    color: #7a3a47;
    font-style: italic;
    font-size: 0.85rem;
    line-height: 1.45;
  }
  .step7__rerun {
    align-self: flex-start;
    background: var(--v-bg);
    color: var(--v-text);
    border: none;
    border-radius: 999px;
    padding: 0.7rem 1.5rem;
    font-family: 'Work Sans', system-ui, sans-serif;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
  }
  .step7__rerun:hover { filter: brightness(1.1); }
  .step7__export {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .step7__block {
    background: var(--v-surface);
    color: var(--v-bg);
    border: 1px solid var(--v-soft);
    border-left: 4px solid var(--v-accent);
    border-radius: 8px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }
  .step7__block-label {
    margin: 0;
    color: var(--v-bg);
    font-family: 'Instrument Serif', Georgia, serif;
    font-weight: 400;
    font-size: 1.25rem;
    letter-spacing: 0.04em;
  }
  .step7__block-content {
    margin: 0;
    color: var(--v-bg);
    font-size: 0.95rem;
    line-height: 1.6;
    white-space: pre-wrap;
    font-family: 'Work Sans', system-ui, sans-serif;
  }
  .step7__block-copy {
    align-self: flex-start;
    background: var(--v-accent);
    color: var(--v-button-text);
    border: none;
    border-radius: 999px;
    padding: 0.5rem 1.2rem;
    font-family: 'Work Sans', system-ui, sans-serif;
    font-weight: 600;
    font-size: 0.85rem;
    cursor: pointer;
  }
  .step7__block-copy:hover { filter: brightness(0.96); }
  .step7__block-copy--copied { background: var(--v-accent-2); }
  .step7__full-export {
    align-self: flex-start;
    margin-top: 0.5rem;
    background: var(--v-bg);
    color: var(--v-text);
    border: none;
    border-radius: 999px;
    padding: 1rem 2rem;
    font-family: 'Work Sans', system-ui, sans-serif;
    font-weight: 700;
    font-size: 1.1rem;
    cursor: pointer;
  }
  .step7__full-export:hover { filter: brightness(1.08); }
  .step7__full-export--copied { background: var(--v-accent-2); color: var(--v-button-text); }
  .step7__export-locked {
    margin: 0;
    padding: 1rem 1.25rem;
    background: var(--v-surface);
    border-left: 4px solid var(--v-soft);
    border-radius: 8px;
    color: #7a3a47;
    font-style: italic;
    font-size: 0.95rem;
    line-height: 1.5;
  }
`;

function injectStep7Styles() {
  if (document.getElementById(STEP7_STYLE_ID)) return;
  const el = document.createElement('style');
  el.id = STEP7_STYLE_ID;
  el.textContent = step7Styles;
  document.head.appendChild(el);
}

function step7EscapeHtml(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function step7CopyToClipboard(text, btn, copiedClass) {
  try {
    await navigator.clipboard.writeText(text);
    if (btn) {
      const original = btn.textContent;
      btn.textContent = 'Copied!';
      if (copiedClass) btn.classList.add(copiedClass);
      setTimeout(function () {
        btn.textContent = original;
        if (copiedClass) btn.classList.remove(copiedClass);
      }, 1500);
    }
  } catch (err) {
    console.error('[step7] clipboard copy failed:', err);
  }
}

function step7ExpandStep5() {
  const mount = document.getElementById('step5-mount');
  if (!mount) return;
  const content = mount.querySelector('.step-content');
  if (content && content.classList.contains('step-collapsed')) {
    content.classList.remove('step-collapsed');
    const chevron = mount.querySelector('.step-chevron');
    if (chevron) chevron.classList.add('expanded');
    const summaryBar = mount.querySelector('.step-summary-bar');
    if (summaryBar) summaryBar.setAttribute('aria-expanded', 'true');
  }
}

function step7JumpToModule(moduleIdx) {
  step7ExpandStep5();
  const card = document.querySelector(
    '#step5-mount .step5__card[data-module-idx="' + String(moduleIdx) + '"]'
  );
  if (card) card.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function createStep7Compliance(options) {
  injectStep7Styles();
  const opts = options || {};
  const title = opts.title || '';
  const author = opts.author || '';
  const category = opts.category || '';
  const strategyBrief = opts.strategyBrief || '';
  const layout = opts.layout || null;
  let moduleCopy = Array.isArray(opts.moduleCopy) ? opts.moduleCopy : [];
  const imagePrompts = Array.isArray(opts.imagePrompts) ? opts.imagePrompts : [];

  const root = document.createElement('section');
  root.className = 'step7';

  root.innerHTML = `
    <div class="step7__panel">
      <header class="step7__header">
        <p class="step7__eyebrow">Step 7 of 7</p>
        <h2 class="step7__title">Compliance Check &amp; Export</h2>
      </header>
      <div class="step7__body">
        <div class="step7__compliance">
          <h3 class="step7__section-title">Compliance Check</h3>
          <div class="step7__summary" data-compliance-summary></div>
          <div class="step7__rules" data-compliance-rules></div>
          <button type="button" class="step7__rerun" data-rerun>Re-run Compliance Check</button>
        </div>

        <div data-export-area>
          <h3 class="step7__section-title">Export Package</h3>
          <p class="step7__export-locked" data-export-locked>The export package will appear here once all compliance checks pass.</p>
          <div class="step7__export" data-export-blocks hidden></div>
        </div>
      </div>
    </div>
  `;

  const summaryEl = root.querySelector('[data-compliance-summary]');
  const rulesEl = root.querySelector('[data-compliance-rules]');
  const rerunBtn = root.querySelector('[data-rerun]');
  const exportBlocksEl = root.querySelector('[data-export-blocks]');
  const exportLockedEl = root.querySelector('[data-export-locked]');

  function checkText(rule, text) {
    if (rule.customCheck) return rule.customCheck(text);
    const found = [];
    if (rule.patterns) {
      rule.patterns.forEach(function (pattern) {
        const m = text.match(pattern);
        if (m) found.push(m[0]);
      });
    }
    return found;
  }

  function runCompliance() {
    const results = STEP7_COMPLIANCE_RULES.map(function (rule) {
      const violations = [];
      moduleCopy.forEach(function (mc, idx) {
        ['headline', 'body'].forEach(function (fieldName) {
          const text = (mc && mc[fieldName]) || '';
          if (!text) return;
          const matches = checkText(rule, text);
          matches.forEach(function (matched) {
            violations.push({
              ruleId: rule.id,
              ruleLabel: rule.label,
              suggestedFix: rule.suggestedFix,
              moduleName: (mc && mc.moduleName) || 'Module ' + (idx + 1),
              moduleIdx: idx,
              fieldName: fieldName,
              fieldLabel: fieldName === 'headline' ? 'Headline' : 'Body Copy',
              matchedText: matched,
              fullText: text,
            });
          });
        });
      });
      return { rule: rule, violations: violations };
    });

    renderComplianceResults(results);

    const totalViolations = results.reduce(function (acc, r) { return acc + r.violations.length; }, 0);
    if (totalViolations === 0) {
      buildExportBlocks();
      exportLockedEl.hidden = true;
      exportBlocksEl.hidden = false;
    } else {
      exportLockedEl.hidden = false;
      exportBlocksEl.hidden = true;
      exportBlocksEl.innerHTML = '';
    }
  }

  function renderComplianceResults(results) {
    const totalViolations = results.reduce(function (acc, r) { return acc + r.violations.length; }, 0);

    summaryEl.className = 'step7__summary ' + (totalViolations === 0 ? 'step7__summary--pass' : 'step7__summary--fail');
    summaryEl.textContent = totalViolations === 0
      ? 'All compliance checks passed. Your content is ready to export.'
      : totalViolations + ' compliance issue' + (totalViolations === 1 ? '' : 's') + ' found. Please review and fix before exporting.';

    rulesEl.innerHTML = '';
    results.forEach(function (entry) {
      const passed = entry.violations.length === 0;
      const ruleEl = document.createElement('div');
      ruleEl.className = 'step7__rule';
      ruleEl.innerHTML =
        '<div class="step7__rule-header">' +
          '<span class="step7__rule-icon ' + (passed ? 'step7__rule-icon--pass' : 'step7__rule-icon--fail') + '" aria-hidden="true">' +
            (passed ? '&#10003;' : '&#10007;') +
          '</span>' +
          '<span class="step7__rule-status ' + (passed ? 'step7__rule-status--pass' : 'step7__rule-status--fail') + '">' +
            (passed ? 'PASS' : 'FAIL') +
          '</span>' +
          '<span class="step7__rule-label"></span>' +
        '</div>';
      ruleEl.querySelector('.step7__rule-label').textContent = entry.rule.label;

      if (!passed) {
        const violationsWrap = document.createElement('div');
        violationsWrap.className = 'step7__violations';
        entry.violations.forEach(function (v) {
          const item = document.createElement('div');
          item.className = 'step7__violation';

          const sourceBtn = document.createElement('button');
          sourceBtn.type = 'button';
          sourceBtn.className = 'step7__violation-source';
          sourceBtn.textContent = 'Module ' + (v.moduleIdx + 1) + ' · ' + v.moduleName + ' · ' + v.fieldLabel + ' — open in Step 5';
          sourceBtn.addEventListener('click', function () {
            step7JumpToModule(v.moduleIdx);
          });
          item.appendChild(sourceBtn);

          const textEl = document.createElement('p');
          textEl.className = 'step7__violation-text';
          textEl.textContent = 'Flagged: ';
          const flag = document.createElement('span');
          flag.className = 'step7__violation-text-flag';
          flag.textContent = v.matchedText;
          textEl.appendChild(flag);
          item.appendChild(textEl);

          const fixEl = document.createElement('p');
          fixEl.className = 'step7__violation-fix';
          fixEl.textContent = 'Suggested fix: ' + (v.suggestedFix || entry.rule.suggestedFix);
          item.appendChild(fixEl);

          violationsWrap.appendChild(item);
        });
        ruleEl.appendChild(violationsWrap);
      }

      rulesEl.appendChild(ruleEl);
    });
  }

  // -- Export blocks --

  function buildStrategyBriefText() {
    return strategyBrief || '(No strategy brief available — return to Step 3 to generate one.)';
  }

  function buildLayoutText() {
    if (!layout) return '(No layout selected — return to Step 4.)';
    const lines = [];
    lines.push('Layout: ' + (layout.label || ''));
    if (layout.salesIntent) lines.push('Sales Intent: ' + layout.salesIntent);
    if (layout.rationale) lines.push('Rationale: ' + layout.rationale);
    if (Array.isArray(layout.modules) && layout.modules.length) {
      lines.push('');
      lines.push('Modules:');
      layout.modules.forEach(function (m, i) {
        lines.push((i + 1) + '. ' + m);
      });
    }
    return lines.join('\n');
  }

  function buildModuleCopyText() {
    if (!moduleCopy.length) return '(No module copy available — return to Step 5.)';
    return moduleCopy.map(function (mc, i) {
      const lines = [];
      lines.push('Module ' + (i + 1) + ' — ' + (mc.moduleName || ''));
      lines.push('Headline: ' + (mc.headline || ''));
      lines.push('Body Copy: ' + (mc.body || ''));
      return lines.join('\n');
    }).join('\n\n');
  }

  function buildImagePromptsText() {
    if (!imagePrompts.length) return '(No image prompts available — return to Step 6.)';
    return imagePrompts.map(function (ip, i) {
      const lines = [];
      lines.push('Image Prompt — Module ' + (i + 1) + ' (' + (ip.moduleName || '') + ')');
      lines.push('Full Prompt: ' + (ip.fullPrompt || ''));
      lines.push('Alt Text: ' + (ip.altText || ''));
      return lines.join('\n');
    }).join('\n\n');
  }

  function buildDesignerNotesText() {
    if (!moduleCopy.length) return '(No designer notes available — return to Step 5.)';
    return moduleCopy.map(function (mc, i) {
      return 'Designer Notes — Module ' + (i + 1) + ' (' + (mc.moduleName || '') + ')\n' +
        (mc.designNote || '(No designer note recorded.)');
    }).join('\n\n');
  }

  function buildFullPackageText() {
    const sections = [
      ['STRATEGY BRIEF', buildStrategyBriefText()],
      ['SELECTED A+ LAYOUT', buildLayoutText()],
      ['MODULE COPY', buildModuleCopyText()],
      ['IMAGE PROMPTS', buildImagePromptsText()],
      ['DESIGNER NOTES', buildDesignerNotesText()],
    ];
    const headerLines = [];
    if (title) headerLines.push('Book Title: ' + title);
    if (author) headerLines.push('Author: ' + author);
    if (category) headerLines.push('Category: ' + category);
    headerLines.push('Generated: ' + new Date().toISOString());
    const headerBlock = headerLines.join('\n');
    return sections.reduce(function (acc, s) {
      return acc + '\n\n=== ' + s[0] + ' ===\n' + s[1];
    }, '=== AMAZON A+ CONTENT EXPORT PACKAGE ===\n' + headerBlock).trim() + '\n';
  }

  function buildExportBlocks() {
    const blocks = [
      { label: 'Strategy Brief', content: buildStrategyBriefText() },
      { label: 'Selected A+ Layout', content: buildLayoutText() },
      { label: 'Module Copy', content: buildModuleCopyText() },
      { label: 'Image Prompts', content: buildImagePromptsText() },
      { label: 'Designer Notes', content: buildDesignerNotesText() },
    ];
    exportBlocksEl.innerHTML = '';
    blocks.forEach(function (b) {
      const block = document.createElement('div');
      block.className = 'step7__block';
      block.innerHTML =
        '<h4 class="step7__block-label"></h4>' +
        '<pre class="step7__block-content"></pre>' +
        '<button type="button" class="step7__block-copy">Copy to Clipboard</button>';
      block.querySelector('.step7__block-label').textContent = b.label;
      block.querySelector('.step7__block-content').textContent = b.content;
      const copyBtn = block.querySelector('.step7__block-copy');
      copyBtn.addEventListener('click', function () {
        step7CopyToClipboard(b.content, copyBtn, 'step7__block-copy--copied');
      });
      exportBlocksEl.appendChild(block);
    });

    const fullBtn = document.createElement('button');
    fullBtn.type = 'button';
    fullBtn.className = 'step7__full-export';
    fullBtn.textContent = 'Copy Complete Export Package';
    fullBtn.addEventListener('click', function () {
      step7CopyToClipboard(buildFullPackageText(), fullBtn, 'step7__full-export--copied');
    });
    exportBlocksEl.appendChild(fullBtn);
  }

  function readLiveModuleCopyFromStep5() {
    const step5Mount = document.getElementById('step5-mount');
    if (!step5Mount) return null;
    const cards = step5Mount.querySelectorAll('.step5__card');
    if (!cards.length) return null;
    const live = [];
    cards.forEach(function (card, idx) {
      const titleEl = card.querySelector('.step5__card-title');
      const headlineEl = card.querySelector('[data-field="headline"]');
      const bodyEl = card.querySelector('[data-field="body"]');
      const designNoteEl = card.querySelector('[data-field="designNote"]');
      live.push({
        moduleName: titleEl ? titleEl.textContent.trim() : 'Module ' + (idx + 1),
        headline: headlineEl ? (headlineEl.textContent || '') : '',
        body: bodyEl ? (bodyEl.textContent || '') : '',
        designNote: designNoteEl ? (designNoteEl.textContent || '') : '',
      });
    });
    return live;
  }

  rerunBtn.addEventListener('click', function () {
    const live = readLiveModuleCopyFromStep5();
    if (live && live.length) {
      moduleCopy = live;
    }
    runCompliance();
  });

  // Run on mount
  runCompliance();

  return root;
}
