import { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useLoaderData, useNavigate } from "react-router-dom";
import useFurCategory from "../../../../hooks/useFurCategory";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { imageUpload } from "../../../../api/getData";
import { useAuth } from "../../../../hooks/useAuth";
import { FaSpinner } from "react-icons/fa";
import Loader from "../../../../shared/Loader";
import { MdDeleteForever } from "react-icons/md";
import Button from "../../../../components/button";
import AdminTitle from "../../../../components/title";

const UpdatedProduct = () => {
    const [showImage, setShowImage] = useState('');
    const findUpdataData = useLoaderData();
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [category, , isLoading] = useFurCategory();
    const [showThumbnail1, setShowThumbnail1] = useState('');
    const [showThumbnail2, setShowThumbnail2] = useState('');
    const [imageProperty, setImageProperty] = useState('');
    const [thumb1, setThumb1] = useState('');
    const [thumb2, setThumb2] = useState('');


    // showImageDelete 
    const handleRemoveImage = () => {
        setShowImage('');
    }
    const handleRemoveThumb1 = () => {
        setShowThumbnail1('');
    }
    const handleRemoveThumb2 = () => {
        setShowThumbnail2('');
    }
    // show image load 
    const handleImage = (e) => {
        if (e.target.files && e.target.files[0]) {
            const imageFind = e.target.files[0];
            setImageProperty(imageFind)
            setShowImage(URL.createObjectURL(imageFind));
        }
    }

    // thumbnail functionality is here 
    const handleShowThumb1 = (e) => {
        if (e.target.files && e.target.files[0]) {
            const thumbName1 = e.target.files[0];
            setThumb1(thumbName1)
            setShowThumbnail1(URL.createObjectURL(thumbName1));
        }
    }

    const handleShowThumb2 = (e) => {
        if (e.target.files && e.target.files[0]) {
            const thumbName2 = e.target.files[0];
            setThumb2(thumbName2)
            setShowThumbnail2(URL.createObjectURL(thumbName2));
        }
    }

    if (isLoading) {
        return <Loader />
    }
    const handleAddedProduct = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const product_name = form.product_name.value;
        const description = form.description.value;
        const quantity = form.quantity.value;
        const category = form.category.value;
        const rating = form.rating.value;
        const price = form.product_cost.value;
        const product_prof = form.product_profit.value;
        const product_profit = parseInt(product_prof);
        const discount = form.discount.value;
        const owner_name = user?.displayName;
        const email = user?.email;
        const location = form.location.value;

        try {
            // Determine if new images need to be uploaded
            const loadImage = imageProperty
                ? await imageUpload(imageProperty)
                : { data: { display_url: findUpdataData?.image } };

            const thmbnl1 = thumb1
                ? await imageUpload(thumb1)
                : { data: { display_url: findUpdataData?.thumbnail1 } };

            const thmbnl2 = thumb2
                ? await imageUpload(thumb2)
                : { data: { display_url: findUpdataData?.thumbnail2 } };

            const updatedProducts = {
                title: product_name,
                quantity,
                category,
                rating,
                price,
                image: loadImage?.data?.display_url,
                product_profit,
                thumbnail1: thmbnl1?.data?.display_url,
                thumbnail2: thmbnl2?.data?.display_url,
                discount,
                description,
                location,
                email,
                owner_name
            };

            const res = await axiosSecure.patch(`/updated/${findUpdataData?._id}`, updatedProducts);
            setLoading(false);

            if (res.data?.modifiedCount > 0) {
                Swal.fire({
                    title: "Updated Successfully!",
                    text: "You clicked the button!",
                    icon: "success",
                    timer: 1000
                });
                return navigate('/dashboard/my-product');
            }
        } catch (error) {
            setLoading(false);
            toast.error(error.message);
        }
    };


    return (
        <div>
            {/* <Helmet>
                <title>Product Added | Inventory M</title>
            </Helmet> */}
            <AdminTitle>
                Update Product
            </AdminTitle>
            <div className="container mx-auto mt-12">
                <form onSubmit={handleAddedProduct}>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
                        <div className='space-y-6  card !py-10 h-max'>
                            <div className="flex flex-col md:flex-row lg:flex-row w-full gap-4">
                                <div className='space-y-1 w-full'>
                                    <label htmlFor='location' className=' block text-black font-medium'>
                                        Product Name
                                    </label>
                                    <input className='w-full px-4 py-2 text-gray-800 border rounded-md border-blue-400 ' name='product_name' defaultValue={findUpdataData?.title} id='product_name' type='text' placeholder='Product name' required
                                    />
                                </div>
                                <div className='space-y-1 w-full'>
                                    <label htmlFor='location' className='block  text-black font-medium'>
                                        Location
                                    </label>
                                    <input className='w-full px-4 py-2 text-gray-800 border rounded-md border-blue-400 '
                                        name='location' defaultValue={findUpdataData?.location} id='location' type='text' placeholder='Location' required
                                    />
                                </div>
                            </div>

                            <div className='space-y-1 w-full'>
                                <label htmlFor='location' className='block text-black font-medium'>
                                    Image
                                </label>
                                <div className=' w-full text-black bg-white m-auto rounded-lg'>
                                    {
                                        showImage
                                            ?
                                            <div className='relative'>
                                                <img src={showImage} alt="imageShow" className='w-full h-32' /> <span onClick={handleRemoveImage} className='absolute rounded-full -top-3 -right-6 cursor-pointer'><MdDeleteForever className='text-5xl text-red-500' />
                                                </span>
                                            </div>
                                            :
                                            <input onChange={handleImage} type='file' name='image' id='image' accept='image/*' className="file-input w-full file-input-info focus:border-none bg-transparent" placeholder='choose your image.....' />
                                    }
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row lg:flex-row w-full gap-4">
                                <div className='space-y-1 w-full'>
                                    <label htmlFor='location' className='block text-black font-medium'>
                                        Set Thumbnail1
                                    </label>
                                    <div className=' bg-white w-full m-auto text-black rounded-lg'>
                                        {
                                            showThumbnail1
                                                ?
                                                <div className="relative">
                                                    <img src={showThumbnail1} alt="imageShow" className='w-full h-32' /><span onClick={handleRemoveThumb1} className='absolute rounded-full -top-3 -right-6 cursor-pointer'><MdDeleteForever className='text-3xl text-red-500' /></span>
                                                </div>
                                                :
                                                <input onChange={handleShowThumb1} type='file' name='thumbnail1' id='thumbnail1' accept='image/*' className="file-input w-full file-input-info focus:border-none bg-white" />
                                        }
                                    </div>
                                </div>
                                <div className='space-y-1 w-full'>
                                    <label htmlFor='location' className='block text-black font-medium'>
                                        Set Thumbnail2
                                    </label>
                                    <div className=' bg-white w-full m-auto rounded-lg'>
                                        <label className="my-5"></label>
                                        <div className=' bg-white text-black w-full m-auto rounded-lg'>
                                            {
                                                showThumbnail2 ? <div className="relative">
                                                    <img src={showThumbnail2} defaultValue={findUpdataData?.thumb2} alt="imageShow" className='w-full h-32' /><span onClick={handleRemoveThumb2} className='absolute rounded-full -top-3 -right-6 cursor-pointer'><MdDeleteForever className='text-3xl text-red-500' />
                                                    </span>
                                                </div>
                                                    :
                                                    <input onChange={handleShowThumb2} defaultValue={findUpdataData?.thumb2} type='file' name='thumbnail2' id='thumbnail2' accept='image/*' className="file-input w-full file-input-info focus:border-none bg-white " />
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row lg:flex-row w-full gap-4">
                                <div className='space-y-1 w-full'>
                                    <label htmlFor='location' className='block  text-black font-medium'>
                                        Quantity
                                    </label>
                                    <input className='w-full px-4 py-2 text-gray-800 border rounded-md border-blue-400 ' name='quantity' defaultValue={findUpdataData?.quantity} id='quantity' type='number' placeholder='Enter quantiey' required
                                    />
                                </div>
                                <div className='space-y-1 w-full'>
                                    <label htmlFor='location' className='block text-black font-medium'>
                                        Product Price
                                    </label>
                                    <input className='w-full px-4 py-2 text-gray-800 border rounded-md border-blue-400 ' name='product_cost' defaultValue={findUpdataData?.price} id='product_cost' type='number' placeholder='Product Cost' required
                                    />
                                </div>
                            </div>
                        </div>


                        <div className='space-y-6 card !py-10 h-max'>
                            <div className="flex flex-col md:flex-row lg:flex-row w-full gap-4">
                                <div className='space-y-1 w-full'>
                                    <label htmlFor='location' className='block text-black font-medium'>
                                        Category
                                    </label>
                                    <select name="category" id="category" defaultValue={findUpdataData?.category} className=" w-full text-black max-w-xs border rounded-md border-blue-400">
                                        <option disabled selected required>{findUpdataData?.category}</option>
                                        {
                                            category?.length > 0 && category.map(categ => <option key={categ?._id} required>
                                                {categ?.category}
                                            </option>)
                                        }
                                    </select>
                                </div>
                                <div className='space-y-1 w-full'>
                                    <label htmlFor='location' className='block text-black font-medium'>
                                        Rating
                                    </label>
                                    <input className='w-full px-4 py-2 text-gray-800 border rounded-md border-blue-400 ' name='rating' defaultValue={findUpdataData?.rating} id='rating' type='number' placeholder='Product Cost' required
                                    />
                                </div>
                            </div>
                            <div className='space-y-1'>
                                <label htmlFor='description' className='block font-medium'>
                                    Description
                                </label>
                                <textarea id='description' className='block focus:rose-300 w-full h-32 px-4 py-3 text-gray-800  border rounded-md border-blue-400  ' name='description' defaultValue={findUpdataData?.description} placeholder="Write description"
                                ></textarea>
                            </div>
                            <div className="flex flex-col md:flex-row lg:flex-row w-full gap-4">
                                <div className='space-y-1 w-full'>
                                    <label htmlFor='location' className='block text-black font-medium'>
                                        Product Profit
                                    </label>
                                    <input className='w-full px-4 py-2 text-gray-800 border rounded-md border-blue-400 ' name='product_profit' defaultValue={findUpdataData?.product_profit} id='product_profit' type='number' placeholder='Product Profit' required
                                    />
                                </div>
                                <div className='space-y-1 w-full'>
                                    <label htmlFor='location' className='block text-black font-medium'>
                                        Discount %
                                    </label>
                                    <input className='w-full px-4 py-2 text-gray-800 border rounded-md border-blue-400 ' name='discount' defaultValue={findUpdataData?.discount} id='discount' type='number' placeholder='Discount %' required
                                    />
                                </div>
                            </div>
                            <Button className="custom-bg-color py-2 px-4 hover-custom-bg-color !w-full" >
                                {loading ? (
                                    <span className='flex items-center justify-center gap-3'> <FaSpinner className='m-auto animate-spin' size={24} /> Processing....</span>
                                ) : (
                                    'Update Product'
                                )}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdatedProduct;