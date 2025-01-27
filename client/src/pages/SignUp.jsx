
import Navbar from "../components/Navbar";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constants";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";



const Signup = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
    });

    const onChangeValueController = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("username", input.username);
        formData.append("email", input.email)
        formData.append("phone", input.phone)
        formData.append("password", input.password)


        try {
            setLoading(false)
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true
            });

            if (res?.data?.success) {
                navigate("/login")
                toast.success(res?.data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center mx-auto max-w-7xl ">
                <form onSubmit={handleSubmit} className="w-1/2 border border-gray-200 rounded-md p-4 my-8">
                    <h1 className="font-bold text-xl mb-2">Sign Up</h1>
                    <div className="my-2">
                        <Label>Full Name</Label>
                        <Input name="username" value={input.username} onChange={onChangeValueController} type="text" placeholder="Enter Name" />
                    </div>

                    <div className="my-2">
                        <Label>Email</Label>
                        <Input value={input.email} onChange={onChangeValueController} name="email" type="email" placeholder="Enter Email" />
                    </div>

                    <div className="my-2">
                        <Label>Phone Number</Label>
                        <Input value={input.phone} onChange={onChangeValueController} name="phone" type="number" placeholder="Enter Phone Number" />
                    </div>

                    <div className="my-2">
                        <Label>Password</Label>
                        <Input value={input.password} onChange={onChangeValueController} name="password" type="password" placeholder="Enter Password" />
                    </div>


                    {
                        loading ? <Button className="w-full my-4 "><Loader2 className="animate-spin" /> Please wait...</Button> :
                            <Button type="submit" className="w-full my-4">Signup</Button>
                    }
                    <span className="text-sm">Already have an account? <Link to={"/login"} className="hover:underline font-semibold text-blue-700 ">Login</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Signup;