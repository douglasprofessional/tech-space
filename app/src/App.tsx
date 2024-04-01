import React, { useEffect } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import { RoutesPaths } from "./models/enums/routesPaths"
import { ToastContainer } from "react-toastify"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase/firebaseConnection"

import Feed from "./pages/Feed/Feed";
import Login from "./pages/Login/Login"

function App() {
  const navigate = useNavigate()

  const checkLogin = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate(RoutesPaths.Feed)
      }else{
        navigate(RoutesPaths.Login)
      }
    })
  }

  useEffect(() => {
    checkLogin()
  }, [])

  return (
    <React.Fragment>
      <Routes>
        <Route path={RoutesPaths.Login} element={ <Login /> } />
        <Route path={RoutesPaths.Feed} element={ <Feed /> } />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3500}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        draggable
        theme="colored"
      />
    </React.Fragment>
  )
}

export default App
