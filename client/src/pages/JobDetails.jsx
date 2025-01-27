import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constants";
import { toast } from "sonner";

const user = []
const singleJob = []

const JobDescription = () => {


    let initialApplied = singleJob?.applications?.some((application) => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(initialApplied)

    const params = useParams();
    const jobId = params.id;

    const fetchSingleJob = async () => {
        try {
            const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
            if (res.data.success) {
                setIsApplied(res?.data?.data?.applications?.some((application) => application.applicant === user?._id));
            }
        } catch (error) {
            console.log(error)
        }
    }

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            if (res?.data?.success) {
                setIsApplied(true);
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                toast.success(res?.data?.message);
            }

        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message)
        }
    }

    useEffect(() => {
        fetchSingleJob();
    }, [jobId, user?._id])



    return (
        <div className="max-w-5xl mx-auto">
            <Navbar />
            <div className="flex mt-10 items-center justify-between">

                <div>
                    <h1 className="font-bold text-xl">{singleJob?.title}</h1>
                    <div className="flex items-center gap-2 mt-2">
                        <Badge className={"font-bold text-blue-600"} variant={"ghost"}>{singleJob?.position} Position</Badge>
                        <Badge className={"font-bold text-violet-600"} variant={"ghost"}>{singleJob?.jobType}</Badge>
                        <Badge className={"font-bold text-red-600"} variant={"ghost"}>{singleJob?.salary}LPA</Badge>
                    </div>
                </div>
                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`rounded-lg px-10 ${isApplied ? "cursor-not-allowed bg-slate-700 text-white" : "bg-blue-700 transition text-white hover:bg-blue-800"}`}
                >
                    {isApplied ? "Already Applied" : "Apply"}
                </Button>
            </div>

            <h1 className="font-medium py-4 border-b-2 border-b-gray-300">Job Description</h1>
            <div className="my-2">
                <h1 className="font-bold my-1">Role:<span className="font-normal text-gray-800 pl-4">{singleJob?.title}</span></h1>
                <h1 className="font-bold my-1">Location:<span className="font-normal text-gray-800 pl-4">{singleJob?.location}</span></h1>
                <h1 className="font-bold my-1">Description:<span className="font-normal text-gray-800 pl-4">{singleJob?.description}</span></h1>
                <h1 className="font-bold my-1">Experience:<span className="font-normal text-gray-800 pl-4">{singleJob?.experience} Years</span></h1>
                <h1 className="font-bold my-1">Salary:<span className="font-normal text-gray-800 pl-4">{singleJob?.salary}LPA</span></h1>
                <h1 className="font-bold my-1">Total Applicants:<span className="font-normal text-gray-800 pl-4">{singleJob?.applications?.length}</span></h1>
                <h1 className="font-bold my-1">Posted Date:<span className="font-normal text-gray-800 pl-4">{singleJob?.createdAt?.split("T")[0]}</span></h1>
            </div>
        </div>
    )
}

export default JobDescription;