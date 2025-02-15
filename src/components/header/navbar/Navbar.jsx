/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";
import notImage from '../../../assets/image/product-not-fount.jpg'
import Sidebar from "../Sidebar/Sidebar";
import Logo from "../logo/Logo";
import NavLinkManu from "./NavLinkManu";
import { useEffect, useState } from "react";
import { FaDollarSign } from "react-icons/fa";
import { RxCross1 } from 'react-icons/rx';
import useSale from "../../../hooks/useSale";
import ForSaleData from './../../../layouts/dashboard/user/ForSaleData';
import Button from './../../button/index';

const Navbar = ({ children }) => {
    const [sales, refetch,] = useSale();
    const [isScrolled, setIsScrolled] = useState(false);
    const getPrice = sales?.reduce((total, currentItem) => total + (currentItem?.price), 0);
    const [active, setActive] = useState(true);
    const location = useLocation();
    const currentPath = location?.pathname;
    const isCurrentPath = ['/all-shop', '/blog', '/checkout']?.includes(currentPath);

    console.log("location:", isCurrentPath, location)


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleToggle = () => {
        setActive(!active)
    }
    const closeDrawer = () => {
        const drawerToggle = document.getElementById("my-drawer-3");
        if (drawerToggle) drawerToggle.checked = false;
    };


    return (
        <div className="drawer">
            <input
                id="my-drawer-3"
                type="checkbox"
                className="drawer-toggle text-white"
            />
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className={`w-full navbar fixed z-10 
                    ${isScrolled ? "!text-white fixed bg-color top-0 left-0 w-full z-50  " :
                        "bg-transparent "} ${isCurrentPath ? 'text-[#6427ff]' : 'text-white'}`}
                >
                    <div className="lg:max-w-[2520px] h-auto mx-auto lg:px-10 xl:px-20 w-full flex items-center justify-between lg:flex-row flex-row-reverse">
                        <div className="flex-none lg:hidden text-fuchsia-500 ">
                            <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="inline-block w-8 h-8 stroke-current"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    >
                                    </path>
                                </svg>
                            </label>
                        </div>
                        <div className="flex-1 px-2 md:mx-2">
                            <Logo />
                        </div>
                        <NavLinkManu
                            handleToggle={handleToggle}
                            sales={sales}
                            isScrolled={isScrolled}
                        />
                    </div>
                </div>
                {children}
            </div>
            <Sidebar
                handleToggle={handleToggle}
                sales={sales}
                closeDrawer={closeDrawer}
                isScrolled={isScrolled}
            />
            {
                !active && <div
                    onClick={() => setActive(true)}
                    className="fixed inset-0 bg-black bg-opacity-50 z-10 transition-transform duration-500 ease-in-out"
                >
                </div>
            }
            <div className="relative h-auto min-h-screen">
                <div className={`
                z-10 fixed pb-6 pt-6 !bg-blue-50 text-black -overflow-y-hidden hidden md:block lg:block md:w-[50%] lg:w-[28%] h-screen px-2 inset-y-0 right-0 transform
                     ${active && 'translate-x-full'} 
                     transition duration-200 ease-in-out ${isScrolled ? "top-[76px]" : "top-0"}`
                }>
                    <div className="flex flex-col">
                        <button
                            onClick={handleToggle}
                            className="btn outline-none border-none w-max bg-transparent">
                            <RxCross1 className="text-2xl" />
                        </button>
                        <h1 className="text-xl font-bold my-5 ">
                            Show Your Buy Products
                        </h1>
                        <hr className="w-[80%] h-[2px] bg-fuchsia-600 mx-auto mb-5" />
                    </div>

                    {
                        sales?.length === 0 && <div className="flex flex-col w-full h-auto p-8 gap-5">
                            <h1 className="text-xl font-bold ">
                                <span className="text-2xl text-purple-600">
                                    Oops
                                </span>!
                                <br />
                                Your Product is not found
                            </h1>
                            <img
                                src={notImage}
                                className="w-full h-[40vh]"
                                alt="not-found-product"
                            />
                        </div>
                    }
                    <div className={`w-full h-[calc(100vh-364px)] flex flex-col items-center sidebar overflow-auto justify-between ${isScrolled && 'h-[calc(100vh-440px)]'} `}>
                        <div>
                            {
                                sales?.length > 0 && sales?.map(sale =>
                                    <ForSaleData
                                        key={sale?._id}
                                        sale={sale}
                                        refetch={refetch}
                                    />)
                            }
                        </div>

                    </div>
                    <div className=" flex items-center justify-center flex-col gap-5">
                        <div className="bg-clip-content mt-10 p-6 border-4 border-violet-300 border-dashed">
                            <h1 className="text-xl font-bold">Total Price : $ {getPrice}</h1>
                        </div>
                        <Link to='/checkout'>
                            <Button
                                onClick={() => handleToggle(!active)}
                                icon={FaDollarSign}
                            >
                                Checkout Now
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;