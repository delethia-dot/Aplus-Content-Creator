const STEP5_STYLE_ID = 'step5-copy-styles';

const STEP5_SYSTEM_PROMPT =
  'You are an expert Amazon A+ content copywriter for books. You write benefit-led, emotionally resonant copy that follows Amazon compliance rules. Never include pricing, customer review quotes, competitor names, external links, or superlative claims like best or number one. Always write copy that is specific to the book provided, never generic. Return valid JSON only with no markdown and no commentary.';

const step5Styles = `
  .step5 {
    max-width: 720px;
    margin: 0 auto 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    font-family: 'Work Sans', system-ui, sans-serif;
  }
  .step5__panel {
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 12px 36px rgba(71, 16, 30, 0.14);
    background: var(--v-surface);
    border: 1px solid var(--v-soft);
  }
  .step5__header {
    background:
      radial-gradient(circle at 70% 10%, rgba(255, 255, 255, 0.12), transparent 18rem),
      linear-gradient(145deg, #8f1b3f, #5c1428 72%);
    color: var(--v-text);
    padding: 1.5rem 2.25rem 1.25rem;
  }
  .step5__eyebrow {
    margin: 0 0 0.4rem;
    font-family: 'Instrument Serif', Georgia, serif;
    font-size: 1rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    opacity: 0.85;
    color: #fff7ea;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  }
  .step5__title {
    margin: 0;
    font-family: 'Instrument Serif', Georgia, serif;
    font-weight: 400;
    font-size: 1.85rem;
    letter-spacing: 0.08em;
    line-height: 1.15;
    color: #fff7ea;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  }
  .step5__body {
    padding: 1.75rem 2.25rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .step5__intro {
    margin: 0 0 0.5rem;
    font-style: italic;
    color: #7a3a47;
    font-size: 0.9rem;
    line-height: 1.5;
  }
  .step5__cards {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
  .step5__card {
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid var(--v-soft);
    background: var(--v-surface);
  }
  .step5__card-header {
    background:
      radial-gradient(circle at 70% 10%, rgba(255, 255, 255, 0.10), transparent 14rem),
      linear-gradient(145deg, #8f1b3f, #5c1428 72%);
    color: var(--v-text);
    padding: 1rem 1.5rem 0.85rem;
  }
  .step5__card-eyebrow {
    margin: 0 0 0.3rem;
    font-family: 'Instrument Serif', Georgia, serif;
    font-size: 0.85rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    opacity: 0.85;
    color: #fff7ea;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  }
  .step5__card-title {
    margin: 0;
    font-family: 'Instrument Serif', Georgia, serif;
    font-weight: 400;
    font-size: 1.4rem;
    letter-spacing: 0.06em;
    line-height: 1.2;
    color: #fff7ea;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  }
  .step5__card-body {
    padding: 1.25rem 1.5rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .step5__card-loading {
    margin: 0;
    font-style: italic;
    color: #7a3a47;
    font-size: 0.95rem;
    line-height: 1.5;
  }
  .step5__card-error {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    align-items: flex-start;
  }
  .step5__card-error-text {
    margin: 0;
    color: var(--v-bg);
    font-size: 0.95rem;
    line-height: 1.5;
  }
  .step5__card-retry {
    background: var(--v-bg);
    color: var(--v-text);
    border: none;
    border-radius: 999px;
    padding: 0.55rem 1.2rem;
    font-family: 'Work Sans', system-ui, sans-serif;
    font-weight: 600;
    font-size: 0.85rem;
    cursor: pointer;
  }
  .step5__card-retry:hover { filter: brightness(1.1); }
  .step5__field {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }
  .step5__field-label {
    color: var(--v-bg);
    font-weight: 600;
    font-size: 0.78rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
  .step5__field-value {
    background: #ffffff;
    border: 1px solid var(--v-soft);
    border-radius: 8px;
    padding: 0.7rem 0.9rem;
    font-family: 'Work Sans', system-ui, sans-serif;
    font-size: 1rem;
    line-height: 1.5;
    color: #4a3728;
    min-height: 1.4em;
    outline: none;
  }
  .step5__field-value:focus {
    border-color: var(--v-bg);
    box-shadow: 0 0 0 2px rgba(243, 198, 91, 0.35);
  }
  .step5__field-value--headline {
    font-family: 'Instrument Serif', Georgia, serif;
    font-weight: 700;
    font-size: 1.3rem;
    color: var(--v-bg);
    line-height: 1.25;
  }
  .step5__field-value--body {
    color: var(--v-warm, #4a3728);
    font-size: 1rem;
  }
  .step5__field-value--designnote {
    font-style: italic;
    color: #7a3a47;
    font-size: 0.95rem;
  }
  .step5__counter {
    align-self: flex-end;
    font-size: 0.78rem;
    color: var(--v-bg);
    opacity: 0.7;
  }
  .step5__counter--over {
    color: var(--v-bg);
    opacity: 1;
    font-weight: 700;
  }
  .step5__continue {
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
  .step5__continue:hover:not(:disabled) { filter: brightness(0.96); }
  .step5__continue:disabled {
    background: var(--v-soft);
    color: var(--v-bg);
    opacity: 0.7;
    cursor: not-allowed;
  }
  .step5__continue:focus-visible {
    outline: 2px solid var(--v-bg);
    outline-offset: 3px;
  }
`;

