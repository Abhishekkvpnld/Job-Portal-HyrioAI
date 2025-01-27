import JobTable from "@/components/Jobtable";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";


const Jobs = () => {

    const navigate = useNavigate();

  return (
    <div>
    <Navbar />

    <div className="flex items-center justify-between mx-6">
        <h1 className="my-2 mx-3 font-bold text-2xl">Registered Companies</h1>
        <Button onClick={()=>navigate("/jobs/create")}>Post Job <span><Plus/></span></Button>
    </div>

    <JobTable/>

</div>
  )
}

export default Jobs;