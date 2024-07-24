import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Home } from '../Pages/HomePage/Home'
import { Menu } from '../Pages/MenuPage/Menu'
import { AnimatePresence } from 'framer-motion'

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence>
        <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home/>}/>
            <Route path="/Menu" element={<Menu/>}/>
        </Routes>
    </AnimatePresence>
    
  )
}

export default AnimatedRoutes