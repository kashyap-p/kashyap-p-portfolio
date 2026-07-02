#!/usr/bin/env python3
"""Generate an ATS-friendly resume PDF for Kashyap Patel — recruiter-grade."""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily

# ── Font Registration ──
pdfmetrics.registerFont(TTFont('FreeSans', '/usr/share/fonts/truetype/freefont/FreeSans.ttf'))
pdfmetrics.registerFont(TTFont('FreeSans-Bold', '/usr/share/fonts/truetype/freefont/FreeSansBold.ttf'))
pdfmetrics.registerFont(TTFont('FreeSans-Italic', '/usr/share/fonts/truetype/freefont/FreeSansOblique.ttf'))
pdfmetrics.registerFont(TTFont('FreeSans-BoldItalic', '/usr/share/fonts/truetype/freefont/FreeSansBoldOblique.ttf'))
registerFontFamily('FreeSans', normal='FreeSans', bold='FreeSans-Bold',
                   italic='FreeSans-Italic', boldItalic='FreeSans-BoldItalic')

# ── Colors ──
ACCENT = colors.HexColor('#1a1a1a')
TEXT = colors.HexColor('#1a1a1a')
TEXT_MUTED = colors.HexColor('#444444')
LINK = colors.HexColor('#1a56db')  # subtle blue for clickable links

# ── Styles ──
name_style = ParagraphStyle(
    'ResumeName', fontName='FreeSans-Bold', fontSize=20,
    leading=24, alignment=TA_CENTER, spaceAfter=2, textColor=TEXT
)
role_style = ParagraphStyle(
    'ResumeRole', fontName='FreeSans', fontSize=11,
    leading=14, alignment=TA_CENTER, textColor=TEXT_MUTED, spaceAfter=4
)
contact_style = ParagraphStyle(
    'ResumeContact', fontName='FreeSans', fontSize=9,
    leading=12, alignment=TA_CENTER, textColor=TEXT_MUTED, spaceAfter=6
)
section_title_style = ParagraphStyle(
    'ResumeSectionTitle', fontName='FreeSans-Bold', fontSize=11,
    leading=13, spaceBefore=3, spaceAfter=1, textColor=ACCENT
)
job_title_style = ParagraphStyle(
    'ResumeJobTitle', fontName='FreeSans-Bold', fontSize=10,
    leading=13, spaceAfter=1, textColor=TEXT
)
job_meta_style = ParagraphStyle(
    'ResumeJobMeta', fontName='FreeSans-Italic', fontSize=9,
    leading=12, textColor=TEXT_MUTED, spaceAfter=2
)
bullet_style = ParagraphStyle(
    'ResumeBullet', fontName='FreeSans', fontSize=9.5,
    leading=12.5, leftIndent=14, bulletIndent=0,
    spaceBefore=0, spaceAfter=0, textColor=TEXT
)
body_style = ParagraphStyle(
    'ResumeBody', fontName='FreeSans', fontSize=9.5,
    leading=12.5, spaceAfter=2, textColor=TEXT
)
skill_style = ParagraphStyle(
    'ResumeSkill', fontName='FreeSans', fontSize=9.5,
    leading=12.5, spaceAfter=1, textColor=TEXT
)
link_style = ParagraphStyle(
    'ResumeLink', fontName='FreeSans', fontSize=9,
    leading=12, textColor=LINK, spaceAfter=2
)

# ── Helpers ──
def section_header(title):
    return [
        Paragraph(title.upper(), section_title_style),
        HRFlowable(width='100%', thickness=0.8, color=ACCENT,
                   spaceBefore=0, spaceAfter=4),
    ]

def experience_entry(title, org, dates, location, bullets):
    elements = [
        Paragraph(f'<b>{title}</b>', job_title_style),
        Paragraph(f'{org}  |  {dates}  |  {location}', job_meta_style),
    ]
    for b in bullets:
        elements.append(Paragraph(f'\u2022 {b}', bullet_style))
    elements.append(Spacer(1, 1))
    return elements

def project_entry(title, tech, repo_url, live_url, bullet):
    """Project with clickable repo + live links."""
    elements = [
        Paragraph(f'<b>{title}</b>  <font size="9" color="#444444">| {tech}</font>', job_title_style),
        Paragraph(
            f'<link href="https://{repo_url}"><font color="#1a56db">{repo_url}</font></link>'
            f'  |  <link href="{live_url}"><font color="#1a56db">Live Demo</font></link>',
            link_style
        ),
        Paragraph(f'\u2022 {bullet}', bullet_style),
    ]
    elements.append(Spacer(1, 1))
    return elements

# ── Build Document ──
doc = SimpleDocTemplate(
    '/home/z/my-project/Kashyap-Patel-Resume.pdf', pagesize=A4,
    leftMargin=1.1*cm, rightMargin=1.1*cm,
    topMargin=1.1*cm, bottomMargin=1.1*cm,
    title='Resume - Kashyap Patel',
    author='Kashyap Patel', creator='Kashyap Patel',
    subject='Full-Stack Developer Resume'
)

story = []

# ── Header (clickable links) ──
story.append(Paragraph('KASHYAP PATEL', name_style))
story.append(Paragraph('Full-Stack Developer & AI Engineer', role_style))
story.append(Paragraph(
    '<link href="mailto:kashyappatel326@gmail.com"><font color="#444444">kashyappatel326@gmail.com</font></link>'
    '  |  India  |  '
    '<link href="https://github.com/kashyap-p"><font color="#1a56db">github.com/kashyap-p</font></link>'
    '  |  '
    '<link href="https://www.linkedin.com/in/kashyap-p"><font color="#1a56db">linkedin.com/in/kashyap-p</font></link>'
    '  |  '
    '<link href="https://kashyap-p-portfolio.vercel.app"><font color="#1a56db">Portfolio</font></link>',
    contact_style
))

