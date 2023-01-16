import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AppWrap } from '../../wrapper';

import './About.scss';
import { urlFor, client } from '../../client';  // import client.js so we can retrieve about section from sanity

const abouts = [
  // Static test data for abouts section
  // { title: 'Engineer', description: 'I am a good engineer.', imgUrl: images.about01 },
  // { title: 'Designer', description: 'I am a good designer.', imgUrl: images.about02 },
  // { title: 'Programmer', description: 'I am a good programmer.', imgUrl: images.about03 },
  // { title: 'Web Developer', description: 'I am a good web developer.', imgUrl: images.about04 }
];

const About = () => {
  const [abouts, setAbouts] = useState([]);

  // run once when the page loads; have the client fetch the "abouts" from sanity, then set the abouts for the webpage
  useEffect(() => {
    const query = '*[_type == "abouts"]';
    client.fetch(query)
      .then((data) => setAbouts(data))
  }, []);

  return (
    // <div className="abt">
    <div>
      <h2 className="head-text">I Know That <span>Good Design</span> means <span>Good Business</span></h2>
      <div className='app__profiles'>
        { /* Loop through all the abouts, return a motion div for each. note: WHILEHOVER EXAMPLE */ }
        {abouts.map((about, index) => (
          <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.5 }} className="app__profile-item" key={about.title + index}>
            {/* <img src={about.imgUrl} alt={about.title} /> */}      {/* This is for locally saved images */}
            <img src={urlFor(about.imgUrl)} alt={about.title} />     {/* This is for images loaded from sanity */}
            <h2 className="bold-text" style={{ marginTop: 20 }}>{about.title}</h2>
            <p className="p-text" style={{ marginTop: 10 }}>{about.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default AppWrap(About, 'about');
