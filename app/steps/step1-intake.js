const STYLE_ID = 'step1-intake-styles';
const MAX_COVER_BYTES = 5 * 1024 * 1024;
const HEAT_LEVEL_GENRES = [
  CATEGORIES.CLEAN_SWEET_ROMANCE,
  CATEGORIES.ROMANTIC_SUSPENSE,
];

const styles = `
  .step1 {
    max-width: 720px;
    margin: 2rem auto;
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 12px 36px rgba(71, 16, 30, 0.14);
    font-family: 'Work Sans', system-ui, sans-serif;
  }
  .step1__header {
    background:
      radial-gradient(circle at 70% 10%, rgba(255, 255, 255, 0.12), transparent 18rem),
      linear-gradient(145deg, #8f1b3f, #5c1428 72%);
    color: var(--v-text);
    padding: 2.25rem 2.25rem 2rem;
  }
  .step1__eyebrow {
    margin: 0 0 0.5rem;
    font-family: 'Instrument Serif', Georgia, serif;
    font-size: 1rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    opacity: 0.85;
    color: #fff7ea;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  }
  .step1__title {
    margin: 0;
    font-family: 'Instrument Serif', Georgia, serif;
    font-weight: 400;
    font-size: 2.5rem;
    letter-spacing: 0.08em;
    line-height: 1.1;
    color: #fff7ea;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  }
  .step1__form {
    background: var(--v-surface);
    padding: 2rem 2.25rem 2.25rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .step1__field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .step1__field--hidden { display: none; }
  .step1__label {
    color: var(--v-bg);
    font-weight: 600;
    font-size: 0.9rem;
  }
  .step1__required {
    margin-left: 0.25rem;
    color: var(--v-bg);
  }
  .step1__input,
  .step1__textarea,
  .step1__select {
    background: #ffffff;
    border: 1px solid var(--v-soft);
    border-radius: 8px;
    padding: 0.7rem 0.9rem;
    font-family: 'Work Sans', system-ui, sans-serif;
    font-size: 1rem;
    color: #4a3728;
  }
  .step1__textarea {
    min-height: 110px;
    resize: vertical;
  }
  .step1__input:focus,
  .step1__textarea:focus,
  .step1__select:focus {
    outline: 2px solid var(--v-accent);
    outline-offset: 1px;
    border-color: var(--v-bg);
  }
  .step1__toggle {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
    user-select: none;
  }
  .step1__toggle-input {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
    pointer-events: none;
  }
  .step1__toggle-track {
    position: relative;
    width: 44px;
    height: 24px;
    background: var(--v-soft);
    border-radius: 999px;
    transition: background 0.2s ease;
  }
  .step1__toggle-thumb {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    background: var(--v-surface);
    border-radius: 50%;
    transition: transform 0.2s ease;
  }
  .step1__toggle-input:checked + .step1__toggle-track {
    background: var(--v-accent-2);
  }
  .step1__toggle-input:checked + .step1__toggle-track .step1__toggle-thumb {
    transform: translateX(20px);
  }
  .step1__toggle-input:focus-visible + .step1__toggle-track {
    outline: 2px solid var(--v-accent);
    outline-offset: 2px;
  }
  .step1__toggle-text {
    color: var(--v-bg);
    font-weight: 500;
    font-size: 0.95rem;
  }
  .step1__file {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
  }
  .step1__file-input {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
    pointer-events: none;
  }
  .step1__file-button {
    display: inline-block;
    background: transparent;
    color: var(--v-bg);
    border: 1px solid var(--v-soft);
    border-radius: 8px;
    padding: 0.55rem 1rem;
    font-family: 'Work Sans', system-ui, sans-serif;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
  }
  .step1__file-button:hover { background: var(--v-muted); }
  .step1__file-name {
    font-size: 0.9rem;
    color: var(--v-bg);
    opacity: 0.85;
  }
  .step1__hint {
    font-size: 0.8rem;
    color: var(--v-bg);
    opacity: 0.7;
  }
  .step1__field-hint {
    margin-top: -0.15rem;
    font-style: italic;
    color: #7a3a47;
    font-size: 0.85rem;
    line-height: 1.5;
  }
  .step1__file-error {
    margin-top: 0.25rem;
    padding: 0.45rem 0.65rem;
    border-radius: 6px;
    background: var(--v-muted);
    color: var(--v-bg);
    font-size: 0.85rem;
  }
  .step1__submit {
    align-self: flex-start;
    margin-top: 0.5rem;
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
  .step1__submit:hover { filter: brightness(0.96); }
  .step1__submit:focus-visible {
    outline: 2px solid var(--v-bg);
    outline-offset: 3px;
  }
  .step1__field--error .step1__input,
  .step1__field--error .step1__select,
  .step1__field--error .step1__textarea {
    border-color: var(--v-bg);
  }
  .step1__field-error {
    color: var(--v-bg);
    font-size: 0.85rem;
  }
  .step1__file-preview {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-top: 0.25rem;
  }
  .step1__file-thumb {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 6px;
    border: 1px solid var(--v-soft);
    background: #ffffff;
  }
  .step1__file-meta {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    font-size: 0.85rem;
    color: var(--v-bg);
  }
  .step1__file-meta-name { font-weight: 600; }
  .step1__file-meta-size { opacity: 0.75; }
`;

function injectStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const el = document.createElement('style');
  el.id = STYLE_ID;
  el.textContent = styles;
  document.head.appendChild(el);
}

function createStep1Intake() {
  injectStyles();

  const root = document.createElement('section');
  root.className = 'step1';

  const categoryOptions = Object.values(CATEGORIES)
    .map(name => `<option value="${name}">${name}</option>`)
    .join('');

  root.innerHTML = `
    <header class="step1__header">
      <p class="step1__eyebrow">Step 1 of 7</p>
      <h1 class="step1__title">Intake</h1>
    </header>
    <form class="step1__form" novalidate>
      <div class="step1__field" data-required-field="title">
        <label class="step1__label" for="step1-title">Book title<span class="step1__required">*</span></label>
        <input class="step1__input" id="step1-title" name="title" type="text" required />
        <span class="step1__field-error" data-required-error hidden>This field is required.</span>
      </div>

      <div class="step1__field" data-required-field="author">
        <label class="step1__label" for="step1-author">Author name<span class="step1__required">*</span></label>
        <input class="step1__input" id="step1-author" name="author" type="text" required />
        <span class="step1__field-error" data-required-error hidden>This field is required.</span>
      </div>

      <div class="step1__field" data-required-field="genre">
        <label class="step1__label" for="step1-genre">Genre / category<span class="step1__required">*</span></label>
        <select class="step1__select" id="step1-genre" name="genre" required>
          <option value="">— Select a category —</option>
          ${categoryOptions}
        </select>
        <span class="step1__field-error" data-required-error hidden>This field is required.</span>
      </div>

      <div class="step1__field step1__field--hidden" data-field="heat-level" data-required-field="heatLevel">
        <label class="step1__label" for="step1-heat">Heat level<span class="step1__required">*</span></label>
        <select class="step1__select" id="step1-heat" name="heatLevel">
          <option value="">— Select heat level —</option>
          <option value="Level 1">Level 1: Clean / Sweet / Innocent — closed door</option>
          <option value="Level 2">Level 2: Mild / Sensual — passionate kissing and touching, closed door</option>
          <option value="Level 3">Level 3: Moderate / Sexy — open door scenes, detailed but not graphic</option>
          <option value="Level 4">Level 4: Steamy / Hot — graphic, detailed and frequent sexual scenes</option>
          <option value="Level 5">Level 5: Erotic / Explicit — very high, graphic or detailed erotic scenes central to the story</option>
        </select>
        <span class="step1__field-error" data-required-error hidden>This field is required.</span>
      </div>

      <div class="step1__field" data-required-field="description">
        <label class="step1__label" for="step1-description">Book / Series Description<span class="step1__required">*</span></label>
        <textarea class="step1__textarea" id="step1-description" name="description" required></textarea>
        <span class="step1__field-error" data-required-error hidden>This field is required.</span>
      </div>

      <div class="step1__field">
        <label class="step1__label" for="step1-character">Main Character Description (optional)</label>
        <textarea class="step1__textarea" id="step1-character" name="characterDescription"></textarea>
        <span class="step1__field-hint">Describe your main character or characters. Include ethnicity, age, appearance, and any details that matter for your cover visuals and A+ content images. Leave blank to use generic lifestyle imagery.</span>
      </div>

      <div class="step1__field">
        <span class="step1__label">Series</span>
        <label class="step1__toggle">
          <input class="step1__toggle-input" type="checkbox" name="isSeries" />
          <span class="step1__toggle-track"><span class="step1__toggle-thumb"></span></span>
          <span class="step1__toggle-text" data-toggle-text>No</span>
        </label>
      </div>

      <div class="step1__field">
        <span class="step1__label">Cover image</span>
        <div class="step1__file">
          <label class="step1__file-button" for="step1-cover">Choose image</label>
          <input class="step1__file-input" id="step1-cover" name="cover" type="file" accept="image/*" />
          <span class="step1__file-name" data-file-name>No file selected</span>
        </div>
        <div class="step1__file-preview" data-file-preview hidden>
          <img class="step1__file-thumb" data-file-thumb alt="Cover preview" />
          <span class="step1__file-meta">
            <span class="step1__file-meta-name" data-file-meta-name></span>
            <span class="step1__file-meta-size" data-file-meta-size></span>
          </span>
        </div>
        <span class="step1__hint">Optional. Image files only. Max 5 MB.</span>
        <span class="step1__file-error" data-file-error hidden></span>
      </div>

      <button class="step1__submit" type="submit">Analyze My Book</button>
    </form>
  `;

  const form = root.querySelector('form');
  const genreSelect = root.querySelector('#step1-genre');
  const heatField = root.querySelector('[data-field="heat-level"]');
  const toggleInput = root.querySelector('.step1__toggle-input');
  const toggleText = root.querySelector('[data-toggle-text]');
  const fileInput = root.querySelector('#step1-cover');
  const fileName = root.querySelector('[data-file-name]');
  const fileError = root.querySelector('[data-file-error]');
  const filePreview = root.querySelector('[data-file-preview]');
  const fileThumb = root.querySelector('[data-file-thumb]');
  const fileMetaName = root.querySelector('[data-file-meta-name]');
  const fileMetaSize = root.querySelector('[data-file-meta-size]');
  const requiredFields = root.querySelectorAll('[data-required-field]');

  let currentObjectURL = null;

  function formatFileSize(bytes) {
    if (bytes < 1024 * 1024) return Math.round(bytes / 1024) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  function clearFilePreview() {
    filePreview.hidden = true;
    if (currentObjectURL) {
      URL.revokeObjectURL(currentObjectURL);
      currentObjectURL = null;
    }
    fileThumb.removeAttribute('src');
    fileMetaName.textContent = '';
    fileMetaSize.textContent = '';
  }

  function getRequiredInput(field) {
    return field.querySelector('input, select, textarea');
  }

  function validateRequiredFields() {
    let allValid = true;
    requiredFields.forEach((field) => {
      const errorEl = field.querySelector('[data-required-error]');
      if (field.classList.contains('step1__field--hidden')) {
        field.classList.remove('step1__field--error');
        if (errorEl) errorEl.hidden = true;
        return;
      }
      const input = getRequiredInput(field);
      const empty = !input.value.trim();
      field.classList.toggle('step1__field--error', empty);
      if (errorEl) errorEl.hidden = !empty;
      if (empty) allValid = false;
    });
    return allValid;
  }

  requiredFields.forEach((field) => {
    const input = getRequiredInput(field);
    const errorEl = field.querySelector('[data-required-error]');
    const eventName = input.tagName === 'SELECT' ? 'change' : 'input';
    input.addEventListener(eventName, () => {
      if (input.value.trim()) {
        field.classList.remove('step1__field--error');
        if (errorEl) errorEl.hidden = true;
      }
    });
  });

  genreSelect.addEventListener('change', () => {
    const showHeat = HEAT_LEVEL_GENRES.includes(genreSelect.value);
    heatField.classList.toggle('step1__field--hidden', !showHeat);
    if (!showHeat) {
      const heatInput = root.querySelector('#step1-heat');
      heatInput.value = '';
      heatField.classList.remove('step1__field--error');
      const heatError = heatField.querySelector('[data-required-error]');
      if (heatError) heatError.hidden = true;
    }
  });

  toggleInput.addEventListener('change', () => {
    toggleText.textContent = toggleInput.checked ? 'Yes' : 'No';
  });

  fileInput.addEventListener('change', () => {
    fileError.hidden = true;
    fileError.textContent = '';
    const file = fileInput.files && fileInput.files[0];
    if (!file) {
      fileName.textContent = 'No file selected';
      clearFilePreview();
      return;
    }
    if (!file.type.startsWith('image/')) {
      fileInput.value = '';
      fileName.textContent = 'No file selected';
      fileError.textContent = 'Please choose an image file.';
      fileError.hidden = false;
      clearFilePreview();
      return;
    }
    if (file.size > MAX_COVER_BYTES) {
      fileInput.value = '';
      fileName.textContent = 'No file selected';
      fileError.textContent = 'File too large. Maximum size is 5MB. Please choose a smaller image.';
      fileError.hidden = false;
      clearFilePreview();
      return;
    }
    fileName.textContent = file.name;
    if (currentObjectURL) URL.revokeObjectURL(currentObjectURL);
    currentObjectURL = URL.createObjectURL(file);
    fileThumb.src = currentObjectURL;
    fileMetaName.textContent = file.name;
    fileMetaSize.textContent = formatFileSize(file.size);
    filePreview.hidden = false;
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!validateRequiredFields()) return;
    document.dispatchEvent(new CustomEvent('step1-complete', {
      detail: {
        category: genreSelect.value,
        coverFile: fileInput.files && fileInput.files[0] ? fileInput.files[0] : null,
      },
    }));
  });

  return root;
}
