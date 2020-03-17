import React from "react";
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
  /*   return (
    <div className="uk-card uk-card-default uk-card-small uk-card-body uk-card-hover uk-margin-bottom">
      <div className="uk-badge uk-label">Badge</div>
      <div className="uk-card-title">{data.title}</div>
      <div className="uk-card-body">{elipsis(data.bodyText, 200)}</div>
    </div>
  ); */
  return (
    <div>
      <h2 className="uk-heading-bullet">{data.title}</h2>
      <div className="uk-flex uk-flex-between uk-text-middle">
        <div>
          {data.labels.nodes
            .filter(label => label.name !== "blog")
            .map((label, index) => (
              <span
                className="uk-label uk-margin-small-right"
                key={index}
                style={{ backgroundColor: `#${label.color}` }}
              >
                {label.name}
              </span>
            ))}
        </div>
        <div className="uk-text-meta">
          {Moment(data.updatedAt)
            .startOf("day")
            .fromNow()}{" "}
          | {readingTime(data.bodyText).text}
        </div>
      </div>
      <p>{elipsis(data.bodyText, 300)}</p>
      <div>
        <a className="uk-button uk-button-text" href="#">
          Read more
        </a>
      </div>
    </div>
  );
}

export { BlogList };
