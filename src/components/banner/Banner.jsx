import Lottie from "lottie-react";
import { MdOutlineExplore, MdOutlineReadMore } from "react-icons/md";
import banner from "../../assets/image/animat/Animation - 1711627710121.json";
import Button from "../button";

const Banner = () => {
    return (
        <div className="w-full lg:h-screen h-auto bg-[url('https://i.ibb.co/wh2Vr39/banner5.gif')] bg-no-repeat bg-cover">
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70 "></div>
            <div className="flex items-center justify-center pt-32 flex-col lg:flex-row gap-12 lg:px-24 p-5">
                <div className="w-full lg:w-1/2 flex items-start justify-center flex-col z-10">
                    <h1 data-aos="fade-right" className="font-extrabold text-2xl md:text-5xl lg:text-5xl !leading-normal text-start">
                        Explopre Our New Furniture Collections.....<span className="text_gradient">!</span>
                    </h1>
                    <div data-aos="fade-left">
                        <p className="text-start mt-12 text-gray-300">
                            Discover our latest furniture collections: a fusion of style and functionality. Elevate your space with timeless pieces crafted for modern living. Explore sophistication and comfort in every corner of your home. Redefine your interior with our curated selection today.
                        </p>
                        <div className="flex items-center justify-start gap-5 my-10 w-max">
                            <Button className="custom-bg-color py-2 px-4 hover-custom-bg-color !mx-0" icon={MdOutlineReadMore}> Read More </Button>
                            <Button className="custom-bg-color py-2 px-4 hover-custom-bg-color !mx-0" icon={MdOutlineExplore} >Explore</Button>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-1/2 h-auto opacity-90 lg:block hidden overflow-hidden">
                    <Lottie
                        animationData={banner}
                        className="h-[500px] w-full cursor-pointer"
                    ></Lottie>
                </div>
            </div>
        </div>
    );
};

export default Banner;