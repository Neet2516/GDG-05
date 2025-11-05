import React from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Header from './section/Header/Header'
import Register from './pages/login/Register'
import Aboutus from './pages/AboutUsPage'
import Login from './pages/login/Login'
import SurveyPage from './pages/SurveyPage'
import DashboardPage from './pages/Dashboard/Dashboard';
import RemindersPage from './components/reminders/RemindersPage';
function App() {
  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Aboutus/>} /> {/* Default page */}
          <Route path="/aboutus" element={<Aboutus/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/dashboard" element={<DashboardPage/>}/>
          <Route path="/survey" element={<SurveyPage/>}/>
          <Route path="/reminders" element={<RemindersPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
