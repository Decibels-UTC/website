import React, { useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Menu } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import LoginButton from "./Auth/LoginButton";

function NavBar() {
  const [activeItem, setActiveItem] = useState('home');

  function handleItemClick(e, { name }) {
    setActiveItem(name);
  }

  return (
    <div style={{ justifyContent: 'space-between' }}>
      <Menu inverted style={{ padding: '5px' }}>
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={handleItemClick}
        >
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item
          name='portfolio'
          active={activeItem === 'portefolio'}
          onClick={handleItemClick}
        >
          <Link to="/portefolio">Portefolio</Link>
        </Menu.Item>
        <Menu.Item
          name='anciens'
          active={activeItem === 'anciens'}
          onClick={handleItemClick}
        >
          <Link to="/anciens">Anciens</Link>
        </Menu.Item>
        <Menu.Item
          name='matos'
          active={activeItem === 'matos'}
          onClick={handleItemClick}
        >
          <Link to="/matos">Matos</Link>
        </Menu.Item>
        <Menu.Item
          name='contact'
          active={activeItem === 'contact'}
          onClick={handleItemClick}
        >
          <Link to="/contact">Contact</Link>
        </Menu.Item>
        <div style={{ marginLeft: 'auto', marginTop: '2px' }}>
          <LoginButton/>
        </div>
      </Menu>
    </div>
  );
}

export default NavBar;
