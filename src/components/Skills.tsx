"use client";

import SectionHeading from "@/components/SectionHeading";
import { skillCategories } from "@/data/data";
import { useReducedMotion } from "framer-motion";
import TiltCard from "@/components/ui/TiltCard";
import SectionReveal from "@/components/ui/SectionReveal";

// Icons
import {
  SiC,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiFramer,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiAmazonaws,
  SiGooglecloud,
  SiMicrosoftazure,
  SiDocker,
  SiLinux,
  SiPython,
  SiTensorflow,
  SiPytorch,
  SiMysql,
  SiRedis,
  SiGithub,
  SiKubernetes,
  SiVisualstudiocode,
  SiJest,
  SiTestinglibrary,
  SiCypress,
  SiHtml5,
  SiCss3,
  SiFastapi,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { FiServer, FiShield, FiZap, FiLayers, FiCpu, FiCheckCircle } from "react-icons/fi";

/**
 * Resolve icon for a skill name
 */
function iconForSkill(name: string) {
  const key = name.toLowerCase();

  if (key.includes("react")) return <SiReact />;
  if (key.includes("next")) return <SiNextdotjs />;
  if (key.includes("typescript")) return <SiTypescript />;
  if (key.includes("javascript")) return <SiJavascript />;
  if (key.includes("tailwind")) return <SiTailwindcss />;
  if (key.includes("framer")) return <SiFramer />;
  if (key.includes("node")) return <SiNodedotjs />;
  if (key.includes("express")) return <SiExpress />;
  if (key.includes("postgres")) return <SiPostgresql />;
  if (key.includes("mongo")) return <SiMongodb />;
  if (key === "aws") return <SiAmazonaws />;
  if (key === "gcp") return <SiGooglecloud />;
  if (key === "azure") return <SiMicrosoftazure />;
  if (key.includes("docker")) return <SiDocker />;
  if (key.includes("linux")) return <SiLinux />;
  if (key.includes("python")) return <SiPython />;
  if (key === "java") return <FaJava />;
  if (key === "sql") return <FiLayers />;
  if (key.includes("c/c") || key === "c" || key.includes("c++")) return <SiC />;
  if (key.includes("tensorflow")) return <SiTensorflow />;
  if (key.includes("pytorch")) return <SiPytorch />;
  if (key.includes("fastapi")) return <SiFastapi />;
  if (key.includes("html")) return <SiHtml5 />;
  if (key.includes("css")) return <SiCss3 />;
  if (key.includes("mysql")) return <SiMysql />;
  if (key.includes("redis")) return <SiRedis />;
  if (key.includes("git")) return <SiGithub />;
  if (key.includes("github")) return <SiGithub />;
  if (key.includes("kubernetes")) return <SiKubernetes />;
  if (key.includes("vs code") || key.includes("visual studio code")) return <SiVisualstudiocode />;
  if (key.includes("jest")) return <SiJest />;
  if (key.includes("testing library")) return <SiTestinglibrary />;
  if (key.includes("cypress")) return <SiCypress />;
  if (key.includes("unit testing")) return <FiCheckCircle />;
  if (key.includes("microservices")) return <FiServer />;
  if (key.includes("nlp")) return <FiCpu />;
  if (key.includes("rest")) return <FiServer />;
  if (key.includes("auth")) return <FiShield />;
  if (key.includes("cicd")) return <FiZap />;
  if (key.includes("system")) return <FiLayers />;
  if (key.includes("machine") || key.includes("ml")) return <FiCpu />;

  return null;
}

export default function Skills() {
  // Keep reduced-motion hook to avoid animation-heavy UI for users who prefer it.
  useReducedMotion();

  const categorySubtitle: Record<string, string> = {
    "Programming Languages": "Languages I use to build real-world software.",
    "Frameworks & Libraries": "Frameworks and libraries for modern web applications.",
    Frontend: "UI engineering for responsive, accessible experiences.",
    Backend: "APIs and backend systems that scale reliably.",
    Databases: "Data stores for fast, consistent, and secure systems.",
    "Tools & Platforms": "Tools I use to build, test, and ship software.",
    "Testing & Quality": "Testing practices that keep software reliable.",
    "Cloud & DevOps": "Cloud infrastructure and deployment workflows.",
    "AI / ML": "Tools for building and applying ML-driven features.",
    "Core Concepts": "CS fundamentals that guide my engineering decisions.",
  };

  return (
    <section
      id="skills"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <SectionReveal>
        <SectionHeading
          title="Technical Skills"
          subtitle="A modern software engineering stack across frontend, backend, cloud, AI/ML, and core CS fundamentals."
        />
      </SectionReveal>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {skillCategories.map((category, idx) => (
          <SectionReveal key={category.category} delay={idx * 0.05}>
            <TiltCard className="rounded-3xl">
              <div data-accent={(idx % 6).toString()} className="card-surface card-hover p-6">
                {/* Category Header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-primary">
                      {category.category}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {categorySubtitle[category.category] ?? ""}
                    </p>
                  </div>
                </div>

                {/* Skills Grid (clean cards, no progress bars) */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {category.skills.map((skill) => {
                    const Icon = iconForSkill(skill.name);

                    return (
                      <div
                        key={skill.name}
                        className="group relative rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-black/40 p-4 hover:border-primary/30 hover:bg-primary/5 transition"
                      >
                        <div className="flex items-center gap-3">
                          {Icon ? (
                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-black/5 dark:border-white/10 bg-white/80 dark:bg-white/5 text-gray-800 dark:text-gray-100 group-hover:text-primary transition-colors">
                              {Icon}
                            </span>
                          ) : (
                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-black/5 dark:border-white/10 bg-white/80 dark:bg-white/5 text-gray-400">
                              •
                            </span>
                          )}
                          <div className="min-w-0">
                            <div className="font-semibold text-gray-900 dark:text-gray-100 break-words leading-snug">
                              {skill.name}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </TiltCard>
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}