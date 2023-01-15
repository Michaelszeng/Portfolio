import React from 'react';
import { motion } from 'framer-motion';
import { images } from '../../constants';

import './Header.scss'

const scaleVariants = {
  whileInView: {
    scale: [0, 1],
    opacity: [0, 1],
    transition: { duration: 1, ease: 'easeInOut' },
  }
}

const Header = () => {
  return (
    <div id="home" className="app__header app__flex">
      <motion.div whileInView={{ x: [-100, 0], opacity: [0, 1] }} transition={{ duration: 2 }} className="app__header-info">  {/* Animation: moves from left to right 100px, opacity changes from clear to opaque, lasts for 2 seconds */}
        <div className="app__header-badge">
          <div className="badge-cmp app_flex">
            <div class="wave">👋</div>
            <div style={{ marginLeft: 20 }}>
              <p className="p-text">Hello, I am</p>
              <h1 className="head-text">Michael</h1>
            </div>
          </div>
          <div className="tag-cmp app__flex">
            <p className="p-text">Student at MIT</p>
            <p className="p-text">Robotics/Software Engineer</p>
          </div>
        </div>
      </motion.div >

      <motion.div whileInView={{ x: [-100, 0], opacity: [0, 1] }} transition={{ duration: 0.5, delayChildren: 0.5 }} className="app__header-img">
        <img src={images.profile} alt="profile_bg" />
        <motion.img whileInView={{ x: [-100, 0], opacity: [0, 1] }} transition={{ duration: 1, ease: 'easeInOut' }} className="overlay_circle" src={images.circle} alt="profile_circle" />
      </motion.div>

      <motion.div variant={scaleVariants} whileInView={scaleVariants.whileInView} className="app__header-circles">
        {/* apply animation to all 3 circles using .map() */}
        {[images.flutter, images.redux, images.sass].map((circle, index) => (     
          <div className="circle-cmp app__flex" key={`circle-${index}`}>
            <img src={circle} alt="circle" />
          </div>
        ))}
      </motion.div>
      
    </div>
  )
}

export default Header
