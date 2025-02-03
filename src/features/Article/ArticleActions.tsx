import { useFavouriteArticle } from "api/hooks/useFavouriteArticle";
import { useFollowUser } from "api/hooks/useFollowUser";
import type { ArticleSchema } from "api/schemas";
import { FavoriteArticleButton } from "components/FavoriteArticleButton";
import { FollowAuthorButton } from "components/FollowAuthorButton";
import { UserImage } from "components/UserImage";
import { Link } from "react-router";
import { formatDate } from "utility/formatDate";
import type { z } from "zod";

type ArticleActionsProps = Omit<z.infer<typeof ArticleSchema>, "title" | "body">;

function ArticleActions({ author, createdAt, favoritesCount, favorited, slug }: ArticleActionsProps) {
  const handleFavoriteArticle = useFavouriteArticle();
  const handleFollowUser = useFollowUser();

  function onClick() {
    handleFavoriteArticle({ slug, action: favorited ? "unfavourite" : "favourite" });
  }

  function onFollowUserBtnClick() {
    handleFollowUser({ username: author.username, slug, action: author.following ? "unfollow" : "follow" });
  }

  return (
    <div className="article-actions">
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
        &nbsp;
        <FavoriteArticleButton favouritesCount={favoritesCount} isFavorited={favorited} onClick={onClick} />
      </div>
    </div>
  );
}

export { ArticleActions };
