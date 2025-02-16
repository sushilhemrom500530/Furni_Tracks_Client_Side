import SubDetails from "../../../pages/sub-furniture-home/furni details/SubDetails";
import createImage from '../../../assets/image/banner2.gif'
import FooterPage from "../../../pages/footer/FooterPage";
import { Link } from "react-router-dom";
import AdminTitle from "../../../components/title";
import Button from "../../../components/button";

const Promotion = () => {
    return (
        <div className="mt-8">
            <AdminTitle className="text-center w-full leading-normal lg:w-[560px]  mx-auto">
                Do You Want to Sell Your Product? Upgrade Now🎉<Link to='/dashboard/create-shop'> <button className="animate animate-pulse text-fuchsia-600">Click Here</button></Link>
            </AdminTitle>
            <h1 className="text-2xl font-bold text-center flex items-center gap-2 justify-center flex-col md:flex-row mb-8"></h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="w-full h-[550px]">
                    <img src={createImage} className="w-full h-full" alt="image" />
                </div>
                <div className="space-y-3">
                    <div>
                        <h1 className="text-3xl text-start">Show Your Benifits for Create Shop!</h1>
                        <ul className="list-disc ml-5">
                            <li>Real-Time Updates</li>
                            <li>Reduced Loss and Theft</li>
                            <li>Improved Customer Service</li>
                            <li>Data Analytics</li>
                            <li>Optimized Supply Chain</li>
                        </ul>
                    </div>
                    <div>
                        <h1 className="text-3xl text-start ">Other Benifits</h1>
                        <ul className="list-disc ml-5">
                            <li>Seasonal Promotions</li>
                            <li>Customization Discount</li>
                            <li>Volume Purchase Discount</li>
                            <li>Upgrade Discount</li>
                            <li>Early Adopter Discount</li>
                        </ul>
                    </div>
                    <div>
                        <h1 className="text-3xl text-start">Summary....</h1>
                        <p>
                            Elevate your furniture business with Furni-Track! Enjoy a limited-time 20% launch discount on our cutting-edge inventory management system.
                            Boost efficiency and save with Furni-Track. Sign up for a free 14-day trial to experience seamless furniture inventory management firsthand.
                            Spring into efficiency with Furni-Track! Subscribe now and receive a special seasonal discount. Streamline your processes and maximize productivity.
                        </p>
                        <Link to='/dashboard/create-shop'>
                            <Button className="custom-bg-color py-2 px-4 hover-custom-bg-color !mx-0" >
                                Upgrade Now🎉
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
            <SubDetails />
            <FooterPage />
        </div>
    );
};

export default Promotion;