const STEP4_STYLE_ID = 'step4-layout-styles';

const STEP4_SYSTEM_PROMPT =
  'You are an Amazon A+ content layout strategist. You specialize in recommending specific module stacks for book detail pages. You always return valid JSON only with no markdown and no commentary.';

const step4Styles = `
  .step4 {
    max-width: 720px;
    margin: 0 auto 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    font-family: 'Work Sans', system-ui, sans-serif;
  }
  .step4__panel {
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 12px 36px rgba(71, 16, 30, 0.14);
    background: var(--v-surface);
    border: 1px solid var(--v-soft);
  }
  .step4__header {
    background:
      radial-gradient(circle at 70% 10%, rgba(255, 255, 255, 0.12), transparent 18rem),
      linear-gradient(145deg, #8f1b3f, #5c1428 72%);
    color: var(--v-text);
    padding: 1.5rem 2.25rem 1.25rem;
  }
  .step4__eyebrow {
    margin: 0 0 0.4rem;
    font-family: 'Instrument Serif', Georgia, serif;
    font-size: 1rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    opacity: 0.85;
    color: #fff7ea;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  }
  .step4__title {
    margin: 0;
    font-family: 'Instrument Serif', Georgia, serif;
    font-weight: 400;
    font-size: 1.85rem;
    letter-spacing: 0.08em;
    line-height: 1.15;
    color: #fff7ea;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  }
  .step4__body {
    padding: 1.75rem 2.25rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .step4__loading {
    margin: 0;
    font-style: italic;
    color: #7a3a47;
    font-size: 1rem;
    line-height: 1.55;
  }
  .step4__error {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
    align-items: flex-start;
  }
  .step4__error-text {
    margin: 0;
    color: var(--v-bg);
    font-size: 1rem;
    line-height: 1.55;
  }
  .step4__retry {
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
  .step4__retry:hover { filter: brightness(1.1); }
  .step4__options {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .step4__option-card {
    background: var(--v-surface);
    border: 2px solid var(--v-soft);
    border-radius: 12px;
    padding: 1.25rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
  }
  .step4__option-card--selected {
    border-color: var(--v-accent);
    box-shadow: 0 6px 18px rgba(243, 198, 91, 0.18);
  }
  .step4__option-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
  }
  .step4__option-label {
    margin: 0;
    font-family: 'Instrument Serif', Georgia, serif;
    font-weight: 400;
    font-size: 1.65rem;
    color: var(--v-bg);
    line-height: 1.1;
  }
  .step4__option-pill {
    display: inline-block;
    background: var(--v-accent);
    color: var(--v-button-text);
    font-weight: 600;
    font-size: 0.78rem;
    padding: 0.3rem 0.7rem;
    border-radius: 999px;
    letter-spacing: 0.02em;
  }
  .step4__option-modules {
    margin: 0;
    padding-left: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    color: #4a3728;
    font-size: 0.95rem;
    line-height: 1.4;
  }
  .step4__option-modules li::marker {
    color: var(--v-bg);
    font-weight: 600;
  }
  .step4__option-rationale {
    margin: 0;
    font-style: italic;
    color: #7a3a47;
    font-size: 0.9rem;
    line-height: 1.5;
  }
  .step4__option-select {
    align-self: flex-start;
    background: var(--v-soft);
    color: var(--v-bg);
    border: none;
    border-radius: 999px;
    padding: 0.6rem 1.3rem;
    font-family: 'Work Sans', system-ui, sans-serif;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
  }
  .step4__option-select:hover { filter: brightness(0.98); }
  .step4__option-select--selected {
    background: var(--v-accent);
    color: var(--v-button-text);
    cursor: default;
  }
  .step4__continue {
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
  .step4__continue:hover:not(:disabled) { filter: brightness(0.96); }
  .step4__continue:disabled {
    background: var(--v-soft);
    color: var(--v-bg);
    opacity: 0.7;
    cursor: not-allowed;
  }
  .step4__continue:focus-visible {
    outline: 2px solid var(--v-bg);
    outline-offset: 3px;
  }
`;

function injectStep4Styles() {
  if (document.getElementById(STEP4_STYLE_ID)) return;
  const el = document.createElement('style');
  el.id = STEP4_STYLE_ID;
  el.textContent = step4Styles;
  document.head.appendChild(el);
}

