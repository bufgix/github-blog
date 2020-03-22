import React from "react";
import styles from "./reactions-bar.styles.css";

function ReactionsBar({ reactionsData }) {
  const [reactions, setReactions] = React.useState({});

  const prepareReactions = () => {
    let reactions = {
      THUMBS_DOWN: { content: "👎", count: 0 },
      THUMBS_UP: { content: "👍", count: 0 },
      HEART: { content: "❤️", count: 0 },
      HOORAY: { content: "🎉", count: 0 },
      LAUGH: { content: "🤣", count: 0 },
      ROCKET: { content: "🚀", count: 0 },
      CONFUSED: { content: "😕", count: 0 },
      EYES: { content: "👀", count: 0 },
      TOTAL_COUNT: reactionsData.totalCount
    };
    if (reactions.TOTAL_COUNT) {
      reactionsData.nodes.forEach(reaction => {
        reactions[reaction.content].count += 1;
      });
    }

    return reactions;
  };

  React.useEffect(() => {
    setReactions(prepareReactions());
  }, []);

  if (reactions.TOTAL_COUNT) {
    return (
      <ul className={styles.reactionsList}>
        {Object.keys(reactions)
          .filter(reactionKey => reactions[reactionKey].count > 0)
          .map((reactionKey, index) => (
            <li key={index} className={styles.reactionsListItem}>
              {reactions[reactionKey].content} {reactions[reactionKey].count}
            </li>
          ))}
      </ul>
    );
  } else {
    return null;
  }
}

export default ReactionsBar;
