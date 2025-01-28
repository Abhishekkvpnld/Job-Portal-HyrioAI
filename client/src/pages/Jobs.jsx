import JobTable from "@/components/JobTable";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { JOB_API_END_POINT } from "@/utils/constants";
import axios from "axios";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Jobs = () => {

  const navigate = useNavigate();
  const [data, setData] = useState([])

  const fetchAllJobs = async () => {
    try {
      const res = await axios.get(`${JOB_API_END_POINT}/postedJobs`, { withCredentials: true });
      if (res?.data?.success) {
        setData(res?.data?.data)
      }

    } catch (error) {
      console.log(error)
    }
  }

  console.log(data)

  useEffect(() => {
    fetchAllJobs()
  }, []);

  return (
    <div>
      <Navbar />

      <div className="flex items-center justify-between mx-6 mt-4">
        <h1 className="my-2 mx-3 font-bold text-2xl">Posted Jobs</h1>
        <Button onClick={() => navigate("/jobs/verify")}>Post Job <span><Plus /></span></Button>
      </div>

      <JobTable jobs={data} /> 

    </div>
  )
}

export default Jobs;