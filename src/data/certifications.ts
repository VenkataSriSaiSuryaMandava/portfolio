import type { Certification } from '@/types';

/**
 * Licenses & Certifications
 * Keep this file as the single source of truth for the Certifications section.
 */
export const certifications: Certification[] = [
  {
    title: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services (AWS)',
    date: 'Issued: September 18, 2025 · Expires: September 18, 2028',
    credentialId: '3cae01cc-bf52-404c-beb1-085a153e68ef',
    credentialUrl:
      'https://www.credly.com/badges/3cae01cc-bf52-404c-beb1-085a153e68ef/public_url',
    skills: [
      'AWS',
      'Solution Architecture',
      'VPC & Networking',
      'IAM',
      'EC2',
      'S3',
      'RDS',
      'High Availability',
      'Security Best Practices',
      'Cost Optimization',
    ],
  },
  {
    title: 'Microsoft Certified: Azure Fundamentals',
    issuer: 'Microsoft',
    date: 'Issued: February 26, 2023 · Expires: No Expiry',
    credentialUrl:
      'https://www.credly.com/badges/ce85537b-6afb-4a68-ad75-c38050b6dedd/linked_in',
    skills: [
      'Azure',
      'Cloud Concepts',
      'Identity & Access',
      'Security & Compliance',
      'Governance',
      'Azure Services',
      'Pricing & Support',
    ],
  },
  {
    title: 'MTA: Introduction to Programming Using Python',
    issuer: 'Microsoft',
    date: 'Issued: June 28, 2022 · Expires: No Expiry',
    credentialUrl:
      'https://www.credly.com/badges/dd8dff48-70bb-4aa6-9cff-d494eadfe7df/linked_in',
    skills: [
      'Python',
      'Programming Fundamentals',
      'Data Types & Control Flow',
      'Functions',
      'OOP Basics',
      'Exception Handling',
      'File I/O',
    ],
  },
];
