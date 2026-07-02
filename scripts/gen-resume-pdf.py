#!/usr/bin/env python3
"""Generate an ATS-friendly resume PDF for Kashyap Patel."""

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

# ── Font Registration (FreeSans = clean, ATS-safe sans-serif) ──
pdfmetrics.registerFont(TTFont('FreeSans', '/usr/share/fonts/truetype/freefont/FreeSans.ttf'))
pdfmetrics.registerFont(TTFont('FreeSans-Bold', '/usr/share/fonts/truetype/freefont/FreeSansBold.ttf'))
pdfmetrics.registerFont(TTFont('FreeSans-Italic', '/usr/share/fonts/truetype/freefont/FreeSansOblique.ttf'))
pdfmetrics.registerFont(TTFont('FreeSans-BoldItalic', '/usr/share/fonts/truetype/freefont/FreeSansBoldOblique.ttf'))
registerFontFamily('FreeSans', normal='FreeSans', bold='FreeSans-Bold',
                   italic='FreeSans-Italic', boldItalic='FreeSans-BoldItalic')

# ── Colors (subtle, ATS-safe) ──
ACCENT = colors.HexColor('#1a1a1a')
TEXT = colors.HexColor('#1a1a1a')
TEXT_MUTED = colors.HexColor('#555555')

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
    leading=13, spaceBefore=4, spaceAfter=1, textColor=ACCENT
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

