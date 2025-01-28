import Navbar from "@/components/Navbar";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { APPLICATION_API_END_POINT } from "@/utils/constants";
import axios from "axios";
import { useEffect, useState } from "react";



const AppliedJobs = () => {

    const [jobs, setJobs] = useState([]);

    const fetchAppliedJobs = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/applied`, { withCredentials: true })
            if (res?.data?.success) {
                setJobs(res?.data?.data);
            }
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fetchAppliedJobs()
    }, []);

    return (
        <div>
            <Navbar />

            <div className="mx-10">
                <h1 className="my-5 font-bold text-2xl">Applied Jobs</h1>

                <Table>
                    <TableCaption>A List of recent applied job </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Company</TableHead>
                            <TableHead>Jobs Name</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Salary</TableHead>
                            <TableHead>Experience</TableHead>
                            <TableHead>Date</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {
                            jobs?.map((job) => (
                                <tr key={job?._id}>
                                    <TableCell>{job?.job?.company?.name}</TableCell>
                                    <TableCell>{job?.job?.title}</TableCell>
                                    <TableCell>{job?.job?.location}</TableCell>
                                    <TableCell>{job?.job?.salary}</TableCell>
                                    <TableCell>{job?.job?.experienceLevel}</TableCell>
                                    <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                                </tr>
                            ))
                        }
                    </TableBody>

                </Table>
            </div>
        </div>
    )
}

export default AppliedJobs;