import { clsx } from "clsx";
import { useAuth } from "features/Auth/Auth";

type FollowAuthorButtonProps = {
  name: string;
  following: boolean;
  onClick: VoidFunction;
};

function FollowAuthorButton({ name, following, onClick }: FollowAuthorButtonProps) {
  const { isAuthenticated } = useAuth();

  return (
    <button
      className={clsx("btn btn-sm btn-outline-secondary", { active: following, disabled: !isAuthenticated })}
      onClick={onClick}
    >
      <i className="ion-plus-round" />
      &nbsp; {following ? "Unfollow" : "Follow"} {name}
    </button>
  );
}

export { FollowAuthorButton };
