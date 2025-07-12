import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import Layout from "./layout";
import Turf from "../pages/turf-home";
import TurfDetails from "../pages/turf-details";
import BookingForm from "../pages/booking-form";
import UserProfile from "../pages/userProfile";
import OwnerProfile from "../pages/owner-profile";
import CreateTurfForm from "../pages/createTurf-form";
import BookingCard from "./bookingcard";
import OwnerVenue from "../pages/owner-venue";
import OwnerBookings from "../pages/ownerBookings";

const router = createBrowserRouter([
    {
        path:'/',
        element:<Layout/>,
        children:[
            {
                path:'/',
                element: <Home/>
            },
            {
                path:'/turf',
                element: <Turf/>
            },
            {
                path:'/turfdetails/:id',
                element: <TurfDetails/>
            }
            ,
            {
                path:'/turfdetails/booking/:id',
                element: <BookingForm/>
            },
            {
                path:'/userprofile',
                element: <UserProfile/>
            },
            {
                path:'/ownerprofile',
                element: <OwnerProfile/>
            },
            {
                path:'/createturf',
                element: <CreateTurfForm/>
            }
            ,
            {
                path:'/bookingcard',
                element: <BookingCard/>
            },
            {
                path:'/ownervenue',
                element: <OwnerVenue/>
            },
            {
                path:'/ownerbookings',
                element: <OwnerBookings/>
            }
        ]
    },{
        path:'/login',
        element:<Login/>
    },{
        path:'/register',
        element:<Register/>
    }
])

export default router;