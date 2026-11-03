blackwall
=========

security scanner for websites, APIs, and AI agents.

most security scanners only test traditional web apps. blackwall also tests
AI agents and MCP servers for prompt injection, tool misuse, system prompt
leakage, and other attacks that almost nobody is scanning for yet.


INSTALL
-------

    npm install -g blackwall


QUICK START
-----------

    blackwall https://your-site.com
    blackwall https://api.example.com/v1 --type api
    blackwall https://your-agent.com/chat --type agent
    blackwall https://example.com -f json -o report.json
    blackwall https://example.com --profile quick


SCAN TYPES
----------

web       SQL injection, XSS, CORS, cookies, exposed files, SSRF,
          open redirects, TLS, headers, clickjacking

agent     prompt injection (7 vectors), system prompt extraction,
          tool misuse, data exfiltration, permission escalation,
          excessive autonomy, context poisoning, output handling,
          MCP tool exposure, indirect injection

api       BOLA, authentication bypass, rate limiting, JWT misconfig,
          mass assignment, GraphQL introspection, TLS, CORS

infra     port scanning, DNS (SPF/DMARC), default credentials,
          cloud storage misconfig, TLS, headers


AI AGENT TESTING
----------------

this is the part that matters. agents are being deployed everywhere and
almost nobody is testing them for security. blackwall sends crafted
prompts to your agent and checks whether it:

  - leaks its system prompt when asked the right way
  - executes tools it shouldn't (file reads, shell commands, HTTP to internal IPs)
  - hands over environment variables, API keys, or database strings
  - accepts fake privilege escalation ("you are now admin")
  - takes destructive actions without asking for confirmation
  - trusts injected system messages from user input
  - processes instructions embedded in external content
  - exposes its MCP tool list without authentication

to test an agent, point blackwall at its chat endpoint:

    blackwall https://your-agent.com/v1/chat/completions --type agent

works with OpenAI, Anthropic, or custom JSON chat formats.


CLI OPTIONS
-----------

    -t, --target       target URL
    --type             auto, web, api, agent, infra (default: auto)
    -o, --output       output file (default: stdout)
    -f, --format       text, json, md (default: text)
    --skip             skip checks (comma-separated)
    --only             run only these checks
    --profile          quick, standard, deep
    --min-severity     filter: critical, high, medium, low
    --webhook          POST results to URL
    --stream           stream JSON findings line by line
    --timeout          request timeout ms (default: 10000)
    --version          print version
    -h, --help         show help


PROFILES
--------

quick       TLS + headers only. fast.
standard    all web checks. the default.
deep        everything including slower checks.

    blackwall https://example.com --profile deep


CONFIGURATION
-------------

create blackwall.json or .blackwallrc in your project:

    {
      "timeout": 10000,
      "checks": { "web": { "enabled": true }, "agent": { "enabled": true } },
      "rateLimit": { "requestsPerSecond": 10 }
    }


PROGRAMMATIC API
----------------

    const { scan } = require('blackwall');
    const results = await scan('https://example.com', { type: 'web' });
    console.log(results.findings);


CI INTEGRATION
--------------

    blackwall https://staging.example.com --min-severity high -f json -o results.json
    blackwall https://staging.example.com --webhook https://ci.example.com/hook


CONTRIBUTING
------------

see CONTRIBUTING.md. checks must be non-destructive. include CWE refs.
npm test to run tests.


LICENSE
-------

MIT
