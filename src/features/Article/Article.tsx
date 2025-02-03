import { useGetArticle } from "api/hooks/useGetArticle";
import { SlugQueryParamSchema } from "api/schemas";
import { useParams } from "react-router";
import { ArticleBanner } from "./ArticleBanner";
import { ArticleContent } from "./ArticleContent";
import { ArticleActions } from "./ArticleActions";
import { ArticleCommentSection } from "./ArticleCommentSection";

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
    <div className="article-page">
      <ArticleBanner
        title={data.title}
        author={data.author}
        createdAt={data.createdAt}
        favoritesCount={data.favoritesCount}
        favorited={data.favorited}
        slug={data.slug}
      />

      <div className="container page">
        <ArticleContent body={data.body} />

        <hr />

        <ArticleActions
          author={data.author}
          createdAt={data.createdAt}
          favoritesCount={data.favoritesCount}
          favorited={data.favorited}
          slug={data.slug}
        />

        <ArticleCommentSection />
      </div>
    </div>
  );
}

export { Article };
