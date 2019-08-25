import React from "react"
import { graphql } from "gatsby"
import PublicTemplate from "./../templates/public"
import { Container } from "@material-ui/core"

const Index = ({ data }) => {
  console.log(data)
  return (
    <PublicTemplate>
      {data.allMarkdownRemark.nodes
        .sort(
          (nodeA, nodeB) => nodeA.frontmatter.order - nodeB.frontmatter.order
        )
        .map(({ html }) => {
          return (
            <Container>
              <div
                dangerouslySetInnerHTML={{
                  __html: html,
                }}
              ></div>
            </Container>
          )
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
