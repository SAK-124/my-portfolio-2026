import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import type { Style } from '@react-pdf/types'
import type { ResolvedResume, ResolvedSection } from '@/lib/tools/resume/selectors'
import type { Density } from '@/lib/tools/resume/types'
import { densityTokens, scaleSizes } from '../shared/density'
import { formatDateRange, shortenUrl } from '../shared/formatters'
import { ensureFontsRegistered } from '../shared/fonts'

ensureFontsRegistered()

const INK = '#1a1714'
const MUTED = '#5e574e'
const ACCENT = '#b06b28'
const BG = '#faf6f0'
const LINE = '#d6d0c6'

export function EditorialDocument({
  resolved,
  density,
}: {
  resolved: ResolvedResume
  density: Density
}) {
  const t = densityTokens[density]
  const s = scaleSizes(t.base)
  const styles = StyleSheet.create({
    page: {
      paddingTop: 48,
      paddingBottom: 48,
      paddingHorizontal: 54,
      fontFamily: 'Helvetica',
      fontSize: s.body,
      lineHeight: t.lineHeight,
      color: INK,
      backgroundColor: BG,
    },
    header: {
      flexDirection: 'column',
    },
    eyebrow: {
      fontSize: s.micro,
      color: ACCENT,
      letterSpacing: 2,
      textTransform: 'uppercase',
    },
    name: {
      fontFamily: 'Helvetica-Bold',
      fontSize: s.display * 0.78,
      marginTop: 2,
      letterSpacing: -0.4,
    },
    headline: {
      color: MUTED,
      fontSize: s.body,
      marginTop: 2,
    },
    contactRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 8,
      gap: 8,
    },
    contactItem: {
      fontSize: s.small,
      color: MUTED,
    },
    contactAccent: {
      fontSize: s.small,
      color: ACCENT,
      textDecoration: 'underline',
    },
    divider: {
      borderBottomWidth: 0.6,
      borderBottomColor: LINE,
      marginTop: 14,
      marginBottom: 6,
    },
    sectionBlock: {
      marginTop: t.sectionGap,
    },
    sectionEyebrow: {
      fontSize: s.micro,
      color: ACCENT,
      letterSpacing: 2,
      textTransform: 'uppercase',
      marginBottom: 2,
    },
    sectionTitle: {
      fontFamily: 'Helvetica-Bold',
      fontSize: s.section,
      letterSpacing: -0.1,
      marginBottom: 4,
    },
    itemBlock: {
      marginTop: t.itemGap,
      borderLeftWidth: 1.2,
      borderLeftColor: LINE,
      paddingLeft: 8,
    },
    itemHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    itemTitleRow: {
      flex: 1,
    },
    itemTitle: {
      fontFamily: 'Helvetica-Bold',
      fontSize: s.headline,
    },
    itemOrg: {
      color: MUTED,
      fontSize: s.small,
    },
    itemMeta: {
      fontSize: s.small,
      color: MUTED,
    },
    summary: {
      marginTop: 2,
    },
    bullet: {
      flexDirection: 'row',
      marginTop: t.bulletGap,
      paddingLeft: 3,
    },
    bulletDot: {
      width: 6,
      color: ACCENT,
    },
    bulletText: {
      flex: 1,
    },
    skillsLine: {
      marginTop: t.bulletGap,
    },
    skillsLabel: {
      fontFamily: 'Helvetica-Bold',
      color: INK,
    },
    skillsValue: {
      color: INK,
    },
  })

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>Resume</Text>
          <Text style={styles.name}>{resolved.personalInfo.name}</Text>
          {resolved.personalInfo.headline && (
            <Text style={styles.headline}>{resolved.personalInfo.headline}</Text>
          )}
          <View style={styles.contactRow}>
            {resolved.personalInfo.email && (
              <Text style={styles.contactItem}>{resolved.personalInfo.email}</Text>
            )}
            {resolved.personalInfo.phone && (
              <Text style={styles.contactItem}>{resolved.personalInfo.phone}</Text>
            )}
            {resolved.personalInfo.location && (
              <Text style={styles.contactItem}>{resolved.personalInfo.location}</Text>
            )}
            {resolved.personalInfo.links.map((l) => (
              <Text key={l.id} style={styles.contactAccent}>
                {shortenUrl(l.url)}
              </Text>
            ))}
          </View>
        </View>
        <View style={styles.divider} />

        {resolved.sections.map((section, i) => (
          <View key={`${section.kind}-${i}`} style={styles.sectionBlock} wrap={true}>
            <Text style={styles.sectionEyebrow}>—</Text>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {renderSection(section, styles)}
          </View>
        ))}
      </Page>
    </Document>
  )
}

