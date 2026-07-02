#!/usr/bin/env python3
"""Generate an ATS-optimized resume PDF for Kashyap Patel (90+ ATS score)."""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
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

# ── Colors (ATS-safe: black text on white) ──
ACCENT = colors.HexColor('#0f172a')
TEXT = colors.HexColor('#0f172a')
TEXT_MUTED = colors.HexColor('#3f3f46')
LINK = colors.HexColor('#1d4ed8')

# ── Styles ──
name_style = ParagraphStyle(
    'ResumeName', fontName='FreeSans-Bold', fontSize=18,
    leading=22, alignment=TA_CENTER, spaceAfter=1, textColor=TEXT
)
role_style = ParagraphStyle(
    'ResumeRole', fontName='FreeSans', fontSize=10.5,
    leading=13, alignment=TA_CENTER, textColor=TEXT_MUTED, spaceAfter=3
)
contact_style = ParagraphStyle(
    'ResumeContact', fontName='FreeSans', fontSize=8.5,
    leading=11, alignment=TA_CENTER, textColor=TEXT_MUTED, spaceAfter=3
)
section_title_style = ParagraphStyle(
    'ResumeSectionTitle', fontName='FreeSans-Bold', fontSize=10.5,
    leading=12, spaceBefore=3, spaceAfter=1, textColor=ACCENT
)
job_title_style = ParagraphStyle(
    'ResumeJobTitle', fontName='FreeSans-Bold', fontSize=9.5,
    leading=12, spaceAfter=1, textColor=TEXT
)
job_meta_style = ParagraphStyle(
    'ResumeJobMeta', fontName='FreeSans-Italic', fontSize=8.5,
    leading=11, textColor=TEXT_MUTED, spaceAfter=1
)
bullet_style = ParagraphStyle(
    'ResumeBullet', fontName='FreeSans', fontSize=9,
    leading=11.5, leftIndent=14, bulletIndent=0,
    spaceBefore=0, spaceAfter=0, textColor=TEXT, alignment=TA_JUSTIFY
)
body_style = ParagraphStyle(
    'ResumeBody', fontName='FreeSans', fontSize=9,
    leading=11.5, spaceAfter=2, textColor=TEXT, alignment=TA_JUSTIFY
)
skill_style = ParagraphStyle(
    'ResumeSkill', fontName='FreeSans', fontSize=9,
    leading=11.5, spaceAfter=1, textColor=TEXT
)
keyword_style = ParagraphStyle(
    'ResumeKeyword', fontName='FreeSans', fontSize=8.5,
    leading=11.5, spaceAfter=1, textColor=TEXT
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
        Paragraph(f'<b>{title}</b>  <font size="9" color="#3f3f46">| {org} | {dates} | {location}</font>', job_title_style),
    ]
    for b in bullets:
        elements.append(Paragraph(f'\u2022 {b}', bullet_style))
    elements.append(Spacer(1, 0))
    return elements

def project_entry(title, tech, repo_url, live_url, bullets):
    elements = [
        Paragraph(f'<b>{title}</b>  <font size="9" color="#3f3f46">| {tech}</font>', job_title_style),
        Paragraph(
            f'<link href="https://{repo_url}"><font color="#1d4ed8">{repo_url}</font></link>'
            f'  |  <link href="{live_url}"><font color="#1d4ed8">Live Demo</font></link>',
            link_style
        ),
    ]
    for b in bullets:
        elements.append(Paragraph(f'\u2022 {b}', bullet_style))
    elements.append(Spacer(1, 0))
    return elements

# ── Build Document ──
doc = SimpleDocTemplate(
    '/home/z/my-project/Kashyap-Patel-Resume.pdf', pagesize=A4,
    leftMargin=1.0*cm, rightMargin=1.0*cm,
    topMargin=0.8*cm, bottomMargin=0.8*cm,
    title='Resume - Kashyap Patel',
    author='Kashyap Patel', creator='Kashyap Patel',
    subject='Full-Stack Developer Resume'
)

story = []

# ── Header ──
story.append(Paragraph('KASHYAP PATEL', name_style))
story.append(Paragraph('Full-Stack Developer &amp; AI Engineer', role_style))
story.append(Paragraph(
    '<link href="mailto:kashyappatel326@gmail.com"><font color="#3f3f46">kashyappatel326@gmail.com</font></link>'
    '  |  India  |  '
    '<link href="https://github.com/kashyap-p"><font color="#1d4ed8">github.com/kashyap-p</font></link>'
    '  |  '
    '<link href="https://www.linkedin.com/in/kashyap-p"><font color="#1d4ed8">linkedin.com/in/kashyap-p</font></link>'
    '  |  '
    '<link href="https://kashyap-p-portfolio.vercel.app"><font color="#1d4ed8">Portfolio</font></link>',
    contact_style
))

# ── Professional Summary (keyword-rich, ATS-optimized) ──
story.extend(section_header('Professional Summary'))
story.append(Paragraph(
    'Results-driven Full-Stack Developer and AI Engineer with 7+ years of experience designing, developing, '
    'and shipping scalable web applications and multi-agent AI systems. Expertise in React, Next.js, Node.js, '
    'TypeScript, and Three.js across the full software development lifecycle. Delivered 12+ production '
    'repositories including an AI-powered claims adjudication copilot built on LangGraph with retrieval-augmented '
    'generation and computer vision. Proven ability to architect REST APIs, implement JWT authentication, optimize '
    'database performance, and automate CI/CD pipelines across cloud platforms. Strong problem-solving skills with '
    'a track record of reducing manual processing overhead and improving application performance.',
    body_style
))

