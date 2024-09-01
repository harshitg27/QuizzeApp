import React, { useEffect, useState } from 'react'
import styles from './AuthPage.module.css'
import SignUp from '../../components/AuthPage/SignUp'
import LogIn from '../../components/AuthPage/LogIn'
import { useNavigate } from 'react-router-dom'

function AuthPage() {
  const navigate = useNavigate()
    const [selectedOption , setSelectedOption] = useState('signUp')
    const selectedStyled ={
      boxShadow:'0 0 50px 0 rgba(0 , 25 , 255 , .24)'
    }

    useEffect(()=>{
      if(localStorage.getItem('userToken')){
        navigate('/dashboard')
      }
    },[])
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.heading}>QUIZZIE</h1>
        <div className={styles.authType} style={{display:'flex' , gap:'2rem'}} >
          <div style={selectedOption === 'signUp' ? selectedStyled :{}} onClick={ ()=> setSelectedOption('signUp') } >Sign Up</div>
          <div style={selectedOption === 'logIn' ? selectedStyled :{}} onClick={ ()=> setSelectedOption('logIn') } >Log In</div>
        </div>

        {selectedOption === 'signUp' && <SignUp styles={styles} setSelectedOption={setSelectedOption} /> }
        {selectedOption === 'logIn' && <LogIn styles={styles} /> }
      </div>
    </div>
  )
}

export default AuthPage
