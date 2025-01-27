import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Companies from "./pages/Companies";
import Jobs from "./pages/Jobs";
// import JobDescription from "./pages/JobDetails";
import CreateCompany from "./pages/CreateCompany"
import CreateJob from "./pages/CreateJob";



const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/jobs" element={<Jobs />} />
        {/* <Route path="/jobs/description/:id" element={<JobDescription/>} /> */}
        <Route path="/jobs/create" element={<CreateJob />} />
        <Route path="/companies/create" element={<CreateCompany/>} />
      </Routes>
    </Router>
  )
}

export default App;