import React from "react";
import { withRouter } from "next/router";
import { Container, ProfileBar, ReactionsBar } from "../../components";
import { getSingleBlogData, redirect } from "../../utils";
import ModalImage from "react-modal-image";
import Markdown from "markdown-to-jsx";
import Moment from "moment";
import readingTime from "reading-time";
import hljs from "highlight.js";

import Footer from "../../components/footer";

function FullScreenImage({ ...props }) {
  return <ModalImage small={props.src} large={props.src} />;
}

function Link({ children, ...props }) {
  return (
    <a href={props.href} target="_blank">
      {children}
    </a>
  );
}

function DetailView({ blogData, router }) {
  React.useEffect(() => {
    hljs.initHighlightingOnLoad();
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
                component: Link
              }
            }
          }}
        >
          {blogData.body}
        </Markdown>
      </article>
      <ReactionsBar reactionsData={blogData.reactions} />
      <hr />
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
