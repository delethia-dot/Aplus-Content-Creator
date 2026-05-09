import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Anthropic from '@anthropic-ai/sdk';

const apiKey = process.env.ANTHROPIC_API_KEY;
if (!apiKey || apiKey === 'your_key_here') {
  console.error(
    'Missing ANTHROPIC_API_KEY in environment. Set it in server/.env or your shell before starting.'
  );
  process.exit(1);
}

const MODEL = process.env.ANTHROPIC_MODEL || 'claude-opus-4-7';
const MAX_TOKENS = Number(process.env.ANTHROPIC_MAX_TOKENS) || 16000;
const PORT = process.env.PORT || 3001;

const client = new Anthropic({ apiKey });
const app = express();

// CORS — explicit policy with preflight support. Allows any origin for now
// (the frontend can be served from Netlify, file://, or localhost during dev).
// Lock the origin down before going to real production.
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.options('*', cors());

app.use(express.json({ limit: '1mb' }));

app.post('/api/generate', async (req, res) => {
  const { prompt, systemPrompt } = req.body || {};

  if (typeof prompt !== 'string' || !prompt.trim()) {
    return res.status(400).json({
      error: 'invalid_request',
      message: 'Field "prompt" is required and must be a non-empty string.',
    });
  }

  if (systemPrompt !== undefined && systemPrompt !== null && typeof systemPrompt !== 'string') {
    return res.status(400).json({
      error: 'invalid_request',
      message: 'Field "systemPrompt" must be a string when provided.',
    });
  }

  const params = {
    model: MODEL,
    max_tokens: MAX_TOKENS,
    thinking: { type: 'adaptive' },
    output_config: { effort: 'high' },
    messages: [{ role: 'user', content: prompt }],
  };

  if (typeof systemPrompt === 'string' && systemPrompt.trim()) {
    params.system = systemPrompt;
    params.cache_control = { type: 'ephemeral' };
  }

  try {
    const response = await client.messages.create(params);

    const text = response.content
      .filter((block) => block.type === 'text')
      .map((block) => block.text)
      .join('');

    return res.json({
      text,
      stop_reason: response.stop_reason,
      stop_details: response.stop_details ?? null,
      model: response.model,
      usage: {
        input_tokens: response.usage.input_tokens,
        output_tokens: response.usage.output_tokens,
        cache_creation_input_tokens: response.usage.cache_creation_input_tokens,
        cache_read_input_tokens: response.usage.cache_read_input_tokens,
      },
    });
  } catch (err) {
    if (err instanceof Anthropic.AuthenticationError) {
      return res.status(401).json({
        error: 'authentication_error',
        message: 'Anthropic rejected the API key. Check ANTHROPIC_API_KEY.',
      });
    }
    if (err instanceof Anthropic.PermissionDeniedError) {
      return res.status(403).json({ error: 'permission_denied', message: err.message });
    }
    if (err instanceof Anthropic.RateLimitError) {
      return res.status(429).json({ error: 'rate_limit_error', message: err.message });
    }
    if (err instanceof Anthropic.BadRequestError) {
      return res.status(400).json({ error: 'bad_request', message: err.message });
    }
    if (err instanceof Anthropic.APIError) {
      return res.status(err.status || 502).json({
        error: 'api_error',
        status: err.status,
        message: err.message,
      });
    }
    console.error('[generate] Unexpected error:', err);
    return res.status(500).json({
      error: 'internal_error',
      message: 'Unexpected server error. Check server logs.',
    });
  }
});

const COVER_SYSTEM_PROMPT =
  'You are an expert book cover analyst. Analyze the provided book cover image and return a JSON object only with no markdown and no commentary. The JSON must contain exactly these fields: dominantColor, accentColor, backgroundTone, moodDescriptor, typographyStyle, imageryStyle, settingCue, genreSignalMatch. For dominantColor and accentColor return a plain English color description not a hex code. For backgroundTone return one of: dark, light, midtone, or gradient. For moodDescriptor return one word only. For typographyStyle return one of: serif, script, sans-serif, hand-lettered, or mixed. For imageryStyle return one of: illustrated, photographic, typographic-only, or painterly. For settingCue return a brief phrase describing any visible or implied setting. For genreSignalMatch return one of: matches, possible-mismatch, or unclear.';

app.post('/api/analyze-cover', async (req, res) => {
  const { imageBase64, mimeType } = req.body || {};

  if (typeof imageBase64 !== 'string' || !imageBase64.trim()) {
    return res.status(400).json({
      error: 'invalid_request',
      message: 'Field "imageBase64" is required and must be a non-empty base64 string.',
    });
  }

  if (typeof mimeType !== 'string' || !mimeType.trim()) {
    return res.status(400).json({
      error: 'invalid_request',
      message: 'Field "mimeType" is required (e.g. image/jpeg, image/png).',
    });
  }

  try {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 1024,
      system: COVER_SYSTEM_PROMPT,
      cache_control: { type: 'ephemeral' },
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mimeType,
                data: imageBase64,
              },
            },
            {
              type: 'text',
              text: 'Analyze this book cover and return only the JSON object as specified.',
            },
          ],
        },
      ],
    });

    const text = response.content
      .filter((block) => block.type === 'text')
      .map((block) => block.text)
      .join('')
      .trim();

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (_parseErr) {
      return res.status(400).json({
        error: 'invalid_response',
        message: 'Cover analysis response was not valid JSON.',
        raw: text,
      });
    }

    return res.json(parsed);
  } catch (err) {
    if (err instanceof Anthropic.AuthenticationError) {
      return res.status(401).json({
        error: 'authentication_error',
        message: 'Anthropic rejected the API key. Check ANTHROPIC_API_KEY.',
      });
    }
    if (err instanceof Anthropic.PermissionDeniedError) {
      return res.status(403).json({ error: 'permission_denied', message: err.message });
    }
    if (err instanceof Anthropic.RateLimitError) {
      return res.status(429).json({ error: 'rate_limit_error', message: err.message });
    }
    if (err instanceof Anthropic.BadRequestError) {
      return res.status(400).json({ error: 'bad_request', message: err.message });
    }
    if (err instanceof Anthropic.APIError) {
      return res.status(err.status || 502).json({
        error: 'api_error',
        status: err.status,
        message: err.message,
      });
    }
    console.error('[analyze-cover] Unexpected error:', err);
    return res.status(500).json({
      error: 'internal_error',
      message: 'Unexpected server error. Check server logs.',
    });
  }
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`A+ Content Creator backend listening on http://localhost:${PORT}`);
  console.log(`Model: ${MODEL}  |  Max tokens: ${MAX_TOKENS}`);
});
