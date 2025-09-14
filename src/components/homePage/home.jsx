import { cn } from "../../utils/cn";
import { Medal } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router";

function Home() {
  return (
    <div className="flex items-center justify-center flex-col">
      <div
        className={cn(
          "flex items-center justify-center flex-col"
        )}
      >
        <div className="mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase font-poppins-bold">
          <Medal className="h-6 w-6 mr-2" />
          Your Perfect Weekend Planner
        </div>
        <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6 font-poppins-bold">
        Weekendly helps you design
        </h1>
        <div className="text-3xl md:text-6xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-5  rounded-md py-5 w-fit font-poppins-bold">
          unforgettable weekends.
        </div>
      </div>
      <div
        className={cn(
          "text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto"
        )}
      >
       Browse activities, create a personalized schedule, and share your plans with friends. Turn your free time into memorable experiences with Weekendly.
      </div>
      <Button className="mt-6 bg-black text-white hover:bg-white hover:text-black" variant="destructive" size="lg" >
        <Link to="/login">Plan Your Weekend for Free</Link>
      </Button>
    </div>
  );
}

export default Home;
