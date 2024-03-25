import React from "react"
import { Route, Routes } from "react-router-dom"
import { RoutesPaths } from "./models/enums/routesPaths"

function App() {

  return (
    <React.Fragment>
      <Routes>
        <Route path={RoutesPaths.Login} />
      </Routes>
    </React.Fragment>
  )
}

export default App
