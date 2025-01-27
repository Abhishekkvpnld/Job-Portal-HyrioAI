import Footer from "@/components/Footer";
import JobCard from "@/components/JobCard";
import Navbar from "@/components/Navbar";



const Home = () => {
    return (
        <div className="flex flex-col justify-between h-[100vh]">
            <Navbar />
            <h1 className="ml-6 font-bold text-2xl">Latest Jobs</h1>
            <div className="p-4 grid grid-cols-3">
                <JobCard />
            </div>
            <Footer />
        </div>
    )
}

export default Home;