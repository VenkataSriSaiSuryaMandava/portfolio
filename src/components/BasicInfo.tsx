"use client";

import SectionHeading from '@/components/SectionHeading';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import SectionReveal from '@/components/ui/SectionReveal';

const CONTACT = {
  email: 'mandavavenkatasrisaisurya@gmail.com',
  phone: '7169085504',
  locationCity: 'Buffalo, New York',
  locationCountry: 'United States',
  github: 'https://github.com/VenkataSriSaiSuryaMandava',
  linkedin: 'https://www.linkedin.com/in/venkatasrisaisuryamandava/',
  instagram: 'https://www.instagram.com/surya._.mandava/',
};

export default function BasicInfo() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // no-op (clipboard might be blocked)
    }
  }

  return (
    <section
      id="basic"
      className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Top fade overlay to blend this section into the Hero background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-10 h-40 bg-gradient-to-b from-transparent via-white/80 to-transparent dark:via-black/40 blur-2xl opacity-80"
      />
      <SectionReveal>
        <SectionHeading title="Basic Information" subtitle="Who I am & how to reach me" />
      </SectionReveal>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left column: Email / Phone / Location */}
        <SectionReveal delay={0.05}>
          <motion.div
            data-accent="1"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            className="card-surface card-hover p-6"
          >
            <div className="space-y-4">
              <div className="rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-white/50 dark:bg-black/25 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 min-w-0">
                    <span className="mt-0.5 text-primary">
                      <FaEnvelope />
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Email</div>
                      <a
                        href={`mailto:${CONTACT.email}`}
                        className="mt-1 block font-semibold text-gray-900 dark:text-gray-100 break-all lg:break-words"
                        title={CONTACT.email}
                      >
                        {CONTACT.email}
                      </a>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={copyEmail}
                    className="shrink-0 rounded-full border border-gray-200/70 dark:border-gray-800/70 bg-white/70 dark:bg-black/30 px-3 py-2 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:border-primary/40 hover:bg-primary/5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                    aria-label="Copy email"
                  >
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              <InfoRow
                icon={<FaPhoneAlt />}
                label="Phone"
                value={formatPhone(CONTACT.phone)}
                valueClassName="whitespace-nowrap"
                href={`tel:${CONTACT.phone}`}
              />

              <InfoRow
                icon={<FaMapMarkerAlt />}
                label="Location"
                value={`${CONTACT.locationCity}, ${CONTACT.locationCountry}`}
              />
            </div>
          </motion.div>
        </SectionReveal>

        {/* Right column: Quick links (stacked) */}
        <SectionReveal delay={0.1}>
          <motion.div
            data-accent="2"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            className="card-surface card-hover p-6"
          >
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Quick Links</h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">GitHub, LinkedIn, Instagram, Email</p>

            <div className="mt-5 grid gap-3">
              <QuickLink href={CONTACT.github} label="GitHub" icon={<FaGithub className="text-xl" />} />
              <QuickLink href={CONTACT.linkedin} label="LinkedIn" icon={<FaLinkedin className="text-xl" />} />
              <QuickLink href={CONTACT.instagram} label="Instagram" icon={<FaInstagram className="text-xl" />} />
              <QuickLink href={`mailto:${CONTACT.email}`} label="Email" icon={<SiGmail className="text-xl" />} newTab={false} />
            </div>


          </motion.div>
        </SectionReveal>
      </div>
    </section>
  );
}

function formatPhone(raw: string) {
  const digits = (raw || '').replace(/\D/g, '');
  if (digits.length === 10) {
    return `+1 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return raw;
}

function InfoRow({
  icon,
  label,
  value,
  href,
  valueClassName,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  valueClassName?: string;
}) {
  const content = (
    <div className="flex items-start gap-3 rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-white/50 dark:bg-black/25 p-4">
      <span className="mt-0.5 text-primary">{icon}</span>
      <div className="min-w-0">
        <div className="text-xs font-medium text-gray-500 dark:text-gray-400">{label}</div>
        <div className={`mt-1 font-semibold text-gray-900 dark:text-gray-100 min-w-0 ${valueClassName ?? "text-base"}`}>{value}</div>
      </div>
    </div>
  );

  if (!href) return content;

  return (
    <a
      href={href}
      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-2xl"
    >
      {content}
    </a>
  );
}

function QuickLink({
  href,
  label,
  icon,
  newTab = true,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  newTab?: boolean;
}) {
  return (
    <a
      href={href}
      target={newTab ? '_blank' : undefined}
      rel={newTab ? 'noopener noreferrer' : undefined}
      className="group flex items-center justify-between gap-3 rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-white/55 dark:bg-black/20 px-4 py-3 hover:border-primary/40 hover:bg-primary/5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      aria-label={label}
    >
      <span className="flex items-center gap-2">
        <span className="text-gray-700 dark:text-gray-200 group-hover:text-primary transition-colors">{icon}</span>
        <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{label}</span>
      </span>
      <span className="text-gray-400" aria-hidden>
        ↗
      </span>
    </a>
  );
}
