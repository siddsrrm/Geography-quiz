import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Home } from '../Pages/HomePage/Home'
import { Menu } from '../Pages/MenuPage/Menu'
import { CapitalsQuiz } from '../Pages/CapitalsQuizPage/CapitalsQuiz'
import { FlagsQuiz } from '../Pages/FlagsQuizPage/FlagsQuiz'
import { AnimatePresence } from 'framer-motion'
import { jsQuizz } from '../constants'


function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence>
        <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home/>}/>
            <Route path="/Menu" element={<Menu/>}/>
            <Route path="/CapitalsQuiz" element={<CapitalsQuiz/>}/>
            <Route path="/FlagsQuiz" element={<FlagsQuiz questions={jsQuizz.questions}/>}/>
        </Routes>
    </AnimatePresence>
    
  )
}

export default AnimatedRoutes