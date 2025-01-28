module.exports = {
  "root": true,
  "ignorePatterns": [
    "projects/**/*"
  ],
  "overrides": [
    {
      "files": [
        "*.ts"
      ],
      "parserOptions": {
        "project": [
          "tsconfig.json"
        ],
        "createDefaultProgram": true
      },
      "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@angular-eslint/recommended",
        "plugin:prettier/recommended",
        "plugin:ngrx/recommended"
      ],
      "rules": {
        // Angular rules
        "@angular-eslint/directive-selector": [
          "error",
          {
            "type": "attribute",
            "prefix": "app",
            "style": "camelCase"
          }
        ],
        "@angular-eslint/component-selector": [
          "error",
          {
            "type": "element",
            "prefix": "app",
            "style": "kebab-case"
          }
        ],

        // TypeScript rules
        '@typescript-eslint/array-type': ['error', { default: 'generic' }],
        '@typescript-eslint/await-thenable': 'error',
        '@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],
        '@typescript-eslint/consistent-type-assertions': [
          'error',
          {
            assertionStyle: 'as',
          },
        ],
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
        '@typescript-eslint/explicit-member-accessibility': [
          'error',
          {
            accessibility: 'explicit',
            overrides: {
              accessors: 'no-public',
              constructors: 'no-public',
              methods: 'no-public',
              properties: 'no-public',
              parameterProperties: 'explicit',
            },
          },
        ],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/method-signature-style': ['error', 'method'],
        '@typescript-eslint/no-confusing-void-expression': [
          'error',
          {
            ignoreArrowShorthand: true,
          },
        ],
        '@typescript-eslint/no-duplicate-enum-values': 'error',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-inferrable-types': 'error',
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/no-require-imports': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
        '@typescript-eslint/no-unnecessary-qualifier': 'error',
        '@typescript-eslint/no-unnecessary-type-arguments': 'error',
        '@typescript-eslint/no-unnecessary-type-assertion': 'error',
        '@typescript-eslint/no-unnecessary-type-constraint': 'error',
        '@typescript-eslint/no-unsafe-declaration-merging': 'error',
        '@typescript-eslint/no-useless-empty-export': 'error',
        '@typescript-eslint/no-use-before-define': ['error'],
        '@typescript-eslint/parameter-properties': [
          'error',
          {
            prefer: 'parameter-property',
          },
        ],
        '@typescript-eslint/prefer-enum-initializers': 'error',
        '@typescript-eslint/prefer-for-of': 'error',
        '@typescript-eslint/prefer-function-type': 'error',
        '@typescript-eslint/prefer-optional-chain': 'error',
        '@typescript-eslint/promise-function-async': 'error',
        '@typescript-eslint/sort-type-constituents': 'error',
        '@typescript-eslint/switch-exhaustiveness-check': 'error',

        // ESLint rules
        'no-case-declarations': 'off',
        'no-console': [
          'error',
          {
            'allow': ['warn', 'error']
          }
        ],
      }
    },
    {
      "files": [
        "*.html"
      ],
      "extends": [
        "plugin:@angular-eslint/template/recommended",
        "plugin:prettier/recommended"
      ],
      "rules": {
        "@angular-eslint/template/attributes-order": [
          "error",
          {
            "alphabetical": false,
            "order": [
              "STRUCTURAL_DIRECTIVE",
              "TEMPLATE_REFERENCE",
              "ATTRIBUTE_BINDING",
              "INPUT_BINDING",
              "TWO_WAY_BINDING",
              "OUTPUT_BINDING"
            ]
          }
        ]
      }
    }
  ]
}
