import { InjectionToken, makeEnvironmentProviders, type EnvironmentProviders } from '@angular/core';
import type { ApiKeyVendor } from './agent-server.types';

/** The secrets part of the configuration (see `src/environments/environment.local.example.ts`). */
export interface LeanScopeSecrets {
  /** LeanScope personal team-repos access token. Sent as `Authorization: Bearer …`. */
  accessToken: string;
  /** Your own keys. At least one of openai / anthropic / mistral; typesafe for 🎯 Decision Model steps. */
  apiKeys: Partial<Record<ApiKeyVendor, string>>;
}

export interface LeanScopeConfig extends LeanScopeSecrets {
  /** Base URL of the LeanScope Agent Server, without `/api/v1`. */
  agentServerUrl: string;
  /** The `_guid` of the choreo to run. */
  choreoScenarioGuid: string;
  locale?: string;
}

export const LEANSCOPE_CONFIG = new InjectionToken<LeanScopeConfig>('LEANSCOPE_CONFIG');

/** `fetch`, injectable so tests can replace it. */
export const LEANSCOPE_FETCH = new InjectionToken<typeof fetch>('LEANSCOPE_FETCH', {
  providedIn: 'root',
  factory: () => (input, init) => fetch(input, init),
});

export function provideLeanScope(config: LeanScopeConfig): EnvironmentProviders {
  return makeEnvironmentProviders([{ provide: LEANSCOPE_CONFIG, useValue: config }]);
}

const LLM_VENDORS: ApiKeyVendor[] = ['openai', 'anthropic', 'mistral'];

/** What is missing before a session can start, as hints for the user. Empty when ready. */
export function missingConfig(config: LeanScopeConfig): string[] {
  const missing: string[] = [];
  if (!config.agentServerUrl.trim()) {
    missing.push('agentServerUrl in src/environments/environment.ts');
  }
  if (!config.choreoScenarioGuid.trim()) {
    missing.push('choreoScenarioGuid in src/environments/environment.ts');
  }
  if (!config.accessToken.trim()) {
    missing.push('accessToken in src/environments/environment.local.ts');
  }
  if (!LLM_VENDORS.some((vendor) => config.apiKeys[vendor]?.trim())) {
    missing.push(
      'an OpenAI, Anthropic or Mistral key in apiKeys in src/environments/environment.local.ts',
    );
  }
  return missing;
}

/** The API keys with empty values left out (the server rejects empty strings). */
export function nonEmptyApiKeys(
  apiKeys: LeanScopeSecrets['apiKeys'],
): Partial<Record<ApiKeyVendor, string>> {
  return Object.fromEntries(
    Object.entries(apiKeys)
      .map(([vendor, key]) => [vendor, key?.trim()])
      .filter(([, key]) => key),
  );
}
