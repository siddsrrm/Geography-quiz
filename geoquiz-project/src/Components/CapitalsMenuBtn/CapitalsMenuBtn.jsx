import React from 'react'
import styles from './CapitalsMenuBtn.module.css'
import { Link } from 'react-router-dom'

export const CapitalsMenuBtn = () => {
  return (
    <Link to="/CapitalsQuiz" className={styles.link}>
      <div className={styles.container}>
        <h2 className={styles.title}>Capitals</h2>
      </div>
    </Link>
  ) 
}
