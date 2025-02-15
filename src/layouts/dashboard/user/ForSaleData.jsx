/* eslint-disable react/prop-types */
import { RxCross1 } from "react-icons/rx";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const ForSaleData = ({ sale, refetch }) => {
    const axiosSecure = useAxiosSecure();
    const handleDelete = (id) => {
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
                axiosSecure.delete(`/sale/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: `${sale?.title} has been deleted.`,
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }
    return (
        <div>
            <div className='grid grid-cols-3 justify-between items-center gap-3'>
                <figure className='flex flex-col items-center justify-center mt-2 w-full h-24'>
                    <img src={sale?.image} className='w-full h-full' alt="sale-image" />
                </figure>
                <div className='flex flex-col items-center justify-center gap-1'>
                    <h1>{sale?.title}</h1>
                    <p className='text-[17px] font-medium '>Price: $ {sale?.price}</p>
                </div>
                <div className='flex flex-col items-center justify-center '>
                    <button onClick={() => handleDelete(sale?._id)} className='btn btn-sm bg-red-600  text-white'><RxCross1 className='text-3xl p-1' /></button>
                </div>
            </div>
        </div>
    );
};

export default ForSaleData;