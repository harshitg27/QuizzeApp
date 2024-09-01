import React, { useEffect, useState } from 'react'
import styles from './Analytics.module.css'
import moment from 'moment'
import editIcon from '../../assets/images/edit.png'
import deleteIcon from '../../assets/images/delete.png'
import shareIcon from '../../assets/images/share.png'
import { GrFormCheckmark } from 'react-icons/gr'
import ConfirmAlert from '../QuizCards/ConfirmAlert'
import { deleteQuiz, updateSelectedQuiz } from '../../api/Quiz'
import UpdateQuizPrompt from '../UpdateQuizComponents/UpdateQuizPrompt'

function Analytics({ quizes, updateQuiz, questionsAnalysis }) {
    const [selectQuizId, setSelectedQuizId] = useState(null)
    const [copyLink, setCopyLink] = useState(false)
    const [updateQuizPrompt, setUpdateQuizPrompt] = useState(false)
    const [deleteQuizAlert, setDeleteQuizAlert] = useState(false)


    const closeDeleteQuizAlert = () => setDeleteQuizAlert(false)
    const closeUpdateQuizPrompt = () => setUpdateQuizPrompt(false)

    const setQuiz = async(quiz) => {
        try {
            const response = await updateSelectedQuiz(quiz._id , quiz)
            if(response.status === 201){
                closeUpdateQuizPrompt()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const copyToClipboard = async (id) => {
        await window.navigator.clipboard.writeText(window.location.host + '/quiz/' + id)
        setCopyLink(true)
    }

    const deleteSelectedQuiz = async () => {
        try {
            const response = await deleteQuiz(selectQuizId)
            if (response.status === 201) {
                updateQuiz()
                closeDeleteQuizAlert()
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (copyLink) {
            setTimeout(() => {
                setCopyLink(false)
            }, 5000)
        }
    }, [copyLink])
    return (
        <div className={styles.page}>
            {copyLink && <div className={styles.copylink}>
                <GrFormCheckmark style={{ width: '1.5rem', height: '1.5rem', color: '#60b84b' }} />
                <p>Link Copied to Clipboard</p>
            </div>}

            {deleteQuizAlert && <ConfirmAlert action={deleteSelectedQuiz} closePrompt={closeDeleteQuizAlert} />}

            <h1 className={styles.heading}>Quiz Analysis</h1>

            <div className={styles. quizTable}>

                <div className={styles.tableHeading}>
                    <h6 style={{ width: '45px' }}>S.No</h6>
                    <h6 style={{ width: '120px' }}>Quiz Name</h6>
                    <h6 style={{ width: '120px' }}>Created On</h6>
                    <h6 style={{ width: '90px' }}>Impression</h6>
                </div>

                {quizes.map((quiz, index) => {
                    return <div key={index} className={styles.tableRow} style={{ background: index % 2 !== 0 ? '#B3C4FF' : '#EDEDED' }}>
                        <p style={{ width: '45px' }}>{index + 1}</p>
                        <p style={{ width: '120px' }}>{quiz.quizName}</p>
                        <p style={{ width: '120px' }}>{moment(quiz.createdAt).format('DD MMM, YYYY')}</p>
                        <p style={{ width: '90px' }}>{quiz.impression > 1000 ? `${Math.floor(quiz.impression/100)/10}K` : quiz.impression}</p>
                        <div className={styles.iconDiv}>
                            <img src={editIcon} alt="edit" onClick={() => {
                                setSelectedQuizId(quiz._id)
                                setUpdateQuizPrompt(true)}} />
                            <img src={deleteIcon} alt="delete" onClick={() => {
                                setSelectedQuizId(quiz._id)
                                setDeleteQuizAlert(true)
                            }} />
                            <img src={shareIcon} alt="share" onClick={() => { copyToClipboard(quiz._id) }} />
                        </div>
                        <p style={{ textDecoration: 'underline', cursor: 'pointer' , marginLeft:'1.5rem' }} onClick={() => { questionsAnalysis(quiz._id) }} >Question Wise Analysis</p>
                    </div>
                })}

            </div>

            {updateQuizPrompt && selectQuizId && <UpdateQuizPrompt closePrompt={closeUpdateQuizPrompt} action={setQuiz} quizId={selectQuizId}/>}
        </div>
    )
}

export default Analytics
