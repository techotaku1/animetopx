declare module 'eslint-plugin-drizzle' {
  import type { ESLint, Linter } from 'eslint';

  interface DrizzleRuleOptions {
    drizzleObjectName?: string | string[];
  }

  interface DrizzleEnforceDeleteOptions extends DrizzleRuleOptions {}
  interface DrizzleEnforceUpdateOptions extends DrizzleRuleOptions {}

  interface DrizzleConfigs {
    recommended: Linter.FlatConfig;
    all: Linter.FlatConfig;
  }

  interface DrizzlePlugin {
    configs: DrizzleConfigs;
    rules: Record<string, ESLint.RuleModule>;
    meta?: {
      name: string;
      version: string;
    };
  }

  const plugin: DrizzlePlugin;
  export default plugin;

  // Named exports (si el plugin también los proporciona)
  export const configs: DrizzleConfigs;
  export const rules: Record<string, ESLint.RuleModule>;
}
