import { clsx } from "clsx";

import { useGetProfile } from "api/hooks/useGetProfile";
import { UsernameQueryParamSchema } from "api/schemas";
import { UserImage } from "components/UserImage";
import { Link, Outlet, useLocation, useParams } from "react-router";
import { useFollowUser } from "api/hooks/useFollowUser";
import { FollowAuthorButton } from "components/FollowAuthorButton";

function Profile() {
  const params = useParams();
  const name = UsernameQueryParamSchema.parse(params.username);
  const { isPending, isError, data, error } = useGetProfile(name);

  const { pathname } = useLocation();
  const isOnProfileHomePage = pathname === `/profile/${name}`;
  const isOnProfileFavouritedPage = pathname === `/profile/${name}/favourited`;

  const handleFollowUser = useFollowUser();

  function onFollowUserBtnClick() {
    if (!data) return;
    handleFollowUser({ username: data.username, action: data.following ? "unfollow" : "follow" });
  }

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <UserImage url={data.image}>
                <div className="author-image-fallback">{data.username.charAt(0)}</div>
              </UserImage>
              <h4>{data.username}</h4>
              <p>{data.bio}</p>
              <FollowAuthorButton name={data.username} following={data.following} onClick={onFollowUserBtnClick} />
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <Link className={clsx("nav-link", { active: isOnProfileHomePage })} to={`/profile/${data.username}`}>
                    {data.username}'s Articles
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={clsx("nav-link", { active: isOnProfileFavouritedPage })}
                    to={`/profile/${data.username}/favourited`}
                  >
                    {data.username}'s Favorited Articles
                  </Link>
                </li>
              </ul>
            </div>

            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export { Profile };
