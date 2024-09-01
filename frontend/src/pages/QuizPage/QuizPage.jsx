import React, { useEffect, useState } from 'react'
import styles from './QuizPage.module.css'
import { getQuizById, saveResponse, updateImpression } from '../../api/Quiz'
import awardImage from '../../assets/images/award.png'

function QuizPage() {
    const [quiz, setQuiz] = useState({})
    const [quizType, setQuizType] = useState('')
    const [questions, setQuestions] = useState([])
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null)
    const [selectedOption, setSelectedOption] = useState(null)
    const [timer, setTimer] = useState(0)
    const [responseArr , setResponseArr] = useState([])
    const [correctAnswers, setCorrectAnswers] = useState(0)
    const [isUpdated, setIsUpdated] = useState(true)
    const [isCompleted, setIsCompleted] = useState(false)
    const [path, setPath] = useState()

    const fetchQuiz = async (id) => {
        try {
            const response = await getQuizById(id)
            if (response.status === 200) {
                setQuiz(response.data.Quiz)
                setQuizType(response.data.Quiz.quizType)
                setQuestions(response.data.Quiz.questions)
                setTimer(()=> response.data.Quiz.questions[0].timer)
                setSelectedQuestionIndex(0)
                countDown(response.data.Quiz.questions[0].timer)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const updateImpress = async(id)=> {
        try {
            const response = await updateImpression(id)
            if(response.status === 201){
                setIsUpdated(false)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const saveData = async(respon) =>{
        try {
            const response = await saveResponse(quiz._id , respon)
            if(response.status === 201){
                setIsCompleted(true)
            }
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const saveAnswer = () => {
        if(quizType === 'answer'){
            if (selectedOption !== null) { 
                if(selectedOption === questions[selectedQuestionIndex].correctOption){
                    setCorrectAnswers((prev) => prev + 1)
                    setResponseArr([...responseArr , true])
                    if (selectedQuestionIndex === questions.length - 1){
                        saveData([...responseArr , true])
                    }
                }else{
                    setResponseArr([...responseArr , false])
                    if (selectedQuestionIndex === questions.length - 1){
                        saveData([...responseArr , false])
                    }
                }
                setSelectedQuestionIndex((prev) => {
                    if(prev === questions.length - 1){
                        return prev
                    }
                    return prev + 1
                })
                if (selectedQuestionIndex === questions.length - 1) {
                    console.log('Your Total correctAnswers is ' , correctAnswers , 'out of ' , questions.length)    
                }
            }
            
            
        }
        if(quizType === 'poll'){
            if (selectedOption !== null) { 
                setResponseArr([...responseArr , selectedOption])
                setSelectedQuestionIndex((prev) => prev + 1)
                if (selectedQuestionIndex === questions.length - 1) {
                    saveData([...responseArr , selectedOption])
                    console.log('Your Response is  ' , responseArr)    
                }
            }
        }
    }
    const countDown = (timeLeft) =>{
        // console.log(timeLeft)
        // const timecount = setInterval(() => {
        //     setTimer((time) => {
        //         // console.log(time)
        //         if(timeLeft === 0){
        //             clearInterval(timecount);
        //             return 0
        //         }
        //         timeLeft -= 1
        //         return timeLeft - 1 ;
        //     })
        // } , 1000)
    }
    // useEffect(() =>{
    //     console.log(responseArr)
    //     console.log(correctAnswers)
    // } , [responseArr])
    useEffect(() => {
        setPath(() => window.location.pathname.split('/'))
        fetchQuiz(window.location.pathname.split('/')[2])

        if(isUpdated){
            updateImpress(window.location.pathname.split('/')[2])
            
        }

        // console.log(timer)
        // if(isLoad){
            // const timecount = setInterval(() => {
            //     setTimer((time) => {
            //         console.log(time)
            //         if(time === 0){
            //             clearInterval(timecount);
            //             return 0
            //         } 
            //         return time - 1
            //     })
            // } , 1000)         
        //     setIsLoad(false)
        // }
        // return clearInterval(timecount)
    }, [])

    useEffect(() =>{
        setTimer(()=> questions[selectedQuestionIndex]?.timer)
        setSelectedOption(null)
        const timecount = setInterval(() => {
            setTimer((time) => {
                if(time === 0){
                    clearInterval(timecount);
                    return 0
                } 
                return time - 1
            })
        } , 1000)
    } , [selectedQuestionIndex])

    const selectedAnswerStyle = {
        border: '5px solid #5076FF'
    }
    return (
        <div className={styles.page}>
            {isCompleted && <CompletedMessage responseArr={responseArr} quizType={quizType} />}
            {!isCompleted && <div className={styles.quizContainer}>
                <div className={styles.questionNumberAndTimer} >
                    <p>{`0${selectedQuestionIndex + 1}/0${questions.length}`}</p>
                    {timer > 0 && <p style={{ color: '#D60000' }}>{`00:${timer >= 10 ? timer : '0' + timer}s`}</p>}
                </div>

                <div className={styles.questionContainer}>
                    <h3>{questions[selectedQuestionIndex]?.question}</h3>
                    <div className={styles.optionsContainer}>
                        {questions[selectedQuestionIndex]?.options.map((option, index) => {
                            return <div key={index} style={selectedOption === index ? selectedAnswerStyle :{}} onClick={() => { setSelectedOption(index) }}>
                                {option.text && <p>{option.text}</p> }
                                {option.image && <img src={option.image} alt={`option ${index+1}`} /> }
                            </div>
                        })}
                    </div>
                </div>

                <button className={styles.actionButton} onClick={saveAnswer}>{selectedQuestionIndex === questions.length - 1 ? 'SUBMIT' : 'NEXT'}</button>
            </div>}
        </div>
    )
}

export default QuizPage

function CompletedMessage({responseArr , quizType}) {
    const [correctAnswers , setCorrectAnswers] = useState(0)
    useEffect(()=>{
        console.log(quizType , responseArr)
        if(quizType === 'answer'){
            responseArr.forEach(element => {
                if(element) {
                    setCorrectAnswers((prev) => prev + 1)
                }
            });
        }
    } , [])
    return(
        <div className={styles.messageContainer} >
            {quizType === 'poll' && <h1 className={styles.pollMessage}>Thank you for participating in the Poll</h1>}
            {quizType === 'answer' && <div className={styles.answerMessage}>
                <p>Congrats Quiz is Completed</p>
                <img src={awardImage} alt="award" />
                <p>Your Score is <span>{`0${correctAnswers}/0${responseArr.length}`}</span></p>
            </div> }
        </div>
    )
}
