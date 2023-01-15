import React, { useState } from 'react'

import './Navbar.scss';
import { images } from '../../constants';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';

const Navbar = () => {
    const [toggle, setToggle] = useState(false);

    return (
        <nav className="app__navbar">
            {/*Standard Nav Bar*/}
            <div className="app__navbar-logo">
                <img src={images.logo} alt="logo" />
            </div>
            <ul className="app__navbar-links">
                {['home', 'about', 'work', 'skills', 'contact'].map((item) => (
                <li className="app__flex p-text" key={`link-${item}`}>
                    <div />
                    <a href={`#${item}`}>{item}</a>
                </li>
                ))}
            </ul>
            
            {/*Dropdown Nav Bar for mobile devices*/}
            <div className="app__navbar-menu">
                <HiMenuAlt4 onClick={() => setToggle(true)} />
                {toggle && (
                    <motion.div whileInView={{ x: [100, 0] }} transition={{ duration: 0.6, ease: 'easeOut' }}>
                        <HiX onClick={() => setToggle(false)} />
                        <ul>
                            {['home', 'about', 'work', 'skills', 'contact'].map((item) => (
                                <li key={item}>
                                    <a href={`#${item}`} onClick={() => setToggle(false)}>{item}</a>    {/*if user clicks an item in nav bar, hide the side-nav-bar*/}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
