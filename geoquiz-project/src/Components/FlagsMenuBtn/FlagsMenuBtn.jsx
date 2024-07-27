import React from 'react'
import styles from './FlagsMenuBtn.module.css'
import { Link } from 'react-router-dom'

export const FlagsMenuBtn = () => {
  return (
    <Link to="/FlagsQuiz" className={styles.link}>
      <div className={styles.container}>
        <h2 className={styles.title}>Flags</h2>
      </div>
    </Link>
  ) 
}