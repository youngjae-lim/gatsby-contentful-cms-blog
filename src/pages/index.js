import React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import Img from "gatsby-image"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Post = styled.div`
  display: flex;
  border: 2px solid #6687D0;
  border-radius: 10px;
  padding: 5px;
  align-items: center;

  :hover {
    transform: scale(1.02);
    transition: transform 0.4s ease-out;
  }
`

const PostImage = styled.div`
  flex: 25%;
  margin-right: 1rem;

  Img {
    border-radius: 10px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`

const PostText = styled.div`
  flex: 75%;
`

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allContentfulPost.edges

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
      <ol style={{ listStyle: `none`, marginLeft: "0" }}>
        {posts.map(post => {
          const title = post.node.title || post.node.slug

          return (
            <li key={post.node.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <Link
                  to={post.node.slug}
                  itemProp="url"
                  style={{ textDecoration: "none" }}
                >
                  <Post key={post.node.slug}>
                    <PostImage>
                      <Img fluid={post.node.image.fluid} />
                    </PostImage>
                    <PostText>
                      <header>
                        <h2>{title}</h2>
                        <small>{post.node.date}</small>
                      </header>
                      <section>
                        <p>{post.node.subtitle}</p>
                      </section>
                    </PostText>
                  </Post>
                </Link>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulPost {
      edges {
        node {
          title
          subtitle
          author
          slug
          date(formatString: "MMMM DD, YYYY")
          image {
            fluid {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  }
`
