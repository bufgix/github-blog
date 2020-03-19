import React from "react";
import { Container, Header } from "../components";
import { BlogList } from "../components/blog";
import { getBlogData, getUserData } from "../utils";
import Footer from "../components/footer";

function Blog({ blogData, profileData, errors }) {
  if (errors) {
    return errors.map(err => <p>{JSON.stringify(err)}</p>);
  }
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

Blog.getInitialProps = async () => {
  try {
    const [blogData, profileData] = await Promise.all([
      getBlogData(),
      getUserData()
    ]);
    blogData.reverse();
    return {
      blogData,
      profileData
    };
  } catch (error) {
    return {
      errors: error.errors
    };
  }
};
export default Blog;
