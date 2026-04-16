import { siteConfig } from '@/lib/site'

export function GET() {
  const content = [
    `# ${siteConfig.name}`,
    '',
    `> ${siteConfig.description}`,
    '',
    '## Canonical',
    `- ${siteConfig.url}`,
    '',
    '## Priority Pages',
    `- ${siteConfig.url}/about`,
    `- ${siteConfig.url}/experience`,
    `- ${siteConfig.url}/projects`,
    `- ${siteConfig.url}/education`,
    `- ${siteConfig.url}/contact`,
    '',
    '## Identity',
    '- BBA Marketing student at the Institute of Business Administration (IBA), Karachi',
    '- Digital Marketing Intern at 10Pearls Pakistan',
    '- Focused on marketing automation, technical SEO, and execution systems',
    '',
    '## Profiles',
    `- GitHub: ${siteConfig.github}`,
    `- LinkedIn: ${siteConfig.linkedin}`,
    '',
    '## Notes',
    '- Public portfolio data includes education, internship experience, project summaries, and certification references.',
    '- Private work is represented as summary-only entries without source access.',
  ].join('\n')

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
