import { MdDelete } from "react-icons/md";
import useAllSale from "../../../../hooks/useAllSale";
import Loader from "../../../../shared/Loader";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import AdminTitle from "../../../../components/title";
import Button from "../../../../components/button";

const SaleSummaryAdmin = () => {
    const [allSales, refetch, isLoading] = useAllSale();
    const axiosSecure = useAxiosSecure();

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Remove"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/all-sale/${id}`)
                    .then(res => {
                        if (res?.data?.deletedCount > 0)
                            refetch();
                        toast.success('Removed successfully!');
                    })
            }
        });
    }


    if (isLoading) {
        return <Loader />
    }
    return (
        <div className="mb-20">
            <AdminTitle>
                Sale Summary Product
            </AdminTitle>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr className="text-xl text-white border custom-bg-color">
                            <th></th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Email</th>
                            <th>Price</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allSales?.length > 0 &&
                            allSales.map((sale, index) => (
                                <tr
                                    key={sale?._id}
                                    className="text-[18px] border border-gray-300"
                                >
                                    <th className="border border-gray-300">
                                        {index + 1}
                                    </th>
                                    <td className="border border-gray-300">
                                        <img
                                            src={sale?.image}
                                            alt="product_image"
                                            className="w-20 h-12 rounded-md"
                                        />
                                    </td>
                                    <td className="border border-gray-300">
                                        {sale?.title}
                                    </td>
                                    <td className="border border-gray-300">
                                        <span>{sale?.email}</span>
                                    </td>
                                    <td className="border border-gray-300">
                                        <span>$ {sale?.price}</span>
                                    </td>
                                    <td className="border border-gray-300">
                                        <Button onClick={() => handleDelete(sale?._id)} icon={MdDelete}></Button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SaleSummaryAdmin;