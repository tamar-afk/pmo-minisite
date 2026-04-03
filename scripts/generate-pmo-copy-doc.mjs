/**
 * Generates docs/PMO-site-copy.docx: site copy in tables with Word heading styles
 * for the Navigation pane. Run: npm run copy-doc
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  HeadingLevel,
  ShadingType,
  BorderStyle,
  HighlightColor,
} from 'docx'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const outDir = path.join(root, 'docs')
const outFile = path.join(outDir, 'PMO-site-copy.docx')

function h1(text) {
  return new Paragraph({ text, heading: HeadingLevel.HEADING_1, spacing: { before: 240, after: 120 } })
}

function h2(text) {
  return new Paragraph({ text, heading: HeadingLevel.HEADING_2, spacing: { before: 200, after: 100 } })
}

function h3(text) {
  return new Paragraph({ text, heading: HeadingLevel.HEADING_3, spacing: { before: 160, after: 80 } })
}

function note(text) {
  return new Paragraph({
    spacing: { after: 120 },
    children: [
      {
        text,
        italics: true,
      },
    ],
  })
}

function paras(text) {
  const lines = String(text).split(/\n+/).filter(Boolean)
  return lines.map((line) => new Paragraph({ text: line, spacing: { after: 80 } }))
}

/** Legend: amber (yellow highlight) vs green; matches typical Word review markup */
function colorKeyBlock() {
  const border = {
    top: { style: BorderStyle.SINGLE, size: 1, color: 'E5E5E8' },
    bottom: { style: BorderStyle.SINGLE, size: 1, color: 'E5E5E8' },
    left: { style: BorderStyle.SINGLE, size: 1, color: 'E5E5E8' },
    right: { style: BorderStyle.SINGLE, size: 1, color: 'E5E5E8' },
  }
  return [
    new Paragraph({
      spacing: { after: 80 },
      children: [
        { text: 'Changes marked inline. ', bold: true },
        { text: 'Amber', bold: true, highlight: HighlightColor.YELLOW },
        { text: ' = revised copy. ', bold: true },
        { text: 'Green', bold: true, highlight: HighlightColor.GREEN },
        { text: ' = new copy or connector.', bold: true },
      ],
    }),
    new Paragraph({
      spacing: { after: 120 },
      children: [
        { text: 'Examples: ', italics: true },
        new TextRun({ text: 'Revised wording goes here.', highlight: HighlightColor.YELLOW }),
        { text: '  ', italics: true },
        new TextRun({ text: 'New or connector phrase.', highlight: HighlightColor.GREEN }),
      ],
    }),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      columnWidths: [2800, 7200],
      rows: [
        new TableRow({
          tableHeader: true,
          children: [
            new TableCell({
              shading: { fill: '6161FF', type: ShadingType.CLEAR },
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [
                new Paragraph({
                  children: [{ text: 'Key', bold: true, color: 'FFFFFF' }],
                }),
              ],
            }),
            new TableCell({
              shading: { fill: '6161FF', type: ShadingType.CLEAR },
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [
                new Paragraph({
                  children: [{ text: 'Meaning', bold: true, color: 'FFFFFF' }],
                }),
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              shading: { fill: 'FFF2CC', type: ShadingType.CLEAR },
              margins: { top: 60, bottom: 60, left: 120, right: 120 },
              borders: border,
              children: [new Paragraph({ children: [{ text: 'Amber', bold: true }] })],
            }),
            new TableCell({
              margins: { top: 60, bottom: 60, left: 120, right: 120 },
              borders: border,
              children: [
                new Paragraph({
                  text: 'Revised copy: text that replaces or refines earlier wording.',
                  spacing: { after: 40 },
                }),
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              shading: { fill: 'E2EFDA', type: ShadingType.CLEAR },
              margins: { top: 60, bottom: 60, left: 120, right: 120 },
              borders: border,
              children: [new Paragraph({ children: [{ text: 'Green', bold: true }] })],
            }),
            new TableCell({
              margins: { top: 60, bottom: 60, left: 120, right: 120 },
              borders: border,
              children: [
                new Paragraph({
                  text: 'New copy or connector: net-new lines or bridging phrases.',
                  spacing: { after: 40 },
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    note(
      'Use Word’s Navigation pane (View → Navigation) to jump by heading. In the Copy column, apply Home → Text Highlight Color: yellow for amber, green for green.',
    ),
  ]
}

/** Two-column table: label (shaded) | copy */
function tableCopy(rows, headerRow) {
  const tw = [3200, 6800]
  const tableRows = []

  if (headerRow) {
    tableRows.push(
      new TableRow({
        tableHeader: true,
        children: [
          new TableCell({
            shading: { fill: '6161FF', type: ShadingType.CLEAR },
            margins: { top: 80, bottom: 80, left: 120, right: 120 },
            children: [
              new Paragraph({
                children: [{ text: headerRow[0], bold: true, color: 'FFFFFF' }],
              }),
            ],
          }),
          new TableCell({
            shading: { fill: '6161FF', type: ShadingType.CLEAR },
            margins: { top: 80, bottom: 80, left: 120, right: 120 },
            children: [
              new Paragraph({
                children: [{ text: headerRow[1], bold: true, color: 'FFFFFF' }],
              }),
            ],
          }),
        ],
      }),
    )
  }

  for (const [label, body] of rows) {
    tableRows.push(
      new TableRow({
        children: [
          new TableCell({
            width: { size: 28, type: WidthType.PERCENTAGE },
            shading: { fill: 'F4F4F5', type: ShadingType.CLEAR },
            margins: { top: 60, bottom: 60, left: 120, right: 120 },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 1, color: 'E5E5E8' },
              bottom: { style: BorderStyle.SINGLE, size: 1, color: 'E5E5E8' },
              left: { style: BorderStyle.SINGLE, size: 1, color: 'E5E5E8' },
              right: { style: BorderStyle.SINGLE, size: 1, color: 'E5E5E8' },
            },
            children: paras(label),
          }),
          new TableCell({
            width: { size: 72, type: WidthType.PERCENTAGE },
            margins: { top: 60, bottom: 60, left: 120, right: 120 },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 1, color: 'E5E5E8' },
              bottom: { style: BorderStyle.SINGLE, size: 1, color: 'E5E5E8' },
              left: { style: BorderStyle.SINGLE, size: 1, color: 'E5E5E8' },
              right: { style: BorderStyle.SINGLE, size: 1, color: 'E5E5E8' },
            },
            children: paras(body),
          }),
        ],
      }),
    )
  }

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    columnWidths: tw,
    rows: tableRows,
  })
}

const sections = []

// --- Title ---
sections.push(
  h1('project management minisite: copy deck (revised)'),
  ...colorKeyBlock(),
  new Paragraph({ spacing: { after: 200 } }),
)

// --- Meta ---
sections.push(
  h2('Document & meta (index.html)'),
  tableCopy(
    [
      ['Title', 'monday.com for project management'],
      [
        'Meta description',
        'Drive your projects forward. AI-powered project management with agents that work alongside your team in monday.com.',
      ],
    ],
    ['Field', 'Copy'],
  ),
  new Paragraph({ spacing: { after: 200 } }),
)

// --- Nav ---
sections.push(
  h2('Sticky header (Nav)'),
  tableCopy(
    [
      ['Logo / home', 'monday.com (accessible name: monday.com home)'],
      ['Nav links', 'Overview · For teams · Features · Pricing'],
      ['Primary actions', 'Contact sales · Get started'],
    ],
    ['Field', 'Copy'],
  ),
  new Paragraph({ spacing: { after: 200 } }),
)

// --- Hero ---
sections.push(
  h2('Hero'),
  tableCopy(
    [
      ['H1', 'Drive your projects forward'],
      [
        'Body',
        "Always-on agents work alongside your team, chasing updates, flagging risks, and reporting to leadership so your people don't have to.",
      ],
      ['Primary CTA', 'Get started free'],
      ['Secondary CTA', 'See it in action →'],
      ['Microcopy', 'Free forever. No credit card needed.'],
      ['Trust line', 'Trusted by 250,000+ customers worldwide'],
      ['Logo strip', "Canva, Coca-Cola, Lionsgate, McDonald's, BMW, Cartier, VML"],
    ],
    ['Field', 'Copy'],
  ),
  new Paragraph({ spacing: { after: 200 } }),
)

// --- Hero showcase ---
sections.push(
  h2('Hero showcase (chrome & placeholder)'),
  tableCopy(
    [
      ['Window chrome', 'Agent session · monday.com'],
      ['Subline', 'Context · Docs · Slack · Drive'],
      ['Placeholder title', 'Video placeholder: planned reel'],
      ['Overlay card title', 'project management agent'],
      ['Overlay card subtitle', 'monday.com'],
      ['Region aria-label', 'project management agent workflow: hero video placeholder'],
    ],
    ['Field', 'Copy'],
  ),
  new Paragraph({ spacing: { after: 200 } }),
)

// --- Hero story steps ---
sections.push(
  h2('Hero story steps'),
  h3('Step 1'),
  tableCopy(
    [
      ['Title', 'Context, live in monday'],
      [
        'Body',
        'Your brief stays where your team writes: agents read blocks and docs, then sync structure, owners, and dates into monday.',
      ],
    ],
    ['Field', 'Copy'],
  ),
  h3('Step 2'),
  tableCopy(
    [
      ['Title', 'Agent builds your project board'],
      [
        'Body',
        'The project management agent creates the workspace structure (groups, items, and timelines) ready for your team.',
      ],
      ['Image alt', 'monday work management project board created by an AI agent'],
    ],
    ['Field', 'Copy'],
  ),
  h3('Step 3'),
  tableCopy(
    [
      ['Title', 'Allocate resources'],
      [
        'Body',
        'See capacity and ownership across workstreams so the right people are on the right work.',
      ],
      ['Image alt', 'Portfolio and resource view in monday.com'],
    ],
    ['Field', 'Copy'],
  ),
  h3('Step 4'),
  tableCopy(
    [['Title', 'Flag risks early'], ['Body', 'Agents surface delays, conflicts, and dependencies before they derail delivery.']],
    ['Field', 'Copy'],
  ),
  h3('Step 5'),
  tableCopy(
    [
      ['Title', 'Generate executive reports'],
      ['Body', 'Leadership-ready rollups from live data: no deck assembly or manual exports.'],
      ['Image alt', 'Projects and portfolios reporting in monday.com'],
    ],
    ['Field', 'Copy'],
  ),
  new Paragraph({ spacing: { after: 200 } }),
)

// --- Feature tabs ---
sections.push(
  h2('Feature tabs'),
  tableCopy(
    [
      ['H2', 'Every project, end-to-end.'],
      [
        'Intro',
        'Every stage of the project cycle is automatically pushed forward. Your agents continuously handle monitoring, reporting, and the follow-through that slows projects down.',
      ],
      ['Link', 'Get started →'],
      ['Timeline labels', 'Plan · Align · Execute · Track · Report'],
      ['Nav aria-label', 'Project lifecycle stages'],
    ],
    ['Field', 'Copy'],
  ),
  new Paragraph({ spacing: { after: 200 } }),
)

// --- AI Agents ---
sections.push(
  h2('AI agents'),
  tableCopy(
    [
      ['Chip', 'AI agents'],
      ['H2', 'Meet your new project management teammates'],
      [
        'Intro',
        'Purpose-built agents that live inside monday, keeping your projects moving without manual coordination.',
      ],
    ],
    ['Field', 'Copy'],
  ),
  h3('project management agent'),
  tableCopy(
    [
      [
        'Bullet 1',
        'Prioritizes your day by surfacing key projects, risks, and meetings',
      ],
      ['Bullet 2', 'Your always-on project co-pilot, native to monday'],
    ],
    ['Field', 'Copy'],
  ),
  h3('Risk analyzer (New)'),
  tableCopy(
    [
      [
        'Bullet 1',
        'Detects schedule, dependency, and workload risks across projects in real time',
      ],
      [
        'Bullet 2',
        'Reassigns owners, updates timelines, and alerts stakeholders before delays happen',
      ],
    ],
    ['Field', 'Copy'],
  ),
  h3('Reporting manager'),
  tableCopy(
    [
      [
        'Bullet 1',
        'Generates AI-curated executive reports on demand from live project data',
      ],
      ['Bullet 2', 'No manual prep, just share the report'],
    ],
    ['Field', 'Copy'],
  ),
  h3('Resource optimizer'),
  tableCopy(
    [
      [
        'Bullet 1',
        'Monitors capacity and recommends reallocation when demand shifts',
      ],
      ['Bullet 2', 'Flags conflicts before they create delivery bottlenecks'],
    ],
    ['Field', 'Copy'],
  ),
  h3('Dependencies resolver'),
  tableCopy(
    [
      [
        'Bullet 1',
        'Proactively surfaces cross-project blockers before they cascade',
      ],
      ['Bullet 2', 'Notifies teams the moment a dependency is at risk'],
    ],
    ['Field', 'Copy'],
  ),
  h3('Create your own'),
  tableCopy(
    [
      [
        'Bullet 1',
        'Define custom instructions and workflows so agents match exactly how your team works',
      ],
      ['Bullet 2', 'Build and iterate in monday without writing code'],
    ],
    ['Field', 'Copy'],
  ),
  new Paragraph({ spacing: { after: 200 } }),
)

// --- Resource management ---
sections.push(
  h2('People management'),
  tableCopy(
    [
      ['Chip', 'People management'],
      ['H2', 'Make the most out of your workforce'],
      [
        'Intro',
        'With agents taking the busy work, you can make sure that the right people work on the right priorities, while easily balancing their capacity.',
      ],
    ],
    ['Field', 'Copy'],
  ),
  h3('Modes'),
  tableCopy(
    [
      [
        'Plan resource needs: headline',
        'See demand before you staff',
      ],
      [
        'Plan resource needs: body',
        'Roadmaps and intake show up as role gaps and peak load, so you adjust dates and staffing while you still can.',
      ],
      [
        'Allocate the right person: headline',
        'Match people to work with confidence',
      ],
      [
        'Allocate the right person: body',
        'Assign owners by skills, availability, and fit. Everyone sees the same plan, agents included.',
      ],
      [
        'Balance capacity: headline',
        'Read load before it breaks delivery',
      ],
      [
        'Balance capacity: body',
        'Spot overload and gaps across teams in one view. Tradeoffs stay visible instead of buried in spreadsheets.',
      ],
      ['CTA', 'Get started →'],
    ],
    ['Field', 'Copy'],
  ),
  new Paragraph({ spacing: { after: 200 } }),
)

// --- Social proof ---
sections.push(
  h2('Social proof'),
  h3('Customer band'),
  tableCopy(
    [
      [
        'Headline',
        'Loved by users. Trusted by organizations.',
      ],
      [
        'Quote',
        "monday.com's AI helped us cut our project planning time in half. What used to take days now takes minutes, and that speed has directly translated into faster delivery for our clients.",
      ],
      ['Attribution', 'Sarah Luxemberg, Operations Director, VML'],
      ['Stat', '50% faster project delivery'],
      ['G2 line 1', 'Ranked top 5 project management platforms on G2'],
      ['G2 line 2', 'Backed by 14K+ customer reviews.'],
    ],
    ['Field', 'Copy'],
  ),
  new Paragraph({ spacing: { after: 200 } }),
)

// --- Platform bento ---
sections.push(
  h2('Platform bento'),
  tableCopy(
    [['H2', 'Why choose monday.com to run your strategic projects']],
    ['Field', 'Copy'],
  ),
  h3('Interactive cards'),
  tableCopy(
    [
      [
        'Card 1 title',
        'Ease of use that drives proven adoption',
      ],
      [
        'Card 1 body',
        'Hyper-personalization and intuitive design drive the adoption rates that give you a complete picture of work.',
      ],
      ['Card 1 footer', 'G2 · Highest Adoption · Winter 2025'],
      [
        'Card 2 title',
        'Expertise built on real-world work',
      ],
      [
        'Card 2 body',
        'AI capabilities informed by 250K+ customers across industries and the patterns of the world’s most productive teams.',
      ],
      ['Card 2 stats', '250K+ customers · 190+ industries · From startups to enterprises, worldwide'],
      [
        'Card 3 title',
        'One place for all of your organizational context',
      ],
      [
        'Card 3 body',
        'Unifies your data, work context, and institutional knowledge into a single intelligence layer for people and agents.',
      ],
      [
        'Card 3 bullets',
        '200+ integrations: Connect your entire stack\nAPI: Build on top of monday',
      ],
      [
        'Card 4 title',
        'Enterprise control without compromise',
      ],
      [
        'Card 4 body',
        'Trusted by the world’s most complex organizations, with the permissions, approval gates, and governance to prove it.',
      ],
      ['Card 4 stat', '60% of Fortune 500 companies run on monday'],
    ],
    ['Field', 'Copy'],
  ),
  h3('Analyst / proof row'),
  tableCopy(
    [
      [
        'Gartner card title',
        'Leader in Gartner Magic Quadrant for APMR',
      ],
      [
        'Gartner card body',
        'Leader in the 2025 Gartner® Magic Quadrant™ for APMR: furthest on vision, highest on execution.',
      ],
      ['Gartner CTA', 'Get the report'],
      [
        'Forrester card title',
        'Recognized by industry leaders',
      ],
      [
        'Forrester card body',
        "Independent research validates significant ROI for monday.com customers, including Forrester's Total Economic Impact™ study.",
      ],
      ['Forrester stat', '346% ROI in the Total Economic Impact Study of monday.com'],
      ['Forrester label', 'Forrester'],
    ],
    ['Field', 'Copy'],
  ),
  new Paragraph({ spacing: { after: 200 } }),
)

// --- PM Feature grid ---
sections.push(
  h2('PM capabilities grid'),
  tableCopy(
    [
      [
        'Line above chip',
        'Behind every agent is a platform built for the full depth of project management.',
      ],
      ['Chip', 'Built for every level of project management'],
      ['H2', 'Everything you need to deliver complex projects at scale.'],
      [
        'Subcopy',
        'monday.com covers the full depth of project and portfolio management, out of the box, no setup required.',
      ],
    ],
    ['Field', 'Copy'],
  ),
  h3('Capabilities'),
  tableCopy(
    [
      [
        'Portfolio management',
        'See every project in one place, status, health, and progress rolled up',
      ],
      [
        'Gantt chart',
        'Visualize timelines, milestones, and dependencies at a glance',
      ],
      [
        'Cross-project dependencies',
        'Manage task relationships across multiple projects in one view',
      ],
      ['Milestones', 'Mark key checkpoints along your timeline'],
      ['Baselines', 'Compare planned vs. actual to catch slippage early'],
      ['Critical path', 'See the tasks that determine your finish date'],
      [
        'Multiple views',
        'Switch between table, timeline, calendar, kanban, and more: same work, the view your team needs',
      ],
      [
        'Dashboards',
        'Build custom views of any data across projects and teams',
      ],
    ],
    ['Capability', 'Description'],
  ),
  new Paragraph({ spacing: { after: 200 } }),
)

// --- Build project app ---
sections.push(
  h2('Build any project app (monday vibe)'),
  tableCopy(
    [
      ['H2', 'Build any project app / in minutes'],
      [
        'Subcopy',
        'Describe what you need. monday vibe builds the app on top of your live project data.',
      ],
      [
        'Prompt typing demo',
        'Build me an executive overview dashboard showing RAG status, upcoming milestones, and budget vs. actuals across all active projects',
      ],
      ['Chrome labels', 'monday vibe · prompt'],
      [
        'Marquee tiles',
        'OKR tracker, Portfolio risk register, Executive overview, Resource insights, Project scenario planner, Budget tracker, Milestone dashboard, Dependency map',
      ],
    ],
    ['Field', 'Copy'],
  ),
  new Paragraph({ spacing: { after: 200 } }),
)

// --- MCP ---
sections.push(
  h2('monday MCP'),
  tableCopy(
    [
      ['Chip', 'monday MCP'],
      ['H2', 'Your projects, connected to any AI tool'],
      [
        'Body',
        'Connect live monday data to Claude, ChatGPT, Copilot, and more: one source of truth, answers in the assistant you already use, no tab-hopping.',
      ],
      ['Tabs', 'Claude · ChatGPT · Microsoft Copilot'],
      ['UI labels', 'You · Syncing with monday · monday'],
      ['Chips', 'Works with any AI tool · Live project data, always in sync · No IT setup required'],
    ],
    ['Field', 'Copy'],
  ),
  h3('Assistant demos (prompts & replies)'),
  tableCopy(
    [
      [
        'Claude: question',
        'What owner updates or blockers on the Q3 launch board need my attention today?',
      ],
      ['Claude: intro', 'Catch-ups synced from monday:'],
      [
        'Claude: rows',
        'Design: Figma handoff done: 2 dependencies unblocked\nEng: API migration on track; infra review scheduled Thu\nProject management: Budget line awaiting approval: owner auto-nudged',
      ],
      ['ChatGPT: question', 'What projects are at risk this week?'],
      ['ChatGPT: intro', '3 projects flagged at risk:'],
      [
        'ChatGPT: rows',
        'Website redesign (delayed 4 days)\nQ4 campaign (resource conflict)\nPlatform migration (dependency blocked)',
      ],
      [
        'Copilot: question',
        'Draft a leadership-ready brief: portfolio health and top decisions needed before Q3 close.',
      ],
      ['Copilot: intro', 'Executive summary from live portfolio data:'],
      [
        'Copilot: rows',
        'Health: 12 on track · 4 at risk · 1 blocked: RAG roll-up by program\nBudget vs actual: 3% under portfolio-wide; 2 line items over threshold\nDecisions needed: CRM migration scope tradeoff, Platform squad staffing',
      ],
    ],
    ['Field', 'Copy'],
  ),
  new Paragraph({ spacing: { after: 200 } }),
)

// --- Post-MCP headline ---
sections.push(
  h2('Post-MCP headline'),
  tableCopy(
    [
      ['H2 line 1', 'Drive your projects forward, with'],
      ['H2 line 2', 'a full team behind you'],
    ],
    ['Field', 'Copy'],
  ),
  new Paragraph({ spacing: { after: 200 } }),
)

// --- Final CTA ---
sections.push(
  h2('Final CTA'),
  tableCopy(
    [
      ['H2 line 1', 'Every project, end to end: '],
      ['H2 line 2', 'with agents keeping work moving.'],
      ['Primary', 'Get started free'],
      ['Secondary', 'Talk to sales'],
      ['Microcopy', 'Free forever. No credit card needed.'],
    ],
    ['Field', 'Copy'],
  ),
  new Paragraph({ spacing: { after: 200 } }),
)

// --- Enterprise security ---
sections.push(
  h2('Enterprise security'),
  tableCopy(
    [
      ['Chip', 'Trust & security'],
      ['H2', 'Enterprise-grade security'],
      [
        'Card body',
        'Enterprise-grade AI infrastructure with built-in protection and security, data privacy, governance, permissions, and compliance.',
      ],
      ['Link', 'Explore our Trust Center → https://monday.com/trust'],
      ['Badges', 'GDPR · AICPA SOC 2 · ISO 27001 · HIPAA'],
    ],
    ['Field', 'Copy'],
  ),
  new Paragraph({ spacing: { after: 200 } }),
)

// --- FAQ ---
sections.push(
  h2('FAQ'),
  tableCopy(
    [
      [
        'Q1',
        'How does monday.com help teams deliver more projects on time?',
      ],
      [
        'A1',
        'Teams use monday.com to plan with clear ownership, timelines, and dependencies. Built-in AI keeps plans updated as work changes, monitors progress, and highlights risks as they emerge, so project and portfolio leads always know where things stand.',
      ],
      ['Q2', 'How do AI agents work inside monday.com?'],
      [
        'A2',
        'Agents like the Risk Analyzer, Reporting Manager, and Dependencies Resolver run continuously, monitoring your projects, flagging issues, nudging owners, and generating reports without anyone prompting them. They are native to monday, not add-ons.',
      ],
      ['Q3', 'How does monday replace manual executive reporting?'],
      [
        'A3',
        "monday's AI generates project-level reports from live data on demand. It summarizes RAG status, highlights risks, and formats output for leadership, without anyone compiling updates before each meeting.",
      ],
      [
        'Q4',
        'Can monday support both project managers and portfolio leaders?',
      ],
      [
        'A4',
        'Yes. monday works for any team that runs projects, with or without a dedicated project office. Individual project managers use it to manage tasks, timelines, and team coordination. Leads and ops managers get a rolled-up view across all projects with AI surfacing what needs attention, in the same platform.',
      ],
      ['Q5', 'How quickly can teams get started?'],
      [
        'A5',
        'Most teams are up and running in days. monday.com is self-serve, no IT setup or professional services required. Forrester reports a payback period of under 4 months.',
      ],
    ],
    ['Field', 'Copy'],
  ),
  new Paragraph({ spacing: { after: 200 } }),
)

// --- Customer outcomes (bottom band, monday.com–style cards) ---
sections.push(
  h2('Customer outcomes'),
  tableCopy(
    [
      ['H2 (one line)', 'Real customers, real business outcomes'],
      [
        'Motion',
        'Single horizontal row; infinite carousel (duplicated strip, CSS translate -50%); pauses on hover; respects prefers-reduced-motion',
      ],
      [
        'Card layout (monday.com)',
        'Row 1: brand logo · underlined “See the case study” · Row 2: photo · Row 3: large metric + project outcome label (side by side) · divider · project/program tag pill',
      ],
      [
        'Cards (project-focused)',
        '615% portfolio programs · 105K project hours · 300% initiatives/year · 28% time-to-market · 517% active projects · 346% PM ops TEI',
      ],
      ['Card link', 'See the case study → monday.com/customer-stories'],
    ],
    ['Field', 'Copy'],
  ),
  new Paragraph({ spacing: { after: 200 } }),
)

// --- Footer ---
sections.push(
  h2('Footer'),
  tableCopy(
    [
      ['Tagline', 'Work the way that works for you.'],
      [
        'Products',
        'monday.com, monday CRM, monday dev, Platform',
      ],
      [
        'Solutions',
        'Marketing, Project management, Sales, HR',
      ],
      [
        'Resources',
        'Blog, Help center, Academy, Community',
      ],
      ['Company', 'About, Careers, Partners, Contact us'],
      ['Copyright', '© [year] monday.com. All rights reserved.'],
      ['Legal', 'Privacy policy · Terms of service'],
      ['Languages', 'English · Español'],
    ],
    ['Field', 'Copy'],
  ),
)

const doc = new Document({
  sections: [
    {
      properties: {},
      children: sections,
    },
  ],
})

fs.mkdirSync(outDir, { recursive: true })
const buffer = await Packer.toBuffer(doc)
fs.writeFileSync(outFile, buffer)
console.log(`Wrote ${outFile}`)
