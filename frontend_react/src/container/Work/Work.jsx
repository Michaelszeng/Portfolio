import React, { useState, useEffect } from 'react';
import { AiFillEye, AiFillGithub } from 'react-icons/ai';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';

import './Work.scss'

const Work = () => {
  const [activeFilter, setActiveFilter] = useState('All');    //variable to hold active status of app__work-filter-item divs; default 'All' button is active, so projects with all tags are shown
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const [works, setWorks] = useState([]);
  const [filterWork, setFilterWork] = useState([]);

  useEffect(() => {
    const query = '*[_type == "works"]';

    client.fetch(query).then((data) => {
      setWorks(data);
      setFilterWork(data);
    });
  }, []);

  // applies filter to which types of projects to show
  const handlWorkFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard([{y: 100, opacity: 0}]); //sets animation on the motion div for the cards to slide in/out

    //not sure what this does but it works
    setTimeout(() => {
      setAnimateCard([{y: 0, opacity: 1}]);
      if (item === 'All') {
        setFilterWork(works);
      } else {
        setFilterWork(works.filter((work) => work.tags.includes(item)));
      }
    }, 500)
  }

  return (
    <>
      <h2 className="head-text">My Creative <span>Portfolio</span></h2>
      
      <div className="app__work-filter">
        {/* if div is active, apply a new class */}
        {['UI/UX', 'Web App', 'Mobile app', 'React JS', 'All'].map((item, index) => (
          <div key={index} onClick={() => handlWorkFilter(item)} className={`app__work-filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ''}`}>  
            {item}
          </div>
        ))}
      </div>

      <motion.div animate={animateCard} transition={{ duration: 0.5, delayChildren: 0.5}} className="app__work-portfolio">
          {filterWork.map((work, index) => (
            <div className='app__work-item app_flex' key={index}>
              <div className="app__work-img app__flex">
                <img src={urlFor(work.imgUrl)} alt={work.name}/>

                <motion.div whileHover={{opacity: [0, 1]}} transition={{ duration: 0.25, ease: 'easeInOut', staggerChildren: 0.5}} className="app__work-hover app__flex">
                  <a href={work.projectLink} target="_blank" rel="noreferrer">
                    <motion.div whileInView={{scale: [0, 1]}} whileHover={{scale: [0, 0.9]}} transition={{ duration: 0.25 }} className="app__flex">
                      <AiFillEye />
                    </motion.div>
                  </a>
                  <a href={work.projectLink} target="_blank" rel="noreferrer">
                    <motion.div whileInView={{scale: [0, 1]}} whileHover={{scale: [0, 0.9]}} transition={{ duration: 0.25 }} className="app__flex">
                      <AiFillGithub />
                    </motion.div>
                  </a>
                </motion.div>
              </div>
              <div className="app__work-content app__flex">
                <h4 className="bold-text">{work.title}</h4>
                <p className="p-text" style={{ marginTop: 10 }}>{work.description}</p>
                <div className="app__work-tag app__flex">
                  <p className="p-text">{work.tags[0]}</p>
                </div>
              </div>
            </div>
          ))}
      </motion.div>
    </>
  )
}

export default AppWrap(MotionWrap(Work, 'app__works'), 'work', 'app__primarybg');
