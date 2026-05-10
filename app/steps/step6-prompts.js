const STEP6_STYLE_ID = 'step6-prompts-styles';

const STEP6_SYSTEM_PROMPT =
  'You are an expert AI image prompt engineer specializing in book marketing visuals. You use a strict 12-layer framework to build precise, detailed image prompts for Amazon A+ content modules. You always return valid JSON only with no markdown and no commentary. Your prompts are always specific to the book provided, never generic. You prioritize realistic human portraiture quality for all human subjects regardless of ethnicity, age, or gender. Always represent the subject\'s described ethnicity, age, and appearance accurately and with dignity. Skin texture, natural features, realistic expression, and authentic representation are never optional. When no character description is provided default to generic lifestyle imagery appropriate for the book genre. You always include a detailed exclusion layer. You never include camera movement terms such as dolly, pan, tracking shot, or orbit in image prompts — those belong in video prompts only. You know these 8 style modes and their traits: Photorealistic — natural light, real skin texture, believable environment; Cinematic — dramatic lighting, color grade, film grain, shallow depth of field; Editorial — bold composition, intentional styling, high-contrast directional light; Natural Lifestyle — available natural light, candid framing, warm color grade; Watercolor — bleeding edges, paper texture, airy feel; Digital Illustration — smooth lines, precise marks; 3D Render — material descriptors, global illumination, clean geometry; Cartoon — bold outlines, simplified shapes, cel shading. When the subject is human always include advanced detail layers for hair texture and color, eye shape and color, eyebrow shape, skin tone and undertones, visible skin texture such as pores and natural variation, and posture.';

const STEP6_LAYER_ORDER = [
  ['styleMode', 'Image Type & Style Mode'],
  ['subject', 'Subject'],
  ['ageRole', 'Age & Role'],
  ['coreAppearance', 'Core Appearance'],
  ['textureRealism', 'Texture & Realism'],
  ['styling', 'Styling'],
  ['expressionMood', 'Expression & Mood'],
  ['environment', 'Environment & Background'],
  ['composition', 'Composition & Framing'],
  ['cameraLens', 'Camera & Lens'],
  ['lighting', 'Lighting'],
  ['finishExclusions', 'Finish & Exclusions'],
];

const STEP6_CATEGORY_RULES = {
  'Clean / Sweet Romance':
    'Warm lighting, soft emotional atmosphere, clean romance-safe imagery only, no suggestive poses, no sensual body language, cozy hopeful or elegant design cues.',
  'Romantic Suspense':
    'Moody but clean, subtle danger cues, no weapons unless appropriate, no horror imagery, cinematic shadows acceptable.',
  'Cozy Mystery':
    'Warm small-town aesthetic, charming objects (teacups, books, cats, baked goods), no gore, no crime-scene imagery.',
  'Journals':
    'Clean lifestyle design, show use not just the object, no fake interior pages unless provided.',
  'Nonfiction Short Reads':
    'Professional clean practical, avoid fake data dashboards, avoid exaggerated transformation imagery.',
  'Workbooks':
    'Practical and clean, show desk use and checklists, real pages or clearly generic non-readable mockups only.',
  "Children's Books":
    'Age-appropriate bright warm playful, consistent with book illustration style, no scary visuals.',
};

