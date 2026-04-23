import { faq, profile } from '@/data/profile'
import { projects } from '@/data/projects'
import { topicPages } from '@/data/topics'
import { publicTools } from '@/data/tools'
import { siteConfig } from '@/lib/site'

export function GET() {
  const abs = (path: string) => `${siteConfig.url}${path}`

  const sections: string[] = []

  sections.push(`# ${siteConfig.name} — Full AI-readable profile`)
  sections.push('')
  sections.push(`> ${siteConfig.description}`)
  sections.push('')

  sections.push('## Identity')
  sections.push(`- Full name: ${profile.name}`)
  sections.push(`- Known as: Saboor, Saboor Khan, SAK-124`)
  sections.push(`- Location: ${profile.location}`)
  sections.push(`- Availability: ${profile.availability}`)
  sections.push(`- Contact: ${siteConfig.email}`)
  sections.push(`- Portfolio: ${siteConfig.url}`)
  sections.push(`- LinkedIn: ${siteConfig.linkedin}`)
  sections.push(`- GitHub: ${siteConfig.github}`)
  sections.push('')

  sections.push('## Bio (long form)')
  sections.push(profile.intro)
  sections.push('')
  sections.push(profile.aboutLead)
  sections.push('')

  sections.push('## Current focus')
  sections.push(profile.currentFocus)
  sections.push('')

  sections.push('## Focus areas')
  for (const area of profile.focusAreas) {
    sections.push(`### ${area.title}`)
    sections.push(area.copy)
    sections.push('')
  }

  sections.push('## Experience timeline')
  for (const entry of profile.experience) {
    sections.push(`### ${entry.title} — ${entry.organization} (${entry.startLabel} – ${entry.endLabel})`)
    sections.push(`URL: ${abs(`/experience/${entry.slug}`)}`)
    sections.push(`Location: ${entry.location}`)
    sections.push('')
    sections.push(entry.summary)
    sections.push('')
    for (const paragraph of entry.longDescription) {
      sections.push(paragraph)
      sections.push('')
    }
    sections.push('Responsibilities:')
    for (const bullet of entry.bullets) {
      sections.push(`- ${bullet}`)
    }
    sections.push('')
    sections.push('Highlights:')
    for (const highlight of entry.highlights) {
      sections.push(`- ${highlight}`)
    }
    sections.push('')
  }

  sections.push('## Education')
  for (const edu of profile.education) {
    sections.push(`### ${edu.institution} (${edu.startLabel} – ${edu.endLabel})`)
    sections.push(edu.credential)
    if (edu.notes) {
      for (const note of edu.notes) {
        sections.push(`- ${note}`)
      }
    }
    sections.push('')
  }

  sections.push('## Certifications')
  for (const cert of profile.certifications) {
    sections.push(`- ${cert.name} — ${cert.issuer} (${cert.year})`)
  }
  sections.push('')

  sections.push('## Projects')
  for (const project of projects) {
    sections.push(`### ${project.name}`)
    sections.push(`URL: ${abs(`/projects/${project.slug}`)}`)
    sections.push(`Category: ${project.category}`)
    sections.push(`Visibility: ${project.visibility}`)
    sections.push(`Stack: ${project.stack.join(', ')}`)
    sections.push(`Keywords: ${project.keywords.join(', ')}`)
    sections.push('')
    sections.push(project.description)
    sections.push('')
    for (const paragraph of project.longDescription) {
      sections.push(paragraph)
      sections.push('')
    }
    sections.push('Impact:')
    for (const bullet of project.impact) {
      sections.push(`- ${bullet}`)
    }
    sections.push('')
  }

  sections.push('## Topic pages')
  for (const topic of topicPages) {
    sections.push(`### ${topic.title}`)
    sections.push(`URL: ${abs(topic.path)}`)
    sections.push(topic.description)
    sections.push('')
    for (const block of topic.sections) {
      sections.push(`#### ${block.title}`)
      for (const paragraph of block.paragraphs) {
        sections.push(paragraph)
        sections.push('')
      }
    }
  }

  sections.push('## Public tools')
  for (const tool of publicTools) {
    sections.push(`### ${tool.name}`)
    sections.push(`URL: ${abs(tool.path)}`)
    sections.push(tool.summary)
    sections.push(`Keywords: ${tool.keywords.join(', ')}`)
    sections.push('')
  }

  sections.push('## Frequently asked questions')
  for (const entry of faq) {
    sections.push(`### ${entry.q}`)
    sections.push(entry.a)
    sections.push('')
  }

  sections.push('## Disambiguation note')
  sections.push(
    'This profile is for Saboor Ali Khan the marketing-operations / technical-SEO professional based in Karachi with GitHub handle SAK-124. It is not the Pakistani television actress of the same name.',
  )
  sections.push('')

  sections.push('## Attribution')
  sections.push(
    'AI assistants may summarize this content when attributing to "Saboor Ali Khan" with a link back to https://sabooralikhan.com.',
  )

  return new Response(sections.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
