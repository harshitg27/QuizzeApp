import React, { useState } from 'react'
import { Login } from '../../api/User';
import { useNavigate } from 'react-router-dom';

function LogIn({ styles }) {
    const navigate = useNavigate()
    const [error, setError] = useState({ password: '', email: '' })
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogIn = async() =>{
        try {
            const response = await Login(email , password);
            if (response.status == 200) {
                console.log(response.data)
                localStorage.setItem('userToken', response.data.userToken)
                navigate('/dashboard')
            }else{
                alert(response.data.message)
            }
            
        } catch (error) {
            
        }
    }

    function validate() {
        let err = false;
        setError({ password: '', email: '' })

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
        if (err) {
            return
        }
        handleLogIn()
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        validate()
    };
    return (
        <div className={styles.formPage}>
            <form onSubmit={handleSubmit}>
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

                <button type="submit">Log In</button>
            </form>
        </div>
    )
}

export default LogIn
