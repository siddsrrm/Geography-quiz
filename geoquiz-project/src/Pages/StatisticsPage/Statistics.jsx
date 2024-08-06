import React from 'react'
import { BackArrow } from '../../Components/BackArrow/BackArrow'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export const Statistics = () => {
    return (
        <motion.div 
            initial={{opacity:0, y:100}}
            animate={{opacity: 1, y:0}}
            transition={{duration: 1, ease:"easeOut", delay:0.2}}
        >
    
            <Link to="/Menu">
              <BackArrow/> 
            </Link>
           
        </motion.div>
    )
}
