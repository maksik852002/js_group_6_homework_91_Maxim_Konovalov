import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../../store/actions/usersActions";
import UserMenu from "./UserMenu";

const NavBar = () => {
  const user = useSelector(state => state.users.user);
  const dispatch = useDispatch();
  return (
    <header className="w-100">
      <nav className="navbar navbar-expand" style={{background: "#eee"}}>
        <div className="navbar-collapse justify-content-end">
          <ul className="navbar-nav">
            {user &&
              <UserMenu
                user={user.username}
                logout={() => dispatch(logoutUser())}
              />
            }
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
