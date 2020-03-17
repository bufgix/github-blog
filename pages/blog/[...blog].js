import React from "react";
import { withRouter } from "next/router";
import { Container, ProfileBar } from "../../components";
import { getSingleBlogData, getBlogData } from "../../utils";
import renderHTML from "react-render-html";
import Moment from "moment";
import readingTime from "reading-time";
import "./detail.scss";

function DetailView({ blogData, router }) {
  return (
    <Container className="uk-margin-top">
      <ion-icon
        name="arrow-back-outline"
        size="large"
        style={{ cursor: "pointer" }}
        onClick={() => {
          router.replace("/");
        }}
      ></ion-icon>
      <article className="uk-article">
        <h1 className="uk-article-title">{blogData.title}</h1>
        <span className="uk-text-light">
          {readingTime(blogData.bodyText).text} •{" "}
          {Moment(blogData.updatedAt)
            .startOf("day")
            .fromNow()}{" "}
        </span>
        <ProfileBar className="uk-margin-top uk-margin-bottom" />
        <div>{renderHTML(blogData.bodyHTML)}</div>
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

export default withRouter(DetailView);
