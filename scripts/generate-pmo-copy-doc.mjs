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
      ['H1', 'Your projects, fully staffed.'],
      [
        'Body',
        'Status updates, risk flags, executive reports: your agents handle the follow-through so your team can focus on the work that actually moves things forward.',
      ],
      ['Primary CTA', 'Get started free'],
      ['Secondary CTA', 'See it in action →'],
      ['Microcopy', 'Free forever. No credit card needed.'],
    ],
    ['Field', 'Copy'],
  ),
  new Paragraph({ spacing: { after: 200 } }),
)

// --- Logo bar (section below hero) ---
sections.push(
  h2('Logo bar'),
  tableCopy(
    [
      ['Label', 'Trusted by 250,000+ customers worldwide'],
      ['Logo strip', "Canva, Coca-Cola, Lionsgate, McDonald's, BMW, Cartier, VML"],
    ],
    ['Field', 'Copy'],
  ),
  new Paragraph({ spacing: { after: 200 } }),
)

// --- Hero showcase ---
sections.push(
  h2('Hero showcase (placeholder)'),
  tableCopy(
    [
      ['Placeholder', 'HERO IMAGE PLACEHOLDER (black box)'],
      ['Region aria-label', 'Hero image placeholder'],
    ],
    ['Field', 'Copy'],
  ),
  new Paragraph({ spacing: { after: 200 } }),
)

// --- Feature tabs ---
sections.push(
  h2('Feature tabs (How it works)'),
  tableCopy(
    [
      ['Chip', 'How it works'],
      ['H2', 'From brief to done, without the manual work'],
      [
        'Intro',
        'Every stage keeps moving because your agents are always on and your platform always has the full picture.',
      ],
      ['Link', 'Get started →'],
      ['Timeline labels', 'Plan · Align · Run · Track · Report'],
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
      ['Chip', 'Your agents'],
      ['H2', 'A new kind of project team'],
      [
        'Intro',
        "Purpose-built agents that live inside monday, picking up the coordination work your team shouldn't have to do.",
      ],
    ],
    ['Field', 'Copy'],
  ),
  h3('project management agent'),
  tableCopy(
    [
      ['Bullet 1', 'Keeps your plan current as things change.'],
      ['Bullet 2', 'Owners, dates, and priorities updated without anyone having to ask.'],
    ],
    ['Field', 'Copy'],
  ),
  h3('Risk analyzer (New)'),
  tableCopy(
    [
      ['Bullet 1', "Spots what's about to go wrong before it does."],
      ['Bullet 2', 'So you can act while you still have options.'],
    ],
    ['Field', 'Copy'],
  ),
  h3('Reporting manager'),
  tableCopy(
    [
      ['Bullet 1', 'Your exec update, ready before the meeting.'],
      ['Bullet 2', 'No prep, no manual pull, just send it.'],
    ],
    ['Field', 'Copy'],
  ),
  h3('Resource optimizer'),
  tableCopy(
    [
      [
        'Bullet 1',
        'Shows you where your people are stretched and where you have room, across every active project.',
      ],
      ['Bullet 2', 'Shift work before overload turns into missed dates.'],
    ],
    ['Field', 'Copy'],
  ),
  h3('Dependencies resolver'),
  tableCopy(
    [
      ['Bullet 1', "Tracks what's blocking what."],
      ["Bullet 2", "So one slipped task doesn't quietly derail everything downstream."],
    ],
    ['Field', 'Copy'],
  ),
  h3('Create your own'),
  tableCopy(
    [
      ['Bullet 1', 'Build an agent for how your team actually works.'],
      ['Bullet 2', 'Define custom instructions and iterate in monday without writing code.'],
    ],
    ['Field', 'Copy'],
  ),
  new Paragraph({ spacing: { after: 200 } }),
)

