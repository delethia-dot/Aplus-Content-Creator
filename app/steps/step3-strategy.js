const STEP3_STYLE_ID = 'step3-strategy-styles';
const STEP3_API_URL = window.APLUS_API_URL || 'http://localhost:3001/api/generate';

const STEP3_SYSTEM_PROMPT =
  "You are an expert Amazon A+ content strategist for authors. You specialize in clean and sweet romance, romantic suspense, cozy mystery, journals, nonfiction short reads, workbooks, and children's books. You write strategy briefs that explain exactly why specific A+ modules and copy approaches are recommended for a given book. Always explain your reasoning. Never just generate without explaining why.";

const step3Styles = `
  .step3 {
    max-width: 720px;
    margin: 0 auto 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    font-family: 'Work Sans', system-ui, sans-serif;
  }
  .step3__panel {
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 12px 36px rgba(71, 16, 30, 0.14);
    background: var(--v-surface);
    border: 1px solid var(--v-soft);
  }
  .step3__header {
    background:
      radial-gradient(circle at 70% 10%, rgba(255, 255, 255, 0.12), transparent 18rem),
      linear-gradient(145deg, #8f1b3f, #5c1428 72%);
    color: var(--v-text);
    padding: 1.5rem 2.25rem 1.25rem;
  }
  .step3__eyebrow {
    margin: 0 0 0.4rem;
    font-family: 'Instrument Serif', Georgia, serif;
    font-size: 1rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    opacity: 0.85;
    color: #fff7ea;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  }
  .step3__title {
    margin: 0;
    font-family: 'Instrument Serif', Georgia, serif;
    font-weight: 400;
    font-size: 1.85rem;
    letter-spacing: 0.08em;
    line-height: 1.15;
    color: #fff7ea;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  }
  .step3__body {
    padding: 1.75rem 2.25rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .step3__placeholder {
    margin: 0;
    font-style: italic;
    color: var(--v-muted);
    font-size: 1rem;
    line-height: 1.55;
  }
  .step3__placeholder--hidden { display: none; }
  .step3__brief-content:empty { display: none; }
  .step3__loading {
    margin: 0;
    font-style: italic;
    color: var(--v-muted);
    font-size: 1rem;
    line-height: 1.55;
  }
  .step3__brief-text {
    margin: 0;
    color: var(--v-warm, #4a3728);
    font-size: 1rem;
    line-height: 1.7;
    white-space: pre-wrap;
  }
  .step3__error {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
    align-items: flex-start;
  }
  .step3__error-text {
    margin: 0;
    color: var(--v-bg);
    font-size: 1rem;
    line-height: 1.55;
  }
  .step3__retry {
    background: var(--v-bg);
    color: var(--v-text);
    border: none;
    border-radius: 999px;
    padding: 0.6rem 1.4rem;
    font-family: 'Work Sans', system-ui, sans-serif;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
  }
  .step3__retry:hover { filter: brightness(1.1); }
  .step3__retry:focus-visible {
    outline: 2px solid var(--v-accent);
    outline-offset: 2px;
  }
  .step3__sales-intent {
    background: var(--v-surface);
    border: 1px solid var(--v-soft);
    border-radius: 12px;
    padding: 1.1rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }
  .step3__sales-label {
    color: var(--v-bg);
    font-weight: 600;
    font-size: 0.78rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
  .step3__sales-value {
    color: var(--v-bg);
    font-weight: 700;
    font-size: 1.2rem;
  }
  .step3__rationale {
    background: var(--v-surface);
    color: var(--v-bg);
    border-left: 4px solid var(--v-accent);
    border-radius: 8px;
    padding: 1rem 1.25rem;
    font-size: 0.95rem;
    line-height: 1.55;
  }
  .step3__continue {
    align-self: flex-start;
    background: var(--v-accent);
    color: var(--v-button-text);
    border: none;
    border-radius: 999px;
    padding: 0.95rem 2rem;
    font-family: 'Work Sans', system-ui, sans-serif;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
  }
  .step3__continue:hover { filter: brightness(0.96); }
  .step3__continue:focus-visible {
    outline: 2px solid var(--v-bg);
    outline-offset: 3px;
  }
`;

function injectStep3Styles() {
  if (document.getElementById(STEP3_STYLE_ID)) return;
  const el = document.createElement('style');
  el.id = STEP3_STYLE_ID;
  el.textContent = step3Styles;
  document.head.appendChild(el);
}

