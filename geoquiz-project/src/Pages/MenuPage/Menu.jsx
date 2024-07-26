import { motion } from 'framer-motion'
import React from 'react'
import styles from "./Menu.module.css"
import { BackArrow } from '../../Components/BackArrow/BackArrow'
import { Link } from 'react-router-dom'


export const Menu = () => {
  return (
    <motion.div 
        className={styles.container}
        initial={{opacity:0, y:100}}
        animate={{opacity: 1, y:0}}
        transition={{duration: 1, ease:"easeOut", delay:0.2}}
    >

        <Link to="/">
          <BackArrow/> 
        </Link>
            
    </motion.div>
  )
}
