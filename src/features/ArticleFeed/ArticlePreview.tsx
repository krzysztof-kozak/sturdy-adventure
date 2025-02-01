import type { ArticlePreviewSchema } from "api/schemas";
import type { ReactNode } from "react";
import { Link } from "react-router";
import type { z } from "zod";
import "./styles.css";

type ArticlePreviewProps = z.infer<typeof ArticlePreviewSchema>;

function ArticlePreview({ title, description, author, createdAt, favoritesCount, slug }: ArticlePreviewProps) {
  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={slug}>
          <AuthorImage url={author.image}>
            <div className="author-image-fallback">{author.username.charAt(0)}</div>
          </AuthorImage>
        </Link>

        <div className="info">
          <Link to={slug} className="author">
            {author.username}
          </Link>
          <span className="date">{formatDate(createdAt)}</span>
        </div>

        <button className="btn btn-outline-primary btn-sm pull-xs-right">
          <i className="ion-heart" /> {favoritesCount}
        </button>
      </div>

      <Link to="/how-to-build-webapps-that-scale" className="preview-link">
        <h1>{title}</h1>
        <p>{description}.</p>
        <span>Read more...</span>
      </Link>
    </div>
  );
}

type AuthorImageProps = {
  url: string;
  children: ReactNode;
};

function AuthorImage({ url, children }: AuthorImageProps) {
  if (url.length < 1) {
    return children;
  }

  return <img src={url} alt="" />;
}

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", { dateStyle: "medium" });
}

export { ArticlePreview };
