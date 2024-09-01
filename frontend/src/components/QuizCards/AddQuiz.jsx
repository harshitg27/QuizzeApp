import React, { useState } from 'react'
import styles from './AddQuiz.module.css'

function AddQuiz({ closePrompt, action }) {
  const [quizName, setQuizName] = useState('')
  const [quizType, setQuizType] = useState('')
  const handleSubmit = () => {
    if(quizName.trim().length === 0){
      alert('Enter Quiz Name Correctly')
      return
    }
    if (quizType.length === 0) {
      alert("Select Quiz Type")
      return
    }
    
    action(quizName , quizType)
    // closePrompt()
  }
  const typeStyle = {
    select :{
      background: "#60b84b",
      color: "#ffffff"
    },
    deselect :{
      boxShadow : "0 0 25px 0 rgba(0,0,0, .15)"
    }
  }
  return (
    <>
    <div className={styles.wrapper}></div>
    <div className={styles.page} style={{ minHeight: '250px' }}
      onClick={(eve) => {
        eve.stopPropagation()
      }}>
      <input 
        type="text"
        placeholder='Quiz name'
        value={quizName}
        onChange={(e) => setQuizName(e.target.value)} />
      <div className={styles.quizType}>
        <p>Quiz Type</p>
        <div onClick={()=>{setQuizType('answer')}} style={quizType === 'answer' ? typeStyle.select : typeStyle.deselect} >Q $ A</div>
        <div onClick={()=>{setQuizType('poll')}} style={quizType === 'poll' ? typeStyle.select : typeStyle.deselect} >Poll Type</div>
      </div>
      <div className={styles.action}>
        <h3 className={styles.cancel} onClick={closePrompt} > Cancel</h3>
        <h3 className={styles.continue} onClick={handleSubmit} >Continue</h3>
      </div> 
    </div>
    </>
  )
}

export default AddQuiz
