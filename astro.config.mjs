// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

const fs = await import('node:fs/promises');
const path = await import('node:path');
const debugLogPath = path.resolve('.', '.cursor', 'debug.log');

async function writeDebugLog(entry) {
  const payload = JSON.stringify({
    sessionId: 'debug-session',
    runId: 'pre-fix',
    timestamp: Date.now(),
    ...entry
  }) + '\n';

  await fs.mkdir(path.dirname(debugLogPath), { recursive: true });
  await fs.appendFile(debugLogPath, payload, 'utf8');
}

// #region agent log
await writeDebugLog({
  hypothesisId: 'H6',
  location: 'astro.config.mjs:module',
  message: 'Astro config evaluated',
  data: { cwd: process.cwd() }
});
// #endregion

const fragmentDebugPlugin = {
  name: 'agent-fragment-debug',
  enforce: 'pre',
  async transform(code, id) {
    const filePath = id.split('?')[0];

    // #region agent log
    await writeDebugLog({
      hypothesisId: 'H8',
      location: 'astro.config.mjs:fragment-plugin',
      message: 'Transform hook triggered',
      data: {
        id,
        filePath,
        endsWithAstro: filePath.endsWith('.astro')
      }
    });
    // #endregion

    if (!filePath.endsWith('.astro')) {
      return null;
    }

    const shorthandCount = (code.match(/<>/g) ?? []).length;

    // #region agent log
    await writeDebugLog({
      hypothesisId: 'H7',
      location: 'astro.config.mjs:fragment-plugin',
      message: 'Processing Astro file during transform',
      data: {
        file: id,
        shorthandCount
      }
    });
    // #endregion

    if (shorthandCount === 0) {
      return null;
    }

    const hasFragmentAttributes = /<Fragment\s+[^>]+>/.test(code) || /<>\s*?[^\s<]/.test(code);

    // #region agent log
    await writeDebugLog({
      hypothesisId: 'H5',
      location: 'astro.config.mjs:fragment-plugin',
      message: 'Detected Astro fragment shorthand usage',
      data: {
        file: id,
        shorthandCount,
        hasFragmentAttributes
      }
    });
    // #endregion

    return null;
  }
};

// https://astro.build/config
export default defineConfig({
  site: 'https://danieldieppa.dev',
  vite: {
    plugins: [tailwindcss(), fragmentDebugPlugin]
  },
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark'
      }
    }
  }
});
