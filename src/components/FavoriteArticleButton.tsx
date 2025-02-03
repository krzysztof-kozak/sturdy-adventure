import { clsx } from "clsx";
import { useAuth } from "features/Auth/Auth";

type FavoriteArticleButtonProps = {
  favouritesCount: number;
  isFavorited: boolean;
  onClick: VoidFunction;
};

function FavoriteArticleButton({ favouritesCount, isFavorited, onClick }: FavoriteArticleButtonProps) {
  const { isAuthenticated } = useAuth();

  return (
    <button
      className={clsx("btn btn-sm btn-outline-primary", { disabled: !isAuthenticated, active: isFavorited })}
      onClick={onClick}
    >
      <i className="ion-heart" />
      &nbsp; {isFavorited ? "UnFavorite" : "Favorite"} Post <span className="counter">({favouritesCount})</span>
    </button>
  );
}

export { FavoriteArticleButton };
