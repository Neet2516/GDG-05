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
import TrendsPage from './pages/Trends/Trends';
function App() {
  return (
    <>
      
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Aboutus/>} />
          <Route path="/aboutus" element={<Aboutus/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/dashboard" element={<DashboardPage/>}/>
          <Route path="/survey" element={<SurveyPage/>}/>
          <Route path="/reminders" element={<RemindersPage />} />
          <Route path="/trends" element={<TrendsPage/>} />
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App

// Object
// email
// : 
// "yegor17727@wacold.com"
// fullname
// : 
// "ooo"
// token
// : 
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MGIxMzk0ODJmZDE4NTY3ODUxNTAzNyIsImlhdCI6MTc2MjM1ODYxNCwiZXhwIjoxNzYyMzYyMjE0fQ.z7nfmAkz3jjfFieaCrzPHGIA1UXAI0sM1KD-9yfzePI"
// _id
// : 
// "690b139482fd185678515037"
