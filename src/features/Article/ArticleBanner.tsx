import { useFavouriteArticle } from "api/hooks/useFavouriteArticle";
import type { ArticleSchema } from "api/schemas";
import { FavoriteArticleButton } from "components/FavoriteArticleButton";
import { UserImage } from "components/UserImage";
import { Link } from "react-router";
import { formatDate } from "utility/formatDate";
import type { z } from "zod";

type ArticleBannerProps = Omit<z.infer<typeof ArticleSchema>, "body">;

function ArticleBanner({ title, author, createdAt, favoritesCount, favorited, slug }: ArticleBannerProps) {
  const handleFavoriteArticle = useFavouriteArticle();

  function onClick() {
    handleFavoriteArticle({ slug, action: favorited ? "unfavourite" : "favourite" });
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
          <button className="btn btn-sm btn-outline-secondary">
            <i className="ion-plus-round" />
            &nbsp; Follow {author.username}
          </button>
          &nbsp;&nbsp;
          <FavoriteArticleButton favouritesCount={favoritesCount} isFavorited={favorited} onClick={onClick} />
        </div>
      </div>
    </div>
  );
}

export { ArticleBanner };
