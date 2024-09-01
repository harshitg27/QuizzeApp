import React, { useState } from 'react'
import styles from './AddAnswerQuestion.module.css'
import { IoAddOutline } from 'react-icons/io5'
import { FaRegTrashAlt } from 'react-icons/fa'

function AddAnswerQuestions({ closePrompt, action }) {
  const [seletedQuestionIndex, setSelectedQuestionIndex] = useState(0)
  const [questions, setQuestions] = useState([{ question: '', optionType: 'text', timer: 0, correctOption: null, correctAttempt : 0 ,inCorrectAttempt : 0 , options: [{ text: '', image: '' }, { text: '', image: '' }] }])

  const validate = () => {
    let err = false
    questions.forEach((que, index) => {
      const { question, optionType, correctOption, options } = que
      if (question.trim().length === 0) {
        alert(`Enter Correct Question of Question Number ${index+1} `)
        err = true
        return false
      }

      if(correctOption === null){
        alert(`Select Correct Answer of Question Number ${index + 1}`)
        err = true
        return false
      }
      
      if(optionType === 'text'){
        options.forEach((option , idx) =>{
          if(option.text.trim().length === 0){
            alert(`Enter option of Option number ${idx + 1} in Question Number ${index + 1} `)
            err = true
            return false
          }
        })
      }else if(optionType === 'image-url'){
        options.forEach((option , idx) =>{
          if(option.image.trim().length === 0){
            alert(`Enter image URL of Option number ${idx + 1} in Question Number ${index + 1} `)
            err = true
            return false
          }
        })
      }else{
        options.forEach((option , idx) =>{
          if(option.image.trim().length === 0){
            alert(`Enter image URL of Option number ${idx + 1} in Question Number ${index + 1} `)
            err = true
            return false
          }
          if(option.text.trim().length === 0){
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
    if(validate()){
      action(questions)
      closePrompt()
    }
  }

  const addQuestion = () => {
    setQuestions([...questions, { question: '', optionType: 'text', timer: 0, correctOption: null, correctAttempt : 0 ,inCorrectAttempt : 0 , options: [{ text: '', image: '' }, { text: '', image: '' }] }])
  }

  const handleOptionTypeChange = (value) => {
    setQuestions((prevOptions) => {
      const newOptions = [...prevOptions];
      newOptions[seletedQuestionIndex].optionType = value;
      return newOptions;
    });
  };

  const setCorrectAnswer = (index) => {
    setQuestions([...questions.slice(0, seletedQuestionIndex), { ...questions[seletedQuestionIndex], correctOption: index }, ...questions.slice(seletedQuestionIndex + 1)])
  }

  const addOption = () => {
    setQuestions([...questions.slice(0, seletedQuestionIndex), { ...questions[seletedQuestionIndex], options: [...questions[seletedQuestionIndex].options, { text: '', image: '' }] }, ...questions.slice(seletedQuestionIndex + 1)])
  }

  const deleteOption = (index) => {
    let correctOption;
    if (questions[seletedQuestionIndex].correctOption === index) {
      correctOption = null;
      // setQuestions([...questions.slice(0 , seletedQuestionIndex) , {...questions[seletedQuestionIndex] , } , ...questions.slice(seletedQuestionIndex +1)])
    } else {
      correctOption = questions[seletedQuestionIndex].correctOption;
    }
    const options = [...questions[seletedQuestionIndex].options.slice(0, index), ...questions[seletedQuestionIndex].options.slice(index + 1)]
    setQuestions([...questions.slice(0, seletedQuestionIndex), { ...questions[seletedQuestionIndex], correctOption, options }, ...questions.slice(seletedQuestionIndex + 1)])
  }

  const setTimer = (value) => {
    setQuestions([...questions.slice(0, seletedQuestionIndex), { ...questions[seletedQuestionIndex], timer: value }, ...questions.slice(seletedQuestionIndex + 1)])
  }

  return (
    <>
    <div className={styles.wrapper}></div>
    <div className={styles.page} style={{ minHeight: '250px' }}
      onClick={(eve) => {
        eve.stopPropagation()
      }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
        <div className={styles.questionNums}>
          {questions.map((question, index) => {
            return <div className={styles.questonNumber} key={index} style={{ border: seletedQuestionIndex === index ? '1px solid black' : '' }} onClick={() => { setSelectedQuestionIndex(index) }} >{index + 1}</div>
          })}
          {questions.length < 5 && <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} onClick={addQuestion}> <IoAddOutline style={{ width: '25px', height: '25px', color: '#969696' }} /> </div>}
        </div>
        <div>Max 5 questions</div>
      </div>

      <input className={styles.question}
        type="text"
        placeholder='Enter Question'
        value={questions[seletedQuestionIndex].question}
        onChange={(e) => setQuestions([...questions.slice(0, seletedQuestionIndex), { ...questions[seletedQuestionIndex], question: e.target.value }, ...questions.slice(seletedQuestionIndex + 1)])}
      />

      <div className={styles.optionType}>
        <p>Option Type</p>
        <div className={styles.optionTypeGroup}>
          <input type="radio" name={`option-type-1`} value="text" checked={questions[seletedQuestionIndex].optionType === 'text'} onChange={(event) => handleOptionTypeChange(event.target.value)} /> Text
          <input type="radio" name={`option-type-2`} value="image-url" checked={questions[seletedQuestionIndex].optionType === 'image-url'} onChange={(event) => handleOptionTypeChange(event.target.value)} /> Image URL
          <input type="radio" name={`option-type-3`} value="text-image" checked={questions[seletedQuestionIndex].optionType === 'text-image'} onChange={(event) => handleOptionTypeChange(event.target.value)} /> Text & Image URL
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className={styles.optionsContrainer}>
          {questions[seletedQuestionIndex].options.map((option, index) => {
            return <div key={index} className={styles.optionDiv}>
              <input type="radio"
                style={{ accentColor: '#60b84b' }}
                value={index}
                checked={questions[seletedQuestionIndex].correctOption === index}
                onChange={() => { setCorrectAnswer(index) }} />

              {questions[seletedQuestionIndex].optionType === 'text-image' && <input type="text"
                style={questions[seletedQuestionIndex].correctOption === index ? { background: '#60b84b', color: '#fff' } : {}}
                className={styles.optionTextInput}
                placeholder='Text'
                value={option.text}
                onChange={(e) => {
                  let options = [...questions[seletedQuestionIndex].options.slice(0, index), { ...questions[seletedQuestionIndex].options[index], text: e.target.value }, ...questions[seletedQuestionIndex].options.slice(index + 1)]
                  setQuestions([...questions.slice(0, seletedQuestionIndex), { ...questions[seletedQuestionIndex], options }, ...questions.slice(seletedQuestionIndex + 1)])
                }} />}

              <input type="text"
                style={questions[seletedQuestionIndex].correctOption === index ? { background: '#60b84b', color: '#fff' } : {}}
                className={styles.optionInput}
                placeholder={questions[seletedQuestionIndex].optionType === 'text' ? "Text" : 'Image URL'}
                value={questions[seletedQuestionIndex].optionType === 'text' ? option.text : option.image}
                // onClick={()=> {setCorrectAnswer(index)}}
                onChange={(e) => {
                  let options = questions[seletedQuestionIndex].optionType === 'text' ?
                    [...questions[seletedQuestionIndex].options.slice(0, index), { ...questions[seletedQuestionIndex].options[index], text: e.target.value }, ...questions[seletedQuestionIndex].options.slice(index + 1)] :
                    [...questions[seletedQuestionIndex].options.slice(0, index), { ...questions[seletedQuestionIndex].options[index], image: e.target.value }, ...questions[seletedQuestionIndex].options.slice(index + 1)]

                  setQuestions([...questions.slice(0, seletedQuestionIndex), { ...questions[seletedQuestionIndex], options }, ...questions.slice(seletedQuestionIndex + 1)])
                }} />

              {index >= 2 && <FaRegTrashAlt className={styles.deleteIcon} onClick={() => { deleteOption(index) }} />}

            </div>
          })}
          {questions[seletedQuestionIndex].options.length < 4 && <div className={styles.addOption} onClick={addOption} >Add Option</div>}
        </div>

        <div className={styles.timerContainer}>
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
        </div>
      </div>

      <div className={styles.action}>
        <h3 className={styles.cancel} onClick={closePrompt} > Cancel</h3>
        <h3 className={styles.continue} onClick={handleSubmit} >Create Quiz</h3>
      </div>
    </div>
    </>
  )
}

export default AddAnswerQuestions
