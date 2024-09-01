import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NotFound from './pages/NotFound'
import AuthPage from './pages/AuthPage/AuthPage'
import HomePage from './pages/HomePage/HomePage'
import QuizPage from './pages/QuizPage/QuizPage'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<AuthPage />}  />
        <Route path='/dashboard' element={<HomePage />}  />
        <Route path='/quiz/:id' element={<QuizPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
