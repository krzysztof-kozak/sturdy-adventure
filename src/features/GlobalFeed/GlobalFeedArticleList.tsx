import { useGetArticles } from "api/hooks/useGetArticleList";
import { ArticlePreview } from "../../components/ArticlePreview";
import { ArticleListEmptyState } from "./ArticleListEmptyState";

function GlobalFeedArticleList() {
  const { isPending, isError, data, error } = useGetArticles("/articles");

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  if (data.length < 1) {
    return <ArticleListEmptyState />;
  }

  return data.map(article => {
    return <ArticlePreview key={article.slug} {...article} />;
  });
}

export { GlobalFeedArticleList };
