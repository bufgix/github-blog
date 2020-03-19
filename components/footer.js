import React from "react";
import config from "../config";

function Footer() {
  return (
    <React.Fragment>
      <footer className="uk-margin-top uk-margin-bottom uk-flex">
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
        <div className="uk-margin-small-left uk-margin-small-right">•</div>
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
