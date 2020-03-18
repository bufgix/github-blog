import React from "react";
import { withRouter } from "next/router";
import { Container, ProfileBar } from "../../components";
import { getSingleBlogData, getBlogData } from "../../utils";
import Markdown from "markdown-to-jsx";
import Moment from "moment";
import readingTime from "reading-time";
import hljs from "highlight.js";

import "./detail.scss";

function DetailView({ blogData, router }) {
  React.useEffect(() => {
    hljs.initHighlightingOnLoad();
  });
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
          {Moment(blogData.createdAt).fromNow()} • Edited{" "}
          {Moment(blogData.updatedAt).fromNow()}
        </span>
        <ProfileBar className="uk-margin-top uk-margin-bottom" />
        <Markdown options={{ forceBlock: true }}>{blogData.body}</Markdown>
      </article>
    </Container>
  );
}

DetailView.getInitialProps = async ({ query: { blog } }) => {
  const [_, blogNumber] = blog;
  try {
    const blogData = await getSingleBlogData(blogNumber);
    return {
      blogData
    };
  } catch (err) {
    return {
      errors: err.errors
    };
  }
};

export default withRouter(DetailView);
