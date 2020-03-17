import React from "react";
import { getBlogData } from "../../utils";

function DetailView() {
  return <div>sa</div>;
}

export async function getStaticPaths() {
  try {
    const blogData = await getBlogData();
    const paths = blogData.map(blog => ({ params: { blogTitle: blog.title } }));
    return {
      fallback: false,
      paths
    };
  } catch (err) {
    console.log(err);
  } 
}

export async function getStaticProps({ params }) {
  return { props: {} };
}

export default DetailView;
