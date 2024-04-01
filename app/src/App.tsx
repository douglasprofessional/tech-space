import React from "react"
import { Route, Routes } from "react-router-dom"
import { RoutesPaths } from "./models/enums/routesPaths"
import { ToastContainer } from "react-toastify"

import Login from "./pages/Login"

function App() {

  return (
    <React.Fragment>
      <Routes>
        <Route path={RoutesPaths.Login} element={ <Login /> } />
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
