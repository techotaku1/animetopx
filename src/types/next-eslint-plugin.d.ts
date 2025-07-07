// types/next-eslint-plugin.d.ts
declare module '@next/eslint-plugin-next' {
  import type { ESLint, Linter } from 'eslint';

  interface NextESLintRule {
    meta: {
      type: 'problem' | 'suggestion' | 'layout';
      docs: {
        description: string;
        category: string;
        recommended: boolean;
      };
      fixable?: 'code' | 'whitespace';
      schema: any[];
    };
    create: (context: any) => any;
  }

  interface NextESLintPlugin {
    rules: Record<string, NextESLintRule>;
    configs: {
      recommended: {
        plugins: string[];
        rules: Record<string, Linter.RuleLevel>;
      };
      'core-web-vitals': {
        plugins: string[];
        extends: string[];
        rules: Record<string, Linter.RuleLevel>;
      };
    };
  }

  interface NextFlatConfig {
    recommended: {
      name: string;
      plugins: Record<string, NextESLintPlugin>;
      rules: Record<string, Linter.RuleLevel>;
    };
    coreWebVitals: {
      name: string;
      plugins: Record<string, NextESLintPlugin>;
      rules: Record<string, Linter.RuleLevel>;
    };
  }

  const plugin: NextESLintPlugin;
  export default plugin;
  export const rules: Record<string, NextESLintRule>;
  export const configs: NextESLintPlugin['configs'];
  export const flatConfig: NextFlatConfig;
}
