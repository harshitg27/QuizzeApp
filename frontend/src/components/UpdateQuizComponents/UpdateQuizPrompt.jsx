import React, { useEffect, useState } from 'react'
import styles from './UpdateQuizPrompt.module.css'
import { IoAddOutline } from 'react-icons/io5'
import { FaRegTrashAlt } from 'react-icons/fa'
import { getQuizById } from '../../api/Quiz'

function UpdateQuizPrompt({ closePrompt, action, quizId }) {
  const [quiz, setQuiz] = useState({})
  const [seletedQuestionIndex, setSelectedQuestionIndex] = useState(0)
  const [questions, setQuestions] = useState([])

  const validate = () => {
    let err = false
    questions.forEach((que, index) => {
      const { question, optionType , options } = que
      if (question.trim().length === 0) {
        alert(`Enter Correct Question of Question Number ${index + 1} `)
        err = true
        return false
      }

      if (optionType === 'text') {
        options.forEach((option, idx) => {
          if (option.text.trim().length === 0) {
            alert(`Enter option of Option number ${idx + 1} in Question Number ${index + 1} `)
            err = true
            return false
          }
        })
      } else if (optionType === 'image-url') {
        options.forEach((option, idx) => {
          if (option.image.trim().length === 0) {
            alert(`Enter image URL of Option number ${idx + 1} in Question Number ${index + 1} `)
            err = true
            return false
          }
        })
      } else {
        options.forEach((option, idx) => {
          if (option.image.trim().length === 0) {
            alert(`Enter image URL of Option number ${idx + 1} in Question Number ${index + 1} `)
            err = true
            return false
          }
          if (option.text.trim().length === 0) {
            alert(`Enter option of Option number ${idx + 1} in Question Number ${index + 1} `)
            err = true
            return false
          }
        })
      }

    })
    return !err
  }

  const handleSubmit = () => {
    // validate()
    if (validate()) {
      action({...quiz , questions })
    }
  }
  const fetchQuiz = async () => {
    try {
      const response = await getQuizById(quizId)
      if (response.status === 200) {
        setQuiz(response.data.Quiz)
        setQuestions(response.data.Quiz.questions)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const setTimer = (value) => {
    setQuestions([...questions.slice(0, seletedQuestionIndex), { ...questions[seletedQuestionIndex], timer: value }, ...questions.slice(seletedQuestionIndex + 1)])
  }

  useEffect(() => {
    fetchQuiz()
  }, [])

  return (
    <>
      <div className={styles.wrapper}></div>
      <div className={styles.page} style={{ minHeight: '250px' }}
        onClick={(eve) => {
          eve.stopPropagation()
        }}>
        <div className={styles.quizInfo}>
          <h4>{quiz.quizName}</h4>
          <h4>{quiz.quizType} Type Quiz</h4>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
          <div className={styles.questionNums}>
            <p>Questions Numbers </p>
            {questions.map((question, index) => {
              return <div className={styles.questonNumber} key={index} style={{ border: seletedQuestionIndex === index ? '1px solid black' : '' }} onClick={() => { setSelectedQuestionIndex(index) }} >{index + 1}</div>
            })}
          </div>
        </div>

        <input className={styles.question}
          type="text"
          placeholder='Enter Question'
          value={questions[seletedQuestionIndex]?.question}
          onChange={(e) => setQuestions([...questions.slice(0, seletedQuestionIndex), { ...questions[seletedQuestionIndex], question: e.target.value }, ...questions.slice(seletedQuestionIndex + 1)])}
        />

        <div className={styles.optionType}>
          <h3>Option Type</h3>
          <p>{questions[seletedQuestionIndex]?.optionType}</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>

          <div className={styles.optionsContrainer}>
            {questions[seletedQuestionIndex]?.options.map((option, index) => {
              return <div key={index} className={styles.optionDiv}>

                {questions[seletedQuestionIndex]?.optionType === 'text-image' && <input type="text"
                  style={questions[seletedQuestionIndex].correctOption === index ? { background: '#60b84b', color: '#fff' } : {}}
                  className={styles.optionTextInput}
                  placeholder='Text'
                  value={option.text}
                  onChange={(e) => {
                    let options = [...questions[seletedQuestionIndex].options.slice(0, index), { ...questions[seletedQuestionIndex].options[index], text: e.target.value }, ...questions[seletedQuestionIndex].options.slice(index + 1)]
                    setQuestions([...questions.slice(0, seletedQuestionIndex), { ...questions[seletedQuestionIndex], options }, ...questions.slice(seletedQuestionIndex + 1)])
                  }} />}

                <input type="text"
                  style={questions[seletedQuestionIndex]?.correctOption === index ? { background: '#60b84b', color: '#fff' } : {}}
                  className={styles.optionInput}
                  placeholder={questions[seletedQuestionIndex]?.optionType === 'text' ? "Text" : 'Image URL'}
                  value={questions[seletedQuestionIndex]?.optionType === 'text' ? option.text : option.image}
                  // onClick={()=> {setCorrectAnswer(index)}}
                  onChange={(e) => {
                    let options = questions[seletedQuestionIndex]?.optionType === 'text' ?
                      [...questions[seletedQuestionIndex].options.slice(0, index), { ...questions[seletedQuestionIndex].options[index], text: e.target.value }, ...questions[seletedQuestionIndex].options.slice(index + 1)] :
                      [...questions[seletedQuestionIndex].options.slice(0, index), { ...questions[seletedQuestionIndex].options[index], image: e.target.value }, ...questions[seletedQuestionIndex].options.slice(index + 1)]

                    setQuestions([...questions.slice(0, seletedQuestionIndex), { ...questions[seletedQuestionIndex], options }, ...questions.slice(seletedQuestionIndex + 1)])
                  }} />

              </div>
            })}
          </div>

          {questions[seletedQuestionIndex]?.timer >=0 && <div className={styles.timerContainer}>
            <p>Timer</p>
            <span
              style={questions[seletedQuestionIndex].timer === 0 ? { background: '#D60000', color: '#fff', boxShadow: '0 0 15px 0 rgba(255 , 75 , 75 , 0.36)' } : {}}
              onClick={() => { setTimer(0) }}>OFF</span>
            <span
              style={questions[seletedQuestionIndex].timer === 5 ? { background: '#D60000', color: '#fff', boxShadow: '0 0 15px 0 rgba(255 , 75 , 75 , 0.36)' } : {}}
              onClick={() => { setTimer(5) }} >5 sec</span>
            <span
              style={questions[seletedQuestionIndex].timer === 10 ? { background: '#D60000', color: '#fff', boxShadow: '0 0 15px 0 rgba(255 , 75 , 75 , 0.36)' } : {}}
              onClick={() => { setTimer(10) }}>10 sec</span>
          </div>}
        </div>

        <div className={styles.action}>
          <h3 className={styles.cancel} onClick={closePrompt} > Cancel</h3>
          <h3 className={styles.continue} onClick={handleSubmit} >Update Quiz</h3>
        </div>
      </div>
    </>
  )
}

export default UpdateQuizPrompt
