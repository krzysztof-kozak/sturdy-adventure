import { useGetFilteredArticleList } from "api/hooks/useGetFilteredArticleList";
import { UsernameQueryParamSchema } from "api/schemas";
import { ArticleListEmptyState } from "components/ArticleListEmptyState";
import { ArticlePreview } from "components/ArticlePreview";
import { useParams } from "react-router";

function ArticleListByAuthor() {
  const params = useParams();
  const username = UsernameQueryParamSchema.parse(params.username);

  const { isPending, isError, data, error } = useGetFilteredArticleList({ author: username });

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  if (data.length < 1) {
    return (
      <ArticleListEmptyState>
        <p className="no-articles">{username} doesn't have any articles.</p>;
      </ArticleListEmptyState>
    );
  }

  return data.map(article => {
    return <ArticlePreview key={article.slug} {...article} />;
  });
}

export { ArticleListByAuthor };
