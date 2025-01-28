import Navbar from "../components/Navbar";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { toast } from "sonner";
import axios from "axios";
import { COMPANY_API_END_POINT, JOB_API_END_POINT } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";




const EmailVerify = () => {


    const [loading, setLoading] = useState(false);
    const [next, setNext] = useState(false);
    const [otp, setOTP] = useState(0)
    const [input, setInput] = useState("")
    const { user } = useSelector((store) => store.auth);

    const navigate = useNavigate();

    const verify = async () => {
        if (otp == input) {
            toast.success("Account verified")
            navigate("/jobs/create")
        } else {
            navigate("/");
            toast.error("Account verification failed")
        }
    };

    const sendOtp = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${JOB_API_END_POINT}/verify-account`, { withCredentials: true })
            if (res?.data?.success) {
                setNext(true);
                setOTP(res?.data?.data)
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message)
        } finally {
            setLoading(false);
        }
    }


    return (
        <div>
            <Navbar />

            <div className="mx-auto my-8 max-w-xl">

                {
                    next ? (
                        <div className="flex items-center min-w-[60%] justify-center flex-col gap-3">
                            <div className="w-full">
                                <Label>Enter OTP</Label>
                                <Input type="text" name="otp" onChange={(e) => setInput(e.target.value)} placeholder="OTP..." className="border border-slate-500 mt-1 w-full" value={input} />
                            </div>
                            <Button onClick={verify} >Verify</Button>
                        </div>
                    ) : (
                        <div className="flex items-center min-w-[60%] justify-center flex-col gap-3">
                            <div className="w-full">
                                <Label>User Email</Label>
                                <Input type="text" name="name" className="border border-slate-500 mt-1 w-full" disabled={true} value={user?.email} />
                            </div>


                            {
                                loading ? <Button className="w-full my-4 "><Loader2 className="animate-spin" /> Please wait...</Button> :
                                    <Button disabled={next} onClick={sendOtp} >Send OTP</Button>
                            }
                        </div >
                    )
                }

            </div >
        </div >
    )
}

export default EmailVerify;