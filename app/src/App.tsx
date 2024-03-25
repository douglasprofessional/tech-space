import React from "react"
import { Route, Routes } from "react-router-dom"
import { RoutesPaths } from "./models/enums/routesPaths"
import Login from "./pages/Login"

function App() {

  return (
    <React.Fragment>
      <Routes>
        <Route path={RoutesPaths.Login} element={ <Login /> } />
      </Routes>
    </React.Fragment>
  )
}

export default App
