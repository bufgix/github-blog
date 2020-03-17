import React from "react";
import { getUserData } from "../utils";

function ProfileBar({ className }) {
  const [profile, setProfile] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchProfile() {
      const data = await getUserData();
      setProfile(data);
      setLoading(false);
    }
    try {
      fetchProfile();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div
      className={`uk-card uk-card-default uk-card-body uk-grid-small uk-padding-small ${className}`}
      uk-grid="true"
    >
      <div className="uk-width-1-6@m uk-child-width-expand@s">
        <img
          src={profile.avatarUrl}
          alt="profile-pic"
          height="100"
          width="100"
        />
      </div>

      <div className="uk-width-expand@m">
        <div className="uk-text-lead">{profile.name}</div>
        <div className="uk-text-small uk-margin-remove-top">{profile.bio}</div>
        <div className="uk-grid-small uk-margin-small-top" uk-grid="true">
          {profile.email && (
            <div className="uk-text-meta">
              <span uk-icon="icon: mail" /> {profile.email}
            </div>
          )}
          {profile.location && (
            <div className="uk-text-meta">
              <span uk-icon="icon: location" /> {profile.location}
            </div>
          )}
          {profile.company && (
            <div className="uk-text-meta">
              <span uk-icon="icon: bolt" /> {profile.company}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileBar;
