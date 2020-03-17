import React from "react";
import { Container } from "../../components";
import { getSingleBlogData, getBlogData } from "../../utils";

function DetailView({ blogData }) {
  return (
    <Container className="uk-margin-top">
      <article className="uk-article">
        <h1 class="uk-article-title">{blogData.title}</h1>
      </article>
    </Container>
  );
}

export async function getStaticPaths() {
  try {
    const blogData = await getBlogData();
    const paths = blogData.map(blog => ({
      params: { blog: [blog.title, blog.number] }
    }));
    return {
      fallback: false,
      paths
    };
  } catch (err) {
    console.log(err);
  }
}

export async function getStaticProps({ params: { blog } }) {
  const [_, blogNumber] = blog;
  try {
    const blogData = await getSingleBlogData(blogNumber);
    return {
      props: {
        blogData
      }
    };
  } catch (err) {
    return {
      props: { errors: err.errors }
    };
  }
}

export default DetailView;
