import Navbar from "../components/Navbar";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constants";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "@/redux/authSlice";




const UpdateProfile = () => {

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        username: user?.username || "",
        email: user?.email || "",
        phone: user?.phone || "",
    });


    const onChangeValueController = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(false)
            const res = await axios.put(`${USER_API_END_POINT}/update-profile`, input, { withCredentials: true });

            if (res?.data?.success) {
                dispatch(setAuthUser(res?.data?.data))
                navigate("/")
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
                    <h1 className="font-bold text-xl mb-2">Update Profile</h1>
                    <div className="my-2">
                        <Label>Full Name</Label>
                        <Input name="username" value={input.username} onChange={onChangeValueController} type="text" placeholder="Enter Name" />
                    </div>

                    <div className="my-2">
                        <Label>Email</Label>
                        <Input disabled={true} value={input.email} onChange={onChangeValueController} name="email" type="email" placeholder="Enter Email" />
                    </div>

                    <div className="my-2">
                        <Label>Phone Number</Label>
                        <Input value={input.phone} onChange={onChangeValueController} name="phone" type="number" placeholder="Enter Phone Number" />
                    </div>


                    {
                        loading ? <Button className="w-full my-4 "><Loader2 className="animate-spin" /> Please wait...</Button> :
                            <Button type="submit" className="w-full my-4">Update</Button>
                    }

                </form>
            </div>
        </div>
    )
}

export default UpdateProfile;