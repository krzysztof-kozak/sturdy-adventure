import { useGetArticleList } from "api/hooks/useGetArticleList";
import { ArticlePreview } from "./ArticlePreview";

function ArticleList() {
  const { isPending, isError, data, error } = useGetArticleList();

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  return data.map(article => {
    return <ArticlePreview key={article.slug} {...article} />;
  });
}

export { ArticleList };
