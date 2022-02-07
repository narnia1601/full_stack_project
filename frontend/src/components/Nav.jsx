import { Link } from 'react-router-dom';

function Nav() {
  return (
    <div>
       <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container">
                <div class="navbar-nav">
                    <Link class="nav-link" to="/nasdaq">Nasdaq</Link>
                    <Link class="nav-link" to="/nyse">NYSE</Link>
                </div>
            </div>
        </nav>
    </div>
  );
}

export default Nav