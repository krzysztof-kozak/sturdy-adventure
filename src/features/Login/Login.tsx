import { LoginForm } from "./LoginForm";

function Login() {
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Login</h1>

            <ul className="error-messages">
              <li>That email is already taken</li>
            </ul>

            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export { Login };
