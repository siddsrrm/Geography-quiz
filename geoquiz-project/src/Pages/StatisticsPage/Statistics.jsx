import React from 'react'
import {useState, useEffect} from 'react'
import { BackArrow } from '../../Components/BackArrow/BackArrow'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import styles from "./Statistics.module.css"

export const Statistics = () => {
    const [results, setResults] = useState([]);

    
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/results/');
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    fetchResults();
  }, []);

    return (
        <motion.div 
            initial={{opacity:0, y:100}}
            animate={{opacity: 1, y:0}}
            transition={{duration: 1, ease:"easeOut", delay:0.2}}
        >
    
            <Link to="/Menu">
              <BackArrow/> 
            </Link>

            <div>
                <ul className={styles.list}>
                    {results.map((result, index) =>
                        <li key={index} className={styles.listItem}>
                            {result.quiz_type} Quiz: {result.score}/{result.total_questions} on {new Date(result.date).toLocaleDateString()}
                        </li>
                    )}
                </ul>
            </div>
           
        </motion.div>
    )
}
