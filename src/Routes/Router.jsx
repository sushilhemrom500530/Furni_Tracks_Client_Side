import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import About from './../pages/about/About';
import LoginPage from "../pages/login/LoginPage";
import SignupPage from "../pages/signup/SignupPage";
import PrivetRoute from "./PrivetRoute";
import CreateShop from "../pages/create shop/CreateShop";
import SubFurniHome from "../pages/sub-furniture-home/SubFurniHome";
import FurniDetails from "../pages/sub-furniture-home/furni details/FurniDetails";
import MyCart from "../pages/my cart/MyCart";
import DashboardLayout from "../layouts/DashboardLayout";
import DCreateShop from "../layouts/dashboard/user/create shop/DCreateShop";
import PaymentDetails from "../layouts/dashboard/payment details/PaymentDetails";
import Promotion from "../layouts/dashboard/promotion/Promotion";
import Setting from "../layouts/dashboard/setting/Setting";
import ManageAccount from "../layouts/dashboard/manage account/ManageAccount";
import PaymentSection from "../pages/checkout/PaymentSection";
import AddProducts from "../pages/add-product/AddProducts";
import ManageProduct from './../layouts/dashboard/manager/manage product/ManageProduct';
import MyProduct from "../layouts/dashboard/manager/my product/MyProduct";
import SaleProduct from "../layouts/dashboard/manager/sale product/SaleProduct";
import SaleSummary from "../layouts/dashboard/admin/sale summaray/SaleSummary";
import FavoriteProduct from "../layouts/dashboard/user/favorite/FavoriteProduct";
import UpdatedProduct from "../layouts/dashboard/manager/updated product/UpdatedProduct";
import AllManagers from "../layouts/dashboard/admin/all managers/AllManagers";
import AllProducts from "../layouts/dashboard/admin/all products/AllProducts";
import ManageProductAdmin from "../layouts/dashboard/admin/manage products/ManageProductAdmin";
import SaleSummaryAdmin from "../layouts/dashboard/admin/sale summaray/SaleSummary";
import AllUsers from "../layouts/dashboard/admin/all user/AllUsers";
import AllShop from "../pages/all shop/AllShop";
import Contact from "../pages/contact/Contact";
import Blog from "../pages/blog/Blog";
import AdminHome from "../layouts/dashboard/admin/admin-home";


const Router = createBrowserRouter([
    {
        path: '/',
        errorElement: <ErrorPage />,
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: 'all-shop',
                element: <AllShop />
            },
            {
                path: 'about',
                element: <About />
            },
            {
                path: 'contact',
                element: <Contact />
            },
            {
                path: 'blog',
                element: <Blog />
            },
            {
                path: 'login',
                element: <LoginPage />
            },
            {
                path: 'signup',
                element: <SignupPage />
            },
            {
                path: 'create-shop',
                element: <PrivetRoute><CreateShop /></PrivetRoute>
            },
            {
                path: 'category/:category',
                loader: ({ params }) => fetch(`https://furni-track-project-server-side.vercel.app/furniture/${params?.category}`),
                element: <SubFurniHome />
            },
            {
                path: 'furni-details/:id',
                loader: ({ params }) => fetch(`https://furni-track-project-server-side.vercel.app/furnitures/${params?.id}`),
                element: <PrivetRoute> <FurniDetails /></PrivetRoute>
            },
            {
                path: 'furnitures/:id',
                loader: ({ params }) => fetch(`https://furni-track-project-server-side.vercel.app/furnitures/${params?.id}`),
                element: <PrivetRoute><FurniDetails /></PrivetRoute>
            },
            {
                path: 'my-cart',
                element: <PrivetRoute><MyCart /></PrivetRoute>
            },
            {
                path: 'checkout',
                element: <PrivetRoute><PaymentSection /></PrivetRoute>
            }
        ]
    },
    {
        path: "/dashboard",
        element: <PrivetRoute><DashboardLayout /></PrivetRoute>,
        children: [
            {
                path: '/dashboard',
                element: <PrivetRoute><AdminHome /></PrivetRoute>
            },
            // general user dashboard 
            {
                path: 'create-shop',
                element: <PrivetRoute><DCreateShop /></PrivetRoute>
            },
            {
                path: 'favorites',
                element: <PrivetRoute><FavoriteProduct /></PrivetRoute>
            },
            {
                path: 'payment-details',
                element: <PrivetRoute><PaymentDetails /></PrivetRoute>
            },
            {
                path: 'promotion',
                element: <PrivetRoute><Promotion /></PrivetRoute>
            },
            {
                path: 'settings',
                element: <PrivetRoute><Setting /></PrivetRoute>
            },
            {
                path: 'manage-account',
                element: <PrivetRoute><ManageAccount /></PrivetRoute>
            },
            // managers 
            {
                path: 'add-product',
                element: <PrivetRoute><AddProducts /></PrivetRoute>
            },
            {
                path: 'update-product/:id',
                element: <PrivetRoute><UpdatedProduct /></PrivetRoute>,
                loader: ({ params }) => fetch(`https://furni-track-project-server-side.vercel.app/furnitures/${params.id}`)
            },
            {
                path: 'my-product',
                element: <PrivetRoute><MyProduct /></PrivetRoute>
            },
            {
                path: 'manage-product',
                element: <PrivetRoute><ManageProduct /></PrivetRoute>
            },
            {
                path: 'sales-product',
                element: <PrivetRoute><SaleProduct /></PrivetRoute>
            },
            {
                path: 'sale-summary',
                element: <PrivetRoute><SaleSummary /></PrivetRoute>
            },
            // adimin category route 
            {
                path: 'shop-managers',
                element: <PrivetRoute><AllManagers /></PrivetRoute>
            },
            {
                path: 'all-products',
                element: <PrivetRoute><AllProducts /></PrivetRoute>
            },
            {
                path: 'manage-products',
                element: <PrivetRoute><ManageProductAdmin /></PrivetRoute>
            },
            {
                path: 'sale-summary',
                element: <PrivetRoute><SaleSummaryAdmin /></PrivetRoute>
            },
            {
                path: 'all-users',
                element: <PrivetRoute><AllUsers /></PrivetRoute>
            },
        ]
    }
])

export default Router;