const step6Styles = `
  .step6 {
    max-width: 760px;
    margin: 0 auto 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    font-family: 'Work Sans', system-ui, sans-serif;
  }
  .step6__panel {
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 12px 36px rgba(71, 16, 30, 0.14);
    background: var(--v-surface);
    border: 1px solid var(--v-soft);
  }
  .step6__header {
    background:
      radial-gradient(circle at 70% 10%, rgba(255, 255, 255, 0.12), transparent 18rem),
      linear-gradient(145deg, #8f1b3f, #5c1428 72%);
    color: var(--v-text);
    padding: 1.5rem 2.25rem 1.25rem;
  }
  .step6__eyebrow {
    margin: 0 0 0.4rem;
    font-family: 'Instrument Serif', Georgia, serif;
    font-size: 1rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    opacity: 0.85;
    color: #fff7ea;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  }
  .step6__title {
    margin: 0;
    font-family: 'Instrument Serif', Georgia, serif;
    font-weight: 400;
    font-size: 1.85rem;
    letter-spacing: 0.08em;
    line-height: 1.15;
    color: #fff7ea;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  }
  .step6__body {
    padding: 1.75rem 2.25rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .step6__intro {
    margin: 0 0 0.5rem;
    font-style: italic;
    color: #7a3a47;
    font-size: 0.9rem;
    line-height: 1.5;
  }
  .step6__cards {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
  .step6__card {
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid var(--v-soft);
    background: var(--v-surface);
  }
  .step6__card-header {
    background:
      radial-gradient(circle at 70% 10%, rgba(255, 255, 255, 0.10), transparent 14rem),
      linear-gradient(145deg, #8f1b3f, #5c1428 72%);
    color: var(--v-text);
    padding: 1rem 1.5rem 0.85rem;
    display: flex;
    align-items: center;
    gap: 0.85rem;
  }
  .step6__card-header-text {
    flex: 1;
    min-width: 0;
  }
  .step6__card-checkmark,
  .step6__card-copy,
  .step6__card-chevron {
    display: none;
  }
  .step6__card--ready .step6__card-header {
    cursor: pointer;
  }
  .step6__card--ready .step6__card-checkmark {
    display: inline-block;
    color: var(--v-accent);
    font-size: 1.2rem;
    line-height: 1;
  }
  .step6__card--ready .step6__card-copy {
    display: inline-flex;
    background: var(--v-accent);
    color: var(--v-button-text);
    border: none;
    border-radius: 999px;
    padding: 0.4rem 0.9rem;
    font-family: 'Work Sans', system-ui, sans-serif;
    font-weight: 600;
    font-size: 0.78rem;
    cursor: pointer;
  }
  .step6__card--ready .step6__card-copy:hover { filter: brightness(0.96); }
  .step6__card--ready .step6__card-copy.step6__copy-btn--copied {
    background: var(--v-accent-2);
  }
  .step6__card--ready .step6__card-chevron {
    display: inline-block;
    color: var(--v-accent);
    font-size: 1rem;
    line-height: 1;
    transition: transform 0.2s;
  }
  .step6__card--ready .step6__card-chevron.expanded {
    transform: rotate(180deg);
  }
  .step6__card-body.step6__card-body--collapsed { display: none; }
  .step6__all-ready {
    margin: 0 0 0.5rem;
    background: var(--v-surface);
    color: var(--v-bg);
    font-weight: 700;
    font-size: 1rem;
    line-height: 1.5;
    padding: 1rem 1.25rem;
    border-left: 4px solid var(--v-accent);
    border-radius: 8px;
  }
  .step6__card-eyebrow {
    margin: 0 0 0.3rem;
    font-family: 'Instrument Serif', Georgia, serif;
    font-size: 0.85rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    opacity: 0.85;
    color: #fff7ea;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  }
  .step6__card-title {
    margin: 0;
    font-family: 'Instrument Serif', Georgia, serif;
    font-weight: 400;
    font-size: 1.4rem;
    letter-spacing: 0.06em;
    line-height: 1.2;
    color: #fff7ea;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  }
  .step6__card-body {
    padding: 1.25rem 1.5rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .step6__card-loading {
    margin: 0;
    font-style: italic;
    color: #7a3a47;
    font-size: 0.95rem;
    line-height: 1.5;
  }
  .step6__card-error {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    align-items: flex-start;
  }
  .step6__card-error-text {
    margin: 0;
    color: var(--v-bg);
    font-size: 0.95rem;
    line-height: 1.5;
  }
  .step6__card-retry {
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
  .step6__card-retry:hover { filter: brightness(1.1); }
  .step6__section {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .step6__section-title {
    margin: 0;
    color: var(--v-bg);
    font-weight: 700;
    font-size: 0.85rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  .step6__layer-list {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    border: 1px solid var(--v-soft);
    border-radius: 8px;
    background: #ffffff;
    overflow: hidden;
  }
  .step6__layer-row {
    display: grid;
    grid-template-columns: 180px 1fr;
    align-items: stretch;
    gap: 0;
    border-bottom: 1px solid var(--v-soft);
  }
  .step6__layer-row:last-child { border-bottom: none; }
  .step6__layer-label {
    margin: 0;
    color: var(--v-bg);
    font-weight: 700;
    font-size: 0.78rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 0.65rem 0.85rem;
    background: var(--v-surface);
    border-right: 1px solid var(--v-soft);
    align-self: stretch;
  }
  .step6__layer-value {
    margin: 0;
    color: var(--v-bg);
    font-size: 0.95rem;
    line-height: 1.5;
    padding: 0.65rem 0.85rem;
    outline: none;
  }
  .step6__layer-value:focus {
    background: rgba(243, 198, 91, 0.08);
    box-shadow: inset 0 0 0 2px var(--v-accent);
  }
  .step6__full-prompt {
    width: 100%;
    box-sizing: border-box;
    background: var(--v-surface);
    color: var(--v-bg);
    border: 1px solid var(--v-soft);
    border-radius: 8px;
    padding: 0.85rem 1rem;
    font-family: 'Work Sans', system-ui, sans-serif;
    font-size: 1rem;
    line-height: 1.7;
    min-height: 8rem;
    resize: vertical;
    outline: none;
  }
  .step6__full-prompt:focus { border-color: var(--v-bg); box-shadow: 0 0 0 2px rgba(243, 198, 91, 0.35); }
  .step6__alt-text {
    width: 100%;
    box-sizing: border-box;
    background: #ffffff;
    color: var(--v-bg);
    border: 1px solid var(--v-soft);
    border-radius: 8px;
    padding: 0.7rem 0.9rem;
    font-family: 'Work Sans', system-ui, sans-serif;
    font-size: 1rem;
    line-height: 1.55;
    min-height: 3.5rem;
    resize: vertical;
    outline: none;
  }
  .step6__alt-text:focus { border-color: var(--v-bg); box-shadow: 0 0 0 2px rgba(243, 198, 91, 0.35); }
  .step6__copy-btn {
    align-self: flex-start;
    background: var(--v-accent);
    color: var(--v-button-text);
    border: none;
    border-radius: 999px;
    padding: 0.5rem 1.1rem;
    font-family: 'Work Sans', system-ui, sans-serif;
    font-weight: 600;
    font-size: 0.85rem;
    cursor: pointer;
  }
  .step6__copy-btn:hover { filter: brightness(0.96); }
  .step6__copy-btn--copied { background: var(--v-accent-2); }
  .step6__full-prompt-actions {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    align-items: center;
  }
  .step6__rebuild-btn {
    background: var(--v-bg);
    color: var(--v-text);
    border: none;
    border-radius: 999px;
    padding: 0.5rem 1.1rem;
    font-family: 'Work Sans', system-ui, sans-serif;
    font-weight: 600;
    font-size: 0.85rem;
    cursor: pointer;
  }
  .step6__rebuild-btn:hover { filter: brightness(1.1); }
  .step6__rebuild-btn:focus-visible {
    outline: 2px solid var(--v-accent);
    outline-offset: 2px;
  }
  .step6__canva-notes {
    margin: 0;
    font-style: italic;
    color: #7a3a47;
    font-size: 0.95rem;
    line-height: 1.55;
    background: var(--v-surface);
    border-left: 4px solid var(--v-accent);
    border-radius: 8px;
    padding: 0.75rem 1rem;
  }
  .step6__continue {
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
  .step6__continue:hover:not(:disabled) { filter: brightness(0.96); }
  .step6__continue:disabled {
    background: var(--v-soft);
    color: var(--v-bg);
    opacity: 0.7;
    cursor: not-allowed;
  }
  .step6__continue:focus-visible {
    outline: 2px solid var(--v-bg);
    outline-offset: 3px;
  }
`;

