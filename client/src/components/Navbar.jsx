

import { LogOut, User2 } from "lucide-react";
import { Avatar, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "@/redux/authSlice";



const Navbar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const {user} = useSelector((store)=>store.auth);


    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true })
            if (res.data.success) {
                dispatch(setAuthUser(null))
                navigate("/");
                toast.success(res.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    }

    return (
        <div className="bg-white">

            <div className="flex items-center justify-between px-10 py-1">
                <div>
                    <Link to={"/"}><h1 className="text-2xl font-bold rounded-lg cursor-pointer  text-orange-600">JobNest</h1></Link>
                </div>

                <div className="flex items-center gap-11">
                    <ul className="flex items-center text-sm gap-5 font-medium">

                        {
                            user && (
                                <>
                                    <Link to={"/"}> <li className="hover:underline cursor-pointer">Home</li></Link>
                                    <Link to={"/companies"}> <li className="hover:underline cursor-pointer">companies</li></Link>
                                    <Link to={"/jobs"}> <li className="hover:underline cursor-pointer">Jobs</li></Link>
                                </>
                            )
                        }

                    </ul>

                    {
                        !user ? (<div className="flex items-center justify-center gap-2">
                            <Link to={"/login"}> <Button variant="outline">Login</Button></Link>
                            <Link to={"/signup"}> <Button var>Signup</Button></Link>
                        </div>) : (
                            <Popover>
                                <PopoverTrigger>
                                    <Avatar className="w-10 h-10 rounded-full">
                                        <AvatarImage src={"/profile.png"} alt="avatar" />
                                    </Avatar>
                                </PopoverTrigger>

                                <PopoverContent className="w-72">
                                    <div className="flex items-center gap-1">
                                        <Avatar className="w-5 h-5 rounded-full">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="avatar" />
                                        </Avatar>
                                        <div>
                                            <h1 className="text-sm font-medium">{user?.fullname}</h1>
                                            <p className="text-xs text-slate-500 text-muted-foreground">Empowering people with innovative and user-friendly technology solutions.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 justify-between">


                                        <div className="flex items-center gap-1">
                                            <Button className="mt-2 bg-blue-700 text-white" variant="outline"><Link to={"/profile"}>
                                                View Profile</Link>
                                            </Button>
                                        </div>


                                        <div className="flex items-center gap-2">
                                            <Button onClick={logoutHandler} className="mt-2 text-white" variant="destructive">
                                                <LogOut color="white" size={18} className="text-slate-600" /> Logout
                                            </Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }


                </div>
            </div>

        </div>
    )
}

export default Navbar;