import React from "react"
import { Helmet } from "react-helmet"

const SITE_METADATA = {
  title: `POW! — Take charge of your menstrual cycle`,
  description: `Get to know your cycle, using your own words without worrying that the data will end up in the hands of Facebook.`,
  twitter: "@raae",
  image: "https://www.usepow.app/some.png",
}

const Seo = ({ title }) => {
  const siteMeta = SITE_METADATA

  const pageTitle = title || siteMeta.title
  const pageTitleTemplate = title && `${siteMeta.title} %s`
  const pageDescription = siteMeta.description
  const image = siteMeta.image

  return (
    <Helmet
      htmlAttributes={{
        lang: "en",
      }}
      title={pageTitle}
      titleTemplate={pageTitleTemplate}
      meta={[
        {
          name: `description`,
          content: pageDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: pageDescription,
        },
        {
          property: `og:image`,
          content: image,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: siteMeta.twitter,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: pageDescription,
        },
      ]}
    />
  )
}

export default Seo
