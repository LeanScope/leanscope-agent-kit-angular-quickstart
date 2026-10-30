// App configuration that is safe to commit. Secrets live in `environment.local.ts` (gitignored).
//
// Coding agents: you may edit this file, e.g. to set `choreoScenarioGuid`. Never open, print or
// edit `environment.local.ts`.

import type { LeanScopeConfig } from '../app/leanscope/leanscope.config';
import { localSecrets } from './environment.local';

export const environment: { leanscope: LeanScopeConfig } = {
  leanscope: {
    /** The LeanScope Agent Server (REST + SSE). API docs: <agentServerUrl>/api/v1/docs */
    agentServerUrl: 'https://dev.api.agents.leanscope.ai',

    /** The `_guid` of the choreo (a LeanScope Scenario) this app runs. */
    choreoScenarioGuid: '7af7b947-9cf7-467e-94a5-9c05e13b49fd', // Test choreo in repos 2067

    /** Language the session speaks, e.g. 'en' or 'de'. */
    locale: 'en',

    ...localSecrets,
  },
};
