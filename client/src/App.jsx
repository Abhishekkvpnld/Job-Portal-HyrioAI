import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Companies from "./pages/Companies";
import Jobs from "./pages/Jobs";



const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Home/>} path="/"/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/companies" element={<Companies/>}/>
        <Route path="/jobs" element={<Jobs/>}/>
      </Routes>
    </Router>
  )
}

export default App;