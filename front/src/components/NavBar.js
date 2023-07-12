import React, { useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Menu } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import LoginButton from "./Auth/LoginButton";
import { useEffect } from 'react';

function NavBar({activePageTrigger}) {
  const [activeItem, setActiveItem] = useState('home');

  useEffect(() => {
    setActiveItem(activePageTrigger);
  }, [activePageTrigger]);

  return (
    <div style={{ justifyContent: 'space-between' }}>
      <Menu inverted style={{ padding: '5px' }}>
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
        >
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item
          name='portfolio'
          active={activeItem === 'portefolio'}
        >
          <Link to="/portefolio">Portefolio</Link>
        </Menu.Item>
        <Menu.Item
          name='anciens'
          active={activeItem === 'anciens'}
        >
          <Link to="/anciens">Anciens</Link>
        </Menu.Item>
        <Menu.Item
          name='matos'
          active={activeItem === 'matos'}
        >
          <Link to="/matos">Matos</Link>
        </Menu.Item>
        <Menu.Item
          name='contact'
          active={activeItem === 'contact'}
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