function injectStep5Styles() {
  if (document.getElementById(STEP5_STYLE_ID)) return;
  const el = document.createElement('style');
  el.id = STEP5_STYLE_ID;
  el.textContent = step5Styles;
  document.head.appendChild(el);
}

function step5EscapeHtml(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function createStep5Copy(options) {
  injectStep5Styles();
  const opts = options || {};
  const title = opts.title || '';
  const author = opts.author || '';
  const category = opts.category || '';
  const heatLevel = opts.heatLevel || '';
  const description = opts.description || '';
  const seriesStatus = opts.seriesStatus || '';
  const coverMood = opts.coverMood || '';
  const salesIntent = opts.salesIntent || '';
  const layoutRationale = opts.layoutRationale || '';
  const modules = Array.isArray(opts.modules) ? opts.modules : [];

  // Reset persisted state on mount
  window.moduleCopy = null;

  const root = document.createElement('section');
  root.className = 'step5';

  root.innerHTML = `
    <div class="step5__panel">
      <header class="step5__header">
        <p class="step5__eyebrow">Step 5 of 7</p>
        <h2 class="step5__title">Module Copy</h2>
      </header>
      <div class="step5__body">
        <p class="step5__intro">All fields are editable. Click any value to refine the copy before continuing.</p>
        <div class="step5__cards" data-step5-cards></div>
      </div>
    </div>

    <button class="step5__continue" type="button" disabled>Review Image Prompts</button>
  `;

  const cardsContainer = root.querySelector('[data-step5-cards]');
  const continueBtn = root.querySelector('.step5__continue');

  const moduleStates = modules.map((name) => ({
    name: name,
    status: 'loading',
    headline: '',
    body: '',
    designNote: '',
    cardEl: null,
  }));

  function updateCounter(idx, field, length) {
    const max = field === 'headline' ? 50 : 200;
    const card = moduleStates[idx].cardEl;
    if (!card) return;
    const counter = card.querySelector(`[data-counter="${field}"]`);
    if (!counter) return;
    counter.textContent = `${length} / ${max}`;
    counter.classList.toggle('step5__counter--over', length > max);
  }

  function checkContinueState() {
    const allSuccess = moduleStates.length > 0 && moduleStates.every((s) => s.status === 'success');
    continueBtn.disabled = !allSuccess;
  }

  function setCardLoading(idx) {
    const state = moduleStates[idx];
    state.status = 'loading';
    const card = state.cardEl;
    if (!card) return;
    const body = card.querySelector('[data-card-body]');
    body.innerHTML = '';
    const loading = document.createElement('p');
    loading.className = 'step5__card-loading';
    loading.textContent = `Writing copy for ${state.name}.`;
    body.appendChild(loading);
    checkContinueState();
  }

  function setCardError(idx) {
    const state = moduleStates[idx];
    state.status = 'error';
    const card = state.cardEl;
    if (!card) return;
    const body = card.querySelector('[data-card-body]');
    body.innerHTML = '';
    const wrap = document.createElement('div');
    wrap.className = 'step5__card-error';
    const msg = document.createElement('p');
    msg.className = 'step5__card-error-text';
    msg.textContent = `Copy generation failed for ${state.name}. Please retry this module.`;
    const retry = document.createElement('button');
    retry.type = 'button';
    retry.className = 'step5__card-retry';
    retry.textContent = 'Retry';
    retry.addEventListener('click', () => generateModule(idx));
    wrap.appendChild(msg);
    wrap.appendChild(retry);
    body.appendChild(wrap);
    checkContinueState();
  }

  function setCardSuccess(idx, copy) {
    const state = moduleStates[idx];
    state.status = 'success';
    state.headline = (copy && typeof copy.headline === 'string') ? copy.headline : '';
    state.body = (copy && typeof copy.body === 'string') ? copy.body : '';
    state.designNote = (copy && typeof copy.designNote === 'string') ? copy.designNote : '';

    const card = state.cardEl;
    if (!card) return;
    const body = card.querySelector('[data-card-body]');
    body.innerHTML = `
      <div class="step5__field">
        <span class="step5__field-label">Headline</span>
        <div class="step5__field-value step5__field-value--headline" contenteditable="true" spellcheck="true" data-field="headline">${step5EscapeHtml(state.headline)}</div>
        <span class="step5__counter" data-counter="headline">${state.headline.length} / 50</span>
      </div>
      <div class="step5__field">
        <span class="step5__field-label">Body Copy</span>
        <div class="step5__field-value step5__field-value--body" contenteditable="true" spellcheck="true" data-field="body">${step5EscapeHtml(state.body)}</div>
        <span class="step5__counter" data-counter="body">${state.body.length} / 200</span>
      </div>
      <div class="step5__field">
        <span class="step5__field-label">Design Note</span>
        <div class="step5__field-value step5__field-value--designnote" contenteditable="true" spellcheck="true" data-field="designNote">${step5EscapeHtml(state.designNote)}</div>
      </div>
    `;

    if (state.headline.length > 50) updateCounter(idx, 'headline', state.headline.length);
    if (state.body.length > 200) updateCounter(idx, 'body', state.body.length);

    body.querySelectorAll('[contenteditable]').forEach((el) => {
      const field = el.dataset.field;
      el.addEventListener('input', () => {
        const text = el.textContent || '';
        state[field] = text;
        if (field === 'headline' || field === 'body') {
          updateCounter(idx, field, text.length);
        }
      });
      // Force plain-text paste so users can't accidentally introduce styled HTML
      el.addEventListener('paste', (event) => {
        event.preventDefault();
        const text = (event.clipboardData || window.clipboardData).getData('text');
        document.execCommand('insertText', false, text);
      });
    });

    checkContinueState();
  }

  function buildUserPrompt(moduleName) {
    const lines = [];
    lines.push(`You are writing copy for the "${moduleName}" module of an Amazon A+ content layout for the following book.`);
    lines.push('');
    if (title) lines.push(`Book Title: ${title}`);
    if (author) lines.push(`Author Name: ${author}`);
    if (category) lines.push(`Genre Category: ${category}`);
    if (heatLevel) lines.push(`Heat Level: ${heatLevel}`);
    if (description) lines.push(`Book Description: ${description}`);
    if (seriesStatus) lines.push(`Part of a Series: ${seriesStatus}`);
    if (coverMood) lines.push(`Cover Mood: ${coverMood}`);
    if (salesIntent) lines.push(`Selected Layout Sales Intent: ${salesIntent}`);
    if (layoutRationale) lines.push(`Selected Layout Rationale: ${layoutRationale}`);
    lines.push(`Module to Write: ${moduleName}`);
    lines.push('');
    lines.push(
      'Return a JSON object with exactly this structure: { "headline": "module headline, maximum 50 characters", "body": "module body copy, maximum 200 characters", "designNote": "one sentence describing the visual treatment for this module" }'
    );
    return lines.join('\n');
  }

  async function generateModule(idx) {
    setCardLoading(idx);
    try {
      const apiUrl = window.APLUS_API_URL || '/api/generate';
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemPrompt: STEP5_SYSTEM_PROMPT,
          prompt: buildUserPrompt(moduleStates[idx].name),
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data || typeof data.text !== 'string' || !data.text.trim()) {
        console.error(`[step5] module ${idx + 1} non-success`, res.status, data);
        setCardError(idx);
        return;
      }
      const cleaned = data.text
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/```\s*$/i, '')
        .trim();
      let parsed;
      try {
        parsed = JSON.parse(cleaned);
      } catch (parseErr) {
        console.error(`[step5] module ${idx + 1} JSON parse failed`, parseErr, data.text);
        setCardError(idx);
        return;
      }
      if (!parsed || typeof parsed !== 'object') {
        setCardError(idx);
        return;
      }
      setCardSuccess(idx, parsed);
    } catch (err) {
      console.error(`[step5] module ${idx + 1} request failed`, err);
      setCardError(idx);
    }
  }

  // Build the cards (one per module, in order)
  modules.forEach((moduleName, idx) => {
    const card = document.createElement('div');
    card.className = 'step5__card';
    card.dataset.moduleIdx = String(idx);
    card.innerHTML = `
      <header class="step5__card-header">
        <p class="step5__card-eyebrow">Module ${idx + 1} of 5</p>
        <h3 class="step5__card-title">${step5EscapeHtml(moduleName)}</h3>
      </header>
      <div class="step5__card-body" data-card-body></div>
    `;
    moduleStates[idx].cardEl = card;
    cardsContainer.appendChild(card);
    setCardLoading(idx);
  });

  continueBtn.addEventListener('click', () => {
    if (continueBtn.disabled) return;
    const moduleCopy = moduleStates.map((s) => ({
      moduleName: s.name,
      headline: s.headline,
      body: s.body,
      designNote: s.designNote,
    }));
    window.moduleCopy = moduleCopy;
    document.dispatchEvent(new CustomEvent('step5-complete', { detail: moduleCopy }));
  });

  // Fire all 5 calls in parallel
  Promise.all(modules.map((_, idx) => generateModule(idx)));

  return root;
}
