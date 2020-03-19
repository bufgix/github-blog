import React from "react";
import config from "../config";

function Footer() {
  return (
    <React.Fragment>
      <hr />
      <footer className="uk-flex uk-flex-between">
        <div>
          <a
            target="_blank"
            className="uk-link-text uk-text-bolder"
            href={`https://github.com/${config.username}`}
          >
            {config.username}
          </a>
          's blog
        </div>
        <div>
          <a
            target="_blank"
            className="uk-link-text uk-text-bolder"
            href="https://github.com/bufgix/github-blog"
          >
            Github-Blog{" "}
          </a>
          was created with ❤️ by{" "}
          <a
            target="_blank"
            className="uk-link-text uk-text-bolder"
            href="https://github.com/bufgix"
          >
            Bufgix
          </a>
        </div>
      </footer>
    </React.Fragment>
  );
}

export default Footer;
