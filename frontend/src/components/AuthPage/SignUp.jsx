import React, { useState } from 'react'
import { Register } from '../../api/User';

function SignUp({ styles , setSelectedOption }) {
    const [error, setError] = useState({ name: '', password: '', email: '', confirmPassword: '' })
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegisterUser = async() =>{
        try {
            const response = await Register(name , email , password);
            if (response.status == 201) {
                console.log(response.data)
                setSelectedOption('logIn')
            }else{
                alert(response.data.message)
            }
            
        } catch (error) {
            
        }
    }

    function validate() {
        let err = false;
        setError({ name: '', password: '', email: '', confirmPassword: '' })
        if (name.trim().length === 0) {
          err = true
          setName('')
          setError((error) => {
            return {
              ...error,
              name: 'Name is required'
            }
          })
        }
    
        if (email.trim().length === 0) {
          err = true
          setEmail('')
          setError((error) => {
            return {
              ...error,
              email: 'Email is required'
            }
          })
        }
        if (password.trim().length === 0) {
          err = true
          setPassword('')
          setError((error) => {
            return {
              ...error,
              password: 'Password is required'
            }
          })
        }
        if (confirmPassword.trim().length === 0) {
          err = true
          setConfirmPassword('')
          setError((error) => {
            return {
              ...error,
              confirmPassword: 'Confirm Password is required'
            }
          })
          return 
        }
        if(confirmPassword !== password){
          err = true
          setConfirmPassword('')
          setError((error) => {
            return {
              ...error,
              confirmPassword: 'Password is Not Matched'
            }
          })
        }
        if (err) {
          return
        }
        handleRegisterUser()
      }

    const handleSubmit = (e) => {
        e.preventDefault();
        validate()
    };
    return (
        <div className={styles.formPage}>
            <form onSubmit={handleSubmit}>
                <div className={styles.inputBox}>
                    <label >Name</label>
                    <input
                        className={error.name ? styles.inputBoxError : ''}
                        type="text"
                        value={name}
                        placeholder={error.name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className={styles.inputBox}>
                    <label>Email</label>
                    <input
                        className={error.email ? styles.inputBoxError : ''}
                        type="email"
                        value={email}
                        placeholder={error.email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className={styles.inputBox}>
                    <label >Password</label>
                    <input
                        className={error.password ? styles.inputBoxError : ''}
                        type="password"
                        value={password}
                        placeholder={error.password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className={styles.inputBox}>
                    <label>Confirm Password</label>
                    <input
                        className={error.confirmPassword ? styles.inputBoxError : ''}
                        type="password"
                        value={confirmPassword}
                        placeholder={error.confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                <button type="submit">Sign-Up</button>
            </form>
        </div>
    )
}

export default SignUp
