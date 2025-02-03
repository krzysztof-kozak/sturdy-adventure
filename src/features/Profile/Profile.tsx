import { clsx } from "clsx";

import { useGetProfile } from "api/hooks/useGetProfile";
import { UsernameQueryParamSchema } from "api/schemas";
import { UserImage } from "components/UserImage";
import { Link, Outlet, useLocation, useParams } from "react-router";

function Profile() {
  const params = useParams();
  const username = UsernameQueryParamSchema.parse(params.username);
  const { isPending, isError, data, error } = useGetProfile(username);

  const { pathname } = useLocation();
  const isOnProfileHomePage = pathname === `/profile/${username}`;
  const isOnProfileFavouritedPage = pathname === `/profile/${username}/favourited`;

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
              <button className="btn btn-sm btn-outline-secondary action-btn">
                <i className="ion-plus-round" />
                &nbsp; Follow {data.username}
              </button>
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
                  <Link className={clsx("nav-link", { active: isOnProfileHomePage })} to={`/profile/${username}`}>
                    {username}'s Articles
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={clsx("nav-link", { active: isOnProfileFavouritedPage })}
                    to={`/profile/${username}/favourited`}
                  >
                    {username}'s Favorited Articles
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
