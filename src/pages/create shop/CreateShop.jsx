import { useState } from 'react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { imageUpload } from '../../api/getData';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaSpinner } from 'react-icons/fa';
import { MdAddShoppingCart } from 'react-icons/md';
import Container from '../../shared/container/Container';
import { useAuth } from '../../hooks/useAuth';
import useRole from '../../hooks/useRole';
import { useNavigate } from 'react-router-dom';
import FooterPage from '../footer/FooterPage';
import { MdDeleteForever } from "react-icons/md";
import Button from '../../components/button';

const CreateShop = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [users, ,] = useRole();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [imageName, setImageName] = useState('');
    const [showImage, setShowImage] = useState('');
    const [imageProperty, setImageProperty] = useState('');


    // showImageDelete 
    const handleRemoveImage = () => {
        setImageName('');
        setShowImage('');
    }
    // show image load 
    const handleImage = (e) => {
        if (e.target.files && e.target.files[0]) {
            const imageFind = e.target.files[0];
            setImageProperty(imageFind)
            setImageName(imageFind.name);
            setShowImage(URL.createObjectURL(imageFind));
        }
    }

    const handleCreateShop = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (users?.role === 'manager') {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Your Shop is Existed in!",
            });
            return setLoading(false)
        }
        const form = e.target;
        const shop_name = form.shop_name.value;
        const description = form.description.value;
        const location = form.location.value;
        try {
            const loadImage = await imageUpload(imageProperty);
            const create_shop = {
                shop_name,
                shop_logo: loadImage?.data?.display_url,
                description,
                location,
                image: user?.photoURL,
                owner_name: user?.displayName,
                email: user?.email,
                role: 'manager',
            };
            // console.log(create_shop);
            await axiosSecure.patch('/managers', create_shop)
                .then(res => {
                    // console.log(res.data);
                    if (res.data?.insertedId) {
                        setLoading(false)
                        Swal.fire({
                            title: "Create Successfull!",
                            text: "You clicked the button!",
                            icon: "success",
                            timer: 1000
                        });
                        return navigate('/dashboard/add-product')
                    }
                })
        }
        catch (error) {
            setLoading(false)
            toast.error('Please Choose file or select Image!');
        }
    }
    return (
        <>
            <div className="bg-[url('https://i.postimg.cc/vmSBBBsB/bg-image2.webp')] w-full min-h-screen bg-cover bg-no-repeat pb-12">
                <Container>
                    <div className='lg:w-1/2 w-full bg-gray-700/70 backdrop-blur-md text-gray-200 shadow mx-auto pt-3 px-10 pb-14'>
                        {/* <Helmet>
                <title>Create Shop | Inventory M </title>
            </Helmet> */}
                        <h2 className="text-2xl md:text-5xl lg:text-5xl font-bold text-center text-gray-200 dark:text-gray-200 my-12 flex items-center justify-center gap-2 ">Create a New <span className='text_gradient'>Shop</span> <span className="mr-3 text-5xl text-center">{<MdAddShoppingCart />}</span></h2>
                        <form onSubmit={handleCreateShop}>
                            <div className='grid grid-cols-1 dark:text-gray-200  text-gray-200'>
                                <div className='space-y-6'>
                                    <div className='flex gap-4 items-center justify-center'>
                                        <div className='space-y-2 w-full'>
                                            <label htmlFor='location' className='block text-gray-200 font-medium dark:text-gray-200'>
                                                Your Shop Name
                                            </label>
                                            <input
                                                className=' w-full px-4 py-3  text-gray-200 bg-transparent border rounded-md border-blue-400 '
                                                name='shop_name' id='shop_name' type='text' placeholder='your shop name...' required
                                            />
                                        </div>
                                        <div className='space-y-1 w-full'>
                                            <label htmlFor='location' className='block text-gray-200 font-medium dark:text-gray-200'>
                                                Location
                                            </label>
                                            <input className='w-full px-4 py-3 bg-transparent text-gray-200 border rounded-md  border-blue-400 '
                                                name='location' id='location' type='text' placeholder='Location...' required
                                            />
                                        </div>
                                    </div>
                                    <div className=' py-4 bg-transparent w-full m-auto rounded-lg'>
                                        <label className="block text-gray-200 font-medium dark:text-gray-200"> Shop Logo</label>
                                        <div className='file_upload px-5 py-3 my-5 relative border-4 border-dotted border-gray-300 rounded-lg overflow-hidden'>
                                            {
                                                showImage ? <div className='relative'><img src={showImage} alt="imageShow" className='w-full h-44' /> <span onClick={handleRemoveImage} className='absolute rounded-full -top-3 -right-6 cursor-pointer'><MdDeleteForever className='text-5xl text-red-500' /></span></div> : <input onChange={handleImage} type='file' name='image' id='image' accept='image/*' className="file-input w-full file-input-info focus:border-none bg-transparent" placeholder='choose your image.....' />
                                            }
                                            <p>
                                                {
                                                    imageName && "Upload Image"
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    <div className='space-y-1 '>
                                        <label htmlFor='description' className='block font-medium'>
                                            Description
                                        </label>
                                        <textarea id='description' className='block focus:rose-300 w-full h-32 px-4 py-3 bg-transparent text-gray-200  border rounded-md  border-blue-400 ' name='description' placeholder="Write description...."
                                        ></textarea>
                                    </div>
                                </div>

                                <Button type='submit' className='custom-bg-color hover-custom-bg-color py-3 mt-6 px-4 !w-full text-center' >
                                    {loading ? (
                                        <span className='flex items-center justify-center gap-3'> <FaSpinner className='m-auto animate-spin' size={24} /> Processing....</span>
                                    ) : (
                                        'Create Shop'
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>
                </Container>
            </div>
            <FooterPage />
        </>
    );
};

export default CreateShop;