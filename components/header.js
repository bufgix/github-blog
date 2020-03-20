import React from "react";
import config from "../config";

function Header({ profile }) {
  return (
    <div className="uk-container uk-container-expand uk-text-center uk-align-center uk-padding">
      <img
        style={{
          borderRadius: 99999
        }}
        src={profile.avatarUrl}
        alt="profile-pic"
        height="120"
        width="120"
      />
      <h1 className="uk-heading-small uk-margin-remove-top uk-margin-remove-bottom">
        {profile.name}
      </h1>
      <p className="uk-text-meta uk-margin-remove-top">{profile.bio}</p>
      <div
        className="uk-grid-small uk-margin-small-top uk-flex-center uk-text-middle"
        uk-grid="true"
      >
        {profile.email && (
          <div className="uk-text-meta">
            <a href={`mailto:${profile.email}`} target="_blank">
              <span uk-icon="icon: mail" />
              <span className="uk-visible@m"> {profile.email}</span>
            </a>
          </div>
        )}
        {profile.websiteUrl && (
          <div className="uk-text-meta">
            <a href={profile.websiteUrl} target="_blank">
              <span uk-icon="icon: home" />
              <span className="uk-visible@m "> {profile.websiteUrl}</span>
            </a>
          </div>
        )}
        {profile.location && (
          <div className="uk-text-meta">
            <span uk-icon="icon: location" />
            <span className="uk-visible@m">{profile.location}</span>
          </div>
        )}
        {profile.company && (
          <div className="uk-text-meta">
            <span uk-icon="icon: bolt" />
            <span className="uk-visible@m">{profile.company}</span>
          </div>
        )}
      </div>
      <div className="uk-text-meta uk-margin-small-top">
        <a target="_blank" href={`https://github-cv.now.sh/${config.username}`}>
          RÉSUMÉ
        </a>
      </div>
    </div>
  );
}

export default Header;