// --- Resource management ---
sections.push(
  h2('Resource management (Your people)'),
  tableCopy(
    [
      ['Chip', 'Your people'],
      ['H2', 'Your best people on your most important work'],
      [
        'Intro',
        "When agents handle the coordination, you can see who's overloaded, who has capacity, and whether your staffing matches your priorities, before it's too late to change it.",
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
        'Match the right person to every role',
      ],
      [
        'Allocate the right person: body',
        'Skills, availability, and current load surfaced automatically. You make the call, with the full picture in front of you.',
      ],
      [
        'Balance capacity: headline',
        'Catch overload before it hits delivery',
      ],
      [
        'Balance capacity: body',
        'See capacity gaps across teams and projects in one view. Shift resources before timelines slip, not after.',
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
        "Built for teams that can't afford for projects to slip",
      ],
      [
        'Quote',
        "monday.com's AI helped us cut our project planning time in half. What used to take days now takes minutes, and that speed has directly translated into faster delivery for our clients.",
      ],
      ['Attribution', 'Sarah Luxemberg, Operations Director, VML'],
      ['Stat', '50% faster project delivery'],
      ['G2 line 1', 'Real customers, real outcomes'],
      ['G2 line 2', 'Backed by 14K+ customer reviews.'],
      ['G2 badge categories', 'Leader · Easiest to use · Best results · Highest adoption'],
    ],
    ['Field', 'Copy'],
  ),
  new Paragraph({ spacing: { after: 200 } }),
)

// --- Platform bento ---
sections.push(
  h2('Platform bento (Why monday.com)'),
  tableCopy(
    [['H2', 'Not just another project management tool']],
    ['Field', 'Copy'],
  ),
  h3('Interactive cards'),
  tableCopy(
    [
      [
        'Card 1 title',
        'Built for project work specifically',
      ],
      [
        'Card 1 body',
        'Not a general-purpose tool retrofitted for projects. The data model, the views, the agents, all designed around how project teams actually operate.',
      ],
      ['Card 1 footer', 'G2 · Highest Adoption · Winter 2025'],
      [
        'Card 2 title',
        'AI that knows your context',
      ],
      [
        'Card 2 body',
        'Agents work from your actual project data, not generic templates. The more your team works in monday, the more useful they get.',
      ],
      ['Card 2 stats', '250K+ customers · 190+ industries · From startups to enterprises, worldwide'],
      [
        'Card 3 title',
        'One place, every layer',
      ],
      [
        'Card 3 body',
        'From individual task to full portfolio, it all lives in one platform. No stitching tools together, no data falling through the cracks.',
      ],
      [
        'Card 3 bullets',
        '200+ integrations: Connect your entire stack\nAPI: Build on top of monday',
      ],
      [
        'Card 4 title',
        'Enterprise-ready out of the box',
      ],
      [
        'Card 4 body',
        'Permissions, governance, approval flows, and compliance certifications included. Not an upgrade.',
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
        'Leader in the Gartner Magic Quadrant for Adaptive Project Management and Reporting',
      ],
      [
        'Gartner card body',
        'A Leader in the 2025 Gartner® Magic Quadrant™ for Adaptive Project Management and Reporting, four years in a row.',
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

// --- PM Feature grid (accordion / CapabilityLayers) ---
sections.push(
  h2('Platform capabilities (accordion)'),
  tableCopy(
    [
      ['Chip', 'The platform'],
      ['H2', 'Everything your projects run on'],
      [
        'Subcopy',
        'The depth to handle one project or a hundred. Agents work on top of it, but this is what makes them actually useful.',
      ],
      [
        'Portfolios subtitle',
        'For leads running multiple projects at once, with full visibility across every one of them',
      ],
      ['Project subtitle', 'For project managers running complex delivery end-to-end'],
      [
        'Execution subtitle',
        'Where your people and agents do the actual work, side by side',
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
      ['H2', 'Need something specific? Build it in minutes.'],
      [
        'Subcopy',
        'Describe what you need. monday builds the app on top of your live project data. No developers, no waiting.',
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
      ['Chip', 'Your AI tools'],
      ['H2', 'monday data, in the AI you already use'],
      [
        'Body',
        'Connect your projects to Claude, ChatGPT, Copilot, and more. Ask questions, get answers, take action, without switching tabs or chasing someone for an update.',
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

// --- Final CTA ---
sections.push(
  h2('Final CTA'),
  tableCopy(
    [
      ['H2 line 1', 'Projects delivered. Team capacity protected.'],
      ['H2 line 2', 'Nothing falling through the cracks.'],
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
        'Your project data stays protected with built-in governance, permissions, data privacy, and compliance, across every plan.',
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

// --- Customer outcomes (bottom band, monday.com-style cards) ---
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
