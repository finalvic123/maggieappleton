import React, { useState } from 'react'
import Layout from 'components/Layout'
import { css } from '@emotion/core'
import Container from 'components/Container'
import { graphql } from 'gatsby'
import { bpMaxSM } from '../lib/breakpoints'
import { Book } from '../components/Book'
import { Link } from 'gatsby'
import { Tabs, Tab, TabContent } from '../components/Tabs'

const LibraryPage = ({ data: { site, bookQuery, paperQuery } }) => {
  console.log(paperQuery.edges)

  const [activeTab, setActiveTab] = useState(0)

  const handleTabSwitch = e => {
    const index = parseInt(e.target.id, 0)
    if (index !== activeTab) {
      setActiveTab(index)
    }
  }

  return (
    <Layout site={site}>
      <Container
        css={css`
          margin-top: 1.6em;
          margin-bottom: 2em;
          h1 {
            margin-bottom: 0.4em;
            text-align: center;
          }
          p {
            margin-bottom: 0.8em;
            text-align: center;
          }
          .books {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
            margin: 0 auto;
            margin-top: 3em;
            ${bpMaxSM} {
              flex-direction: column;
            }
            img {
              border-radius: 4px;
            }
        `}
      >
        <h1>The Library</h1>
        <p>Books I've read. Accompanied by loose and opinionated notes.<br />To see books I haven't read, browse the <Link to='/antilibrary'>Anti Library</Link></p>

            <Tabs>

              <Tab onClick={handleTabSwitch} activeTab={activeTab === 0} id={0}>Books</Tab>

              <Tab onClick={handleTabSwitch} activeTab={activeTab === 1} id={1}>Papers</Tab>

              <Tab onClick={handleTabSwitch} activeTab={activeTab === 2} id={2}>Talks</Tab>

            </Tabs>

        {/* ------------ Books Section ------------ */}
        <section className="books">
          <TabContent activeTab={activeTab === 0}>
          {bookQuery.edges.map(({ node: book }) => (
            <Book
              redirectTo={book.frontmatter.redirectTo}
              slug={book.frontmatter.slug}
              title={book.frontmatter.title}
              key={book.id}
              fluidImg={book.frontmatter.cover.childImageSharp.fluid}
              author={book.frontmatter.author}
            />
          ))}
          </TabContent>
          <TabContent activeTab={activeTab === 1}>
          {paperQuery.edges.map(({ node: paper }) => (
            <Book
              redirectTo={paper.frontmatter.redirectTo}
              slug={paper.frontmatter.slug}
              title={paper.frontmatter.title}
              key={paper.id}
              author={paper.frontmatter.author}
            />
          ))}
          </TabContent>
        </section>
      </Container>
    </Layout>
  )
}

export default LibraryPage

export const libraryPageQuery = graphql`
  query {
    site {
      ...site
      siteMetadata {
        title
      }
    }
    bookQuery: allMdx(
      filter: {
        frontmatter: { type: { eq: "book" }, published: { ne: false } }
      }
      sort: { order: DESC, fields: frontmatter___date }
      limit: 45
    ) {
      edges {
        node {
          id
          fields {
            title
            slug
            date
          }
          parent {
            ... on File {
              sourceInstanceName
            }
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            slug
            author
            redirectTo
            cover {
              childImageSharp {
                fluid(maxWidth: 300) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }

    paperQuery: allMdx(
      filter: {
        frontmatter: { type: { eq: "paper" }, published: { ne: false } }
      }
      sort: { order: DESC, fields: frontmatter___date }
      limit: 45
    ) {
      edges {
        node {
          id
          fields {
            title
            slug
            date
          }
          parent {
            ... on File {
              sourceInstanceName
            }
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            slug
            author
            redirectTo
          }
        }
      }
    }

    talkQuery: allMdx(
      filter: {
        frontmatter: { type: { eq: "talk" }, published: { ne: false } }
      }
      sort: { order: DESC, fields: frontmatter___date }
      limit: 45
    ) {
      edges {
        node {
          id
          fields {
            title
            slug
            date
          }
          parent {
            ... on File {
              sourceInstanceName
            }
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            slug
            author
            redirectTo
          }
        }
      }
    }

    podcastQuery: allMdx(
      filter: {
        frontmatter: { type: { eq: "podcast" }, published: { ne: false } }
      }
      sort: { order: DESC, fields: frontmatter___date }
      limit: 45
    ) {
      edges {
        node {
          id
          fields {
            title
            slug
            date
          }
          parent {
            ... on File {
              sourceInstanceName
            }
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            slug
            author
            redirectTo
          }
        }
      }
    }
  }
`
