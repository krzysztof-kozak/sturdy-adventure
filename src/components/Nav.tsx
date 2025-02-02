import { useAuth } from "features/Auth/Auth";
import { NavLink } from "react-router";

function Nav() {
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          conduit
        </NavLink>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/editor">
              <i className="ion-compose" />
              &nbsp;New Article
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/settings">
              <i className="ion-gear-a" />
              &nbsp;Settings
            </NavLink>
          </li>

          <AuthActions />
        </ul>
      </div>
    </nav>
  );
}

function AuthActions() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return (
      <li className="nav-item">
        <NavLink className="nav-link" to="/logout">
          Logout
        </NavLink>
      </li>
    );
  }

  return (
    <>
      <li className="nav-item">
        <NavLink className="nav-link" to="/login">
          Sign in
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/register">
          Sign up
        </NavLink>
      </li>
    </>
  );
}

export { Nav };
