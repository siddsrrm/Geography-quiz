import React from 'react';
import { motion } from "framer-motion";
import styles from "./CapitalsQuiz.module.css";
import { useState } from 'react';
import { resultInitialState } from '../../constants';
import { Link } from 'react-router-dom'

export const CapitalsQuiz = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0); 
  const [answerIndex, setAnswerIndex] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [result, setResult] = useState(resultInitialState);
  const [showResult, setShowResult] = useState(false);
  const { question, choices, correctAnswer } = questions[currentQuestion];

  const onAnswerClick = (answer, index) => {
    if (isAnswered) {
      return;
    }
    
    setAnswerIndex(index);
    setIsAnswered(true);

    if (answer === correctAnswer) {
      setAnswer(true);
      console.log("correct");
    } else {
      setAnswer(false);
      console.log("incorrect");
    }
  }

  const onClickNext = () => {
    setAnswerIndex(null);
    setIsAnswered(false);

    setResult((prev) => ({
      ...prev,
      correctAnswers: answer ? prev.correctAnswers + 1 : prev.correctAnswers
    }));

    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setCurrentQuestion(0);
      setShowResult(true);
    }
  }

  const onTryAgain = () => {
    setResult(resultInitialState);
    setShowResult(false);
  }


  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
      className={styles.container}
    >
      {!showResult ? (
        <>
          <span className={styles.questionnum}>{currentQuestion + 1}</span>
          <span className={styles.totalquestionnum}>/{questions.length}</span>
          <h2>{question}</h2>
          <ul>
            {choices.map((choice, index) => {
              let className;
              if (isAnswered) {
                className = choice === correctAnswer ? styles.correctanswer : styles.incorrectanswer;
              }

              return (
                <li
                  onClick={() => onAnswerClick(choice, index)}
                  key={choice}
                  className={className}
                >
                  {choice}
                </li>
              );
            })}
          </ul>
          <div className={styles.buttonContainer}>
            <button onClick={onClickNext} disabled={!isAnswered} className={styles.button}>
              {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </>
      ) : (
        <div className={styles.result}>
          <h3>Result</h3>
          <p>
            You got <span>{result.correctAnswers}</span> out of <span>{questions.length}</span> questions correct!
          </p>
          <button className={styles.playagainbutton} onClick={onTryAgain}>Play again</button>
          <Link to="/Menu">
            <button className={styles.menubutton}>Menu</button>
          </Link>
          
        </div>
      )}
    </motion.div>
  )
}
