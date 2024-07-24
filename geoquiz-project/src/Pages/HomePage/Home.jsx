import React from 'react'
import { HomeButton } from '../../Components/HomeButton/HomeButton'
import styles from "./Home.module.css"

export const Home = () => {
  return (
    <div className={styles.container}>
        <h1 className={styles.title}>Welcome to GeoQuizzer</h1>
        <HomeButton/>
    </div>
  )
}

