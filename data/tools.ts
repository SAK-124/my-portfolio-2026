export type ToolFeature = {
  title: string
  copy: string
}

export type ToolScreenshot = {
  src: string
  alt: string
  caption?: string
}

export type PublicTool = {
  slug: 'resume-builder'
  path: string
  name: string
  eyebrow: string
  title: string
  lead: string
  summary: string
  keywords: string[]
  seoTitle: string
  seoDescription: string
  featureList: ToolFeature[]
  templates: string[]
  useCases: string[]
  screenshots: ToolScreenshot[]
}

export const resumeBuilderTool: PublicTool = {
  slug: 'resume-builder',
  path: '/tools/resume-builder',
  name: 'Resume Builder',
  eyebrow: 'Public tool',
  title: 'Resume builder',
  lead:
    'A public resume builder by Saboor Ali Khan with ATS-friendly output, editable resume sections, multiple templates, one-page or two-page targeting, live PDF preview, and downloadable PDF export.',
  summary:
    'This tool is designed as a practical resume builder and resume editor rather than a decorative demo. It supports ATS-friendly resume output, editable sections, live PDF preview, downloadable PDF export, and multiple templates for different use cases.',
  keywords: [
    'resume builder',
    'ATS resume builder',
    'resume editor',
    'resume PDF builder',
    'resume templates',
    'resume builder for students',
    'resume builder for freshers',
  ],
  seoTitle: 'Resume Builder | Saboor Ali Khan Tools',
  seoDescription:
    'Public resume builder by Saboor Ali Khan with ATS-friendly templates, live PDF preview, downloadable PDF export, and an editable resume workspace.',
  featureList: [
    {
      title: 'ATS-friendly resume output',
      copy: 'The tool includes an ATS-classic template focused on clean structure and parser-friendly output.',
    },
    {
      title: 'Live PDF preview',
      copy: 'As you edit the resume, the builder renders a live PDF preview so formatting decisions stay visible.',
    },
    {
      title: 'Downloadable PDF export',
      copy: 'The editor supports downloadable PDF output directly from the preview workflow.',
    },
    {
      title: 'Multiple resume templates',
      copy: 'There are multiple templates available, including ATS-classic, editorial, and Muzaina.',
    },
    {
      title: 'One-page or two-page targeting',
      copy: 'The builder supports resume configurations that can be tuned for page count and density.',
    },
    {
      title: 'Student and fresher friendly editing flow',
      copy: 'The editable sections and library setup are suitable for early-career resumes as well as more detailed versions.',
    },
  ],
  templates: ['ATS-classic', 'Editorial', 'Muzaina'],
  useCases: [
    'Build a student resume from scratch',
    'Create an ATS-friendly resume version',
    'Edit and reorganize sections before exporting PDF',
    'Maintain multiple resume variants for different applications',
  ],
  screenshots: [
    {
      src: '/tool-media/resume-builder/saboor-ali-khan-resume-builder-preview.png',
      alt: 'Saboor Ali Khan resume builder preview screen — live PDF dock and editing layout for ATS-friendly resume generation at sabooralikhan.com/tools/resume-builder.',
      caption: 'The builder keeps the PDF preview visible while you edit.',
    },
    {
      src: '/tool-media/resume-builder/saboor-ali-khan-resume-builder-library.png',
      alt: 'Saboor Ali Khan resume builder library view — editable content blocks, section reordering, and resume variant management.',
      caption: 'You can edit library content, reorder sections, and manage resume variants.',
    },
  ],
}

export const publicTools = [resumeBuilderTool]
