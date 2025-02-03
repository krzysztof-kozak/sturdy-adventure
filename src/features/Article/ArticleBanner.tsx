import { useFavouriteArticle } from "api/hooks/useFavouriteArticle";
import { useFollowUser } from "api/hooks/useFollowUser";
import type { ArticleSchema } from "api/schemas";
import { FavoriteArticleButton } from "components/FavoriteArticleButton";
import { FollowAuthorButton } from "components/FollowAuthorButton";
import { UserImage } from "components/UserImage";
import { Link } from "react-router";
import { formatDate } from "utility/formatDate";
import type { z } from "zod";

type ArticleBannerProps = Omit<z.infer<typeof ArticleSchema>, "body">;

function ArticleBanner({ title, author, createdAt, favoritesCount, favorited, slug }: ArticleBannerProps) {
  const handleFavoriteArticle = useFavouriteArticle();
  const handleFollowUser = useFollowUser();

  function onFavoriteArticleBtnClick() {
    handleFavoriteArticle({ slug, action: favorited ? "unfavourite" : "favourite" });
  }

  function onFollowUserBtnClick() {
    handleFollowUser({ username: author.username, slug, action: author.following ? "unfollow" : "follow" });
  }

  return (
    <div className="banner">
      <div className="container">
        <h1>{title}</h1>

        <div className="article-meta">
          <Link to={`/profile/${author.username}`}>
            <UserImage url={author.image}>
              <div className="author-image-fallback">{author.username.charAt(0)}</div>
            </UserImage>
          </Link>
          <div className="info">
            <Link to={`/profile/${author.username}`} className="author">
              {author.username}
            </Link>
            <span className="date">{formatDate(createdAt)}</span>
          </div>
          <FollowAuthorButton name={author.username} following={author.following} onClick={onFollowUserBtnClick} />
          &nbsp;&nbsp;
          <FavoriteArticleButton
            favouritesCount={favoritesCount}
            isFavorited={favorited}
            onClick={onFavoriteArticleBtnClick}
          />
        </div>
      </div>
    </div>
  );
}

export { ArticleBanner };
