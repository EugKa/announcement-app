import React from 'react'
import { NavLink } from 'react-router-dom';
import  './index.scss';

export const Header = () => {
    return (
        <header className="app-header">
            <ul className="app-header-list">
                <li className="app-header-list__item">
                    <NavLink to="/" className="app-header-list__link">
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/Form" className="app-header-list__link">
                        Form
                    </NavLink>
                </li>
            </ul>
        </header>
    )
}
