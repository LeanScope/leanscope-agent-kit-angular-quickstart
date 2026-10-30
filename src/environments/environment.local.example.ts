// Your LeanScope secrets for local development.
//
// `npm start` copies this file to `environment.local.ts` if that file doesn't exist yet. Put your
// values into `environment.local.ts`, never into this file: `environment.local.ts` is gitignored,
// this one is committed.
//
// ⚠ Development only. Everything here ends up in the JavaScript bundle the browser loads, so
// anyone using the app can read it. Don't deploy a build that contains real values.

import type { LeanScopeSecrets } from '../app/leanscope/leanscope.config';

export const localSecrets: LeanScopeSecrets = {
  /**
   * Your LeanScope personal team-repos access token (the Agent Kit calls it
   * LEANSCOPE_PERSONAL_TEAM_REPOS_ACCESS_TOKEN). Get it at https://app.leanscope.ai/ via your
   * avatar (top-right). It names the repository your choreos live in.
   */
  accessToken: '',

  /**
   * Your own LLM keys. The agent server runs the session on these and needs at least one of
   * openai, anthropic or mistral. Leave the others empty.
   */
  apiKeys: {
    openai: '', // LEANSCOPE_OPENAI_API_KEY
    anthropic: '', // LEANSCOPE_ANTHROPIC_API_KEY
    mistral: '', // LEANSCOPE_MISTRAL_API_KEY
    elevenlabs: '', // LEANSCOPE_ELEVENLABS_API_KEY (voice, optional)
    typesafe: '', // LEANSCOPE_TYPESAFE_API_KEY (🎯 Decision Model steps, optional)
  },
};
