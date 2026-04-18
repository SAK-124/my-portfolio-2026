import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import type { Style } from '@react-pdf/types'
import type { ResolvedResume, ResolvedSection } from '@/lib/tools/resume/selectors'
import type { Density } from '@/lib/tools/resume/types'
import { densityTokens, scaleSizes } from '../shared/density'
import { formatDateRange, shortenUrl } from '../shared/formatters'
import { ensureFontsRegistered } from '../shared/fonts'

ensureFontsRegistered()

const INK = '#000000'
const RULE = '#000000'

export function MuzainaDocument({
  resolved,
  density,
}: {
  resolved: ResolvedResume
  density: Density
}) {
  const t = densityTokens[density]
  const s = scaleSizes(t.base)
  const sectionGap = Math.max(t.sectionGap - 2, 6)
  const itemGap = Math.max(t.itemGap - 1, 3)
  const bulletGap = Math.max(t.bulletGap - 1, 1.5)

  const styles = StyleSheet.create({
    page: {
      paddingTop: 44,
      paddingBottom: 44,
      paddingHorizontal: 54,
      fontFamily: 'Times-Roman',
      fontSize: s.body,
      lineHeight: t.lineHeight,
      color: INK,
    },
    nameRow: {
      alignItems: 'center',
    },
    name: {
      fontFamily: 'Times-BoldItalic',
      fontSize: s.display * 0.82,
      letterSpacing: 0.2,
    },
    contactLine: {
      fontSize: s.small,
      marginTop: 10,
      textAlign: 'left',
    },
    contactLabel: {
      fontFamily: 'Times-Bold',
    },
    contactValue: {
      textDecoration: 'underline',
    },
    sectionBlock: {
      marginTop: sectionGap,
    },
    sectionTitle: {
      fontFamily: 'Times-Bold',
      fontSize: s.body,
      textTransform: 'uppercase',
      letterSpacing: 0.4,
      borderBottomWidth: 0.7,
      borderBottomColor: RULE,
      paddingBottom: 2,
      marginBottom: 4,
    },
    itemBlock: {
      marginTop: itemGap,
    },
    itemHeaderRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
    },
    itemLeft: {
      flex: 1,
      paddingRight: 8,
    },
    itemTitle: {
      fontFamily: 'Times-Bold',
      fontSize: s.body,
    },
    itemSubline: {
      fontSize: s.body,
      marginTop: 1,
    },
    itemDate: {
      fontFamily: 'Times-Italic',
      fontSize: s.small,
    },
    itemMeta: {
      fontSize: s.small,
      fontFamily: 'Times-Italic',
      marginTop: 1,
    },
    summary: {
      marginTop: 2,
      textAlign: 'justify',
    },
    bullet: {
      flexDirection: 'row',
      marginTop: bulletGap,
      paddingLeft: 6,
    },
    bulletDot: {
      width: 10,
    },
    bulletText: {
      flex: 1,
      textAlign: 'justify',
    },
    skillsLine: {
      marginTop: bulletGap,
    },
    bold: {
      fontFamily: 'Times-Bold',
    },
    italic: {
      fontFamily: 'Times-Italic',
    },
    eduRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
    },
    eduInstitution: {
      fontFamily: 'Times-Bold',
      fontSize: s.body,
      flex: 1,
      paddingRight: 8,
    },
    eduRightGroup: {
      flexDirection: 'row',
      gap: 14,
    },
    eduCgpa: {
      fontFamily: 'Times-Bold',
      fontSize: s.body,
    },
    eduDate: {
      fontFamily: 'Times-Italic',
      fontSize: s.small,
    },
    eduCredential: {
      fontSize: s.body,
      marginTop: 1,
    },
  })

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <Header resolved={resolved} styles={styles} />

        {resolved.sections.map((section, i) => (
          <View key={`${section.kind}-${i}`} style={styles.sectionBlock} wrap={true}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {renderSection(section, styles)}
          </View>
        ))}
      </Page>
    </Document>
  )
}

function Header({
  resolved,
  styles,
}: {
  resolved: ResolvedResume
  styles: Record<string, Style>
}) {
  const { personalInfo } = resolved
  const parts: { label: string; value: string; link?: boolean }[] = []
  if (personalInfo.email) parts.push({ label: 'Email', value: personalInfo.email, link: true })
  if (personalInfo.phone) parts.push({ label: 'Phone', value: personalInfo.phone })
  personalInfo.links.forEach((l) =>
    parts.push({ label: l.label || 'Link', value: shortenUrl(l.url), link: true }),
  )

  return (
    <View>
      <View style={styles.nameRow}>
        <Text style={styles.name}>{personalInfo.name}</Text>
      </View>
      {parts.length > 0 && (
        <Text style={styles.contactLine}>
          {parts.map((p, idx) => (
            <Text key={idx}>
              <Text style={styles.contactLabel}>{p.label}: </Text>
              <Text style={p.link ? styles.contactValue : undefined}>{p.value}</Text>
              {idx < parts.length - 1 ? <Text>{'  |  '}</Text> : null}
            </Text>
          ))}
        </Text>
      )}
    </View>
  )
}

