import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: process.env.KEYSTATIC_GITHUB_CLIENT_ID
    ? {
        kind: 'github',
        repo: 'JobsinglesDE/gastrosingles-magazin',
      }
    : { kind: 'local' },
  ui: {
    brand: { name: 'Gastrosingles Magazin' },
  },
  collections: {
    articles: collection({
      label: 'Artikel',
      slugField: 'title',
      path: 'content/articles/*',
      columns: ['publishedAt', 'title', 'category', 'specialization'],
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Titel' } }),
        focusKeyword: fields.text({
          label: 'Focus-Keyword',
          description: 'Haupt-Keyword fuer SEO-Check (z.B. "Hans Sigl Bergdoktor"). Aktiviert 7 Yoast-Style-Checks im SEO-Score-Widget.',
        }),
        category: fields.select({
          label: 'Kategorie (Sektion)',
          defaultValue: 'partnersuche',
          options: [
            { label: 'TV & Koch-Shows', value: 'tv-koch-shows' },
            { label: 'Berufsbilder', value: 'berufsbilder' },
            { label: 'Partnersuche', value: 'partnersuche' },
          ],
        }),
        show: fields.select({
          label: 'Show (nur bei TV & Koch-Shows)',
          defaultValue: '',
          options: [
            { label: '— (keine)', value: '' },
            { label: 'Kitchen Impossible', value: 'kitchen-impossible' },
            { label: 'Grill den Henssler', value: 'grill-den-henssler' },
            { label: 'Rosins Restaurants', value: 'rosins-restaurants' },
            { label: 'Promi-Köche (Porträts)', value: 'promi-koeche' },
            { label: 'Die Küchenschlacht', value: 'kuechenschlacht' },
            { label: 'The Taste', value: 'the-taste' },
          ],
        }),
        person: fields.text({
          label: 'Person-Slug (z.B. henssler, maelzer) — optional',
          defaultValue: '',
        }),
        specialization: fields.select({
          label: 'Bereich',
          defaultValue: '',
          options: [
            { label: '— (alle)', value: '' },
            { label: 'Küche', value: 'kueche' },
            { label: 'Service', value: 'service' },
            { label: 'Bar', value: 'bar' },
            { label: 'Hotel', value: 'hotel' },
            { label: 'Management', value: 'management' },
          ],
        }),
        position: fields.select({
          label: 'Position / Berufsbezeichnung',
          defaultValue: '',
          options: [
            { label: '— (allgemein)', value: '' },
            // Küche
            { label: 'Koch', value: 'koch' },
            { label: 'Küchenchef', value: 'kuechenchef' },
            { label: 'Sous Chef', value: 'sous-chef' },
            { label: 'Chef de Partie', value: 'chef-de-partie' },
            { label: 'Commis de Cuisine', value: 'commis-de-cuisine' },
            { label: 'Saucier', value: 'saucier' },
            { label: 'Entremetier', value: 'entremetier' },
            { label: 'Patissier', value: 'patissier' },
            { label: 'Garde Manger', value: 'garde-manger' },
            { label: 'Poissonnier', value: 'poissonnier' },
            { label: 'Rôtisseur', value: 'rotisseur' },
            // Service
            { label: 'Restaurantfachfrau', value: 'restaurantfachfrau' },
            { label: 'Restaurantfachmann', value: 'restaurantfachmann' },
            { label: 'Hotelfachfrau', value: 'hotelfachfrau' },
            { label: 'Hotelfachmann', value: 'hotelfachmann' },
            { label: 'Chef de Rang', value: 'chef-de-rang' },
            { label: 'Maître d\'Hôtel', value: 'maitre-d-hotel' },
            { label: 'Restaurantleiter', value: 'restaurantleiter' },
            // Bar
            { label: 'Barkeeper', value: 'barkeeper' },
            { label: 'Barkeeperin', value: 'barkeeperin' },
            { label: 'Sommelier', value: 'sommelier' },
            { label: 'Sommelière', value: 'sommeliere' },
            { label: 'Chef de Bar', value: 'chef-de-bar' },
            // Allgemein
            { label: 'Wirt / Gastronom', value: 'wirt' },
            { label: 'F&B Manager', value: 'fb-manager' },
          ],
        }),
        type: fields.select({
          label: 'Typ',
          defaultValue: 'cluster',
          options: [
            { label: 'Pillar (Haupt-Hub)', value: 'pillar' },
            { label: 'Pillar-Sub', value: 'pillar-sub' },
            { label: 'Cluster', value: 'cluster' },
            { label: 'Berufsbild-Hub', value: 'berufsbild' },
            { label: 'News', value: 'news' },
            { label: 'Gossip', value: 'gossip' },
            { label: 'Story (Legacy)', value: 'story' },
            { label: 'Serie (Legacy)', value: 'serie' },
          ],
        }),
        series: fields.select({
          label: 'Serie',
          defaultValue: '',
          options: [
            { label: 'Keine', value: '' },
            { label: 'Kitchen Impossible', value: 'kitchen-impossible' },
            { label: 'Grill den Henssler', value: 'grill-den-henssler' },
            { label: 'Rosins Restaurants', value: 'rosins-restaurants' },
            { label: 'Promiköche allgemein', value: 'promikoche' },
          ],
        }),
        excerpt: fields.text({ label: 'Auszug', multiline: true }),
        featuredImage: fields.image({
          label: 'Beitragsbild',
          directory: 'public/images/articles',
          publicPath: '/images/articles/',
        }),
        featuredImageAlt: fields.text({
          label: 'Alt-Text Beitragsbild',
          description: 'Beschreibung des Bild-Motivs (SEO + Barrierefreiheit). Beispiel: "Hans Sigl im weißen Arztkittel vor Bergpanorama". Falls leer, wird der Artikel-Titel als Fallback genutzt.',
        }),
        featuredImageCredit: fields.text({
          label: 'Bild-Credit',
          description: 'Urhebernennung unter dem Bild. Beispiel: "Foto: ZDF/Sabine Finger Fotografie" oder "© Superbass / CC BY-SA 4.0 via Wikimedia Commons". Pflicht bei Pressebildern.',
        }),
        author: fields.relationship({
          label: 'Autor',
          collection: 'authors',
        }),
        calloutQuestion: fields.text({ label: 'Callout Frage' }),
        calloutAnswer: fields.text({ label: 'Callout Antwort', multiline: true }),
        content: fields.markdoc({ label: 'Inhalt' }),
        faqItems: fields.array(
          fields.object({
            question: fields.text({ label: 'Frage' }),
            answer: fields.text({ label: 'Antwort', multiline: true }),
          }),
          {
            label: 'FAQ',
            itemLabel: (props) => props.fields.question.value,
          }
        ),
        takeaways: fields.array(fields.text({ label: 'Punkt' }), {
          label: 'Das Wichtigste',
        }),
        status: fields.select({
          label: 'Status',
          defaultValue: 'published',
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'Published', value: 'published' },
          ],
        }),
        isNews: fields.checkbox({ label: 'News-Artikel (NewsArticle JSON-LD)', defaultValue: false }),
        isFeatured: fields.checkbox({ label: 'Auf ICONY-Startseite anzeigen (max. 3)', defaultValue: false }),
        tags: fields.array(fields.text({ label: 'Tag' }), { label: 'Tags' }),
        seoTitle: fields.text({ label: 'SEO Titel' }),
        seoDescription: fields.text({ label: 'SEO Beschreibung' }),
        publishedAt: fields.date({ label: 'Veröffentlicht am' }),
        theme: fields.select({
          label: 'Theme',
          defaultValue: 'dark',
          options: [
            { label: 'Dark', value: 'dark' },
            { label: 'Light', value: 'light' },
          ],
        }),
      },
    }),

    persons: collection({
      label: 'Köche (Personen-Hubs)',
      slugField: 'slug',
      path: 'content/persons/*',
      columns: ['name', 'role'],
      schema: {
        slug: fields.slug({ name: { label: 'Slug' } }),
        name: fields.text({ label: 'Name' }),
        role: fields.text({ label: 'Rolle (z.B. TV-Koch, Sternekoch)' }),
        status: fields.select({
          label: 'Status',
          defaultValue: 'published',
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'Published', value: 'published' },
          ],
        }),
        focusKeyword: fields.text({ label: 'Focus-Keyword' }),
        intro: fields.text({ label: 'Intro (Teaser unter Hero)', multiline: true }),
        steckbrief: fields.array(
          fields.object({
            label: fields.text({ label: 'Label' }),
            value: fields.text({ label: 'Wert' }),
          }),
          { label: 'Steckbrief', itemLabel: (props) => props.fields.label.value },
        ),
        bio: fields.markdoc({ label: 'Bio (ausführlich)' }),
        featuredImage: fields.image({
          label: 'Personenbild',
          directory: 'public/images/persons',
          publicPath: '/images/persons/',
        }),
        featuredImageAlt: fields.text({ label: 'Alt-Text Personenbild' }),
        featuredImageCredit: fields.text({ label: 'Bild-Credit' }),
        author: fields.relationship({ label: 'Autor', collection: 'authors' }),
        faqItems: fields.array(
          fields.object({
            question: fields.text({ label: 'Frage' }),
            answer: fields.text({ label: 'Antwort', multiline: true }),
          }),
          { label: 'FAQ', itemLabel: (props) => props.fields.question.value },
        ),
        takeaways: fields.array(fields.text({ label: 'Punkt' }), { label: 'Das Wichtigste' }),
        seoTitle: fields.text({ label: 'SEO Titel' }),
        seoDescription: fields.text({ label: 'SEO Beschreibung', multiline: true }),
        publishedAt: fields.date({ label: 'Veröffentlicht am' }),
      },
    }),

    regional: collection({
      label: 'Regional',
      slugField: 'title',
      path: 'content/regional/*',
      columns: ['publishedAt', 'kanton', 'title'],
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Titel' } }),
        focusKeyword: fields.text({
          label: 'Focus-Keyword',
          description: 'Haupt-Keyword fuer SEO-Check (z.B. "Hans Sigl Bergdoktor"). Aktiviert 7 Yoast-Style-Checks im SEO-Score-Widget.',
        }),
        beruf: fields.select({
          label: 'Beruf',
          defaultValue: 'polizei',
          options: [
            { label: 'Polizei', value: 'polizei' },
            { label: 'Sanität', value: 'sanitaet' },
            { label: 'Feuerwehr', value: 'feuerwehr' },
          ],
        }),
        kanton: fields.text({ label: 'Kanton' }),
        city: fields.text({ label: 'Stadt (optional)' }),
        excerpt: fields.text({ label: 'Auszug', multiline: true }),
        featuredImage: fields.image({
          label: 'Ortsbild',
          directory: 'public/images/regional',
          publicPath: '/images/regional/',
        }),
        featuredImageAlt: fields.text({
          label: 'Alt-Text Ortsbild',
          description: 'Beschreibung des Bild-Motivs (SEO + Barrierefreiheit). Falls leer → Titel als Fallback.',
        }),
        featuredImageCredit: fields.text({
          label: 'Bild-Credit',
          description: 'Urhebernennung unter dem Bild. Beispiel: "Foto: ZDF/Sabine Finger Fotografie" oder "© Superbass / CC BY-SA 4.0 via Wikimedia Commons". Pflicht bei Pressebildern.',
        }),
        content: fields.markdoc({ label: 'Inhalt' }),
        faqItems: fields.array(
          fields.object({
            question: fields.text({ label: 'Frage' }),
            answer: fields.text({ label: 'Antwort', multiline: true }),
          }),
          {
            label: 'FAQ',
            itemLabel: (props) => props.fields.question.value,
          }
        ),
        takeaways: fields.array(fields.text({ label: 'Punkt' }), {
          label: 'Das Wichtigste',
        }),
        seoTitle: fields.text({ label: 'SEO Titel' }),
        seoDescription: fields.text({ label: 'SEO Beschreibung' }),
        publishedAt: fields.date({ label: 'Veröffentlicht am' }),
      },
    }),

    series: collection({
      label: 'TV News',
      slugField: 'title',
      path: 'content/series/*',
      columns: ['publishedAt', 'seriesId', 'title', 'status'],
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Titel' } }),
        focusKeyword: fields.text({
          label: 'Focus-Keyword',
          description: 'Haupt-Keyword fuer SEO-Check (z.B. "Hans Sigl Bergdoktor"). Aktiviert 7 Yoast-Style-Checks im SEO-Score-Widget.',
        }),
        status: fields.select({
          label: 'Status',
          defaultValue: 'published',
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'Published', value: 'published' },
          ],
        }),
        seriesId: fields.select({
          label: 'Serie',
          defaultValue: 'greys-anatomy',
          options: [
            { label: "Grey's Anatomy (ABC)", value: 'greys-anatomy' },
            { label: 'In aller Freundschaft — Die jungen Ärzte (ARD)', value: 'junge-aerzte' },
          ],
        }),
        isNews: fields.checkbox({ label: 'News-Artikel (NewsArticle JSON-LD)', defaultValue: false }),
        theme: fields.select({
          label: 'Theme',
          defaultValue: 'dark',
          options: [
            { label: 'Dark', value: 'dark' },
            { label: 'Light', value: 'light' },
          ],
        }),
        author: fields.relationship({ label: 'Autor', collection: 'authors' }),
        excerpt: fields.text({ label: 'Auszug', multiline: true }),
        featuredImage: fields.image({
          label: 'Bild',
          directory: 'public/images/articles',
          publicPath: '/images/articles/',
        }),
        featuredImageAlt: fields.text({
          label: 'Alt-Text Bild',
          description: 'Beschreibung des Bild-Motivs (SEO + Barrierefreiheit). Falls leer → Titel als Fallback.',
        }),
        featuredImageCredit: fields.text({
          label: 'Bild-Credit',
          description: 'Urhebernennung unter dem Bild. Beispiel: "Foto: ZDF/Sabine Finger Fotografie" oder "© Superbass / CC BY-SA 4.0 via Wikimedia Commons". Pflicht bei Pressebildern.',
        }),
        calloutQuestion: fields.text({ label: 'Callout Frage' }),
        calloutAnswer: fields.text({ label: 'Callout Antwort', multiline: true }),
        content: fields.markdoc({ label: 'Inhalt' }),
        faqItems: fields.array(
          fields.object({
            question: fields.text({ label: 'Frage' }),
            answer: fields.text({ label: 'Antwort', multiline: true }),
          }),
          {
            label: 'FAQ',
            itemLabel: (props) => props.fields.question.value,
          }
        ),
        takeaways: fields.array(fields.text({ label: 'Punkt' }), { label: 'Das Wichtigste' }),
        tags: fields.array(fields.text({ label: 'Tag' }), { label: 'Tags' }),
        seoTitle: fields.text({ label: 'SEO Titel' }),
        seoDescription: fields.text({ label: 'SEO Beschreibung' }),
        publishedAt: fields.date({ label: 'Veröffentlicht am' }),
      },
    }),

    stories: collection({
      label: 'Erfolgsgeschichten',
      slugField: 'title',
      path: 'content/stories/*',
      columns: ['publishedAt', 'couple', 'location'],
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Titel' } }),
        focusKeyword: fields.text({
          label: 'Focus-Keyword',
          description: 'Haupt-Keyword fuer SEO-Check (z.B. "Hans Sigl Bergdoktor"). Aktiviert 7 Yoast-Style-Checks im SEO-Score-Widget.',
        }),
        couple: fields.text({ label: 'Paar-Namen' }),
        location: fields.text({ label: 'Ort' }),
        excerpt: fields.text({ label: 'Auszug', multiline: true }),
        featuredImage: fields.image({
          label: 'Paar-Foto',
          directory: 'public/images/stories',
          publicPath: '/images/stories/',
        }),
        featuredImageAlt: fields.text({
          label: 'Alt-Text Paar-Foto',
          description: 'Beschreibung des Bild-Motivs (SEO + Barrierefreiheit). Falls leer → Titel als Fallback.',
        }),
        featuredImageCredit: fields.text({
          label: 'Bild-Credit',
          description: 'Urhebernennung unter dem Bild. Beispiel: "Foto: ZDF/Sabine Finger Fotografie" oder "© Superbass / CC BY-SA 4.0 via Wikimedia Commons". Pflicht bei Pressebildern.',
        }),
        content: fields.markdoc({ label: 'Geschichte' }),
        isFeatured: fields.checkbox({ label: 'Auf ICONY-Startseite anzeigen (max. 3)', defaultValue: false }),
        publishedAt: fields.date({ label: 'Veröffentlicht am' }),
        seoTitle: fields.text({ label: 'SEO Titel' }),
        seoDescription: fields.text({ label: 'SEO Beschreibung' }),
      },
    }),


    kochvereine: collection({
      label: 'Kochvereine VKD (Singles Regional)',
      slugField: 'title',
      path: 'content/kochvereine/*',
      columns: ['publishedAt', 'title', 'bundesland', 'stadt'],
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Titel' } }),
        focusKeyword: fields.text({
          label: 'Focus-Keyword',
          description: 'z.B. "Kochverein Konstanz Singles" oder "Köche Stuttgart Partnersuche".',
        }),
        bundesland: fields.select({
          label: 'Bundesland',
          defaultValue: 'baden-wuerttemberg',
          options: [
            { label: 'Baden-Württemberg', value: 'baden-wuerttemberg' },
            { label: 'Bayern', value: 'bayern' },
            { label: 'Berlin', value: 'berlin' },
            { label: 'Brandenburg', value: 'brandenburg' },
            { label: 'Bremen', value: 'bremen' },
            { label: 'Hamburg', value: 'hamburg' },
            { label: 'Hessen', value: 'hessen' },
            { label: 'Mecklenburg-Vorpommern', value: 'mecklenburg-vorpommern' },
            { label: 'Niedersachsen', value: 'niedersachsen' },
            { label: 'Nordrhein-Westfalen', value: 'nordrhein-westfalen' },
            { label: 'Rheinland-Pfalz', value: 'rheinland-pfalz' },
            { label: 'Saarland', value: 'saarland' },
            { label: 'Sachsen', value: 'sachsen' },
            { label: 'Sachsen-Anhalt', value: 'sachsen-anhalt' },
            { label: 'Schleswig-Holstein', value: 'schleswig-holstein' },
            { label: 'Thueringen', value: 'thueringen' },
            { label: 'Deutschland (bundesweit)', value: 'deutschland' },
          ],
        }),
        stadt: fields.text({ label: 'Stadt (Slug-Form)', description: 'z.B. "konstanz", "frankfurt-am-main"' }),
        landesverband: fields.select({
          label: 'VKD-Landesverband',
          defaultValue: 'baden-wuerttemberg',
          options: [
            { label: 'Berlin-Brandenburg', value: 'berlin-brandenburg' },
            { label: 'Nord (SH/HH/HB/MV)', value: 'nord' },
            { label: 'Niedersachsen', value: 'niedersachsen' },
            { label: 'Nordrhein-Westfalen', value: 'nordrhein-westfalen' },
            { label: 'Hessen', value: 'hessen' },
            { label: 'West (RLP/SL)', value: 'west' },
            { label: 'Baden-Württemberg', value: 'baden-wuerttemberg' },
            { label: 'Bayern', value: 'bayern' },
            { label: 'Mitteldeutschland (SN/ST/TH)', value: 'mitteldeutschland' },
          ],
        }),
        mutterverband: fields.select({
          label: 'Mutterverband',
          defaultValue: 'vkd',
          options: [
            { label: 'VKD (Verband der Köche Deutschlands)', value: 'vkd' },
            { label: 'Eurotoques Deutschland', value: 'eurotoques' },
            { label: 'JRE Jeunes Restaurateurs', value: 'jre' },
            { label: 'Unabhängig', value: 'independent' },
          ],
        }),
        zvNummer: fields.text({ label: 'VKD-ZV-Nummer', description: 'z.B. "711" für Bodensee Kochverein' }),
        verbandsname: fields.text({ label: 'Vollständiger Vereinsname', description: 'z.B. "Bodensee Kochverein e.V."' }),
        mitgliederzahl: fields.text({ label: 'Mitgliederzahl (ca.)' }),
        gegruendet: fields.text({ label: 'Gegründet (Jahr)' }),
        vorstand: fields.text({ label: 'Vorstand / Präsident' }),
        webseite: fields.url({ label: 'Vereins-Webseite' }),
        sitzAdresse: fields.text({ label: 'Sitz-Adresse', multiline: true }),
        prioritaet: fields.select({
          label: 'Priorität (Build-Order)',
          defaultValue: 'MEDIUM',
          options: [
            { label: 'HIGH', value: 'HIGH' },
            { label: 'MEDIUM', value: 'MEDIUM' },
            { label: 'LOW', value: 'LOW' },
          ],
        }),
        excerpt: fields.text({ label: 'Auszug', multiline: true }),
        featuredImage: fields.image({
          label: 'Hero-Bild',
          directory: 'public/images/kochvereine',
          publicPath: '/images/kochvereine/',
        }),
        featuredImageAlt: fields.text({ label: 'Alt-Text', description: 'Stadt-Wahrzeichen + Koch-Element (Kochmütze, Schürze, Pass)' }),
        featuredImageCredit: fields.text({ label: 'Bild-Credit' }),
        calloutQuestion: fields.text({ label: 'Callout Frage' }),
        calloutAnswer: fields.text({ label: 'Callout Antwort', multiline: true }),
        content: fields.markdoc({ label: 'Inhalt' }),
        faqItems: fields.array(
          fields.object({
            question: fields.text({ label: 'Frage' }),
            answer: fields.text({ label: 'Antwort', multiline: true }),
          }),
          { label: 'FAQ', itemLabel: (props) => props.fields.question.value }
        ),
        takeaways: fields.array(fields.text({ label: 'Punkt' }), { label: 'Das Wichtigste' }),
        tags: fields.array(fields.text({ label: 'Tag' }), { label: 'Tags' }),
        seoTitle: fields.text({ label: 'SEO Titel' }),
        seoDescription: fields.text({ label: 'SEO Beschreibung' }),
        status: fields.select({
          label: 'Status',
          defaultValue: 'draft',
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'Published', value: 'published' },
          ],
        }),
        publishedAt: fields.date({ label: 'Veröffentlicht am' }),
      },
    }),



    authors: collection({
      label: 'Autoren',
      slugField: 'name',
      path: 'content/authors/*',
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        role: fields.text({ label: 'Rolle' }),
        bio: fields.text({ label: 'Kurz-Bio (Artikel-Box)', multiline: true }),
        longBio: fields.text({ label: 'Ausführliche Bio (Autoren-Seite)', multiline: true }),
        avatar: fields.image({
          label: 'Profilbild',
          directory: 'public/images/authors',
          publicPath: '/images/authors/',
        }),
        socialLinks: fields.array(
          fields.object({
            platform: fields.text({ label: 'Plattform' }),
            url: fields.url({ label: 'URL' }),
          }),
          { label: 'Social Links' }
        ),
      },
    }),
  },
});
