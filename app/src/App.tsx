import React, { 
  useEffect, 
  useState
} from "react"
import { 
  Route, 
  Routes, 
  useNavigate 
} from "react-router-dom"
import { RoutesPaths } from "./models/enums/routesPaths"
import { ToastContainer } from "react-toastify"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase/firebaseConnection"
import UserEmailContext from "./contexts/UserEmail"

import Feed from "./pages/Feed/Feed";
import Login from "./pages/Login/Login"

function App() {
  const navigate = useNavigate()
  const [userEmail, setUserEmail] = useState('')

  const checkLogin = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        user.providerData[0].email !== null && setUserEmail(user.providerData[0].email)

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
      <UserEmailContext.Provider value={{ email: userEmail }}>
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
      </UserEmailContext.Provider>
    </React.Fragment>
  )
}

export default App
