# aiConnected Docs

This is the documentation and internal knowledge base for the **aiConnected** platform — a cognitive operating system for persistent AI personas. Built on [Mintlify](https://mintlify.com).

---

## Development

Install the Mintlify CLI, then run a local preview from the repo root:

```bash
npm i -g mint
mint dev
```

Preview runs at `http://localhost:3000`. Changes pushed to `main` deploy automatically via the Mintlify GitHub integration.

---

## Repository Structure

```
docs/
├── docs.json                        # Mintlify config: navigation, theme, fonts
├── index.mdx                        # Homepage
├── start-here.mdx                   # Platform entry point
├── user-onboarding-flow.mdx         # Onboarding flow spec
│
├── quickstart/                      # Getting started guide
├── learn/                           # Product documentation
│   ├── sending/                     # Sending messages (batch, attachments, scheduling)
│   ├── receiving/                   # Receiving messages
│   ├── audience/                    # Audience management
│   ├── domains/                     # Domain configuration
│   ├── logs/                        # Log access
│   ├── api-keys/                    # API key management
│   ├── broadcasts/                  # Broadcast messaging
│   ├── templates/                   # Message templates
│   └── settings/                   # Account settings
│
├── api-reference/                   # REST API reference (OpenAPI)
├── webhooks/                        # Webhook event documentation
│
└── knowledge-base/                  # Internal planning, research, and architecture docs
    ├── introduction.mdx             # KB overview with section cards
    ├── sample-user-md-configuration.mdx
    │
    ├── aiconnected-os/              # aiConnected OS — personal AI operating system
    ├── aiconnected-business-platform/  # Business platform architecture and PRDs
    ├── aiconnected-apps-and-modules/   # Standalone apps and pluggable modules
    ├── neurigraph-memory-architecture/ # Memory architecture and cognitive systems
    ├── aiconnected-supporting-docs/    # Developer guides, legal, strategy
    ├── papers-and-research/            # Market research and feasibility studies
    └── raw-chats-and-brainstorming/    # Archived ChatGPT transcripts (unedited)
```

---

## Knowledge Base Sections

### aiConnected OS (`knowledge-base/aiconnected-os/`)
The personal AI operating system layer. Contains the master PRD, system standards, developer documentation, branding config, and a full numbered set of feature specs (spaces, tasks, live documents, personas, UI architecture, and more). Also includes newer additions: conversation split & route, meeting mode, import & migration, robotics platform, and the three-tier access model.

### Business Platform (`knowledge-base/aiconnected-business-platform/`)
Technical and commercial foundation of the platform. Includes platform overviews (technical and non-technical), foundation PRD, MVP specs (V1 and V2), V2 build plan, V1 audit, port map, and production readiness checklist. Subsections cover the Layout Manager and Platform Shell architecture, plus legacy platform specs.

### Apps & Modules (`knowledge-base/aiconnected-apps-and-modules/`)
Standalone products and pluggable modules built on aiConnected:

| Module | Description |
|---|---|
| **aiConnected Voice** | GoToConnect telephony integration — architecture, build phases, infra stack, WebRTC bridge |
| **KB Generator** | Automated knowledge base creation tool — PRD, field reference, prompts, sales copy |
| **aiConnected Contact** | CRM and contact management module |
| **funnelChat** | AI-powered debt collection and chat platform (legacy) |
| **aiConnected Paper** | AI-assisted document and paper generation product |
| **logicLegal** | AI-powered legal practice growth platform |
| **SiteGuide / CoBrowser** | AI browser co-pilot module |
| **macEngine / Remote Work Engine** | macOS and remote work tooling |

### Neurigraph Memory Architecture (`knowledge-base/neurigraph-memory-architecture/`)
The cognitive memory system powering aiConnected personas. Covers the full architecture, multitrack reasoning, pattern recognition databases, behavioral prediction, autobiographical memory, the Object Deconstruction Graph, and the Hyperthyme Memory Framework. Includes 11 tool reference documents and legacy Brain API docs.

### Acquired Intelligence (`knowledge-base/neurigraph-memory-architecture/acquired-intelligence-rough-outline.mdx`)
Book outline and terminology reframing for "Acquired Intelligence" — a foundational text exploring experience-based AI cognition vs. traditional artificial intelligence framing.

### Supporting Documentation (`knowledge-base/aiconnected-supporting-docs/`)
Developer-facing guides, legal, and strategy documents:
- How developers use the platform
- Self-hosting and open-source licensing
- Community engagement strategy
- Persona IDE system prompt
- Fundraising strategy
- Project and OS memory backups
- Trademark and brand identity documentation

### Papers & Research (`knowledge-base/papers-and-research/`)
Market research, feasibility studies, and strategic analysis:
- The future of persistent AI in business
- Enterprise service market research
- Global AI marketplace feasibility analysis
- Building an AI services directory with n8n
- Influencer outreach strategy

### Raw Chats & Brainstorming (`knowledge-base/raw-chats-and-brainstorming/`)
Unedited ChatGPT transcripts from early brainstorming sessions across products: Voice, funnelChat, blogEngine, dialEngine, macEngine, and general aiConnected business planning. Not maintained as living documentation — preserved as historical reference.

---

## File Conventions

- All content files use `.mdx`
- File names are lowercase kebab-case
- Folder names are lowercase kebab-case
- Non-navigable assets (`.pdf`, `.json`, `.jsx`, `.html`) live alongside their relevant docs but are not referenced in `docs.json`
- Files prefixed `legacy-` are superseded documents kept for historical context
