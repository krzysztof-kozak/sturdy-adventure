import { useAuth } from "features/Auth/Auth";

function ArticleListEmptyState() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <p className="no-articles">No post in your feed yet...</p>;
  }

  return <p className="no-articles">There are no posts here...</p>;
}

export { ArticleListEmptyState };
