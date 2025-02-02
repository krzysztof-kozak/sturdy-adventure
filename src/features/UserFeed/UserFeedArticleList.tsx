import { useGetArticles } from "api/hooks/useGetArticleList";
import { ArticlePreview } from "../../components/ArticlePreview";
import { ArticleListEmptyState } from "./ArticleListEmptyState";

function UserFeedArticleList() {
  const { isPending, isError, data, error } = useGetArticles("/articles/feed");

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

export { UserFeedArticleList };
