import React from "react";
import { ApiService } from "../utils";

const GET_BLOG = `
  {
    repository(owner: "bufgix", name: "bufgix.github.io") {
      issues(first: 100, states: OPEN, filterBy: { labels: "blog" }) {
        nodes {
          title
          body
          bodyHTML
          bodyText
          number
          labels(first: 100) {
            nodes {
              color
              name
              id
            }
          }
          author {
            url
            avatarUrl
            login
          }
          updatedAt
          id
        }
      }
    }
  }
`;

function Blog({ status, blogData, error }) {
  if (status === "OK") {
    return blogData.map((blog, index) => (
      <div key={index}>
        <h1>{blog.title}</h1>
      </div>
    ));
  } else {
    return <p>{error}</p>;
  }
}

export async function getStaticProps() {
  try {
    const res = await ApiService.post("/graphql", { query: GET_BLOG });
    return {
      props: {
        blogData: res.data.data?.repository?.issues?.nodes,
        status: "OK"
      }
    };
  } catch (error) {
    return {
      props: { status: "FAIL", error: error.message }
    };
  }
}
export default Blog;
