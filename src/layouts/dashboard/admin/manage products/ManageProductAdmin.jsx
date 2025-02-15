/* eslint-disable react/no-unknown-property */
import { FaArrowRight } from "react-icons/fa";
import useFurnitures from "../../../../hooks/useFurnitures";
import Loader from "../../../../shared/Loader";
import { Link } from "react-router-dom";
import AdminTitle from './../../../../components/title/index';
import Button from './../../../../components/button/index';
import { MdKeyboardArrowUp } from "react-icons/md";

const ManageProductAdmin = () => {
    const [furnitures, refetch, isLoading] = useFurnitures();
    if (isLoading) {
        refetch();
        return <Loader />
    }
    return (
        <div className="pb-12">
            <AdminTitle>
                Manage All Products
            </AdminTitle>
            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
                    {
                        furnitures?.length > 0 && furnitures?.map(furniture =>
                            <div key={furniture?._id} className="bg-white relative shadow-md text-black flex items-center justify-center gap-3 w-full h-40">
                                <figure className="w-44 h-full">
                                    <img src={furniture?.image} alt="product-image" className="w-full h-full" />
                                </figure>
                                <div className="pr-1">
                                    <h1 className=" font-bold mb-2">{furniture?.title?.length > 16 ? furniture?.title?.slice(0, 16) + "....." : furniture?.title}</h1>
                                    <p className="text-sm">{furniture?.description?.length > 55 ? furniture?.description?.slice(0, 55) + "....." : furniture?.description}</p>
                                    <div className="flex items-center justify-end mr-5 my-2">
                                        <Link to={`/furnitures/${furniture?._id}`} className="absolute bottom-2 right-3">
                                            <Button
                                                icon={FaArrowRight}
                                                size={20}
                                                className="custom-bg-color px-2 py-1 text-white hover:translate-x-2 text-sm"
                                            >
                                                Show
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                </div>
                <div className=" mt-12">
                    <AdminTitle className="text-center">
                        Process Of Manage Products
                    </AdminTitle>
                    <div className="flex items-center justify-center gap-5 flex-col lg:flex-row mt-8">
                        <div className="w-full lg:w-1/2 h-auto">
                            <h1 className="text-2xl font-bold">How To Manage My Product(Secrete)</h1>
                            <div className="mt-5 space-y-2">
                                <div className="group flex flex-col gap-2 card text-black !pl-8"
                                    tabindex="1" >
                                    <div className="flex cursor-pointer items-center justify-between">
                                        <ul className="text-xl font-medium cursor-pointer list-disc">
                                            <li>Product Catalog Maintenance</li>
                                        </ul>
                                        <MdKeyboardArrowUp className="h-8 w-8 transition-all duration-500 group-focus:-rotate-180" />
                                    </div>
                                    <div className="invisible h-auto max-h-0 items-center opacity-0 transition-all group-focus:visible group-focus:max-h-screen group-focus:opacity-100 group-focus:duration-1000" >
                                        Regularly update your product catalog to include new items and remove discontinued or out-of-stock products. Organize your product catalog into categories and subcategories for easy navigation and browsing on your website.
                                    </div>
                                </div>

                                <div className="group flex flex-col gap-2  card text-black !pl-8"
                                    tabindex="2" >
                                    <div className="flex cursor-pointer items-center justify-between">
                                        <ul className="list-disc cursor-pointer text-xl font-medium">
                                            <li>Pricing Strategy</li>
                                        </ul>
                                        <MdKeyboardArrowUp className="h-8 w-8 transition-all duration-500 group-focus:-rotate-180" />
                                    </div>
                                    <div className="invisible h-auto max-h-0 items-center opacity-0 transition-all group-focus:visible group-focus:max-h-screen group-focus:opacity-100 group-focus:duration-1000" >
                                        Set competitive yet profitable prices for your products by considering factors such as production costs, market demand, and competitor pricing. Monitor market trends and adjust prices accordingly to remain competitive and maximize profitability.
                                    </div>
                                </div>

                                <div className="group flex flex-col gap-2  card text-black !pl-8"
                                    tabindex="3">
                                    <div className="flex cursor-pointer items-center justify-between">
                                        <ul className="list-disc cursor-pointer text-xl font-medium">
                                            <li>Marketing and Promotion</li>
                                        </ul>
                                        <MdKeyboardArrowUp className="h-8 w-8 transition-all duration-500 group-focus:-rotate-180" />
                                    </div>
                                    <div className="invisible h-auto max-h-0 items-center opacity-0 transition-all group-focus:visible group-focus:max-h-screen group-focus:opacity-100 group-focus:duration-1000" >
                                        Highlight unique selling points and benefits of your products to differentiate them from competitors. Engage with your audience through compelling content, such as product demonstrations, customer testimonials, and blog posts.
                                    </div>
                                </div>
                                <div className="group flex flex-col gap-2  card text-black !pl-8"
                                    tabindex="3">
                                    <div className="flex cursor-pointer items-center justify-between">
                                        <ul className="list-disc cursor-pointer text-xl font-medium">
                                            <li>Customer Feedback and Satisfaction</li>
                                        </ul>
                                        <MdKeyboardArrowUp className="h-8 w-8 transition-all duration-500 group-focus:-rotate-180" />
                                    </div>
                                    <div
                                        className="invisible h-auto max-h-0 items-center opacity-0 transition-all group-focus:visible group-focus:max-h-screen group-focus:opacity-100 group-focus:duration-1000" >
                                        Provide excellent customer service by addressing inquiries, resolving issues promptly, and ensuring a smooth purchasing experience. Foster long-term relationships with customers through loyalty programs, exclusive offers, and personalized communication.
                                    </div>
                                </div>
                                <div className="group flex flex-col gap-2  card text-black !pl-8"
                                    tabindex="3">
                                    <div className="flex cursor-pointer items-center justify-between">
                                        <ul className="list-disc cursor-pointer text-xl font-medium">
                                            <li>Performance Analysis</li>
                                        </ul>
                                        <MdKeyboardArrowUp className="h-8 w-8 transition-all duration-500 group-focus:-rotate-180" />
                                    </div>
                                    <div
                                        className="invisible h-auto max-h-0 items-center opacity-0 transition-all group-focus:visible group-focus:max-h-screen group-focus:opacity-100 group-focus:duration-1000" >
                                        Monitor key performance indicators (KPIs) such as sales revenue, inventory turnover, and customer acquisition cost to evaluate the effectiveness of your product management strategies.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 lg:h-[420px] mt-10 overflow-hidden">
                            <img src="https://i.ibb.co/1bS7hSz/managment.webp" alt="manage-image" className="w-full h-full hover:scale-105 transition-all duration-500 cursor-pointer" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageProductAdmin;