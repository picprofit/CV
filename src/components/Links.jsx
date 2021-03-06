import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LinksData from '../data/LinksData';

const Links = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const renderLink = (item, index) => {
    const iconClass = `fa fa-${item.icon} sidebar__link-icon`;
    return (
      <li key={index} className="sidebar__link-wrap">
        <NavLink
          to={item.link}
          className="waves-effect waves-light sidebar__link-item"
          activeClassName="active-link"
          exact
        >
          <span className="sidebar__link-icon-wrap">
            {item.name} <i className={iconClass} />
          </span>
        </NavLink>
      </li>
    );
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <button
        type="button"
        className={`sidebar__menu-button
         ${menuOpen ? 'sidebar__menu-button_visible' : ''}`}
        onClick={toggleMenu}
      >
        <i className={`fa ${menuOpen ? 'fa-times' : 'fa-bars'}`} />
      </button>
      <ul
        className={`sidebar__links ${menuOpen ? 'sidebar__links_visible' : ''}`}
      >
        {LinksData.map((item, index) => renderLink(item, index))}
      </ul>
    </>
  );
};

export default Links;
