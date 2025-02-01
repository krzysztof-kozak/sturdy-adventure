import { useGetArticle } from "api/hooks/useGetArticle";
import type { ArticleSchema } from "api/schemas";
import { SlugQueryParamSchema } from "api/schemas";
import { UserImage } from "components/UserImage";
import { Link } from "react-router";
import { useParams } from "react-router";
import { formatDate } from "utility/formatDate";
import { renderMarkdown } from "utility/renderMarkdown";
import type { z } from "zod";

function Article() {
  const params = useParams();

  const { isPending, isError, data, error } = useGetArticle(SlugQueryParamSchema.parse(params.slug));

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <>
      <nav className="navbar navbar-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            conduit
          </Link>
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              {/* Add "active" class when you're on that page" */}
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/editor">
                <i className="ion-compose" />
                &nbsp;New Article
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/settings">
                <i className="ion-gear-a" />
                &nbsp;Settings
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Sign in
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Sign up
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="article-page">
        <ArticleBanner
          title={data.title}
          author={data.author}
          createdAt={data.createdAt}
          favoritesCount={data.favoritesCount}
        />

        <div className="container page">
          <ArticleContent body={data.body} />

          <hr />

          <ArticleActions author={data.author} createdAt={data.createdAt} favoritesCount={data.favoritesCount} />

          <ArticleCommentSection />
        </div>
      </div>

      <footer>
        <div className="container">
          <Link to="/" className="logo-font">
            conduit
          </Link>
          <span className="attribution">
            An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design
            licensed under MIT.
          </span>
        </div>
      </footer>
    </>
  );
}

type ArticleBannerProps = Omit<z.infer<typeof ArticleSchema>, "body">;

function ArticleBanner({ title, author, createdAt, favoritesCount }: ArticleBannerProps) {
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
          <button className="btn btn-sm btn-outline-primary">
            <i className="ion-heart" />
            &nbsp; Favorite Post <span className="counter">({favoritesCount})</span>
          </button>
        </div>
      </div>
    </div>
  );
}

type ArticleContentProps = Pick<z.infer<typeof ArticleSchema>, "body">;

function ArticleContent({ body }: ArticleContentProps) {
  return (
    <div className="row article-content">
      <div className="col-md-12" dangerouslySetInnerHTML={renderMarkdown(body)}></div>
    </div>
  );
}

type ArticleActionsProps = Pick<z.infer<typeof ArticleSchema>, "author" | "createdAt" | "favoritesCount">;

function ArticleActions({ author, createdAt, favoritesCount }: ArticleActionsProps) {
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
        <button className="btn btn-sm btn-outline-secondary">
          <i className="ion-plus-round" />
          &nbsp; Follow {author.username}
        </button>
        &nbsp;
        <button className="btn btn-sm btn-outline-primary">
          <i className="ion-heart" />
          &nbsp; Favorite Post <span className="counter">({favoritesCount})</span>
        </button>
      </div>
    </div>
  );
}

function ArticleCommentSection() {
  return (
    <div className="row">
      <div className="col-xs-12 col-md-8 offset-md-2">
        <form className="card comment-form">
          <div className="card-block">
            <textarea className="form-control" placeholder="Write a comment..." rows={3} />
          </div>
          <div className="card-footer">
            <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" alt="" />
            <button className="btn btn-sm btn-primary">Post Comment</button>
          </div>
        </form>

        <div className="card">
          <div className="card-block">
            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
          </div>
          <div className="card-footer">
            <a href="/#/profile/jacobschmidt" className="comment-author">
              <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" alt="" />
            </a>
            &nbsp;
            <a href="/#/profile/jacobschmidt" className="comment-author">
              Jacob Schmidt
            </a>
            <span className="date-posted">Dec 29th</span>
          </div>
        </div>

        <div className="card">
          <div className="card-block">
            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
          </div>
          <div className="card-footer">
            <a href="/#/profile/jacobschmidt" className="comment-author">
              <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" alt="" />
            </a>
            &nbsp;
            <a href="/#/profile/jacobschmidt" className="comment-author">
              Jacob Schmidt
            </a>
            <span className="date-posted">Dec 29th</span>
            <span className="mod-options">
              <i className="ion-edit" />
              <i className="ion-trash-a" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Article };
