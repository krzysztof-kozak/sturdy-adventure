import type { z } from "zod";
import type { ArticlePreviewSchema } from "api/schemas";
import { Link } from "react-router";
import { UserImage } from "components/UserImage";
import { formatDate } from "utility/formatDate";
import { useAuth } from "features/Auth/Auth";
import { clsx } from "clsx";

import { useFavouriteArticle } from "api/hooks/useFavouriteArticle";

type ArticlePreviewProps = z.infer<typeof ArticlePreviewSchema>;

function ArticlePreview({
  title,
  description,
  author,
  createdAt,
  favoritesCount,
  favorited,
  slug,
}: ArticlePreviewProps) {
  const { isAuthenticated } = useAuth();
  const handleFollow = useFavouriteArticle();

  function onClick() {
    handleFollow({ slug, action: favorited ? "unfavourite" : "favourite" });
  }

  return (
    <div className="article-preview">
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

        <button
          className={clsx("btn btn-outline-primary btn-sm pull-xs-right", {
            active: favorited,
            disabled: !isAuthenticated,
          })}
          onClick={onClick}
        >
          <i className="ion-heart" /> {favoritesCount}
        </button>
      </div>

      <Link to={`/articles/${slug}`} className="preview-link">
        <h1>{title}</h1>
        <p>{description}.</p>
        <span>Read more...</span>
      </Link>
    </div>
  );
}

export { ArticlePreview };
