import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes,Route } from 'react-router-dom'
import './App.css'
import AuthComponent from './components/AuthComponent'

function App() {

  return (
    <>
      <Routes>
        <Route path='/login' element={<AuthComponent/>} />
      </Routes>
    </>
  )
}

export default App
