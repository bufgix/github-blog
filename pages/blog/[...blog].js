import React from "react";
import { withRouter } from "next/router";
import { Container, ProfileBar, ReactionsBar, FullScreenImage, ArticleLink } from "../../components";
import { CommentList } from "../../components/blog";
import { getSingleBlogData, redirect } from "../../utils";
import Markdown from "markdown-to-jsx";
import Moment from "moment";
import readingTime from "reading-time";
import config from "../../config";
import hljs from "highlight.js";

import Footer from "../../components/footer";


function DetailView({ blogData, router }) {
  React.useEffect(() => {
    hljs.initHighlightingOnLoad();
    document.title = `${blogData.title} - ${config.username}'s blog`;
  }, []);

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
        <Markdown
          options={{
            forceBlock: true,
            overrides: {
              img: {
                component: FullScreenImage
              },
              a: {
                component: ArticleLink
              }
            }
          }}
        >
          {blogData.body}
        </Markdown>
      </article>
      <ReactionsBar reactionsData={blogData.reactions} />
      <hr />
      <CommentList commentData={blogData.comments} />
      <Footer />
    </Container>
  );
}

DetailView.getInitialProps = async ({ query: { blog }, res }) => {
  const [_, blogNumber] = blog;
  try {
    const blogData = await getSingleBlogData(blogNumber);
    return {
      blogData
    };
  } catch (err) {
    redirect({ res, location: `/?notFound=true` });
  }
};

export default withRouter(DetailView);
