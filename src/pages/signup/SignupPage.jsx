import { Link, useLocation, useNavigate } from 'react-router-dom';
import loginImage from '../../assets/image/authentication/undraw_secure_files_re_6vdh.svg'
import Container from '../../shared/container/Container';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import { imageUpload } from '../../api/getData';
import toast from 'react-hot-toast';
import SocialAccount from '../../shared/socialAccount/SocialAccount';
import { useState } from 'react';
import { FaSpinner, FaRegEye, FaEyeSlash } from 'react-icons/fa';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { MdDeleteForever } from 'react-icons/md';
import Button from './../../components/button/index';

const SignupPage = () => {
    const axiosPbulic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showImage, setShowImage] = useState('');
    const { createUser, updataUserProfile, googleSignIn } = useAuth();
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [imageProperty, setImageProperty] = useState("");



    const handleSignIn = async (data) => {
        setLoading(true)
        // const imageFile = data?.image[0];
        // console.log('image file is here----->', imageFile)
        const loadImage = await imageUpload(imageProperty)
        const image = loadImage?.data?.display_url;
        console.log('this image component---->', image)
        console.log('load image is---->', loadImage)
        await createUser(data?.email, data?.password)
            .then(res => {
                updataUserProfile(data?.name, image)
                    .then(() => {
                        const userInfo = {
                            name: data?.name,
                            email: data?.email,
                            image,
                            role: 'guest',
                            status: 'Verified',
                        };
                        axiosPbulic.post('/users', userInfo)
                            .then(res => {
                                console.log(res.data);
                            })
                            .catch(error => console.log(error));
                    })
                    .catch(err => toast.error(err.message));

                if (res.user) {
                    setLoading(false)
                    navigate(location.state ? location?.state : '/')
                    return toast.success('Login Successfull...!');
                }
            })
            .catch(error => toast.error(error.message));

    }
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }
    const handleGoogleSignIn = async () => {
        setLoading(true)
        await googleSignIn()
            .then(res => {
                if (res.user) {
                    const userInfo = {
                        name: res.user.displayName,
                        email: res.user.email,
                        image: res.user.photoURL,
                        role: 'guest',
                        status: 'Verified',
                    };
                    axiosPbulic.post('/users', userInfo)
                        .then(res => {
                            console.log(res.data);
                        })
                        .catch(error => {
                            setLoading(false);
                            toast.error(error.message)
                        })
                    navigate(location.state ? location?.state : '/');
                    return toast.success('Login Successfull...!');
                }
            })
            .catch(error => toast.error(error.message))
    }
    // showImageDelete 
    const handleRemoveImage = () => {
        setShowImage('');
    }
    // show image load 
    const handleImage = (e) => {
        if (e.target.files && e.target.files[0]) {
            const imageFind = e.target.files[0];
            setImageProperty(imageFind)
            console.log('image file show here', imageFind)
            setShowImage(URL.createObjectURL(imageFind));
        }
    }

    return (
        <div className="bg-[url('https://i.postimg.cc/RFDMMbwn/bg-image1.jpg')] w-full min-h-screen bg-cover bg-no-repeat ">
            <Container>
                <div className="container mx-auto dark:text-white mb-12 flex flex-col lg:flex-row items-center justify-center gap-5">
                    <div className="w-full lg:w-3/5 min-h-[70vh] bg-no-repeat bg-center bg-cover flex items-center justify-center p-5 rounded-md">
                        <img src={loginImage} alt="" />
                    </div>
                    <div className="card-body p-0 lg:p-8 m-5 w-full lg:w-1/2 min-h-[70vh] text-white bg-gray-700/50 backdrop-blur-md pb-8 ">
                        <form onSubmit={handleSubmit(handleSignIn)} className="p-5 space-y-3 text-gray-200">
                            <h1 className="text-3xl font-bold mb-12 text-center text-white">Register Now</h1>
                            <div className="space-y-3">
                                <label className="text-[18px]  font-medium">Username </label>
                                <input type="text"  {...register("name", { required: true })} name="name" className="bg-transparent px-4 py-3 text-gray-200 w-full border rounded-md border-blue-400 mb-2" id="" placeholder="Enter your name...." />
                                {errors.name && <span className="text-red-500 mt-2">name is required!</span>}
                            </div>
                            <div className="space-y-3">
                                <label className="text-[18px]  font-medium">Email Address</label>
                                <input type="email"  {...register("email", { required: true })} name="email" className="bg-transparent px-4 py-3 text-gray-200 w-full border rounded-md border-blue-400 mb-1" id="" placeholder="Enter your username or address" />
                                {errors.email && <span className="text-red-500 mt-1">email is required!</span>}
                            </div>
                            <div className="space-y-3 relative">
                                <label className="text-[18px] font-medium">Password</label>
                                <input type={`${showPassword ? "text" : "password"}`}  {...register("password", {
                                    required: true, minLength: 6,
                                    pattern: /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/
                                })} name="password" className="bg-transparent px-4 py-3 text-gray-200 w-full border rounded-md border-blue-400 relative" id="" placeholder="Enter your password" />
                                {errors.password?.type === "minLength" && <span className="text-red-600">password length must be 6 characters or longer!</span>}
                                {errors.password?.type === 'pattern' && <span className="text-red-600">password must have one uppercase one lowercase one number and one special character!</span>}
                                {errors.password?.type === "required" && (
                                    <p className="text-red-600 !m-0">password is required!</p>
                                )}
                                <span onClick={handleShowPassword} className='absolute top-10 right-2 cursor-pointer'>{
                                    showPassword ?
                                        <FaRegEye className='text-2xl text-white' />
                                        :
                                        <FaEyeSlash className='text-2xl text-white' />
                                }</span>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[18px]  font-medium">Set Your Profile Picture</label>
                                {/* <input type="file"  {...register("image", { required: true })} name="image" className="file-input file-input-bordered file-input-info w-full bordermb-1 bg-transparent" id="" /> */}
                                {errors.image && <span className="text-red-500 mt-1">image is required!</span>}
                                {
                                    showImage ?
                                        <div className='relative'>
                                            <img src={showImage} alt="imageShow" className='w-full h-44' />
                                            <span onClick={handleRemoveImage} className='absolute rounded-full -top-3 -right-6 cursor-pointer'><MdDeleteForever className='text-5xl text-red-500' />
                                            </span>
                                        </div>
                                        :

                                        <input onChange={handleImage} type='file' name='image' id='image' accept='image/*' className="file-input w-full file-input-info focus:border-none bg-transparent" placeholder='choose your image.....' />
                                }
                            </div>
                            <p className="text-base font-medium my-8"> have an account?{' '} Please <Link to='/login' className="text-blue-500 text-lg underline">Sign In</Link></p>
                            <Button className="custom-bg-color py-2 px-4 hover-custom-bg-color !w-full">
                                {loading ? (
                                    <span className='flex items-center justify-center gap-3'> <FaSpinner className='m-auto animate-spin' size={24} /> Processing....</span>
                                ) : (
                                    'Sign Up'
                                )}
                            </Button>
                        </form>
                        <div className="w-[90%] md:w-2/3 lg:w-[80%] mx-auto pb-6">
                            <div className="divider divide-x-0 divider-primary text-2xl">Or</div>
                            <div className="space-y-3 mt-6 w-full">
                                <SocialAccount handleGoogleSignIn={handleGoogleSignIn} name={'Sign in With Google'} />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>

    );
};

export default SignupPage;