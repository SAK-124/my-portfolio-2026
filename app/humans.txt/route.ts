export function GET() {
  const content = [
    '/* TEAM */',
    'Name: Saboor Ali Khan',
    'Role: BBA Marketing student and Digital Marketing Intern',
    'Organization: 10Pearls Pakistan',
    'Education: Institute of Business Administration (IBA), Karachi',
    '',
    '/* SITE */',
    'Stack: Next.js, React, Tailwind CSS, Framer Motion',
    'Focus: marketing automation, technical SEO, and execution systems',
  ].join('\n')

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
