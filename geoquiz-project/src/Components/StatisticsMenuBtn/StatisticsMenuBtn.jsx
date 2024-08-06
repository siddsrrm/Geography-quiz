import React from 'react'
import styles from './StatisticsMenuBtn.module.css'
import { Link } from 'react-router-dom'

export const StatisticsMenuBtn = () => {
  return (
    <Link to="/Statistics" className={styles.link}>
      <div className={styles.container}>
        <h2 className={styles.title}>Statistics</h2>
      </div>
    </Link>
  ) 
}
