import { permanentRedirect } from 'next/navigation'

export default function LegacyResumeRoutePage() {
  permanentRedirect('/tools/resume-builder')
}
