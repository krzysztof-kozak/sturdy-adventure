import { useGetArticleList } from "api/hooks/useGetArticleList";
import { ArticlePreview } from "./ArticlePreview";
import { ArticleListEmptyState } from "./EmptyState";

function ArticleList() {
  const { isPending, isError, data, error } = useGetArticleList();

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

export { ArticleList };
