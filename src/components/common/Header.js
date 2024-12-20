import React from "react";
import { Link, NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <header>
      <div className="container">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/userlist">User List</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};
