import { FcBusinessman } from "react-icons/fc";
import useRole from '../../../hooks/useRole';
import toast from 'react-hot-toast';
import { FiLoader } from "react-icons/fi";
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { imageUpload } from '../../../api/getData';
import { useState } from "react";
import { updateProfile } from "firebase/auth";
import auth from './../../../provider/firebase/firebase.config';
import { MdDeleteForever } from "react-icons/md";
import Button from "../../../components/button";

const Setting = () => {
    const [users, refetch,] = useRole();
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);
    const [showImage, setShowImage] = useState('');
    const [imageProperty, setImageProperty] = useState('');

    // showImageDelete 
    const handleRemoveImage = () => {
        setShowImage('');
    }
    // show image load 
    const handleImage = (e) => {
        if (e.target.files && e.target.files[0]) {
            const imageFind = e.target.files[0];
            setImageProperty(imageFind)
            setShowImage(URL.createObjectURL(imageFind));
        }
    }
    // console.log(users);
    const updataUserProfile = (name, photo) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const status = form.status.value;

        try {
            const loadImage = await imageUpload(imageProperty);
            const photo = loadImage?.data?.display_url;
            const changeData = {
                name,
                email,
                image: photo,
                status,
            }
            await axiosSecure.put(`/user/${users?._id}`, changeData)
                .then(res => {
                    if (res.data?.modifiedCount > 0) {
                        refetch()
                        toast.success('Profile updated successfully')
                        return updataUserProfile(name, photo)
                            .then(() => {
                                setShowImage('')
                                setLoading(false)
                            })
                            .catch((error) => { console.log(error.message) })
                    }
                    setLoading(false)
                })
        }
        catch (error) {
            setLoading(false)
            toast.error('Please Choose file or select Image!');
        }
    }
    return (
        <div className='mb-12'>
            <div className="bg-[url('https://i.ibb.co/grk28gT/settng.gif')] w-full h-[60vh] bg-cover bg-no-repeat object-cover relative">
                <figure className='w-[250px] h-[250px] rounded-full absolute top-1/3 translate-y-[-50px] left-[25%] md:left-1/3 lg:left-[42%] border-4 border-fuchsia-500 cursor-pointer opacity-100 z-[1] hover:border-blue-700'>
                    <img src={users?.image} alt="profile_image" className='w-full h-full rounded-full' />
                </figure>
                <div className='bg-black absolute w-full h-full opacity-60 '></div>
            </div>
            <h1 className="text-2xl font-bold text-center flex items-center gap-2 justify-center mt-8"> Settings to Your Profile <FcBusinessman className="w-6 h-6" /></h1>
            <div className='flex flex-col md:flex-row lg:flex-row gap-8 w-full md:w-[90%] lg:w-[70%] mx-auto mt-10'>
                <div className='flex flex-col gap-2 items-center justify-center border py-8 w-full h-[350px] mt-6'>
                    <figure className='w-20 h-20'>
                        <img src={users?.image} alt="profile_image" className='w-full h-full rounded-full' />
                    </figure>
                    <h1 className='font-bold'>Name: {users?.name}</h1>
                    <h1 className='font-bold'>Email: {users?.email}</h1>
                    <h1 className='px-8 py-1 bg-fuchsia-600 text-white rounded-full text-xl font-bold mb-3'>Role: {users?.role}</h1>
                    <h1 className='text-xl font-bold'>Status: {users?.status}</h1>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className='flex flex-col gap-2 items-start justify-center border py-8 text-xl px-3 md:px-4 lg:px-7 w-full h-auto mb-20'
                >
                    <label>Name*</label>
                    <input
                        type="text"
                        name='name'
                        defaultValue={users?.name}
                        className="input input-bordered input-info w-full bg-white text-black" required
                    />
                    <label>Email*</label>
                    <input
                        type="text"
                        name='email'
                        disabled
                        defaultValue={users?.email}
                        className="input input-bordered input-info w-full disabled:bg-white text-black disabled:text-black"
                        required
                    />
                    <div className="w-full space-y-2">
                        <h1 className='text-xl mb-2 text-start'>Profile Photo</h1>
                        <div className="w-full">
                            {
                                showImage ?
                                    <div className='relative'>
                                        <img src={showImage} alt="imageShow" className='w-full h-44' />
                                        <span onClick={handleRemoveImage} className='absolute rounded-full -top-3 -right-6 cursor-pointer'>
                                            <MdDeleteForever className='text-5xl text-red-500' />
                                        </span>
                                    </div>
                                    :
                                    <input
                                        onChange={handleImage}
                                        type='file'
                                        name='image'
                                        id='image'
                                        accept='image/*'
                                        className="file-input w-full file-input-info focus:border-none bg-transparent rounded-md"
                                        placeholder='choose your image.....'
                                        required
                                    />
                            }
                        </div>
                    </div>
                    <label>Status*</label>
                    <input
                        type="text"
                        name='status'
                        defaultValue={users?.status}
                        className="input input-bordered input-info w-full bg-white text-black mb-6"
                        required
                    />
                    <Button className="custom-bg-color py-2 px-4 hover-custom-bg-color !w-full" >
                        {
                            loading === true ? <div className="text-[17px] flex items-center gap-2 !w-full">
                                <FiLoader className="w-6 h-6 animate-spin" /> processing
                            </div> : 'Save Chnages'
                        }
                    </Button>

                </form>
            </div>
        </div>
    );
};

export default Setting;