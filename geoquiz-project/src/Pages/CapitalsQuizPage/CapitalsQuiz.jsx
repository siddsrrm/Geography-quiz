import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import styles from "./CapitalsQuiz.module.css";
import { resultInitialState } from '../../constants';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';


// fetching countries from rest countries api
const fetchCountries = async () => {
  const response = await fetch('https://restcountries.com/v3.1/all');
  const data = await response.json();
  
  // filter out non-independent countries
  const officialCountries = data.filter(country => country.independent);
  return officialCountries;
}

// fisher-yates shuffle algorithim 
const shuffleArray = (array) => {
  let shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

// formats data from rest api into quiz questions
const formatQuizData = (countries) => {
  const shuffledCountries = shuffleArray(countries);
  
  // picks 3 random capitals as wrong answers
  return shuffledCountries.map((country) => {
    const otherCapitals = shuffleArray(
      countries.filter((c) => c.capital && c.capital[0] && c.name.common !== country.name.common)
    ).slice(0, 3);
    
    // shuffles answer choices
    const choices = shuffleArray([...otherCapitals.map(c => c.capital[0]), country.capital[0]]);
    
    return {
      question: `What is the capital of ${country.name.common}?`,
      choices: choices,
      correctAnswer: country.capital?.[0] || 'N/A',
    };
  }).slice(0, 10); // sets quiz at 10 questions
}

//function to save quiz results to backend
const saveQuizResult = async(score, totalQuestions) => {
  try {
    const response = await fetch('http://localhost:5000/api/results/', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      // converts quiz data into JSON string
      body: JSON.stringify({
        quiz_type: 'capitals',
        score: score,
        total_questions: totalQuestions,
      }),
    });

    if (response.ok) {
      console.log('Quiz result successfully saved');
    }
    else {
      console.log("Error saving quiz result")
    }
  }
  catch (error) {
    console.error('Error: ', error);
  }
};

export const CapitalsQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0); 
  const [answerIndex, setAnswerIndex] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [result, setResult] = useState(resultInitialState);
  const [showResult, setShowResult] = useState(false);
  const [questions, setQuestions] = useState([]);

  // fetch data using react-query
  const { data: countries, isLoading, error } = useQuery('countries', fetchCountries, {
    staleTime: 60000,
  });


  // formats quiz data when data is available
  useEffect(() => {
    if (countries) {
      setQuestions(formatQuizData(countries));
    }
  }, [countries]);


  // Refresh quiz questions when quiz is completed 
  useEffect(() => {
    if (showResult) {
      setQuestions(formatQuizData(countries));
    }
  }, [showResult, countries]);


  // saves quiz result when quiz is completed
  useEffect(() => {
    if (showResult) {
      saveQuizResult(result.correctAnswers, questions.length);
    }
  }, [showResult, result.correctAnswers, questions.length]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error Loading Data</div>;
  }

  // registers answer selection
  const onAnswerClick = (selectedAnswer, index) => {
    if (isAnswered) {
      return;
    }

    setAnswerIndex(index);
    setIsAnswered(true);
    setAnswer(selectedAnswer === questions[currentQuestion].correctAnswer);
  }

  // handles moving to next question or finishing quiz
  const onClickNext = () => {
    setAnswerIndex(null);
    setIsAnswered(false);

    // updates correct answer count
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

  

  
  // handles restarting of quiz
  const onTryAgain = () => {
    setResult(resultInitialState);
    setShowResult(false);
    setCurrentQuestion(0);
  }

  if (!questions.length) {
    return <div>Loading questions...</div>;
  }

  const { question, choices, correctAnswer } = questions[currentQuestion];

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
          <ul className={styles.list}>
            {choices.map((choice, index) => {
              let className;
              if (isAnswered) {
                className = choice === correctAnswer ? styles.correctanswer : styles.incorrectanswer;
              }

              return (
                <li
                  onClick={() => onAnswerClick(choice, index)}
                  key={choice}
                  className={`${styles.listItem} ${className}`}
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
