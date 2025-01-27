import { MoreHorizontal } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";


const CompanyTable = ({ company }) => {


    return (
        <div className="p-3">
            <Table>
                <TableCaption>A List of recent registered company </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Website</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className={"text-right"}>Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {
                        company?.map((company) => (
                            <tr key={company?._id}>
                                <TableCell>{company?.name}</TableCell>
                                <TableCell>{company?.location}</TableCell>
                                <TableCell>{company?.website}</TableCell>
                                <TableCell>{company?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className="float-right cursor-pointer w-fit mr-5 bg-blue-50 flex flex-col items-start p-4 space-y-2">
                                            {/* {ShortListStatus.map((status, index) => ( */}
                                            <div
                                                // key={index}
                                                className="flex items-center w-full cursor-pointer hover:underline"
                                            >
                                                <span>Update</span>
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

export default CompanyTable