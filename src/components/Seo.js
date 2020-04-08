import React from "react"
import { Helmet } from "react-helmet"
import { graphql, useStaticQuery } from "gatsby"

const useSiteMetadata = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          twitter
          image
        }
      }
    }
  `)

  return data.site.siteMetadata
}

const SEO = ({ title }) => {
  const siteMeta = useSiteMetadata()

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

export default SEO
