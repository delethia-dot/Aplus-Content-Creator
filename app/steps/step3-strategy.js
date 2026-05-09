const STEP3_STYLE_ID = 'step3-strategy-styles';
const STEP3_API_URL = window.APLUS_API_URL || 'http://localhost:3001/api/generate';

const STEP3_SYSTEM_PROMPT = [
  "You are an expert Amazon A+ content strategist for authors. You specialize in clean and sweet romance, romantic suspense, cozy mystery, journals, nonfiction short reads, workbooks, and children's books. You think in modules, sales intent, and buyer psychology. Every recommendation you make is specific to the book in front of you, never generic.",
  '',
  'Before writing anything, classify the book into one of these primary sales intents: Emotional Experience, Series Binge, Practical Outcome, Guided Reflection, Hands-On Implementation, Parent Teacher Buyer Fit, Giftable Product, Author Authority, or World Setting Immersion.',
  '',
  'Then apply category-specific extraction logic. For romance: identify tropes, couple dynamic, emotional promise, setting appeal, and no-spoiler boundaries. For journals: identify use case, transformation, gifting potential, and visual mood. For nonfiction: identify reader pain point, framework or method, author authority, and practical takeaways. For workbooks: identify learning objective, exercises, implementation path, and reader progress markers. For cozy mystery: identify the sleuth, setting charm, recurring comfort elements, and series binge potential. For children’s books: identify age range, theme or lesson, buyer type, and illustration style.',
  '',
  'Your strategy brief must recommend a specific 5-module stack based on the sales intent and category logic. Name each module and explain why it was chosen for this specific book.',
  '',
  'All recommendations must comply with Amazon A+ content rules. Never suggest pricing, customer review quotes, competitor comparisons, external links, or unsubstantiated superlative claims like best or number one.',
  '',
  'If the author is using a pen name or is a faceless brand, recommend thematic or setting-based visuals instead of author headshots. Suggest mood banners, illustrated settings, or brand logo treatments instead.',
  '',
  'Always explain your reasoning. The why behind every recommendation is as important as the recommendation itself.',
].join('\n');

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

  function deriveFacelessAuthorFlag(cat) {
    if (cat === 'Journals' || cat === 'Nonfiction Short Reads') {
      return 'possible (genre frequently uses pen names or brand-only authors)';
    }
    return 'unknown — evaluate based on whether the author name aligns with the book description tone';
  }

  function buildUserPrompt() {
    const lines = [];
    lines.push('You are analyzing the following book for Amazon A+ content strategy.');
    lines.push('');

    if (title) lines.push(`Book Title: ${title}`);
    if (author) lines.push(`Author Name: ${author}`);
    if (category) lines.push(`Genre Category: ${category}`);

    const intentForCategory =
      typeof SALES_INTENTS !== 'undefined' && SALES_INTENTS[category]
        ? SALES_INTENTS[category]
        : '';
    if (intentForCategory) {
      lines.push(`Primary Sales Intent to Evaluate: ${intentForCategory}`);
    }

    if (heatLevel) lines.push(`Heat Level: ${heatLevel}`);
    if (description) lines.push(`Book Description: ${description}`);
    if (seriesStatus) lines.push(`Part of a Series: ${seriesStatus}`);
    if (coverMood) lines.push(`Cover Mood: ${coverMood}`);

    lines.push(`Faceless or Pen Name Author: ${deriveFacelessAuthorFlag(category)}`);

    if (intakeAnswers.length) {
      lines.push('');
      intakeAnswers.forEach((qa) => {
        lines.push(`${qa.question}: ${qa.answer}`);
      });
    }

    lines.push('');
    lines.push(
      'Based on all of the above, first state the confirmed Sales Intent classification and explain why. Then write a strategy brief of 2 to 3 paragraphs recommending the A+ content approach for this book. Then list the recommended 5-module stack with one sentence explaining why each module was chosen. Be specific to this book. Never be generic.'
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
