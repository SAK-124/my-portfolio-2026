import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import type { Style } from '@react-pdf/types'
import type { ResolvedResume, ResolvedSection } from '@/lib/tools/resume/selectors'
import type { Density } from '@/lib/tools/resume/types'
import { densityTokens, scaleSizes } from '../shared/density'
import { formatDateRange, shortenUrl } from '../shared/formatters'
import { ensureFontsRegistered } from '../shared/fonts'

ensureFontsRegistered()

export function AtsClassicDocument({
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
      paddingTop: 42,
      paddingBottom: 42,
      paddingHorizontal: 48,
      fontFamily: 'Helvetica',
      fontSize: s.body,
      lineHeight: t.lineHeight,
      color: '#000000',
      backgroundColor: '#ffffff',
    },
    name: {
      fontSize: s.display * 0.7,
      fontFamily: 'Helvetica-Bold',
      letterSpacing: 0.3,
      textAlign: 'center',
    },
    headline: {
      fontSize: s.small,
      marginTop: 2,
      textAlign: 'center',
    },
    contactLine: {
      fontSize: s.small,
      marginTop: 4,
      textAlign: 'center',
    },
    separator: {
      borderBottomWidth: 0.75,
      borderBottomColor: '#000000',
      marginTop: 10,
      marginBottom: 10,
    },
    sectionTitle: {
      fontSize: s.body,
      fontFamily: 'Helvetica-Bold',
      letterSpacing: 1.5,
      textTransform: 'uppercase',
      marginBottom: 4,
      borderBottomWidth: 0.5,
      borderBottomColor: '#000000',
      paddingBottom: 2,
    },
    sectionBlock: {
      marginTop: t.sectionGap,
    },
    itemBlock: {
      marginTop: t.itemGap,
    },
    itemHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    itemTitle: {
      fontFamily: 'Helvetica-Bold',
      fontSize: s.body,
    },
    itemOrg: {
      fontSize: s.body,
    },
    itemMeta: {
      fontSize: s.small,
      color: '#222222',
    },
    summary: {
      marginTop: 2,
    },
    bullet: {
      flexDirection: 'row',
      marginTop: t.bulletGap,
    },
    bulletPrefix: {
      width: 10,
    },
    bulletText: {
      flex: 1,
    },
    skillsLine: {
      marginTop: t.bulletGap,
    },
    bold: {
      fontFamily: 'Helvetica-Bold',
    },
  })

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <View>
          <Text style={styles.name}>{resolved.personalInfo.name}</Text>
          {resolved.personalInfo.headline && (
            <Text style={styles.headline}>{resolved.personalInfo.headline}</Text>
          )}
          <Text style={styles.contactLine}>
            {[
              resolved.personalInfo.email,
              resolved.personalInfo.phone,
              resolved.personalInfo.location,
              ...resolved.personalInfo.links.map((l) => shortenUrl(l.url)),
            ]
              .filter(Boolean)
              .join('  ·  ')}
          </Text>
        </View>
        <View style={styles.separator} />

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

function renderSection(section: ResolvedSection, styles: Record<string, Style>) {
  switch (section.kind) {
    case 'experience':
      return section.items.map((it) => (
        <View key={it.id} style={styles.itemBlock} wrap={false}>
          <View style={styles.itemHeader}>
            <Text>
              <Text style={styles.bold}>{it.title}</Text>
              {it.organization ? <Text>{`  —  ${it.organization}`}</Text> : null}
            </Text>
            <Text style={styles.itemMeta}>{formatDateRange(it.startLabel, it.endLabel)}</Text>
          </View>
          {it.location && <Text style={styles.itemMeta}>{it.location}</Text>}
          {!it.compact && it.summary && <Text style={styles.summary}>{it.summary}</Text>}
          {!it.compact &&
            it.bullets.map((b) => (
              <View key={b.id} style={styles.bullet}>
                <Text style={styles.bulletPrefix}>•</Text>
                <Text style={styles.bulletText}>{b.text}</Text>
              </View>
            ))}
        </View>
      ))
    case 'education':
      return section.items.map((it) => (
        <View key={it.id} style={styles.itemBlock} wrap={false}>
          <View style={styles.itemHeader}>
            <Text>
              <Text style={styles.bold}>{it.institution}</Text>
              {it.credential ? <Text>{`  —  ${it.credential}`}</Text> : null}
            </Text>
            <Text style={styles.itemMeta}>{formatDateRange(it.startLabel, it.endLabel)}</Text>
          </View>
          {!it.compact &&
            it.notes.map((n) => (
              <View key={n.id} style={styles.bullet}>
                <Text style={styles.bulletPrefix}>•</Text>
                <Text style={styles.bulletText}>{n.text}</Text>
              </View>
            ))}
        </View>
      ))
    case 'projects':
      return section.items.map((it) => (
        <View key={it.id} style={styles.itemBlock} wrap={false}>
          <View style={styles.itemHeader}>
            <Text style={styles.bold}>{it.name}</Text>
            {it.url && <Text style={styles.itemMeta}>{shortenUrl(it.url)}</Text>}
          </View>
          {!it.compact && it.description && <Text style={styles.summary}>{it.description}</Text>}
          {!it.compact && it.stack.length > 0 && (
            <Text style={styles.itemMeta}>{it.stack.join('  ·  ')}</Text>
          )}
          {!it.compact &&
            it.bullets.map((b) => (
              <View key={b.id} style={styles.bullet}>
                <Text style={styles.bulletPrefix}>•</Text>
                <Text style={styles.bulletText}>{b.text}</Text>
              </View>
            ))}
        </View>
      ))
    case 'skills':
      return section.items.map((g) => (
        <View key={g.id} style={styles.skillsLine} wrap={false}>
          <Text>
            <Text style={styles.bold}>{g.title}: </Text>
            <Text>{g.items.map((x) => x.label).join(', ')}</Text>
          </Text>
        </View>
      ))
    case 'certifications':
      return section.items.map((it) => (
        <View key={it.id} style={styles.itemBlock} wrap={false}>
          <View style={styles.itemHeader}>
            <Text>
              <Text style={styles.bold}>{it.name}</Text>
              {it.issuer ? <Text>{`  —  ${it.issuer}`}</Text> : null}
            </Text>
            <Text style={styles.itemMeta}>{it.year}</Text>
          </View>
        </View>
      ))
    case 'awards':
      return section.items.map((it) => (
        <View key={it.id} style={styles.itemBlock} wrap={false}>
          <View style={styles.itemHeader}>
            <Text>
              <Text style={styles.bold}>{it.name}</Text>
              {it.issuer ? <Text>{`  —  ${it.issuer}`}</Text> : null}
            </Text>
            <Text style={styles.itemMeta}>{it.year}</Text>
          </View>
          {!it.compact && it.note && <Text style={styles.summary}>{it.note}</Text>}
        </View>
      ))
    case 'languages':
      return section.items.map((it) => (
        <View key={it.id} style={styles.skillsLine} wrap={false}>
          <Text>
            <Text style={styles.bold}>{it.name}</Text>
            {it.proficiency ? <Text>{`  —  ${it.proficiency}`}</Text> : null}
          </Text>
        </View>
      ))
    case 'custom':
      return section.items.map((it) => (
        <View key={it.id} style={styles.itemBlock} wrap={false}>
          {it.body && <Text>{it.body}</Text>}
          {it.bullets.map((b) => (
            <View key={b.id} style={styles.bullet}>
              <Text style={styles.bulletPrefix}>•</Text>
              <Text style={styles.bulletText}>{b.text}</Text>
            </View>
          ))}
        </View>
      ))
  }
  return null
}
