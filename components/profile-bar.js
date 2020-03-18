import React from "react";
import { getUserData } from "../utils";
import ContentLoader from "react-content-loader";

const BarLoader = () => (
  <ContentLoader
    speed={2}
    viewBox="0 0 600 100"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="10" y="10" rx="0" ry="0" width="77" height="69" />
    <rect x="102" y="14" rx="0" ry="0" width="3" height="0" />
    <rect x="104" y="18" rx="0" ry="0" width="145" height="11" />
    <rect x="107" y="37" rx="0" ry="0" width="339" height="13" />
    <rect x="180" y="78" rx="0" ry="0" width="22" height="22" />
    <rect x="210" y="78" rx="0" ry="0" width="22" height="22" />
    <rect x="240" y="78" rx="0" ry="0" width="22" height="22" />
  </ContentLoader>
);

function ProfileBar({ className }) {
  // TODO: add loading
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
      className={`uk-card uk-card-default uk-card-body  uk-padding-small ${className}`}
    >
      {loading ? (
        <BarLoader />
      ) : (
        <React.Fragment>
          <div className="uk-grid-small" uk-grid="true">
            <div className="uk-width-auto">
              <img
                src={profile.avatarUrl}
                alt="profile-pic"
                height="100"
                width="100"
              />
            </div>

            <div className="uk-width-expand">
              <div className="uk-text-lead">{profile.name}</div>
              <p className="uk-text-small uk-margin-remove-top">
                {profile.bio}
              </p>
            </div>
          </div>
          <div
            className="uk-grid-small uk-margin-small-top uk-flex-center uk-text-middle"
            uk-grid="true"
          >
            {profile.email && (
              <div className="uk-text-meta">
                <a href={`mailto:${profile.email}`}>
                  <span uk-icon="icon: mail" />
                  <span className="uk-visible@m"> {profile.email}</span>
                </a>
              </div>
            )}
            {profile.websiteUrl && (
              <div className="uk-text-meta">
                <a href={profile.websiteUrl}>
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
        </React.Fragment>
      )}
    </div>
  );
}

export default ProfileBar;
