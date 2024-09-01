import React, { useEffect, useState } from 'react'
import styles from './HomePage.module.css'
import { useNavigate } from 'react-router-dom'
import Dashboard from '../../components/HomePage/Dashboard'
import AddQuiz from '../../components/QuizCards/AddQuiz'
import AddAnswerQuestions from '../../components/QuizCards/AddAnswerQuestions'
import { createQuiz, getQuizById, getquizes } from '../../api/Quiz'
import AddPollQuestions from '../../components/QuizCards/AddPollQuestions'
import QuizLinkPrompt from '../../components/QuizCards/QuizLinkPrompt'
import Analytics from '../../components/HomePage/Analytics'
import QuestionAnalysis from '../../components/HomePage/QuestionAnalysis'

function HomePage() {
  const navigate = useNavigate()
  const [quizes, setQuizes] = useState([])
  const [selectedAction, setSelectedAction] = useState('dashboard')
  const [createQuizPrompt, setCreateQuizPrompt] = useState(false)
  const [answerTypePrompt, setAnswerTypePrompt] = useState(false)
  const [pollTypePrompt, setPollTypePrompt] = useState(false)
  const [linkPrompt, setLinkPrompt] = useState(false)
  const [selectQuiz , setSelectedQuiz] = useState(null)
  const [quiz, setQuiz] = useState({ name: '', type: '', questions: [] })
  const [quizLink, setQuizLink] = useState('')

  const closeCreateQuizPrompt = () => setCreateQuizPrompt(false)
  const closeAnswerTypePrompt = () => setAnswerTypePrompt(false)
  const closePollTypePrompt = () => setPollTypePrompt(false)
  const closeLinkPrompt = () => setLinkPrompt(false)

  const setQuestionAnalysis = (quizId) => {
    fetchSelectedQuiz(quizId)
    setSelectedAction('questionAnalysis')
  } 

  const addNameandType = (name, type) => {
    setQuiz({ ...quiz, name, type })
    closeCreateQuizPrompt()
    if (type === 'answer') {
      setAnswerTypePrompt(true)
    } else {
      setPollTypePrompt(true)
    }
  }

  const addQuestions = (questions) => {
    setQuiz({ ...quiz, questions })
    addQuiz(questions)
  }

  const addQuiz = async (questions) => {
    try {
      const response = await createQuiz(quiz.name, quiz.type, questions)
      if (response.status == 201) {
        fetchQuizes()
        setQuizLink(window.location.host + '/quiz/' + response.data.quiz._id)
        setLinkPrompt(true)
        setQuiz({ name: '', type: '', questions: [] })
      }
    } catch (error) {

    }
  }
  const fetchQuizes = async () => {
    try {
      const response = await getquizes();
      if (response.status == 200) {
        setQuizes(response.data.quizes)
      } else {
        alert(response.data.message)
      }

    } catch (error) {
      console.log(error)
    }
  }
  const fetchSelectedQuiz = async (id) =>{
    try {
      const response = await getQuizById(id)
      if(response.status === 200){
        setSelectedQuiz(response.data.Quiz)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchQuizes()
  }, [])

  // useEffect(() => {
  //   console.log(selectQuiz)
  // }, [selectQuiz])

  const selectedStyle = {
    boxShadow:'0 0 14px 0 rgba(0, 0, 0, .12)'
  }
  return (
    <div className={styles.page} >
      <div className={styles.sidebar} >
        <h1>QUIZZIE</h1>
        <div className={styles.actionSection}>
          <h3 style={selectedAction === 'dashboard' ? selectedStyle : {}} onClick={() => {setSelectedAction('dashboard')}}>Dashboard</h3>
          <h3 style={selectedAction === 'analytics' || selectedAction === 'questionAnalysis' ? selectedStyle : {}} 
            onClick={() => { setSelectedAction('analytics')}}>Analytics</h3>
          <h3 onClick={() => { setCreateQuizPrompt(true) }} >Create Quiz</h3>
        </div>

        <div className={styles.logoutSection}>
          <hr />
          <h4 onClick={() => {
            localStorage.clear()
            navigate('/')
          }}>LOGOUT</h4>
        </div>
      </div>

      <div>
        {createQuizPrompt && <AddQuiz closePrompt={closeCreateQuizPrompt} action={addNameandType} />}
        {answerTypePrompt && <AddAnswerQuestions closePrompt={closeAnswerTypePrompt} action={addQuestions} />}
        {pollTypePrompt && <AddPollQuestions closePrompt={closePollTypePrompt} action={addQuestions} />}
        {linkPrompt && <QuizLinkPrompt closePrompt={closeLinkPrompt} quizLink={quizLink} />}
        {/* {deleteFolderAlert && <ConfirmAlert text='Are you sure you want to delete this folder ?' action={confirmation} closePrompt={closeDeleteFolderAlert} />} */}

      </div>
      {selectedAction === 'dashboard' && <Dashboard quizes={quizes} />}
      {selectedAction === 'questionAnalysis' && selectQuiz && <QuestionAnalysis quiz={selectQuiz} />}
      {selectedAction === 'analytics'  && <Analytics quizes={quizes} updateQuiz={fetchQuizes} questionsAnalysis={setQuestionAnalysis} />}
    </div>
  )
}

export default HomePage
