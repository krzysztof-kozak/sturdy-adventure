import { ArticleList } from "features/GlobalArticleList/ArticleList";
import { Link, NavLink } from "react-router";

function Home() {
  return (
    <>
      <nav className="navbar navbar-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            conduit
          </Link>
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              {/* Add "active" class when you're on that page" */}
              <NavLink className="nav-link active" to="/">
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
          </ul>
        </div>
      </nav>

      <div className="home-page">
        <div className="banner">
          <div className="container">
            <h1 className="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>

        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <div className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <Link className="nav-link disabled" to="/">
                      Your Feed
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/">
                      Global Feed
                    </Link>
                  </li>
                </ul>
              </div>

              <ArticleList />
            </div>

            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>

                <div className="tag-list">
                  <a href="/" className="tag-pill tag-default">
                    programming
                  </a>
                  <a href="/" className="tag-pill tag-default">
                    javascript
                  </a>
                  <a href="/" className="tag-pill tag-default">
                    emberjs
                  </a>
                  <a href="/" className="tag-pill tag-default">
                    angularjs
                  </a>
                  <a href="/" className="tag-pill tag-default">
                    react
                  </a>
                  <a href="/" className="tag-pill tag-default">
                    mean
                  </a>
                  <a href="/" className="tag-pill tag-default">
                    node
                  </a>
                  <a href="/" className="tag-pill tag-default">
                    rails
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <div className="container">
          <Link to="/" className="logo-font">
            conduit
          </Link>
          <span className="attribution">
            An interactive learning project from <Link to="https://thinkster.io">Thinkster</Link>. Code &amp; design
            licensed under MIT.
          </span>
        </div>
      </footer>
    </>
  );
}

export { Home };