def section_header(title):
    return [
        Paragraph(title.upper(), section_title_style),
        HRFlowable(width='100%', thickness=0.8, color=ACCENT,
                   spaceBefore=0, spaceAfter=5),
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

def project_entry(title, tech, url, bullets):
    elements = [
        Paragraph(f'<b>{title}</b>  <font size="9" color="#555555">| {tech}</font>', job_title_style),
        Paragraph(f'{url}', job_meta_style),
    ]
    for b in bullets:
        elements.append(Paragraph(f'\u2022 {b}', bullet_style))
    elements.append(Spacer(1, 1))
    return elements

# ── Build Document ──
doc = SimpleDocTemplate(
    '/home/z/my-project/Kashyap-Patel-Resume.pdf', pagesize=A4,
    leftMargin=1.2*cm, rightMargin=1.2*cm,
    topMargin=1.2*cm, bottomMargin=1.2*cm,
    title='Resume - Kashyap Patel',
    author='Kashyap Patel', creator='Kashyap Patel',
    subject='Full-Stack Developer Resume'
)

story = []

# Header
story.append(Paragraph('KASHYAP PATEL', name_style))
story.append(Paragraph('Full-Stack Developer', role_style))
story.append(Paragraph(
    'kashyappatel326@gmail.com  |  India  |  github.com/kashyap-p  |  linkedin.com/in/kashyap-p',
    contact_style
))

# Summary
story.extend(section_header('Professional Summary'))
story.append(Paragraph(
    'Full-Stack Developer with an engineering backbone, specializing in robust, end-to-end web '
    'applications and AI-powered workflows. 7+ years building on GitHub across the full stack \u2014 '
    'from 3D interfaces (React, Three.js) to resilient backends (Node.js, Express, MongoDB) and '
    'multi-agent AI systems (LangGraph, RAG, vision models). Shipped 12+ public repositories '
    'including a 9-agent insurance claims adjudication copilot.',
    body_style
))

# Skills
story.extend(section_header('Technical Skills'))
story.append(Paragraph('<b>Languages:</b>  TypeScript, JavaScript, Python, SQL', skill_style))
story.append(Paragraph('<b>Frontend:</b>  React, Next.js (16), Three.js, React Three Fiber, Tailwind CSS, HTML5, CSS3', skill_style))
story.append(Paragraph('<b>Backend:</b>  Node.js, Express, REST API Design, Prisma ORM, Passport.js', skill_style))
story.append(Paragraph('<b>AI / ML:</b>  LangGraph, Multi-Agent Workflows, RAG, Vision Models, LLM Integration, Fraud Detection', skill_style))
story.append(Paragraph('<b>Databases:</b>  MongoDB, SQLite, PostgreSQL, Prisma', skill_style))
story.append(Paragraph('<b>Tools & DevOps:</b>  Git, GitHub, Docker, CI/CD, Vercel, Netlify, Render', skill_style))

# Experience
story.extend(section_header('Experience'))
story.extend(experience_entry(
    'AI Engineer & Multi-Agent Systems Developer', 'Independent / Open Source',
    '2026 \u2014 Present', 'India',
    [
        'Designed and built ClaimSight, a multi-modal multi-agent insurance claims adjudication copilot '
        'orchestrating a 9-agent LangGraph-style workflow with RAG, computer-vision damage assessment, '
        'fraud detection, and traceable cited decisions.',
        'Integrated vision-language models for automated damage assessment and policy-document retrieval '
        'using retrieval-augmented generation (RAG).',
        'Built an interactive 3D portfolio website using Next.js 16, React Three Fiber, and Three.js with '
        'real-time WebGL rendering and mouse-parallax camera interaction.',
    ]
))
story.extend(experience_entry(
    'Full-Stack Web Developer', 'Independent',
    '2024 \u2014 2026', 'India',
    [
        'Developed and deployed Wanderlust, a full-stack travel listings platform using Node.js, Express, '
        'and MongoDB with authentication, map integration, and image uploads (deployed on Render).',
        'Built a live weather dashboard with glassmorphism UI, dynamic weather-reactive backgrounds, city '
        'autocomplete, and particle effects using React, Vite, and the Open-Meteo API.',
        'Implemented dynamic GitHub API integration for auto-syncing repository lists with 10-minute '
        'caching and rate-limit-protected refresh.',
    ]
))
story.extend(experience_entry(
    'Frontend Developer', 'Independent',
    '2023 \u2014 2024', 'India',
    [
        'Built a React task management application with priority-based task lists and status tracking.',
        'Developed vanilla JavaScript projects including an IMDB clone and alarm clock utility, cementing '
        'component architecture and DOM manipulation fundamentals.',
        'Created responsive static sites (tech-news, todo app) with HTML, CSS, and JavaScript deployed via '
        'GitHub Pages.',
    ]
))

# Key Projects
story.extend(section_header('Key Projects'))
story.extend(project_entry(
    'ClaimSight', 'TypeScript, Next.js, LangGraph, RAG, Vision AI',
    'github.com/kashyap-p/claimsight  |  Live: claimsight-steel.vercel.app',
    [
        'Multi-agent AI copilot with 9 specialized agents in a coordinated LangGraph workflow for '
        'insurance claims adjudication with cited, traceable decisions.',
    ]
))
story.extend(project_entry(
    'Weather Tracker', 'React, Vite, Open-Meteo API, Canvas',
    'github.com/kashyap-p/weather-tracker  |  Live: kashyap-p.github.io/weather-tracker',
    [
        'Glassmorphism weather dashboard with dynamic backgrounds, city autocomplete, and ambient '
        'particle effects.',
    ]
))
story.extend(project_entry(
    'Wanderlust', 'Node.js, Express, MongoDB, EJS, Passport.js',
    'github.com/kashyap-p/Wanderlust---Nodejs-Project  |  Live: wanderlust-nodejs-project.onrender.com',
    [
        'Full-stack travel listings platform with CRUD operations, authentication, map and image upload '
        'integration.',
    ]
))

# GitHub & Online Presence (compact, merged into final line)
story.extend(section_header('GitHub & Online Presence'))
story.append(Paragraph(
    '<b>GitHub:</b> github.com/kashyap-p \u2014 12 public repositories, 7+ years active (member since 2018) '
    '&nbsp;&nbsp;<b>LinkedIn:</b> linkedin.com/in/kashyap-p',
    body_style
))

doc.build(story)
print("PDF generated: /home/z/my-project/Kashyap-Patel-Resume.pdf")
