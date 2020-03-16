import React from "react";

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
      <p className="uk-text-meta uk-margin-remove-top">
        {profile.bio}
      </p>
    </div>
  );
}

export default Header;
