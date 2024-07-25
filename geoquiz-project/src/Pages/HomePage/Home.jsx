import React from 'react'
import { HomeButton } from '../../Components/HomeButton/HomeButton'
import styles from "./Home.module.css"
import { motion } from "framer-motion"

export const Home = () => {
  return (
    <motion.div 
        className={styles.container}
        
        initial={{opacity:0, y:100}}
        animate={{opacity: 1, y:0}}
        transition={{duration: 1, ease:"easeOut", delay:0.2}}
    >
        <h1 className={styles.title}>Welcome to GeoQuizzer</h1>
        <HomeButton/>
    </motion.div>
  )
}