function createStep3Strategy(options) {
  injectStep3Styles();
  const opts = options || {};
  const category = opts.category || '';
  const title = opts.title || '';
  const author = opts.author || '';
  const heatLevel = opts.heatLevel || '';
  const description = opts.description || '';
  const seriesStatus = opts.seriesStatus || '';
  const coverMood = opts.coverMood || '';
  const intakeAnswers = Array.isArray(opts.intakeAnswers) ? opts.intakeAnswers : [];

  const salesIntent =
    typeof SALES_INTENTS !== 'undefined' && SALES_INTENTS[category]
      ? SALES_INTENTS[category]
      : '—';

  const root = document.createElement('section');
  root.className = 'step3';

  root.innerHTML = `
    <div class="step3__panel">
      <header class="step3__header">
        <p class="step3__eyebrow">Step 3 of 7</p>
        <h2 class="step3__title">Strategy Summary</h2>
      </header>
      <div class="step3__body">
        <p class="step3__placeholder">Your strategy brief will appear here after analysis is complete.</p>
        <div id="strategy-brief-content" class="step3__brief-content" data-strategy-brief></div>
      </div>
    </div>

    <div class="step3__sales-intent">
      <span class="step3__sales-label">Primary Sales Intent</span>
      <span class="step3__sales-value">${salesIntent}</span>
    </div>

    <div class="step3__rationale">
      The strategy brief explains why specific modules and copy approaches were chosen for your book. Every recommendation in this app is explained, not just generated.
    </div>

    <button class="step3__continue" type="button">Review Layout Options</button>
  `;

  const placeholder = root.querySelector('.step3__placeholder');
  const briefContent = root.querySelector('#strategy-brief-content');

  function setLoading() {
    if (placeholder) placeholder.classList.add('step3__placeholder--hidden');
    briefContent.innerHTML = '';
    const el = document.createElement('p');
    el.className = 'step3__loading';
    el.textContent = 'Analyzing your book and building your strategy brief.';
    briefContent.appendChild(el);
  }

  function setSuccess(text) {
    if (placeholder && placeholder.parentNode) placeholder.remove();
    briefContent.innerHTML = '';
    const el = document.createElement('p');
    el.className = 'step3__brief-text';
    el.textContent = text;
    briefContent.appendChild(el);
  }

  function setError() {
    if (placeholder) placeholder.classList.add('step3__placeholder--hidden');
    briefContent.innerHTML = '';
    const wrap = document.createElement('div');
    wrap.className = 'step3__error';
    const msg = document.createElement('p');
    msg.className = 'step3__error-text';
    msg.textContent =
      'Strategy brief generation failed. Please check your connection and try again.';
    const retry = document.createElement('button');
    retry.type = 'button';
    retry.className = 'step3__retry';
    retry.textContent = 'Retry';
    retry.addEventListener('click', runGenerate);
    wrap.appendChild(msg);
    wrap.appendChild(retry);
    briefContent.appendChild(wrap);
  }

  function buildUserPrompt() {
    const lines = [];
    lines.push(`Book Title: ${title || '(not provided)'}`);
    lines.push(`Author Name: ${author || '(not provided)'}`);
    lines.push(`Genre Category: ${category || '(not provided)'}`);
    if (heatLevel) lines.push(`Heat Level: ${heatLevel}`);
    lines.push(`Book Description: ${description || '(not provided)'}`);
    lines.push(`Series Status: ${seriesStatus || '(not provided)'}`);
    if (coverMood) lines.push(`Cover Mood Descriptor: ${coverMood}`);
    if (intakeAnswers.length) {
      lines.push('');
      lines.push('Author Intake Responses:');
      intakeAnswers.forEach((qa) => {
        lines.push(`Q: ${qa.question}`);
        lines.push(`A: ${qa.answer}`);
      });
    }
    lines.push('');
    lines.push(
      'Write a strategy brief of 2 to 3 paragraphs that explains the recommended A+ content approach for this book and why. Be specific to this book, not generic.'
    );
    return lines.join('\n');
  }

  async function runGenerate() {
    setLoading();
    try {
      const res = await fetch(STEP3_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemPrompt: STEP3_SYSTEM_PROMPT,
          prompt: buildUserPrompt(),
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data || typeof data.text !== 'string' || !data.text.trim()) {
        console.error('[step3] generate non-success response', res.status, data);
        setError();
        return;
      }
      setSuccess(data.text.trim());
    } catch (err) {
      console.error('[step3] generate request failed:', err);
      setError();
    }
  }

  // Fire on mount: kick the fetch immediately so the loading state is already
  // in the DOM by the time the caller appends this element.
  runGenerate();

  return root;
}
