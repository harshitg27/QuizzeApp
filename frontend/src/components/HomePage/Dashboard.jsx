import React, { useEffect, useState } from 'react'
import { getquizes } from '../../api/Quiz';
import styles from './Dashboard.module.css'
import moment from 'moment';
import { BiShow } from 'react-icons/bi';

function Dashboard({quizes}) {
    const [totalQuiz, setTotalQuiz] = useState(0)
    const [totalQuestion, setTotalQuestion] = useState(0)
    const [totalImpression, setTotalImpression] = useState(0)

    useEffect(() => {
        setTotalQuestion(0)
        setTotalImpression(0)
        setTotalQuiz(quizes.length)
        quizes.forEach((quiz) => {
            setTotalQuestion((prev) => prev + quiz.questions.length)
            setTotalImpression((prev) => prev + quiz.impression)
        })
    }, [quizes])
    return (
        <div className={styles.page}>
            <div className={styles.quizesData}>
                <div style={{ color: '#FF5D01' }}>
                    <p><span>{totalQuiz} </span> Quiz Created</p>
                </div>
                <div style={{ color: '#60B84B' }}>
                    <p><span>{totalQuestion} </span> Questions Created</p>
                </div>
                <div style={{ color: '#5076FF' }}>
                    <p><span>{totalImpression > 1000 ? `${Math.floor(totalImpression/100)/10}K` : totalImpression} </span> Total Impressions</p>
                </div>
            </div>
            <div className={styles.quizsInfo}>
                <h1>Trending Quizs</h1>
                <div className={styles.quizContainer}>
                    {quizes.map((quiz, index) => {
                        if(quiz.impression > 10){
                            return <QuizInfo key={index} data={quiz} />
                        }
                    })}
                </div>
            </div>

        </div>
    )
}

export default Dashboard

function QuizInfo ({data}) {
    return(
        <div className={styles.quizCard}>
            <div style={{display:'flex' , justifyContent:'space-between' , alignItems:'center' }} >
                <h2>{data.quizName}</h2>
                <div className={styles.impression}>{data.impression} <BiShow /></div>
            </div>
            <p>Created on :{moment(data.createdAt).format('DD MMM, YYYY')}</p>
        </div>
    )
}
