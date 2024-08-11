import React, { useState, useEffect } from 'react';
import { BackArrow } from '../../Components/BackArrow/BackArrow';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from "./Statistics.module.css";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const Statistics = () => {
    const [results, setResults] = useState([]);
    const [capitalPercentage, setCapitalPercentage] = useState(0);
    const [flagPercentage, setFlagPercentage] = useState(0);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/api/results/');
                const data = await response.json();
                setResults(data);
            } catch (error) {
                console.error('Error fetching results:', error);
            }
        };

        fetchResults();
    }, []);

    useEffect(() => {
        const calculatePercentage = (quizResults, setPercentage) => {
            if (quizResults.length > 0) {
                let totalScore = 0;
                let totalPossible = 0;

                quizResults.forEach(result => {
                    totalScore += result.score;
                    totalPossible += result.total_questions;
                });

                const overallPercentage = (totalScore / totalPossible) * 100;
                setPercentage(overallPercentage);
            }
        };

        const capitalResults = results.filter(result => result.quiz_type === 'capitals');
        const flagResults = results.filter(result => result.quiz_type === 'flags');

        calculatePercentage(capitalResults, setCapitalPercentage);
        calculatePercentage(flagResults, setFlagPercentage);
    }, [results]);

    const capitalResults = results.filter(result => result.quiz_type === 'capitals');
    const flagResults = results.filter(result => result.quiz_type === 'flags');

    return (
        <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
        >

            <Link to="/Menu">
                <BackArrow />
            </Link>

            <div className={styles.container}>
                <div>
                    <div className={styles.titlecontainer}>
                        <h1 className={styles.title}>Capital Quiz Results</h1>
                        <div className={styles.progressbar}>
                            <CircularProgressbar value={capitalPercentage} text={`${Math.round(capitalPercentage)}%`} />
                        </div>
                    </div>

                    {capitalResults.length > 0 ? (
                        capitalResults.map(result => (
                            <div key={result.id} className={styles.resultitem}>
                                <p>Score: {result.score}/{result.total_questions} Date: {new Date(result.date).toLocaleDateString()}</p>
                            </div>
                        ))
                    ) : (
                        <div className={styles.resultitem}><p>No results</p></div>
                    )}
                </div>

                <div>
                    <div className={styles.titlecontainer}>
                        <h1 className={styles.title}>Flag Quiz Results</h1>
                        <div className={styles.progressbar}>
                            <CircularProgressbar value={flagPercentage} text={`${Math.round(flagPercentage)}%`} />
                        </div>
                    </div>

                    {flagResults.length > 0 ? (
                        flagResults.map(result => (
                            <div key={result.id} className={styles.resultitem}>
                                <p>Score: {result.score}/{result.total_questions} Date: {new Date(result.date).toLocaleDateString()}</p>
                            </div>
                        ))
                    ) : (
                        <div className={styles.resultitem}><p>No results</p></div>
                    )}
                </div>
            </div>

        </motion.div>
    );
}
