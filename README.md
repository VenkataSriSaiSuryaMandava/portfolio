# Venkata Sri Sai Surya Mandava — Portfolio

Premium, recruiter-ready personal portfolio built with **Next.js 16 (App Router)**, **Tailwind CSS**, and **Framer Motion**.

All content is **data-driven** so you can update skills, projects, experience, and publications from centralized files.

## ✨ What you get

- Premium hero with an animated mesh gradient and subtle CTA micro-interactions
- Sticky navbar with scroll-spy active indicator + smooth anchor scrolling
- Scroll progress bar
- Highlights chips + marquee
- Skills as interactive tilt cards with animated radial + linear progress
- Projects as a minimal list with hover-reveal details (desktop) and tap-to-expand (mobile)
- Experience + Education timelines
- Publications cards
- Licenses & certifications section editable from a single file
- Resume download (expects `public/resume.pdf`)
- Contact form that emails you via a Next.js API route (Nodemailer)
- Dark/Light mode with a persisted toggle
- Accessibility improvements (skip link, keyboard focus states, aria labels)

## 📦 Project structure

```
portfolio/
  public/
    resume.pdf
    images/
  src/
    app/
      layout.tsx
      page.tsx
      globals.css
    components/
      Hero.tsx
      BasicInfo.tsx
      About.tsx
      Highlights.tsx
      Skills.tsx
      Projects.tsx
      Experience.tsx
      Certifications.tsx
      Publications.tsx
      Education.tsx
      ResumeSection.tsx
      Contact.tsx
      Navbar.tsx
      Footer.tsx
      ScrollProgress.tsx
      SectionHeading.tsx
      ThemeProvider.tsx
      ui/
        MagneticButton.tsx
        MeshGradient.tsx
        SectionReveal.tsx
        TiltCard.tsx
    data/
      data.ts
      certifications.ts
    hooks/
      useScrollSpy.tsx
      useTypewriter.tsx
    types/
      index.ts
```

## ✅ Setup

```bash
npm install
npm run dev
```

Then open: `http://localhost:3000`

## 🧩 Customize your content

All content is centralized in:

- `src/data/data.ts` — skills, projects, experience, publications, education
- `src/data/certifications.ts` — licenses & certifications

You can also tweak the hero headline text in:

- `src/components/Hero.tsx`

## 📄 Resume PDF

Place your resume at:

```
public/resume.pdf
```

The resume button/section references `/resume.pdf`.

## 📬 Contact form (emails to you)

The contact form sends an email via a **Next.js API route** (`src/app/api/contact/route.ts`) using **Nodemailer**.

### 1) Create `.env.local`

```bash
cp .env.example .env.local
```

### 2) Set SMTP credentials

Recommended Gmail settings (use a Google **App Password**, not your normal Gmail password):

```ini
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your_gmail@gmail.com
SMTP_PASS=your_app_password
CONTACT_TO=mandavavenkatasrisaisurya@gmail.com
```

### 3) Test locally

```bash
npm run dev
```

Submit the form and you should receive an email at `CONTACT_TO`.

## 🚀 Deployment (Vercel)

This portfolio is deployed on **Vercel** with automatic CI/CD from GitHub.

**Live URL:**  
https://portfolio-venkata-sri-sai-surya-mandavas-projects.vercel.app/

### Deployment details
- Platform: Vercel  
- Framework: Next.js 16 (App Router)  
- Build command: `npm run build`  
- Automatic deployments on every push to `main`  
- Environment variables managed via Vercel Dashboard  
- Optimized with Vercel’s global edge network