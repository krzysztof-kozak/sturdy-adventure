import type { ReactNode } from "react";

type ArticleListEmptyStateProps = { children: ReactNode };

function ArticleListEmptyState({ children }: ArticleListEmptyStateProps) {
  return children;
}

export { ArticleListEmptyState };
