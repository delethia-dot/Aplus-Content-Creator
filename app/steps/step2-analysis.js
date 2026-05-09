const STEP2_STYLE_ID = 'step2-analysis-styles';

const step2Styles = `
  .step2 {
    max-width: 720px;
    margin: 0 auto 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    font-family: 'Work Sans', system-ui, sans-serif;
  }
  .step2__part {
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 12px 36px rgba(71, 16, 30, 0.14);
    background: var(--v-surface);
  }
  .step2__header {
    background:
      radial-gradient(circle at 70% 10%, rgba(255, 255, 255, 0.12), transparent 18rem),
      linear-gradient(145deg, #8f1b3f, #5c1428 72%);
    color: var(--v-text);
    padding: 1.5rem 2.25rem 1.25rem;
  }
  .step2__eyebrow {
    margin: 0 0 0.4rem;
    font-family: 'Instrument Serif', Georgia, serif;
    font-size: 1rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    opacity: 0.85;
    color: #fff7ea;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  }
  .step2__title {
    margin: 0;
    font-family: 'Instrument Serif', Georgia, serif;
    font-weight: 400;
    font-size: 1.85rem;
    letter-spacing: 0.08em;
    line-height: 1.15;
    color: #fff7ea;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  }
  .step2__body {
    padding: 1.75rem 2.25rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .step2__cover-image {
    display: block;
    width: 100%;
    max-height: 300px;
    object-fit: contain;
    border-radius: 8px;
    background: #ffffff;
    border: 1px solid var(--v-soft);
  }
  .step2__brief-title {
    margin: 0 0 0.5rem;
    font-family: 'Instrument Serif', Georgia, serif;
    font-weight: 400;
    font-size: 1.4rem;
    color: var(--v-bg);
  }
  .step2__brief-list {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
  }
  .step2__brief-row {
    display: grid;
    grid-template-columns: 200px 1fr;
    align-items: center;
    gap: 0.75rem;
    padding: 0.6rem 0;
    border-bottom: 1px solid var(--v-soft);
  }
  .step2__brief-row:last-child { border-bottom: none; }
  .step2__brief-label {
    margin: 0;
    color: var(--v-bg);
    font-weight: 600;
    font-size: 0.9rem;
  }
  .step2__brief-value {
    margin: 0;
    color: #4a3728;
    font-size: 0.95rem;
    min-height: 1.4em;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
  .step2__warning-badge {
    background: var(--v-accent);
    color: var(--v-button-text);
    font-weight: 600;
    font-size: 0.78rem;
    padding: 0.3rem 0.7rem;
    border-radius: 999px;
    letter-spacing: 0.02em;
  }
  .step2__question-field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .step2__question-label {
    color: var(--v-bg);
    font-weight: 600;
    font-size: 0.9rem;
  }
  .step2__question-input {
    background: #ffffff;
    border: 1px solid var(--v-soft);
    border-radius: 8px;
    padding: 0.7rem 0.9rem;
    font-family: 'Work Sans', system-ui, sans-serif;
    font-size: 1rem;
    color: #4a3728;
  }
  .step2__question-input:focus {
    outline: 2px solid var(--v-accent);
    outline-offset: 1px;
    border-color: var(--v-bg);
  }
  .step2__fallback {
    color: var(--v-bg);
    font-size: 1rem;
    padding: 1rem 1.25rem;
    border-radius: 8px;
    background: var(--v-muted);
  }
  .step2__continue {
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
  .step2__continue:hover { filter: brightness(0.96); }
  .step2__continue:focus-visible {
    outline: 2px solid var(--v-bg);
    outline-offset: 3px;
  }
`;

function injectStep2Styles() {
  if (document.getElementById(STEP2_STYLE_ID)) return;
  const el = document.createElement('style');
  el.id = STEP2_STYLE_ID;
  el.textContent = step2Styles;
  document.head.appendChild(el);
}

function step2RenderBriefRow(label, key) {
  return `
    <div class="step2__brief-row">
      <dt class="step2__brief-label">${label}</dt>
      <dd class="step2__brief-value" data-brief="${key}"></dd>
    </div>
  `;
}

function createStep2Analysis(options) {
  injectStep2Styles();
  const opts = options || {};
  const category = opts.category || '';
  const coverFile = opts.coverFile || null;

  const root = document.createElement('section');
  root.className = 'step2';

  if (coverFile) {
    const partA = document.createElement('div');
    partA.className = 'step2__part';
    const coverURL = URL.createObjectURL(coverFile);
    partA.innerHTML = `
      <header class="step2__header">
        <p class="step2__eyebrow">Step 2 of 7</p>
        <h2 class="step2__title">Cover Analysis</h2>
      </header>
      <div class="step2__body">
        <img class="step2__cover-image" src="${coverURL}" alt="Uploaded cover" />
        <div class="step2__brief">
          <h3 class="step2__brief-title">Cover Brief</h3>
          <dl class="step2__brief-list">
            ${step2RenderBriefRow('Dominant color', 'dominant-color')}
            ${step2RenderBriefRow('Accent color', 'accent-color')}
            ${step2RenderBriefRow('Background tone', 'background-tone')}
            ${step2RenderBriefRow('Mood descriptor', 'mood-descriptor')}
            ${step2RenderBriefRow('Typography style', 'typography-style')}
            ${step2RenderBriefRow('Imagery style', 'imagery-style')}
            ${step2RenderBriefRow('Setting cue', 'setting-cue')}
            <div class="step2__brief-row">
              <dt class="step2__brief-label">Genre signal match</dt>
              <dd class="step2__brief-value">
                <span data-brief="genre-signal-match"></span>
                <span class="step2__warning-badge" data-genre-warning hidden>Cover mood may not match selected genre</span>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    `;
    root.appendChild(partA);
  }

  const partB = document.createElement('div');
  partB.className = 'step2__part';
  const questions =
    typeof INTAKE_QUESTIONS !== 'undefined' && INTAKE_QUESTIONS[category]
      ? INTAKE_QUESTIONS[category]
      : null;

  const partBBody = questions
    ? questions
        .map((question, idx) => `
          <div class="step2__question-field">
            <label class="step2__question-label" for="step2-q-${idx}">${question}</label>
            <input class="step2__question-input" id="step2-q-${idx}" type="text" name="intakeQ${idx}" />
          </div>
        `)
        .join('')
    : `<div class="step2__fallback">No questions found for this genre. Please contact support.</div>`;

  partB.innerHTML = `
    <header class="step2__header">
      <p class="step2__eyebrow">Step 2 of 7</p>
      <h2 class="step2__title">Trope and Theme Selector</h2>
    </header>
    <div class="step2__body">
      ${partBBody}
    </div>
  `;
  root.appendChild(partB);

  const continueBtn = document.createElement('button');
  continueBtn.type = 'button';
  continueBtn.className = 'step2__continue';
  continueBtn.textContent = 'Analyze Content';
  continueBtn.addEventListener('click', () => {
    document.dispatchEvent(new CustomEvent('step2-complete', {
      detail: { category: category },
    }));
  });
  root.appendChild(continueBtn);

  return root;
}
