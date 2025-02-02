import { Link, Outlet } from "react-router";

function Home() {
  return (
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

            <Outlet />
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
  );
}

export { Home };
