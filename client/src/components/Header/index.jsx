import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="">
      <div className="">
        <div>
          <Link className="" to="/">
            <h1 className="">Campaign Planner</h1>
          </Link>
          <p className="">All of your campaing notes in one place.</p>
        </div>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link className="" to="/me">
                {Auth.getProfile().authenticatedPerson.username}'s profile
              </Link>
              <button className="" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="" to="/login">
                Login
              </Link>
              <Link className="" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