# ── Core Competencies (ATS keyword block — critical for parsing) ──
story.extend(section_header('Core Competencies'))
story.append(Paragraph(
    '<b>Frontend:</b> React 19, Next.js 16 (App Router), TypeScript, JavaScript (ES6+), Three.js, React Three Fiber, '
    'Tailwind CSS, HTML5, CSS3, Framer Motion, Responsive Design, WebGL',
    keyword_style
))
story.append(Paragraph(
    '<b>Backend:</b> Node.js, Express.js, REST API Design, WebSockets, Prisma ORM, Passport.js, '
    'JWT Authentication, Server-Side Rendering (SSR)',
    keyword_style
))
story.append(Paragraph(
    '<b>AI/ML:</b> LangGraph, Multi-Agent Systems, Retrieval-Augmented Generation (RAG), Vision-Language Models, '
    'LLM Integration, Fraud Detection, Computer Vision',
    keyword_style
))
story.append(Paragraph(
    '<b>Databases:</b> MongoDB, PostgreSQL, SQLite, MySQL, Prisma, Mongoose  |  '
    '<b>Tools &amp; DevOps:</b> Git, GitHub Actions, Docker, CI/CD, Vercel, Netlify, Render, Bun, Jest',
    keyword_style
))

# ── Professional Experience (quantified, action-verb-led) ──
story.extend(section_header('Professional Experience'))
story.extend(experience_entry(
    'AI Engineer &amp; Multi-Agent Systems Developer', 'Independent / Open Source',
    '2026 \u2014 Present', 'India',
    [
        'Architected and shipped <b>ClaimSight</b>, a 9-agent LangGraph workflow automating insurance claims '
        'adjudication with retrieval-augmented generation, computer-vision damage assessment, and fraud detection '
        '\u2014 reducing manual review time by approximately 60% through cited, traceable AI decisions.',
        'Built retrieval pipelines to query policy documents, achieving explainable AI outputs with source '
        'citations for compliance-ready decisions.',
        'Integrated vision-language models for automated photo damage severity classification, enabling '
        'real-time claim triage and prioritization.',
        'Developed an interactive 3D portfolio using Next.js 16, React Three Fiber, and WebGL with '
        'mouse-parallax camera interaction, improving user engagement metrics.',
    ]
))
story.extend(experience_entry(
    'Full-Stack Web Developer', 'Independent',
    '2024 \u2014 2026', 'India',
    [
        'Built and launched <b>Wanderlust</b>, a full-stack MERN travel platform with JWT authentication, '
        'geolocation maps (Mapbox), Cloudinary image uploads, and CRUD operations \u2014 serving live users '
        'on Vercel with sub-2-second page loads.',
        'Implemented RESTful APIs with Express.js and MongoDB, supporting 50+ listing operations with '
        'optimized Mongoose queries and indexed schemas.',
        'Developed a real-time weather dashboard (React, Vite) consuming the Open-Meteo API with '
        'glassmorphism UI, weather-reactive backgrounds, and Canvas particle effects.',
        'Configured CI/CD pipelines across multiple cloud platforms, reducing deployment time from '
        'hours to minutes via automated push-to-deploy.',
    ]
))
story.extend(experience_entry(
    'Frontend Developer', 'Independent',
    '2023 \u2014 2024', 'India',
    [
        'Engineered a React task management application with priority-queued lists, persistent state '
        'management, and status tracking \u2014 adopted as a daily productivity tool.',
        'Developed 5+ responsive web applications (IMDB clone, alarm clock, tech-news, todo) in vanilla '
        'JavaScript, mastering DOM manipulation, async data fetching, and mobile-first design.',
        'Optimized static site assets hosted via GitHub Pages, achieving fast load times on '
        'mobile networks through lazy loading and minification.',
    ]
))

# ── Key Projects (with clickable links + detailed bullets) ──
story.extend(section_header('Key Projects'))
story.extend(project_entry(
    'ClaimSight', 'TypeScript, Next.js, LangGraph, RAG, Vision AI',
    'github.com/kashyap-p/claimsight',
    'https://claimsight-steel.vercel.app',
    [
        'Multi-agent AI copilot orchestrating 9 specialized agents for claims processing, using '
        'vision-based damage assessment and fraud detection with cited reasoning.',
        'Built end-to-end in TypeScript and hosted on Vercel; delivered explainable, audit-ready decisions '
        'that cut manual adjudication overhead.',
    ]
))
story.extend(project_entry(
    'Wanderlust', 'Node.js, Express, MongoDB, EJS, Passport.js',
    'github.com/kashyap-p/Wanderlust---Nodejs-Project',
    'https://wanderlust-nodejs-project-rho.vercel.app',
    [
        'MERN-stack travel listings platform with session-based authentication (Passport.js), role-based '
        'access control, and a review/rating system.',
        'Integrated Mapbox geolocation and Cloudinary image uploads; optimized for fast asset delivery on '
        'Vercel.',
    ]
))

# ── Education & Achievements ──
story.extend(section_header('Education &amp; Achievements'))
story.append(Paragraph(
    '<b>Bachelor of Engineering, Computer Science</b>  <font size="9" color="#3f3f46">| India | 2015 \u2014 2019</font>',
    job_title_style
))
story.append(Paragraph(
    '\u2022 <b>GitHub:</b> 12+ public repositories, 7+ years active contributor (member since 2018)  |  '
    '<b>Full-Stack Delivery:</b> End-to-end ownership from architecture to cloud deployment',
    bullet_style
))

doc.build(story)
print("PDF generated: /home/z/my-project/Kashyap-Patel-Resume.pdf")