function step4EscapeHtml(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function createStep4Layout(options) {
  injectStep4Styles();
  const opts = options || {};
  const title = opts.title || '';
  const category = opts.category || '';
  const salesIntent = opts.salesIntent || '';
  const strategyBrief = opts.strategyBrief || '';

  // Reset selection on mount
  window.selectedLayout = null;

  const root = document.createElement('section');
  root.className = 'step4';

  root.innerHTML = `
    <div class="step4__panel">
      <header class="step4__header">
        <p class="step4__eyebrow">Step 4 of 7</p>
        <h2 class="step4__title">Layout Options</h2>
      </header>
      <div class="step4__body">
        <div class="step4__options" data-step4-options></div>
      </div>
    </div>

    <button class="step4__continue" type="button" disabled>Confirm Layout and Write Copy</button>
  `;

  const optionsContainer = root.querySelector('[data-step4-options]');
  const continueBtn = root.querySelector('.step4__continue');

  function setLoading() {
    optionsContainer.innerHTML = '';
    const el = document.createElement('p');
    el.className = 'step4__loading';
    el.textContent = 'Building your layout options.';
    optionsContainer.appendChild(el);
  }

  function setError() {
    optionsContainer.innerHTML = '';
    const wrap = document.createElement('div');
    wrap.className = 'step4__error';
    const msg = document.createElement('p');
    msg.className = 'step4__error-text';
    msg.textContent = 'Layout generation failed. Please try again.';
    const retry = document.createElement('button');
    retry.type = 'button';
    retry.className = 'step4__retry';
    retry.textContent = 'Retry';
    retry.addEventListener('click', runGenerate);
    wrap.appendChild(msg);
    wrap.appendChild(retry);
    optionsContainer.appendChild(wrap);
  }

  function selectLayout(layout, card, btn) {
    optionsContainer.querySelectorAll('.step4__option-card').forEach((c) => {
      c.classList.remove('step4__option-card--selected');
    });
    optionsContainer.querySelectorAll('.step4__option-select').forEach((b) => {
      b.classList.remove('step4__option-select--selected');
      b.textContent = 'Select This Layout';
    });

    card.classList.add('step4__option-card--selected');
    btn.classList.add('step4__option-select--selected');
    btn.textContent = 'Selected';

    window.selectedLayout = layout;
    continueBtn.disabled = false;
  }

  function renderLayouts(layouts) {
    optionsContainer.innerHTML = '';
    layouts.forEach((layout, idx) => {
      const fallbackLabel = 'Option ' + String.fromCharCode(65 + idx);
      const label = layout && layout.label ? layout.label : fallbackLabel;
      const intent = layout && layout.salesIntent ? layout.salesIntent : '';
      const modules = layout && Array.isArray(layout.modules) ? layout.modules : [];
      const rationale = layout && layout.rationale ? layout.rationale : '';

      const card = document.createElement('div');
      card.className = 'step4__option-card';
      card.innerHTML = `
        <div class="step4__option-header">
          <h3 class="step4__option-label">${step4EscapeHtml(label)}</h3>
          ${intent ? `<span class="step4__option-pill">${step4EscapeHtml(intent)}</span>` : ''}
        </div>
        <ol class="step4__option-modules">
          ${modules.map((m) => `<li>${step4EscapeHtml(m)}</li>`).join('')}
        </ol>
        ${rationale ? `<p class="step4__option-rationale">${step4EscapeHtml(rationale)}</p>` : ''}
        <button type="button" class="step4__option-select">Select This Layout</button>
      `;

      const selectBtn = card.querySelector('.step4__option-select');
      selectBtn.addEventListener('click', () => selectLayout(layout, card, selectBtn));

      optionsContainer.appendChild(card);
    });
  }

  function buildUserPrompt() {
    const lines = [];
    lines.push('You are recommending Amazon A+ content layout options for the following book.');
    lines.push('');
    if (title) lines.push(`Book Title: ${title}`);
    if (category) lines.push(`Genre Category: ${category}`);
    if (salesIntent) lines.push(`Primary Sales Intent: ${salesIntent}`);
    if (strategyBrief) {
      lines.push('');
      lines.push('Strategy Brief from Step 3:');
      lines.push(strategyBrief);
    }
    lines.push('');
    lines.push(
      'Return a JSON object with exactly this structure: { "layouts": [ { "label": "layout name", "salesIntent": "one of the 9 sales intent values", "modules": ["Module 1 name", "Module 2 name", "Module 3 name", "Module 4 name", "Module 5 name"], "rationale": "one sentence explaining why this layout was chosen" }, ... ] } Return exactly 3 layout objects. Each layout must have a different sales intent and a different module stack. Label them Option A, Option B, and Option C.'
    );
    return lines.join('\n');
  }

  async function runGenerate() {
    setLoading();
    continueBtn.disabled = true;
    window.selectedLayout = null;
    try {
      const apiUrl = window.APLUS_API_URL || '/api/generate';
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemPrompt: STEP4_SYSTEM_PROMPT,
          prompt: buildUserPrompt(),
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data || typeof data.text !== 'string' || !data.text.trim()) {
        console.error('[step4] generate non-success', res.status, data);
        setError();
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
        console.error('[step4] JSON parse failed:', parseErr, data.text);
        setError();
        return;
      }
      if (!parsed || !Array.isArray(parsed.layouts) || parsed.layouts.length === 0) {
        console.error('[step4] response missing layouts array', parsed);
        setError();
        return;
      }
      renderLayouts(parsed.layouts);
    } catch (err) {
      console.error('[step4] request failed:', err);
      setError();
    }
  }

  continueBtn.addEventListener('click', () => {
    if (continueBtn.disabled) return;
    document.dispatchEvent(new CustomEvent('step4-complete', {
      detail: window.selectedLayout || null,
    }));
  });

  runGenerate();

  return root;
}
