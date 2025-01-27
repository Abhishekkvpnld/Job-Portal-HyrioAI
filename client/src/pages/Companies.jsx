import CompanyTable from "@/components/CompanyTable"
import Navbar from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { COMPANY_API_END_POINT } from "@/utils/constants"
import axios from "axios"
import { Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"



const Companies = () => {

    const [data, setData] = useState([]);
    const navigate = useNavigate();


    const fetchAllCompanies = async () => {
        try {
            const res = await axios.get(`${COMPANY_API_END_POINT}/all`, { withCredentials: true });
            if (res?.data?.success) {
                setData(res?.data?.data);
            }
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        fetchAllCompanies()
    }, []);



    return (
        <div>
            <Navbar />

            <div className="flex items-center justify-between mx-6">
                <h1 className="my-2 mx-3 font-bold text-2xl">Registered Companies</h1>
                <Button onClick={() => navigate("/companies/create")}>Register <span><Plus /></span></Button>
            </div>

            <CompanyTable company={data} />

        </div>
    )
}

export default Companies