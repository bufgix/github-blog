import React from "react";
import { withRouter } from "next/router";
import { Container, Header, Footer } from "../components";
import { BlogList } from "../components/blog";
import { getBlogData, getUserData } from "../utils";
import Swal from "sweetalert2";

function Blog({ blogData, profileData, errors, router: { query } }) {
  React.useEffect(() => {
    if (query.notFound) {
      Swal.fire({
        title: "Error",
        text: "Article Not Found",
        icon: "error",
        timer: 2000,
        timerProgressBar: true,
      });
      window.history.replaceState(null, null, window.location.pathname);
    }
  });
  return (
    <React.Fragment>
      <Header profile={profileData} />
      <Container>
        <BlogList data={blogData} />
        <Footer />
      </Container>
    </React.Fragment>
  );
}

export const getServerSideProps = async () => {
  try {
    const [blogData, profileData] = await Promise.all([
      getBlogData(),
      getUserData(),
    ]);

    blogData.reverse();
    return {
      props: {
        blogData,
        profileData,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};

export default withRouter(Blog);
