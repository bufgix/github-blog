import React from "react";
import Link from "next/link";
import Moment from "moment";
import readingTime from "reading-time";
import elipsis from "text-ellipsis";

function BlogList({ data }) {
  return data.map((blog, index) => (
    <React.Fragment key={index}>
      <BlogCard data={blog} />
      <hr />
    </React.Fragment>
  ));
}

function BlogCard({ data }) {
  return (
    <div>
      <Link href={{ pathname: `/blog/${data.title}/${data.number}` }}>
        <h2 className="uk-heading-bullet" style={{ cursor: "pointer" }}>
          {data.title}
        </h2>
      </Link>
      <div className="uk-flex uk-flex-between uk-text-middle">
        <div>
          {data.labels.nodes
            .filter(label => label.name !== "Blog")
            .map((label, index) => (
              <Link href={{ pathname: `/tag/${label.name}` }} key={index}>
                <span
                  className="uk-label uk-margin-small-right"
                  style={{
                    backgroundColor: `#${label.color}`,
                    cursor: "pointer"
                  }}
                >
                  {label.name}
                </span>
              </Link>
            ))}
        </div>
        <div className="uk-text-meta">
          {Moment(data.createdAt).fromNow()} • {readingTime(data.bodyText).text}
        </div>
      </div>
      <p>{elipsis(data.bodyText, 300)}</p>

      <Link href={{ pathname: `/blog/${data.title}/${data.number}` }}>
        <div className="uk-button uk-button-text">Read more</div>
      </Link>
    </div>
  );
}

import CommentList from "./Comment";
export { BlogList, CommentList };
