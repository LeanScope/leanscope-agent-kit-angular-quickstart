// App configuration that is safe to commit. Secrets live in `.env` (gitignored, see `.env.example`).
//
// Coding agents: you may edit this file, e.g. to set `choreoScenarioGuid`. Never open, print or
// edit `.env`.

import type { LeanScopeConfig, LeanScopeSecrets } from '../app/leanscope/leanscope.config';

/**
 * Your secrets from `.env`. `npm start` and `npm run build` put them in at build time (see
 * scripts/run-ng.mjs); in tests and plain `ng` commands they are undefined, so the app starts
 * with empty values and the home page lists what's missing.
 */
declare const LEANSCOPE_SECRETS: LeanScopeSecrets | undefined;

const secrets: LeanScopeSecrets =
  typeof LEANSCOPE_SECRETS === 'undefined' ? { accessToken: '', apiKeys: {} } : LEANSCOPE_SECRETS;

export const environment: { leanscope: LeanScopeConfig } = {
  leanscope: {
    /** The LeanScope Agent Server (REST + SSE). API docs: <agentServerUrl>/api/v1/docs */
    agentServerUrl: 'https://dev.api.agents.leanscope.ai',

    /** The `_guid` of the choreo (a LeanScope Scenario) this app runs. */
    choreoScenarioGuid: '7af7b947-9cf7-467e-94a5-9c05e13b49fd', // Test choreo in repos 2067

    /** Language the session speaks, e.g. 'en' or 'de'. */
    locale: 'en',

    ...secrets,
  },
};
