import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import Layout from '../components/Layout'
import Link from '../components/Link'
import Container from 'components/Container'
import { rhythm } from '../lib/typography'
import theme from '../../config/theme'
import { fonts } from '../lib/typography'
import { Twitter, GitHub, LinkedIn } from '../components/Social'
import Img from 'gatsby-image'
import { bpMaxSM } from '../lib/breakpoints'

const Hero = () => (
  <section
    css={css`
      * {
        color: ${theme.colors.orange};
      }
      width: 100%;
      height: 500px;
      background: ${theme.brand.primary};
      padding: 20px 0 30px 0;
      display: flex;
    `}
  >
    <Container
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      `}
    >
      <h1
        css={css`
          position: relative;
          z-index: 5;
          align-self: center;
          line-height: 1.5;
          margin: 0;
          max-width: ${rhythm(18)};
          font-size: 60px;
          font-family: ${fonts.regular}, sans-serif;
          font-weight: 300;
          color: ${theme.colors.orange};
          > span {
            color: ${theme.colors.dark_orange};
          }
        `}
      >
        <span>Camila </span>
        Vilarinho
      </h1>
      <div
        css={css`
          > a {
            display: inline-block;
            margin: 30px;
          }
        `}
      >
        <Twitter />
        <GitHub />
        <LinkedIn />
      </div>
    </Container>
    <div
      css={css`
        height: 150px;
        overflow: hidden;
      `}
    />
  </section>
)

const PostTitle = styled.h3`
  margin-bottom: ${rhythm(0.3)};
  margin-top: ${rhythm(0.3)};
  transition: ${theme.transition.ease};
  text-align: center;
  :hover {
    color: ${theme.brand.primary};
    transition: ${theme.transition.ease};
  }
`

const Description = styled.p`
  margin-bottom: 10px;
  display: inline-block;
`

export default function Index({ data: { site, allMdx } }) {
  return (
    <Layout
      site={site}
      headerColor={theme.colors.white}
      headerBg={theme.brand.primary}
    >
      <Hero />
      <Container
        css={css`
          padding-bottom: 0;
          margin-top: -20px;
          max-width: 1000px;
        `}
      >
        <h2>Flashcards</h2>
        <p css={css`font-style: italic;`}>Random things and tricks I learn in my coding journey...</p>
        <div
          css={css`
            display: grid;
            grid-gap: 10px;
            grid-template-columns: repeat(3, 1fr);
          `}
        >
          {allMdx.edges.map(({ node: post }) => (
            <div
              key={post.id}
              css={css`
                margin-bottom: 40px;
                background-color: #ffffff;
                border-radius: 5px;
              `}
            >
              {post.frontmatter.banner && (
                <div
                  css={css`
                    padding: 20px;
                    ${bpMaxSM} {
                      padding: 20px;
                    }
                  `}
                >
                  <Link
                    aria-label={`View ${post.frontmatter.title} article`}
                    to={`/${post.fields.slug}`}
                  >
                    <Img
                      sizes={post.frontmatter.banner.childImageSharp.fluid}
                    />
                  </Link>
                </div>
              )}
              <Link
                to={post.frontmatter.slug}
                aria-label={`View ${post.frontmatter.title}`}
              >
                <PostTitle>{post.frontmatter.title}</PostTitle>
              </Link>
              {/* <Description>
                {post.excerpt}{' '}
                <Link
                  to={post.frontmatter.slug}
                  aria-label={`View ${post.frontmatter.title}`}
                >
                  Read Article →
                </Link>
              </Description> */}
              <span />
            </div>
          ))}
        </div>
        <Link
          to="/blog"
          aria-label="Visit blog page"
          className="button-secondary"
        >
          View all flashcards
        </Link>
        <hr />
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    site {
      ...site
      siteMetadata {
        title
      }
    }
    allMdx(
      limit: 3
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { published: { ne: false } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 190)
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
            description
            banner {
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
            slug
            keywords
          }
        }
      }
    }
  }
`
