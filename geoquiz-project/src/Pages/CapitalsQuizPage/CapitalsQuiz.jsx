import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import styles from "./CapitalsQuiz.module.css";
import { resultInitialState } from '../../constants';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';

const fetchCountries = async () => {
  const response = await fetch('https://restcountries.com/v3.1/all');
  const data = await response.json();
  // Filter out non-independent territories
  const officialCountries = data.filter(country => country.independent);
  return officialCountries;
}

const formatQuizData = (countries) => {
  return countries.map((country) => {
    const choices = countries
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map((c) => c.capital?.[0] || 'N/A');
    choices.push(country.capital?.[0] || 'N/A');
    choices.sort(() => 0.5 - Math.random());

    return {
      question: `What is the capital of ${country.name.common}?`,
      choices: choices,
      correctAnswer: country.capital?.[0] || 'N/A',
    };
  }).slice(0, 6);
}

export const CapitalsQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0); 
  const [answerIndex, setAnswerIndex] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [result, setResult] = useState(resultInitialState);
  const [showResult, setShowResult] = useState(false);

  const { data: countries, isLoading, error } = useQuery('countries', fetchCountries, {
    staleTime: 60000,
  });

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (countries) {
      setQuestions(formatQuizData(countries));
    }
  }, [countries]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error Loading Data</div>;
  }

  if (!questions.length) {
    return <div>Loading quiz...</div>;
  }

  const { question, choices, correctAnswer } = questions[currentQuestion];

  const onAnswerClick = (selectedAnswer, index) => {
    if (isAnswered) {
      return;
    }

    setAnswerIndex(index);
    setIsAnswered(true);
    setAnswer(selectedAnswer === correctAnswer);
  }

  const onClickNext = () => {
    setAnswerIndex(null);
    setIsAnswered(false);

    setResult((prev) => ({
      ...prev,
      correctAnswers: answer ? prev.correctAnswers + 1 : prev.correctAnswers,
    }));

    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  }

  const onTryAgain = () => {
    setResult(resultInitialState);
    setShowResult(false);
    setCurrentQuestion(0);
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
  );
}
