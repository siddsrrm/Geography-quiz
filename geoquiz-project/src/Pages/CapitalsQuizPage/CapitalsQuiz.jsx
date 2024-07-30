import React from 'react'
import { motion } from "framer-motion"
import styles from "./CapitalsQuiz.module.css"
import { useState } from 'react'

export const CapitalsQuiz = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0); 
  const [answerIndex, setAnswerIndex] = useState(null);
  const [answer, setAnswer] = useState(null);
  const { question, choices, correctAnswer } = questions[currentQuestion];

  const onAnswerClick = (answer, index) => {
    setAnswerIndex(index);

    if (answer === correctAnswer) {
      setAnswer(true);
    }
    else {
      setAnswer(false);
    }
  }

  return (
    <motion.div
        initial={{opacity:0, y:100}}
        animate={{opacity: 1, y:0}}
        transition={{duration: 1, ease:"easeOut", delay:0.2}}
        className={styles.container}
    >
       
      <>
          <span className={styles.questionnum}>{currentQuestion + 1}</span>
          <span className={styles.totalquestionnum}>/{questions.length}</span>
          <h2>{question}</h2>
          <ul>
            { 
              choices.map((answer, index) =>(

                <li
                  onClick={() => onAnswerClick(answer, index)} 
                  key={answer}
                  className={answerIndex === index ? styles.selectedAnswer : null}
                >
                  {answer}

                </li>
                
              ))
            }
          </ul>
      </>
      
    
    </motion.div>
  )
}
