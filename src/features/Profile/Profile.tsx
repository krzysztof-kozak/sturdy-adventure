import { useGetArticleListByAuthor } from "api/hooks/useGetArticleListByAuthor";
import { useGetProfile } from "api/hooks/useGetProfile";
import { UsernameQueryParamSchema } from "api/schemas";
import { UserImage } from "components/UserImage";
import { ArticlePreview } from "components/ArticlePreview";
import { NavLink, useParams } from "react-router";

function Profile() {
  const params = useParams();

  const { isPending, isError, data, error } = useGetProfile(UsernameQueryParamSchema.parse(params.username));

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
                  <NavLink className="nav-link active" to="/">
                    My Articles
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Favorited Articles
                  </NavLink>
                </li>
              </ul>
            </div>

            <ArticleListByAuthor username={data.username} />
          </div>
        </div>
      </div>
    </div>
  );
}

type ArticleListByAuthorProps = { username: string };

function ArticleListByAuthor({ username }: ArticleListByAuthorProps) {
  const { isPending, isError, data, error } = useGetArticleListByAuthor(username);

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  return data.map(article => {
    return <ArticlePreview key={article.slug} {...article} />;
  });
}

export { Profile };
