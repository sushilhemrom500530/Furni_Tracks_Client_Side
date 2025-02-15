import Swal from "sweetalert2";
import useFavorite from "../../../../hooks/useFavorite";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { MdDelete } from "react-icons/md";
import Loader from "../../../../shared/Loader";
import { useAuth } from "../../../../hooks/useAuth";
import toast from "react-hot-toast";
import { BsCartPlus } from "react-icons/bs";
import Button from './../../../../components/button/index';
import AdminTitle from "../../../../components/title";

const FavoriteProduct = () => {
    const [favorites, refetch, isLoading] = useFavorite();
    const { user } = useAuth();
    // console.log(favorites);
    const axiosSecure = useAxiosSecure();
    const handleDelete = ({ id, title }) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/favorite/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            toast.success(`${title} has been deleted.`)
                        }
                    })
            }
        });
    }
    const buyProduct = async (data) => {
        // console.log(data);
        const buyData = {
            furniId: data?._id,
            image: data?.image,
            category: data?.category,
            price: data?.price,
            title: data?.title,
            description: data?.description,
            thumbnail1: data?.thumbnail1,
            thumbnail2: data?.thumbnail2,
            rating: data?.rating,
            quantity: data?.quantity,
            discount: data?.discount,
            email: user?.email
        }
        try {
            await axiosSecure.post('/sales', buyData)
                .then(res => {
                    if (res.data?.insertedId) {
                        Swal.fire({
                            title: "Successfully",
                            text: `${data?.title} added successfully`,
                            icon: "success",
                            timer: 1500
                        });
                        refetch();
                    }
                })
        }
        catch (error) {
            toast.error(error.message)
        }
    }
    if (isLoading) {
        return <Loader />
    }
    return (
        <div>
            <AdminTitle>
                Show Your Favorite Products
            </AdminTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-20">
                {
                    favorites?.map(item =>
                        <div key={item._id} className="text-start card !w-full !h-[310px]  !relative lg:!mb-20 !mb-20 md:!mb-20 !pt-28">
                            <div className="absolute group 2xl:left-[30%] xl:left-[25%] lg:left-[18%] md:left-[30%] left-[28%] -top-12 w-36 h-36 bg-black rounded-full">
                                <img
                                    src={item?.image}
                                    alt="love-image"
                                    className="w-full h-full rounded-full group-hover:scale-105 [transition:0.3s]"
                                />
                            </div>
                            <h3 className="text-xl font-medium ">
                                {item?.title}
                            </h3>
                            <p className='text-sm font-normal text-start my-2'>
                                {item?.description?.slice(0, 60)}
                            </p>
                            <p className='text-base font-medium '>
                                Price: $ {item?.price}
                            </p>
                            <div className="grid grid-cols-2 gap-5 p-5 absolute bottom-0 w-full right-0 left-0">
                                <Button
                                    onClick={() => buyProduct(item)}
                                    className="custom-bg-color py-2 px-4 hover-custom-bg-color !w-full"
                                    icon={BsCartPlus}
                                >

                                </Button>
                                <Button
                                    onClick={() => handleDelete({ id: item?._id, title: item?.title })}
                                    icon={MdDelete}
                                    className="custom-bg-color py-2 px-4 hover-custom-bg-color !w-full"
                                >

                                </Button>
                            </div>
                        </div>)
                }
            </div>
        </div >
    );
};

export default FavoriteProduct;