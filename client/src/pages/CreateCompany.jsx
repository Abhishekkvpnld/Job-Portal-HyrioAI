import {  useState } from "react"
import Navbar from "../components/Navbar";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { ArrowBigLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constants";
import { useNavigate } from "react-router-dom";




const CreateCompany = () => {

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [input, setinput] = useState({
    name: "",
    description: "",
    location: "",
    website: ""
  });

  const changeEventHandler = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value })
  };


  const submitHandler = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const res = await axios.post(`${COMPANY_API_END_POINT}/register`, input, {
        withCredentials: true
      });
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        navigate("/companies")
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message)
    } finally {
      setLoading(false);
    }
  };



  return (
    <div>
      <Navbar />

      <div className="mx-auto my-8 max-w-xl">
        <form onSubmit={submitHandler}>
          <div className="p-7 flex items-center gap-4">
            <Button onClick={() => navigate("/companies")} variant="outline" className="flex items-center gap-2 font-semibold text-gray-500">
              <ArrowBigLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl">Create Company</h1>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Company Name</Label>
              <Input type="text" name="name" className="border border-slate-500 mt-1" onChange={changeEventHandler} value={input.name} />
            </div>

            <div>
              <Label>Description</Label>
              <Input type="text" className="border border-slate-500 mt-1" name="description" onChange={changeEventHandler} value={input.description} />
            </div>

            <div>
              <Label>Website</Label>
              <Input type="text" className="border border-slate-500 mt-1" name="website" onChange={changeEventHandler} value={input.website} />
            </div>

            <div>
              <Label>Location</Label>
              <Input type="text" className="border border-slate-500 mt-1" name="location" onChange={changeEventHandler} value={input.location} />
            </div>


          </div>
          {
            loading ? <Button className="w-full my-4 "><Loader2 className="animate-spin" /> Please wait...</Button> :
              <Button type="submit" className="w-full mt-5">Register</Button>
          }
        </form>
      </div>
    </div>
  )
}


export default CreateCompany