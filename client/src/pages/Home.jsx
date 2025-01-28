import Footer from "@/components/Footer";
import JobCard from "@/components/JobCard";
import Navbar from "@/components/Navbar";
import { JOB_API_END_POINT } from "@/utils/constants";
import axios from "axios";
import { useEffect, useState } from "react";



const Home = () => {

    const [data, setData] = useState([]);

    const fetchAllJobs = async () => {
        try {
            const res = await axios.get(`${JOB_API_END_POINT}/all`, { withCredentials: true });
            if (res?.data?.success) {
                setData(res?.data?.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchAllJobs();
    }, []);

    return (
        <div className="flex flex-col justify-between min-h-[100vh]">
            <Navbar />
            <h1 className="ml-6 mt-5 font-bold text-2xl">Latest Jobs</h1>
            <div className="p-4 grid grid-cols-3 gap-3 min-h-[80vh]">
                {
                    data?.map((job) => (
                        <JobCard job={job} key={job?._id} />
                    ))
                }
            </div>
            <Footer />
        </div>
    )
}

export default Home;