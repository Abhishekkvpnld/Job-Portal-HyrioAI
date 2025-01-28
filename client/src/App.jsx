import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Companies from "./pages/Companies";
import Jobs from "./pages/Jobs";
import CreateCompany from "./pages/CreateCompany"
import CreateJob from "./pages/CreateJob";
import JobDescription from "./pages/JobDetails";
import AppliedJobs from "./pages/AppliedJobs";
import UpdateProfile from "./pages/UpdateProfile";
import EmailVerify from "./pages/EmailVerify";



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/update-profile/:id" element={<UpdateProfile />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/description/:id" element={<JobDescription />} />
        <Route path="/jobs/create" element={<CreateJob />} />
        <Route path="/jobs/verify" element={<EmailVerify />} />
        <Route path="/jobs/applied" element={<AppliedJobs />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/companies/create" element={<CreateCompany />} />
      </Routes>
    </Router>
  )
}

export default App;