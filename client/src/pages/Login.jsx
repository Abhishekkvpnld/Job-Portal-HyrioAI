

import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constants";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setLoading } from "@/redux/authSlice";


const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector((store) => store.auth);

    const [input, setInput] = useState({
        email: "",
        password: "",
    });

    const onChangeValueController = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });

            if (res?.data?.success) {
                dispatch(setAuthUser(res?.data?.data))
                navigate("/")
                toast.success(res?.data?.message);
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message);
        } finally {
            dispatch(setLoading(false));
        }
    }


    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center mx-auto max-w-7xl ">
                <form onSubmit={handleSubmit} className="w-1/2 border border-gray-200 rounded-md p-4 my-8">
                    <h1 className="font-bold text-xl mb-2">Login</h1>

                    <div className="my-2">
                        <Label>Email</Label>
                        <Input value={input.email} onChange={onChangeValueController} name="email" type="email" placeholder="Enter Email" />
                    </div>


                    <div className="my-2">
                        <Label>Password</Label>
                        <Input value={input.password} onChange={onChangeValueController} name="password" type="password" placeholder="Enter Password" />
                    </div>

                   

                    {
                        loading ? <Button className="w-full my-4 "><Loader2 className="animate-spin" /> Please wait...</Button> :
                            <Button type="submit" className="w-full my-4">Login</Button>
                    }
                    <span className="text-sm">Don't have an account? <Link to={"/signup"} className="hover:underline font-semibold text-blue-700 ">Signup</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Login;