import { useNavigate } from "react-router-dom";
import { Badge } from "../components/ui/badge";
import { Button } from "./ui/button";


const JobCard = ({ job }) => {

    const navigate = useNavigate()

    return (
        <div className="p-5 shadow-md rounded-md hover:shadow-xl bg-white border cursor-pointer border-gray-100">
            <div>
                <h1 className="font-medium text-lg">{job?.company?.name}</h1>
                <p className="text-sm text-gray-500">India</p>
            </div>

            <div>
                <h1 className="font-bold text-lg my-1">{job?.title}</h1>
                <p className="text-gray-600 text-sm">{job?.description}</p>
            </div>

            <div className="flex items-center gap-2 mt-3">
                <Badge className={"font-bold text-blue-600"} variant={"ghost"}>{job?.position} Position</Badge>
                <Badge className={"font-bold text-violet-600"} variant={"ghost"}>{job?.jobType}</Badge>
                <Badge className={"font-bold text-red-600"} variant={"ghost"}>{job?.salary}LPA</Badge>
            </div>

            <div className="flex items-center justify-end gap-3 my-3">
                <Button className={"bg-blue-700 text-white hover:bg-blue-800"}>Apply</Button>
                <Button onClick={()=>navigate(`/jobs/description/${job?._id}`)}>Details</Button>
            </div>
        </div>
    )
}

export default JobCard;