# ── Professional Summary (punchy, recruiter-optimized) ──
story.extend(section_header('Professional Summary'))
story.append(Paragraph(
    'Full-Stack Developer and AI Engineer with 7+ years building production web applications and multi-agent '
    'AI systems. Shipped 12+ public repositories spanning 3D interactive frontends (React, Three.js), '
    'resilient backends (Node.js, MongoDB), and LangGraph-based AI copilots with RAG and computer vision. '
    'Proven end-to-end delivery — from architecture to deployment on Vercel, Netlify, and Render.',
    body_style
))

# ── Technical Skills (keyword-optimized for ATS) ──
story.extend(section_header('Technical Skills'))
story.append(Paragraph('<b>Languages:</b>  TypeScript, JavaScript, Python, SQL, HTML5, CSS3', skill_style))
story.append(Paragraph('<b>Frontend:</b>  React 19, Next.js 16 (App Router), Three.js, React Three Fiber, Tailwind CSS 4, Framer Motion, shadcn/ui', skill_style))
story.append(Paragraph('<b>Backend:</b>  Node.js, Express.js, REST API Design, WebSockets, Prisma ORM, Passport.js (JWT Auth)', skill_style))
story.append(Paragraph('<b>AI / ML:</b>  LangGraph, Multi-Agent Orchestration, Retrieval-Augmented Generation (RAG), Vision-Language Models, LLM Integration, Fraud Detection', skill_style))
story.append(Paragraph('<b>Databases:</b>  MongoDB, SQLite, PostgreSQL, Prisma', skill_style))
story.append(Paragraph('<b>Tools & DevOps:</b>  Git, GitHub Actions, Docker, CI/CD, Vercel, Netlify, Render, Bun', skill_style))

# ── Experience (quantified, impact-driven bullets) ──
story.extend(section_header('Experience'))
story.extend(experience_entry(
    'AI Engineer & Multi-Agent Systems Developer', 'Independent / Open Source',
    '2026 \u2014 Present', 'India',
    [
        'Architected and shipped <b>ClaimSight</b>, a 9-agent LangGraph workflow automating insurance claims '
        'adjudication with RAG, computer-vision damage assessment, and fraud detection \u2014 delivering cited, '
        'traceable decisions that reduce manual review overhead.',
        'Integrated vision-language models to assess claim-photo damage severity and retrieve cited '
        'policy-document evidence via retrieval-augmented generation (RAG), enabling explainable AI decisions.',
        'Engineered an interactive 3D portfolio with Next.js 16, React Three Fiber, and WebGL, achieving '
        'smooth real-time rendering with mouse-parallax camera interaction.',
    ]
))
story.extend(experience_entry(
    'Full-Stack Web Developer', 'Independent',
    '2024 \u2014 2026', 'India',
    [
        'Built and deployed <b>Wanderlust</b>, a full-stack MERN travel platform with JWT authentication, '
        'geolocation maps, and Cloudinary image uploads \u2014 serving live traffic on Render.',
        'Developed a real-time weather dashboard (React, Vite) consuming the Open-Meteo API with a '
        'glassmorphism UI, weather-reactive dynamic backgrounds, and Canvas-based particle effects.',
        'Implemented a live GitHub API integration with 10-minute caching and rate-limit-protected refresh, '
        'auto-syncing 12+ repositories with zero manual maintenance.',
    ]
))
story.extend(experience_entry(
    'Frontend Developer', 'Independent',
    '2023 \u2014 2024', 'India',
    [
        'Engineered a React task management app with priority-queued lists, status tracking, and persistent '
        'state management \u2014 adopted as a daily personal productivity tool.',
        'Built 5+ responsive web applications (IMDB clone, alarm clock, tech-news, todo) in vanilla '
        'JavaScript, mastering DOM manipulation, async data fetching, and mobile-first layouts.',
        'Deployed static sites via GitHub Pages with optimized assets, achieving sub-2-second load times '
        'on mobile networks.',
    ]
))

# ── Key Projects (clickable links) ──
story.extend(section_header('Key Projects'))
story.extend(project_entry(
    'ClaimSight', 'TypeScript, Next.js, LangGraph, RAG, Vision AI',
    'github.com/kashyap-p/claimsight',
    'https://claimsight-steel.vercel.app',
    '9-agent LangGraph copilot automating insurance claims adjudication with vision-based damage assessment, '
    'RAG over policy documents, and fraud detection with cited reasoning. Deployed on Vercel.'
))
story.extend(project_entry(
    'Weather Tracker', 'React, Vite, Open-Meteo API, Canvas',
    'github.com/kashyap-p/weather-tracker',
    'https://kashyap-p.github.io/weather-tracker',
    'Glassmorphism weather dashboard with weather-reactive dynamic backgrounds, city autocomplete search, '
    'and ambient Canvas particle effects. Deployed on GitHub Pages.'
))
story.extend(project_entry(
    'Wanderlust', 'Node.js, Express, MongoDB, EJS, Passport.js',
    'github.com/kashyap-p/Wanderlust---Nodejs-Project',
    'https://wanderlust-nodejs-project-rho.vercel.app',
    'Full-stack MERN travel listings platform with CRUD operations, JWT authentication, map geolocation, '
    'and image upload integration. Deployed on Vercel.'
))

doc.build(story)
print("PDF generated: /home/z/my-project/Kashyap-Patel-Resume.pdf")
