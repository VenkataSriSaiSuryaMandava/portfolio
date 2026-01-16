"use client";

import SectionHeading from '@/components/SectionHeading';
import SectionReveal from '@/components/ui/SectionReveal';
import { useReducedMotion, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { FaGithub, FaLinkedin, FaInstagram, FaPaperPlane } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';

const LINKS = {
  github: 'https://github.com/VenkataSriSaiSuryaMandava',
  linkedin: 'https://www.linkedin.com/in/venkatasrisaisuryamandava/',
  instagram: 'https://www.instagram.com/surya._.mandava/',
  email: 'mandavavenkatasrisaisurya@gmail.com',
};

type Status =
  | { state: 'idle' }
  | { state: 'submitting' }
  | { state: 'success'; message: string }
  | { state: 'error'; message: string };

export default function Contact() {
  const reduce = useReducedMotion();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>({ state: 'idle' });

  const canSubmit = useMemo(() => {
    const okEmail = /.+@.+\..+/.test(email.trim());
    return name.trim().length >= 2 && okEmail && message.trim().length >= 10;
  }, [name, email, message]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) {
      setStatus({ state: 'error', message: 'Please fill all fields (message at least 10 characters).' });
      return;
    }

    try {
      setStatus({ state: 'submitting' });
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      const data = (await res.json()) as { ok: boolean; message?: string };
      if (!res.ok || !data.ok) {
        throw new Error(data.message || 'Failed to send message.');
      }

      setStatus({ state: 'success', message: 'Message sent! I will get back to you soon.' });
      setName('');
      setEmail('');
      setMessage('');
    } catch (err: any) {
      setStatus({ state: 'error', message: err?.message || 'Something went wrong. Please try again.' });
    }
  }

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionReveal>
        <SectionHeading title="Get In Touch" subtitle="Let’s build something together" />
      </SectionReveal>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Form card */}
        <SectionReveal delay={0.05}>
          <motion.div
            data-accent="3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.5 }}
            className="card-surface card-hover p-6"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Contact Form</h3>
              <span className="text-xs rounded-full border border-primary/25 bg-primary/10 text-primary px-3 py-1">
                Replies to your email
              </span>
            </div>

            {/* Status */}
            {status.state === 'success' ? (
              <div className="mt-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-800 dark:text-emerald-200">
                {status.message}
              </div>
            ) : status.state === 'error' ? (
              <div className="mt-4 rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-800 dark:text-rose-200">
                {status.message}
              </div>
            ) : null}

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <Field label="Name" value={name} onChange={setName} placeholder="Your name" />
              <Field label="Email" value={email} onChange={setEmail} placeholder="you@example.com" type="email" />
              <Field
                label="Message"
                value={message}
                onChange={setMessage}
                placeholder="Tell me about the role, project, or opportunity you’d like to discuss…"
                multiline
              />

              <button
                type="submit"
                disabled={!canSubmit || status.state === 'submitting'}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 disabled:opacity-50 disabled:cursor-not-allowed transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                <FaPaperPlane className={reduce ? '' : 'group-hover:-translate-y-[1px] transition-transform'} />
                {status.state === 'submitting' ? 'Sending…' : 'Send Message'}
              </button>


            </form>
          </motion.div>
        </SectionReveal>

        {/* Right card */}
        <SectionReveal delay={0.1}>
          <motion.div
            data-accent="4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.5 }}
            className="card-surface card-hover bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 dark:from-primary/15 dark:to-secondary/15 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Quick Links</h3>
            <p className="mt-2 text-gray-700 dark:text-gray-300 leading-relaxed">
              Feel free to reach out if you’re looking for a software engineer, have a question, or just want to connect.
            </p>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Social href={LINKS.github} label="GitHub" icon={<FaGithub className="text-xl" />} />
              <Social href={LINKS.linkedin} label="LinkedIn" icon={<FaLinkedin className="text-xl" />} />
              <Social href={LINKS.instagram} label="Instagram" icon={<FaInstagram className="text-xl" />} />
              <Social href={`mailto:${LINKS.email}`} label="Email" icon={<SiGmail className="text-xl" />} />
            </div>
          </motion.div>
        </SectionReveal>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  multiline,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  multiline?: boolean;
}) {
  const common =
    'w-full rounded-2xl border border-gray-200/70 dark:border-gray-800/70 bg-white/60 dark:bg-black/25 px-4 py-3 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40';

  return (
    <label className="block">
      <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{label}</span>
      {multiline ? (
        <textarea
          className={common + ' min-h-[120px] resize-y'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      ) : (
        <input
          className={common}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}
    </label>
  );
}

function Social({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group flex items-center justify-center gap-2 rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-white/55 dark:bg-black/20 px-4 py-3 hover:border-primary/40 hover:bg-primary/5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
    >
      <span className="text-gray-700 dark:text-gray-200 group-hover:text-primary transition-colors">{icon}</span>
      <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{label}</span>
    </a>
  );
}
