import { Link, useLocation, useNavigate } from 'react-router-dom';
import loginImage from '../../assets/image/authentication/undraw_fingerprint_login_re_t71l.svg';
import Container from '../../shared/container/Container';
import SocialAccount from '../../shared/socialAccount/SocialAccount';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { FaEyeSlash, FaRegEye, FaSpinner } from 'react-icons/fa';
import { useState, useRef } from 'react';
import Button from '../../components/button';

const LoginPage = () => {
    const axiosPbulic = useAxiosPublic();
    const { loginUser, googleSignIn } = useAuth();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const emailRef = useRef(null); // Ref for email input
    const passwordRef = useRef(null); // Ref for password input

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        await loginUser(email, password)
            .then(res => {
                if (res.user) {
                    navigate(location?.state ? location?.state : '/');
                    toast.success('Logged in successfully');
                    return setLoading(false);
                }
            })
            .catch(error => {
                setLoading(false);
                toast.error(error.message);
            });
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleGoogleSignIn = () => {
        setLoading(true);
        googleSignIn()
            .then(res => {
                const userInfo = {
                    name: res.user.displayName,
                    email: res.user.email,
                    image: res.user.photoURL,
                    role: 'guest',
                    status: 'Verified',
                };
                axiosPbulic.post('/users', userInfo)
                    .then(() => { })
                    .catch(error => {
                        setLoading(false);
                        toast.error(error.message);
                    });
                navigate(location?.state ? location?.state : '/');
                return toast.success('Login Successfull...!');
            })
            .catch(error => {
                setLoading(false);
                toast.error(error.message);
            });
    };

    const handleAdminLogin = () => {
        if (emailRef.current && passwordRef.current) {
            emailRef.current.value = 'admin@demo.com';
            passwordRef.current.value = '1122AAaa@@';
        }
    };
    const handleManagerLogin = () => {
        if (emailRef.current && passwordRef.current) {
            emailRef.current.value = 'manager@demo.com';
            passwordRef.current.value = '1122AAaa@@';
        }
    };
    const handleGuestLogin = () => {
        if (emailRef.current && passwordRef.current) {
            emailRef.current.value = 'guest@demo.com';
            passwordRef.current.value = '1122AAaa@@';
        }
    };

    return (
        <div className="bg-[url('https://i.postimg.cc/RFDMMbwn/bg-image1.jpg')] w-full min-h-screen bg-cover bg-no-repeat ">
            <Container>
                <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center gap-5 mb-12">
                    <div className="w-full min-h-[70vh] lg:w-3/5 flex items-center justify-center p-5 rounded-md">
                        <img src={loginImage} alt="login-image" />
                    </div>
                    <div className="card-body p-0 lg:p-8 m-5 w-full lg:w-1/2 min-h-[70vh] text-white bg-gray-700/50 backdrop-blur-md">
                        <form onSubmit={handleSubmit} className="p-5 space-y-3">
                            <h1 className="text-3xl font-bold mb-12 text-center">Login Now</h1>
                            <div className="space-y-3">
                                <label className="text-[18px] font-medium">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    ref={emailRef} // Attach ref to email input
                                    className="bg-transparent px-4 py-3 text-gray-200 w-full border rounded-md border-blue-400 mb-1"
                                    placeholder="Enter your username or address..."
                                    required
                                />
                            </div>
                            <div className="space-y-3 relative">
                                <label className="text-[18px] font-medium">Password</label>
                                <input
                                    type={`${showPassword ? 'text' : 'password'}`}
                                    name="password"
                                    ref={passwordRef} // Attach ref to password input
                                    className="bg-transparent px-4 py-3 text-gray-200 w-full border rounded-md border-blue-400"
                                    placeholder="Enter your password..."
                                    required
                                />
                                <span onClick={handleShowPassword} className="absolute top-10 right-2 cursor-pointer">
                                    {showPassword ? (
                                        <FaRegEye className="text-2xl text-white" />
                                    ) : (
                                        <FaEyeSlash className="text-2xl text-white" />
                                    )}
                                </span>
                            </div>
                            <p className="text-base font-medium my-8">
                                Don&apos;t have an account yet?{' '}
                                Please{' '}
                                <Link to="/signup" className="text-blue-500 underline text-lg">
                                    Sign up
                                </Link>
                            </p>
                            <Button className="custom-bg-color py-2 px-4 hover-custom-bg-color !w-full">
                                {loading ? (
                                    <span className='flex items-center justify-center gap-3'> <FaSpinner className='m-auto animate-spin' size={24} /> Processing....</span>
                                ) : (
                                    'Sign in'
                                )}
                            </Button>
                        </form>

                        <div className="flex items-center justify-center gap-5">
                            <button className="btn btn-info" onClick={handleAdminLogin}>Admin Login</button>
                            <button className="btn btn-info" onClick={handleManagerLogin}>Manager Login</button>
                            <button className="btn btn-info" onClick={handleGuestLogin}>
                                Guest Login
                            </button>
                        </div>

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

export default LoginPage;