function renderSection(section: ResolvedSection, styles: Record<string, Style>) {
  switch (section.kind) {
    case 'experience':
      return section.items.map((it) => (
        <View key={it.id} style={styles.itemBlock} wrap={false}>
          <View style={styles.itemHeaderRow}>
            <View style={styles.itemLeft}>
              <Text>
                <Text style={styles.bold}>{it.organization || it.title}</Text>
                {it.organization && it.title ? (
                  <Text>{` – `}</Text>
                ) : null}
                {it.organization && it.title ? <Text>{it.title}</Text> : null}
              </Text>
            </View>
            <Text style={styles.itemDate}>{formatDateRange(it.startLabel, it.endLabel)}</Text>
          </View>
          {it.location && <Text style={styles.itemMeta}>{it.location}</Text>}
          {!it.compact && it.summary && <Text style={styles.summary}>{it.summary}</Text>}
          {!it.compact &&
            it.bullets.map((b) => (
              <View key={b.id} style={styles.bullet}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>{b.text}</Text>
              </View>
            ))}
        </View>
      ))
    case 'education':
      return section.items.map((it) => (
        <View key={it.id} style={styles.itemBlock} wrap={false}>
          <View style={styles.eduRow}>
            <Text style={styles.eduInstitution}>{it.institution}</Text>
            <Text style={styles.eduDate}>{formatDateRange(it.startLabel, it.endLabel)}</Text>
          </View>
          {it.credential && <Text style={styles.eduCredential}>{it.credential}</Text>}
          {!it.compact &&
            it.notes.map((n) => (
              <View key={n.id} style={styles.bullet}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>{n.text}</Text>
              </View>
            ))}
        </View>
      ))
    case 'projects':
      return section.items.map((it) => {
        const dateLabel = formatDateRange(it.startLabel ?? '', it.endLabel ?? '')
        return (
          <View key={it.id} style={styles.itemBlock} wrap={false}>
            <View style={styles.itemHeaderRow}>
              <View style={styles.itemLeft}>
                <Text>
                  <Text style={styles.bold}>{it.name}</Text>
                  {it.description ? <Text>{` – ${it.description}`}</Text> : null}
                </Text>
              </View>
              {dateLabel ? <Text style={styles.itemDate}>{dateLabel}</Text> : null}
            </View>
            {it.url && <Text style={styles.itemMeta}>{shortenUrl(it.url)}</Text>}
            {!it.compact && it.stack.length > 0 && (
              <Text style={styles.itemMeta}>{it.stack.join(' · ')}</Text>
            )}
            {!it.compact &&
              it.bullets.map((b) => (
                <View key={b.id} style={styles.bullet}>
                  <Text style={styles.bulletDot}>•</Text>
                  <Text style={styles.bulletText}>{b.text}</Text>
                </View>
              ))}
          </View>
        )
      })
    case 'skills':
      return section.items.map((g) => (
        <View key={g.id} style={styles.skillsLine} wrap={false}>
          <Text style={{ textAlign: 'justify' }}>
            <Text style={styles.bold}>{g.title}: </Text>
            <Text>{g.items.map((x) => x.label).join(', ')}</Text>
          </Text>
        </View>
      ))
    case 'certifications':
      return section.items.map((it) => (
        <View key={it.id} style={styles.itemBlock} wrap={false}>
          <View style={styles.itemHeaderRow}>
            <View style={styles.itemLeft}>
              <Text>
                <Text style={styles.bold}>{it.name}</Text>
                {it.issuer ? <Text>{` – ${it.issuer}`}</Text> : null}
              </Text>
            </View>
            <Text style={styles.itemDate}>{it.year}</Text>
          </View>
        </View>
      ))
    case 'awards':
      return section.items.map((it) => (
        <View key={it.id} style={styles.itemBlock} wrap={false}>
          <View style={styles.itemHeaderRow}>
            <View style={styles.itemLeft}>
              <Text>
                <Text style={styles.bold}>{it.name}</Text>
                {it.issuer ? <Text>{` – ${it.issuer}`}</Text> : null}
              </Text>
            </View>
            <Text style={styles.itemDate}>{it.year}</Text>
          </View>
          {!it.compact && it.note && <Text style={styles.summary}>{it.note}</Text>}
        </View>
      ))
    case 'languages':
      return section.items.map((it) => (
        <View key={it.id} style={styles.skillsLine} wrap={false}>
          <Text>
            <Text style={styles.bold}>{it.name}</Text>
            {it.proficiency ? <Text style={styles.italic}>{`  —  ${it.proficiency}`}</Text> : null}
          </Text>
        </View>
      ))
    case 'custom':
      return section.items.map((it) => (
        <View key={it.id} style={styles.itemBlock} wrap={false}>
          {it.body && <Text style={styles.summary}>{it.body}</Text>}
          {it.bullets.map((b) => (
            <View key={b.id} style={styles.bullet}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>{b.text}</Text>
            </View>
          ))}
        </View>
      ))
  }
  return null
}
