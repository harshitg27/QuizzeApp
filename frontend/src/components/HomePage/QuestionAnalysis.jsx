import React from 'react'
import styles from './QuestionAnalysis.module.css'
import moment from 'moment'

function QuestionAnalysis({ quiz }) {
  return (
    <div className={styles.page}>
      <div className={styles.info}>
        <p>Created on : {moment(quiz.createdAt).format('DD MMM, YYYY')}</p>
        <p>Impression : {quiz.impression}</p>
      </div>

      <h2 className={styles.heading}>{quiz.quizName} Question Analysis</h2>

      <div className={styles.questionsContainer}>

        {quiz.quizType === 'answer' && quiz.questions.map((que, index) => {
          return <div className={styles.questionDiv} key={index}>
            <h4>{`Q.${index + 1} ${que.question}`}</h4>
            <div className={styles.responseContainer}>
              <div className={styles.responseCard}>
                <span>{que.correctAttempt + que.inCorrectAttempt}</span>
                <p>people Attempted the Question</p>
              </div>
              <div className={styles.responseCard}>
                <span>{que.correctAttempt}</span>
                <p>people Answered Correctly</p>
              </div>
              <div className={styles.responseCard}>
                <span>{que.inCorrectAttempt}</span>
                <p>people Answered InCorrectly</p>
              </div>
            </div>

            {index !== quiz.questions.length -1 &&<hr /> }
          </div>
        })}

        {quiz.quizType === 'poll' && quiz.questions.map((que, index) => {
          return <div className={styles.questionDiv} key={index}>
            <h4>{`Q.${index + 1} ${que.question}`}</h4>

            <div className={styles.responseContainer}>
              {que.options.map((opt, idx) => {
                return <div className={styles.responseCard} key={idx}>
                  <p style={{display:'flex' , alignItems:'center' , gap:'5px'}}><span>{opt.selectedNumber}</span> {` Option ${idx + 1}`}</p>
                </div>
              })}
            </div>

            {index !== quiz.questions.length -1 &&<hr /> }
          </div>
        })}
      </div>
    </div>
  )
}

export default QuestionAnalysis
