import type { ArticlePreviewSchema } from "api/schemas";

import { Link } from "react-router";
import type { z } from "zod";
import { UserImage } from "components/UserImage";
import { formatDate } from "utility/formatDate";

type ArticlePreviewProps = z.infer<typeof ArticlePreviewSchema>;

function ArticlePreview({ title, description, author, createdAt, favoritesCount, slug }: ArticlePreviewProps) {
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

        <button className="btn btn-outline-primary btn-sm pull-xs-right">
          <i className="ion-heart" /> {favoritesCount}
        </button>
      </div>

      <Link to={slug} className="preview-link">
        <h1>{title}</h1>
        <p>{description}.</p>
        <span>Read more...</span>
      </Link>
    </div>
  );
}

export { ArticlePreview };
