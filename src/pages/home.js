import React from "react"
import { graphql } from "gatsby"
import PublicTemplate from "./../templates/public"
import Section from "../components/Section"

const Index = ({ data }) => {
  return (
    <PublicTemplate>
      {data.allMarkdownRemark.nodes
        .sort(
          (nodeA, nodeB) => nodeA.frontmatter.order - nodeB.frontmatter.order
        )
        .map(({ html, frontmatter }) => {
          return <Section html={html} variant={frontmatter.layout}></Section>
        })}
    </PublicTemplate>
  )
}

export default Index

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark {
      nodes {
        html
        frontmatter {
          order
          title
          layout
        }
      }
    }
  }
`
