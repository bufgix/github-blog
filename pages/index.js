import React from "react";
import { Container, Header } from "../components";
import { BlogList } from "../components/blog";
import { getBlogData, getUserData } from "../utils";

function Blog({ blogData, profileData, errors }) {
  if (errors) {
    return errors.map(err => <p>{JSON.stringify(err)}</p>);
  }
  return (
    <React.Fragment>
      <Header profile={profileData} />
      <Container>
        <BlogList data={blogData} />
      </Container>
    </React.Fragment>
  );
}

export async function getStaticProps() {
  try {
    const [blogData, profileData] = await Promise.all([
      getBlogData(),
      getUserData()
    ]);
    blogData.reverse();
    return {
      props: {
        blogData,
        profileData
      }
    };
  } catch (error) {
    return {
      props: { errors: error.errors }
    };
  }
}
export default Blog;
