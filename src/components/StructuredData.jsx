export function StructuredData({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function PersonSchema() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Alex Sparks",
    "url": "https://alex-sparks.com",
    "image": "https://alex-sparks.com/images/portrait.JPG",
    "sameAs": [
      "https://x.com/AlexOmniLocal",
      "https://www.facebook.com/alex.sparks.96558",
      "https://github.com/Sparks727/",
      "https://www.linkedin.com/in/alex-sparks-%F0%9F%9A%80-41966a247/",
      "https://steamcommunity.com/id/Sparks_up/"
    ],
    "jobTitle": "Founder & Web Developer",
    "worksFor": {
      "@type": "Organization",
      "name": "OmniLocal"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Clearwater",
      "addressRegion": "FL",
      "addressCountry": "US"
    },
    "knowsAbout": [
      "Web Development",
      "Local SEO",
      "Digital Marketing",
      "Business Software",
      "Entrepreneurship"
    ],
    "description": "Alex Sparks is a web developer and entrepreneur based in Clearwater, Florida. Founder of OmniLocal, helping businesses control their online presence."
  }

  return <StructuredData data={personSchema} />
}

export function LocalBusinessSchema() {
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Alex Sparks - Web Developer & Entrepreneur",
    "image": "https://alex-sparks.com/images/portrait.JPG",
    "@id": "https://alex-sparks.com",
    "url": "https://alex-sparks.com",
    "telephone": "",
    "priceRange": "",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Clearwater",
      "addressRegion": "FL",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 27.9659,
      "longitude": -82.8001
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ]
    },
    "sameAs": [
      "https://x.com/AlexOmniLocal",
      "https://www.facebook.com/alex.sparks.96558",
      "https://github.com/Sparks727/",
      "https://www.linkedin.com/in/alex-sparks-%F0%9F%9A%80-41966a247/"
    ]
  }

  return <StructuredData data={businessSchema} />
}

export function OrganizationSchema() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Alex Sparks",
    "url": "https://alex-sparks.com",
    "logo": "https://alex-sparks.com/images/avatar.png",
    "sameAs": [
      "https://x.com/AlexOmniLocal",
      "https://www.facebook.com/alex.sparks.96558",
      "https://github.com/Sparks727/",
      "https://www.linkedin.com/in/alex-sparks-%F0%9F%9A%80-41966a247/",
      "https://steamcommunity.com/id/Sparks_up/"
    ]
  }

  return <StructuredData data={organizationSchema} />
}

