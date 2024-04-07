import './App.css';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import SignUp from './pages/Signup/SignUp';
import {Routes, Route} from "react-router-dom"
import {Toaster} from "react-hot-toast"

function App() {

  return (
    <>
      <div className='p-4 h-screen flex items-center justify-center'>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

        </Routes>
        <Toaster />
        {/* <Home /> */}
      </div>
    </>
  )
}

export default App