function renderSection(section: ResolvedSection, styles: Record<string, Style>) {
  switch (section.kind) {
    case 'experience':
      return section.items.map((it) => (
        <View key={it.id} style={styles.itemBlock} wrap={false}>
          <View style={styles.itemHeader}>
            <View style={styles.itemTitleRow}>
              <Text style={styles.itemTitle}>{it.title}</Text>
              {it.organization && <Text style={styles.itemOrg}>{it.organization}</Text>}
            </View>
            <Text style={styles.itemMeta}>{formatDateRange(it.startLabel, it.endLabel)}</Text>
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
          <View style={styles.itemHeader}>
            <View style={styles.itemTitleRow}>
              <Text style={styles.itemTitle}>{it.institution}</Text>
              {it.credential && <Text style={styles.itemOrg}>{it.credential}</Text>}
            </View>
            <Text style={styles.itemMeta}>{formatDateRange(it.startLabel, it.endLabel)}</Text>
          </View>
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
      return section.items.map((it) => (
        <View key={it.id} style={styles.itemBlock} wrap={false}>
          <View style={styles.itemHeader}>
            <Text style={styles.itemTitle}>{it.name}</Text>
            {it.url && <Text style={styles.itemMeta}>{shortenUrl(it.url)}</Text>}
          </View>
          {!it.compact && it.description && <Text style={styles.summary}>{it.description}</Text>}
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
      ))
    case 'skills':
      return section.items.map((g) => (
        <View key={g.id} style={styles.skillsLine} wrap={false}>
          <Text>
            <Text style={styles.skillsLabel}>{g.title}: </Text>
            <Text style={styles.skillsValue}>{g.items.map((x) => x.label).join(', ')}</Text>
          </Text>
        </View>
      ))
    case 'certifications':
      return section.items.map((it) => (
        <View key={it.id} style={styles.itemBlock} wrap={false}>
          <View style={styles.itemHeader}>
            <View style={styles.itemTitleRow}>
              <Text style={styles.itemTitle}>{it.name}</Text>
              {it.issuer && <Text style={styles.itemOrg}>{it.issuer}</Text>}
            </View>
            <Text style={styles.itemMeta}>{it.year}</Text>
          </View>
        </View>
      ))
    case 'awards':
      return section.items.map((it) => (
        <View key={it.id} style={styles.itemBlock} wrap={false}>
          <View style={styles.itemHeader}>
            <View style={styles.itemTitleRow}>
              <Text style={styles.itemTitle}>{it.name}</Text>
              {it.issuer && <Text style={styles.itemOrg}>{it.issuer}</Text>}
            </View>
            <Text style={styles.itemMeta}>{it.year}</Text>
          </View>
          {!it.compact && it.note && <Text style={styles.summary}>{it.note}</Text>}
        </View>
      ))
    case 'languages':
      return section.items.map((it) => (
        <View key={it.id} style={styles.skillsLine} wrap={false}>
          <Text>
            <Text style={styles.skillsLabel}>{it.name}</Text>
            {it.proficiency && <Text style={styles.itemMeta}>{`  —  ${it.proficiency}`}</Text>}
          </Text>
        </View>
      ))
    case 'custom':
      return section.items.map((it) => (
        <View key={it.id} style={styles.itemBlock} wrap={false}>
          {it.body && <Text>{it.body}</Text>}
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