function injectStep6Styles() {
  if (document.getElementById(STEP6_STYLE_ID)) return;
  const el = document.createElement('style');
  el.id = STEP6_STYLE_ID;
  el.textContent = step6Styles;
  document.head.appendChild(el);
}

function step6EscapeHtml(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function step6StripFences(text) {
  return String(text || '')
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```\s*$/i, '')
    .trim();
}

async function step6CopyToClipboard(text, btn) {
  try {
    await navigator.clipboard.writeText(text);
    if (btn) {
      const original = btn.textContent;
      btn.textContent = 'Copied!';
      btn.classList.add('step6__copy-btn--copied');
      setTimeout(() => {
        btn.textContent = original;
        btn.classList.remove('step6__copy-btn--copied');
      }, 1500);
    }
  } catch (err) {
    console.error('[step6] clipboard copy failed:', err);
  }
}

function createStep6Prompts(options) {
  injectStep6Styles();
  const opts = options || {};
  const title = opts.title || '';
  const author = opts.author || '';
  const category = opts.category || '';
  const heatLevel = opts.heatLevel || '';
  const salesIntent = opts.salesIntent || '';
  const characterDescription = opts.characterDescription || '';
  const coverBrief = opts.coverBrief || null;
  const moduleCopyArr = Array.isArray(opts.moduleCopy) ? opts.moduleCopy : [];

  window.imagePrompts = null;

  const root = document.createElement('section');
  root.className = 'step6';

  root.innerHTML = `
    <div class="step6__panel">
      <header class="step6__header">
        <p class="step6__eyebrow">Step 6 of 7</p>
        <h2 class="step6__title">Image Prompts</h2>
      </header>
      <div class="step6__body">
        <p class="step6__intro">A full 12-layer prompt for each module. Edit any field — the Complete Image Prompt textarea is what you paste into your image generation tool.</p>
        <div class="step6__cards" data-step6-cards></div>
      </div>
    </div>

    <div class="step6__all-ready" data-all-ready hidden>All 5 module image prompts are ready. Review and edit any module by expanding it above.</div>

    <button class="step6__continue" type="button" disabled>Run Compliance Check</button>
  `;

  const cardsContainer = root.querySelector('[data-step6-cards]');
  const continueBtn = root.querySelector('.step6__continue');

  const moduleStates = moduleCopyArr.map((mc, idx) => {
    const state = {
      moduleName: (mc && mc.moduleName) || `Module ${idx + 1}`,
      status: 'loading',
      headline: (mc && mc.headline) || '',
      body: (mc && mc.body) || '',
      designNote: (mc && mc.designNote) || '',
      altText: '',
      fullPrompt: '',
      cardEl: null,
    };
    STEP6_LAYER_ORDER.forEach(([key]) => { state[key] = ''; });
    return state;
  });

  function checkContinueState() {
    const allSuccess = moduleStates.length > 0 && moduleStates.every((s) => s.status === 'success');
    continueBtn.disabled = !allSuccess;
    const allReadyPanel = root.querySelector('[data-all-ready]');
    if (allReadyPanel) allReadyPanel.hidden = !allSuccess;
  }

  function setCardLoading(idx) {
    const state = moduleStates[idx];
    state.status = 'loading';
    const card = state.cardEl;
    if (!card) return;
    card.classList.remove('step6__card--ready');
    const body = card.querySelector('[data-card-body]');
    body.classList.remove('step6__card-body--collapsed');
    body.innerHTML = '';
    const loading = document.createElement('p');
    loading.className = 'step6__card-loading';
    loading.textContent = `Generating image prompt for ${state.moduleName}.`;
    body.appendChild(loading);
    checkContinueState();
  }

  function setCardError(idx) {
    const state = moduleStates[idx];
    state.status = 'error';
    const card = state.cardEl;
    if (!card) return;
    card.classList.remove('step6__card--ready');
    const body = card.querySelector('[data-card-body]');
    body.classList.remove('step6__card-body--collapsed');
    body.innerHTML = '';
    const wrap = document.createElement('div');
    wrap.className = 'step6__card-error';
    const msg = document.createElement('p');
    msg.className = 'step6__card-error-text';
    msg.textContent = `Image prompt generation failed for ${state.moduleName}. Please retry this module.`;
    const retry = document.createElement('button');
    retry.type = 'button';
    retry.className = 'step6__card-retry';
    retry.textContent = 'Retry';
    retry.addEventListener('click', () => generatePrompt(idx));
    wrap.appendChild(msg);
    wrap.appendChild(retry);
    body.appendChild(wrap);
    checkContinueState();
  }

  function setCardSuccess(idx, parsed) {
    const state = moduleStates[idx];
    state.status = 'success';
    STEP6_LAYER_ORDER.forEach(([key]) => {
      state[key] = (parsed && typeof parsed[key] === 'string') ? parsed[key] : '';
    });
    state.altText = (parsed && typeof parsed.altText === 'string') ? parsed.altText : '';
    state.fullPrompt = (parsed && typeof parsed.fullPrompt === 'string') ? parsed.fullPrompt : '';

    const card = state.cardEl;
    if (!card) return;
    const body = card.querySelector('[data-card-body]');

    const layerRows = STEP6_LAYER_ORDER.map(([key, label]) => `
      <div class="step6__layer-row">
        <dt class="step6__layer-label">${step6EscapeHtml(label)}</dt>
        <dd class="step6__layer-value" contenteditable="true" spellcheck="true" data-layer="${key}">${step6EscapeHtml(state[key])}</dd>
      </div>
    `).join('');

    body.innerHTML = `
      <section class="step6__section">
        <h4 class="step6__section-title">Prompt Layers</h4>
        <dl class="step6__layer-list">
          ${layerRows}
          <div class="step6__layer-row">
            <dt class="step6__layer-label">Alt Text</dt>
            <dd class="step6__layer-value" contenteditable="true" spellcheck="true" data-layer="altText">${step6EscapeHtml(state.altText)}</dd>
          </div>
        </dl>
      </section>

      <section class="step6__section">
        <label class="step6__section-title">Complete Image Prompt — Copy and paste this into your image generation tool</label>
        <textarea class="step6__full-prompt" data-layer="fullPrompt" spellcheck="true">${step6EscapeHtml(state.fullPrompt)}</textarea>
        <div class="step6__full-prompt-actions">
          <button type="button" class="step6__rebuild-btn" data-rebuild>Re-assemble from Layers</button>
          <button type="button" class="step6__copy-btn" data-copy="fullPrompt">Copy to Clipboard</button>
        </div>
      </section>

      <section class="step6__section">
        <label class="step6__section-title">Alt Text — Required for Amazon A+ submission</label>
        <textarea class="step6__alt-text" data-layer="altText" spellcheck="true">${step6EscapeHtml(state.altText)}</textarea>
        <button type="button" class="step6__copy-btn" data-copy="altText">Copy to Clipboard</button>
      </section>

      <section class="step6__section">
        <h4 class="step6__section-title">Designer Notes</h4>
        <p class="step6__canva-notes">${step6EscapeHtml(state.designNote || 'No design note recorded for this module.')}</p>
      </section>
    `;

    // Wire all editable fields to the state object.
    const altElements = body.querySelectorAll('[data-layer="altText"]');

    body.querySelectorAll('[data-layer]').forEach((el) => {
      const key = el.dataset.layer;
      const isTextarea = el.tagName === 'TEXTAREA';
      el.addEventListener('input', () => {
        const value = isTextarea ? el.value : (el.textContent || '');
        state[key] = value;
        // Keep both altText surfaces (Section A row + Section C textarea) in sync.
        if (key === 'altText') {
          altElements.forEach((other) => {
            if (other === el) return;
            const otherIsTextarea = other.tagName === 'TEXTAREA';
            const otherValue = otherIsTextarea ? other.value : (other.textContent || '');
            if (otherValue === value) return;
            if (otherIsTextarea) other.value = value;
            else other.textContent = value;
          });
        }
      });
      if (!isTextarea) {
        el.addEventListener('paste', (event) => {
          event.preventDefault();
          const text = (event.clipboardData || window.clipboardData).getData('text');
          document.execCommand('insertText', false, text);
        });
      }
    });

    // Wire copy buttons
    body.querySelectorAll('[data-copy]').forEach((btn) => {
      const key = btn.dataset.copy;
      btn.addEventListener('click', () => {
        step6CopyToClipboard(state[key] || '', btn);
      });
    });

    // Wire the Re-assemble from Layers button
    const rebuildBtn = body.querySelector('[data-rebuild]');
    if (rebuildBtn) {
      rebuildBtn.addEventListener('click', () => rebuildFullPromptFromLayers(idx));
    }

    // Mark the card as ready and collapse it; the header click handler
    // (wired in the card-creation loop) toggles the body open/closed.
    card.classList.add('step6__card--ready');
    body.classList.add('step6__card-body--collapsed');
    const headerChevron = card.querySelector('.step6__card-chevron');
    if (headerChevron) headerChevron.classList.remove('expanded');

    checkContinueState();
  }

  function rebuildFullPromptFromLayers(idx) {
    const state = moduleStates[idx];
    const card = state.cardEl;
    if (!card) return;
    const parts = STEP6_LAYER_ORDER.map(([key]) => {
      const el = card.querySelector('.step6__layer-value[data-layer="' + key + '"]');
      const value = el ? (el.textContent || '').trim() : '';
      // Keep state in sync with whatever the user has in the layer rows right now
      state[key] = value;
      return value;
    }).filter((v) => v.length > 0);
    const assembled = parts.join(' ');
    state.fullPrompt = assembled;
    const textarea = card.querySelector('[data-layer="fullPrompt"]');
    if (textarea) textarea.value = assembled;
  }

  function buildUserPrompt(idx) {
    const state = moduleStates[idx];
    const lines = [];
    lines.push(`You are generating an image prompt for the "${state.moduleName}" module of an Amazon A+ content layout for the following book.`);
    lines.push('');
    if (title) lines.push(`Book Title: ${title}`);
    if (author) lines.push(`Author Name: ${author}`);
    if (category) lines.push(`Genre Category: ${category}`);
    if (heatLevel) lines.push(`Heat Level: ${heatLevel}`);
    if (salesIntent) lines.push(`Sales Intent: ${salesIntent}`);
    if (characterDescription) lines.push(`Main Character Description: ${characterDescription}`);
    lines.push(`Module Name: ${state.moduleName}`);
    if (state.headline) lines.push(`Module Headline: ${state.headline}`);
    if (state.body) lines.push(`Module Body Copy: ${state.body}`);

    if (coverBrief) {
      if (coverBrief.dominantColor) lines.push(`Cover Dominant Color: ${coverBrief.dominantColor}`);
      if (coverBrief.moodDescriptor) lines.push(`Cover Mood: ${coverBrief.moodDescriptor}`);
      if (coverBrief.imageryStyle) lines.push(`Cover Imagery Style: ${coverBrief.imageryStyle}`);
      if (coverBrief.settingCue) lines.push(`Cover Setting Cue: ${coverBrief.settingCue}`);
      if (coverBrief.backgroundTone) lines.push(`Cover Background Tone: ${coverBrief.backgroundTone}`);
    }

    const categoryRules = STEP6_CATEGORY_RULES[category];
    if (categoryRules) {
      lines.push('');
      lines.push(`Category-Specific Image Rules: ${categoryRules}`);
    }

    if (coverBrief) {
      lines.push('');
      lines.push(
        'Pre-populate the styleMode layer using the cover imagery style. Pre-populate the environment layer using the cover setting cue and dominant color as environment tone. Pre-populate the expressionMood layer using the cover mood descriptor. Pre-populate the lighting layer based on cover background tone — dark cover means low-key dramatic lighting, light cover means soft diffused lighting.'
      );
    }

    lines.push('');
    lines.push(
      'Using the 12-layer framework generate a complete image prompt for this A+ module. Return a JSON object with exactly this structure: { "styleMode": "image type and style mode", "subject": "who or what is in the image", "ageRole": "age and role if human subject", "coreAppearance": "physical description for human subjects including skin tone hair and facial features", "textureRealism": "texture and realism details including skin texture for human subjects", "styling": "wardrobe hair jewelry accessories", "expressionMood": "expression and emotional presence", "environment": "setting and background using cover-derived cues if available", "composition": "framing and shot type", "cameraLens": "camera and lens language — no movement terms", "lighting": "lighting description using cover-derived tone if available", "finishExclusions": "finish quality and minimum 4 things to avoid", "altText": "a plain descriptive sentence for screen readers describing what is in the image", "fullPrompt": "the complete assembled prompt as a single paragraph combining all 12 layers in order followed by the exclusions" }'
    );

    return lines.join('\n');
  }

  function setCardRateLimit(idx) {
    const state = moduleStates[idx];
    const card = state.cardEl;
    if (!card) return;
    card.classList.remove('step6__card--ready');
    const body = card.querySelector('[data-card-body]');
    body.classList.remove('step6__card-body--collapsed');
    body.innerHTML = '';
    const msg = document.createElement('p');
    msg.className = 'step6__card-loading';
    msg.textContent = 'Rate limit reached. Retrying in 5 seconds.';
    body.appendChild(msg);
  }

  async function generatePrompt(idx) {
    setCardLoading(idx);
    const apiUrl = window.APLUS_API_URL || '/api/generate';
    const requestBody = JSON.stringify({
      systemPrompt: STEP6_SYSTEM_PROMPT,
      prompt: buildUserPrompt(idx),
    });
    const MAX_429_RETRIES = 3;
    const RETRY_WAIT_MS = 5000;

    try {
      let res;
      let retries = 0;
      while (true) {
        res = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: requestBody,
        });
        if (res.status === 429 && retries < MAX_429_RETRIES) {
          retries++;
          console.warn(`[step6] module ${idx + 1} hit 429, retry ${retries}/${MAX_429_RETRIES} in ${RETRY_WAIT_MS}ms`);
          setCardRateLimit(idx);
          await new Promise((resolve) => setTimeout(resolve, RETRY_WAIT_MS));
          continue;
        }
        break;
      }

      const data = await res.json().catch(() => null);
      if (!res.ok || !data || typeof data.text !== 'string' || !data.text.trim()) {
        console.error(`[step6] module ${idx + 1} non-success`, res.status, data);
        setCardError(idx);
        return;
      }
      const cleaned = step6StripFences(data.text);
      let parsed;
      try {
        parsed = JSON.parse(cleaned);
      } catch (parseErr) {
        console.error(`[step6] module ${idx + 1} JSON parse failed`, parseErr, data.text);
        setCardError(idx);
        return;
      }
      if (!parsed || typeof parsed !== 'object') {
        setCardError(idx);
        return;
      }
      setCardSuccess(idx, parsed);
    } catch (err) {
      console.error(`[step6] module ${idx + 1} request failed`, err);
      setCardError(idx);
    }
  }

  // Build the cards (one per module, in order). Click wiring lives on the
  // persistent cardsContainer (event delegation) so it is unaffected by
  // body.innerHTML rewrites during loading/success/error/rate-limit
  // transitions and by any timing of when each card lands in the DOM.
  moduleStates.forEach((state, idx) => {
    const card = document.createElement('div');
    card.className = 'step6__card';
    card.dataset.moduleIdx = String(idx);
    card.innerHTML = `
      <header class="step6__card-header" data-card-header>
        <span class="step6__card-checkmark" aria-hidden="true">&#10003;</span>
        <div class="step6__card-header-text">
          <p class="step6__card-eyebrow">Module ${idx + 1} of 5</p>
          <h3 class="step6__card-title">${step6EscapeHtml(state.moduleName)}</h3>
        </div>
        <button type="button" class="step6__card-copy" data-card-copy aria-label="Copy full prompt to clipboard">Copy Full Prompt</button>
        <span class="step6__card-chevron" aria-hidden="true">&#9660;</span>
      </header>
      <div class="step6__card-body" data-card-body></div>
    `;
    state.cardEl = card;
    cardsContainer.appendChild(card);
    setCardLoading(idx);
  });

  // Single delegated click handler on the persistent cards container.
  // Copy-button clicks short-circuit the toggle path; header clicks (anywhere
  // in the header except the Copy button) toggle the body collapse + chevron.
  cardsContainer.addEventListener('click', function (event) {
    const copyBtn = event.target.closest('[data-card-copy]');
    if (copyBtn) {
      const copyCard = copyBtn.closest('.step6__card');
      if (!copyCard || !copyCard.classList.contains('step6__card--ready')) return;
      const copyIdx = parseInt(copyCard.dataset.moduleIdx, 10);
      if (Number.isNaN(copyIdx)) return;
      const copyState = moduleStates[copyIdx];
      step6CopyToClipboard((copyState && copyState.fullPrompt) || '', copyBtn);
      return;
    }

    const header = event.target.closest('[data-card-header]');
    if (!header) return;
    const card = header.closest('.step6__card');
    if (!card || !card.classList.contains('step6__card--ready')) return;
    const body = card.querySelector('[data-card-body]');
    const chevron = card.querySelector('.step6__card-chevron');
    if (!body) return;
    const nowCollapsed = body.classList.toggle('step6__card-body--collapsed');
    if (chevron) chevron.classList.toggle('expanded', !nowCollapsed);
  });

  continueBtn.addEventListener('click', () => {
    if (continueBtn.disabled) return;
    const imagePrompts = moduleStates.map((s) => {
      const out = {
        moduleName: s.moduleName,
        altText: s.altText,
        fullPrompt: s.fullPrompt,
        designNote: s.designNote,
      };
      STEP6_LAYER_ORDER.forEach(([key]) => { out[key] = s[key]; });
      return out;
    });
    window.imagePrompts = imagePrompts;
    document.dispatchEvent(new CustomEvent('step6-complete', { detail: imagePrompts }));
  });

  // Fire the 5 generations with at most 3 in flight at any time.
  // Workers pull from a shared queue; as each finishes, the worker
  // grabs the next pending module until the queue is empty.
  const STEP6_CONCURRENCY = 2;
  const queue = moduleStates.map((_, idx) => idx);
  async function runWorker() {
    while (queue.length > 0) {
      const idx = queue.shift();
      try {
        await generatePrompt(idx);
      } catch (err) {
        // generatePrompt already surfaces errors to its own card
        console.error('[step6] worker caught unexpected error:', err);
      }
    }
  }
  const workerCount = Math.min(STEP6_CONCURRENCY, moduleStates.length);
  for (let i = 0; i < workerCount; i++) {
    runWorker();
  }

  return root;
}
