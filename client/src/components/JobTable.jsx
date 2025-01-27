import { MoreHorizontal } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";



const JobTable = () => {
    return (
        <div className="p-3">
            <Table>
                <TableCaption>A List of recent applied user</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className={"text-right"}>Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    <tr>
                        <TableCell>Abhishek KV</TableCell>
                        <TableCell>Abhishek@gmail.com</TableCell>
                        <TableCell>9525465854</TableCell>
                        <TableCell>Resume</TableCell>
                        <TableCell>25/01/2025</TableCell>
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
                                            <span>status</span>
                                        </div>
                                    {/* ))} */}
                                </PopoverContent>
                            </Popover>

                        </TableCell>
                    </tr>
                </TableBody>

            </Table>
        </div>
    )
}

export default JobTable