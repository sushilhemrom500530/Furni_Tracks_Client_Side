import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import SignupPage from "../pages/signup/SignupPage";
import LoginPage from "../pages/login/LoginPage";
import CreateShop from "../pages/create shop/CreateShop";
import SubFurniHome from "../pages/sub-furniture-home/SubFurniHome";
import FurniDetails from "../pages/sub-furniture-home/furni details/FurniDetails";

const Router = createBrowserRouter([
    {
        path: '/',
        errorElement:<ErrorPage />,
        element: <MainLayout />,
        children:[
            {
                path:'/',
                element: <Home />
            },
            {
                path:'about',
                element: <About />
            },
            {
                path:'login',
                element: <LoginPage />
            },
            {
                path:'signup',
                element: <SignupPage />
            },
            {
                path:'create-shop',
                element: <CreateShop />
            },
            {
                path:'category/:category',
                loader: ({params}) => fetch(`http://localhost:5000/furniture/${params?.category}`),
                element: <SubFurniHome />
            },
            {
                path:'furni-details/:id',
                loader: ({params}) => fetch(`http://localhost:5000/furnitures/${params?.id}`),
                element: <FurniDetails />
            },
            {
                path:'furnitures/:id',
                loader: ({params}) => fetch(`http://localhost:5000/furnitures/${params?.id}`),
                element: <FurniDetails />
            },
        ]
    }
])

export default Router;