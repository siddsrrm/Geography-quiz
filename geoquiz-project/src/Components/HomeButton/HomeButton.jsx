import React from 'react'
import styles from "./HomeButton.module.css"
import { Link } from 'react-router-dom'

export const HomeButton = () => {
  return (
    <Link to="/Menu" className={styles.link}>
      <div className={styles.wrapper}>
        <p className={styles.homebutton}>Start</p>
      </div>
    </Link>
  )
}
