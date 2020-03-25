import React from "react";
import { Container, Header, Footer } from "../../components";
import { getBlogData, getUserData } from "../../utils";
import { BlogList } from "../../components/blog";

function TagView({ blogData, profileData, errors }) {
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

TagView.getInitialProps = async ({ query: { tag } }) => {
  const [blogTag] = tag;
  try {
    const [blogData, profileData] = await Promise.all([
      getBlogData(blogTag),
      getUserData()
    ]);
    blogData.reverse();
    return {
      blogData,
      profileData
    };
  } catch (error) {
    console.log(error);
    return {
      errors: error.errors
    };
  }
};

export default TagView;
