Contributing

Setup:
  git clone https://github.com/indy-man/blackwall.git && cd blackwall && npm install && npm test

Adding a check:
1. Create src/checks/<type>/your-check.js
2. Export function taking (target, opts), return array of Finding objects
3. Register in src/scanner.js CHECK_REGISTRY
4. Add tests

Rules: every check is non-destructive. We scan, not attack. Include CWE refs. Provide fixes.
