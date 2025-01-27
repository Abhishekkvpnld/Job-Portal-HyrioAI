import { Trash } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { toast } from "sonner";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constants";



const JobTable = ({ jobs }) => {


    const deletePost = async (jobId) => {
        try {
            const res = await axios.delete(`${JOB_API_END_POINT}/delete/${jobId}`, { withCredentials: true })
            if (res?.data?.success) {
                toast.success(res?.data?.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message)
        }
    }

    return (
        <div className="p-3">
            <Table>
                <TableCaption>A List posted jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Experience</TableHead>
                        <TableHead>Job Type</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className={"text-right"}>Delete</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {
                        jobs?.map((jobs) => (
                            <tr key={jobs?._id}>
                                <TableCell>{jobs?.company?.name}</TableCell>
                                <TableCell>{jobs?.title}</TableCell>
                                <TableCell>{jobs?.location}</TableCell>
                                <TableCell>{jobs?.experienceLevel}</TableCell>
                                <TableCell>{jobs?.jobType}</TableCell>
                                <TableCell>{jobs?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger>
                                            <Trash className="hover:scale-110 transition hover:text-red-600" />
                                        </PopoverTrigger>
                                        <PopoverContent className="float-right cursor-pointer w-fit mr-5 bg-blue-50 flex flex-col items-start p-4 space-y-2">
                                            {/* {ShortListStatus.map((status, index) => ( */}
                                            <div
                                                // key={index}
                                                className="flex items-center w-full cursor-pointer hover:underline"
                                            >
                                                <span onClick={()=>deletePost(jobs?._id)}>Delete</span>
                                            </div>
                                            {/* ))} */}
                                        </PopoverContent>
                                    </Popover>

                                </TableCell>
                            </tr>
                        ))
                    }
                </TableBody>

            </Table>
        </div>
    )
}

export default JobTable