import React from "react";
import ReactionBar from "../reactions-bar";
import Markdown from "markdown-to-jsx";
import Moment from "moment";
import { ArticleLink, FullScreenImage } from "../index";
import styles from "./comment.styles.css";

function CommentList({ commentData }) {
  const { totalCount, nodes } = commentData;
  if (totalCount > 0) {
    return nodes.map((comment, index) => (
      <Comment key={index} singleComment={comment} />
    ));
  }
  return null
}

function Comment({ singleComment }) {
  const {
    author: { login, avatarUrl },
    body,
    reactions,
    createdAt,
    lastEditedAt
  } = singleComment;
  return (
    <div className={styles.commentContainer}>
      <div className={styles.commentHeader}>
        <img src={avatarUrl} alt="comment-profile-img" height="20" width="20" />
        <div className={styles.commentAuthor}>{login}</div>
        <span className="uk-text-light">
          {Moment(createdAt).fromNow()} {lastEditedAt ? "• Edited" : null}
        </span>
      </div>
      <div className={styles.commentBody}>
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
          {body}
        </Markdown>
      </div>
      <ReactionBar reactionsData={reactions} />
    </div>
  );
}

export default CommentList;
