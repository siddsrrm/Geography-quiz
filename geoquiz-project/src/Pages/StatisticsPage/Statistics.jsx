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

  const capitalResults = results.filter(result => result.quiz_type === 'capitals');
  const flagResults = results.filter(result => result.quiz_type === 'flags');

    return (
        <motion.div 
            initial={{opacity:0, y:100}}
            animate={{opacity: 1, y:0}}
            transition={{duration: 1, ease:"easeOut", delay:0.2}}
        >

            <Link to="/Menu">
                <BackArrow/> 
            </Link>

            <div className={styles.container}>
                <div className={styles.capitalResults}>
                    <h3>Capital Quiz Results</h3>   
                    {capitalResults.map(result => (
                        <div key={result.id} className={styles.resultItem}>
                            <p>Score: {result.score}/{result.total_questions} Date: {new Date(result.date).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
                
                <div className={styles.flagResults}>
                    <h3>Flag Quiz Results</h3>
                    {flagResults.map(result => (
                        <div key={result.id} className={styles.resultItem}>
                            <p>Score: {result.score}/{result.total_questions} Date: {new Date(result.date).toLocaleDateString()}</p>
                        </div>
                    ))}

                </div>
            </div>
            
        </motion.div>
    )
}
