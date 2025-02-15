import { MdDelete } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useFurnitures from './../../../../hooks/useFurnitures';
import Loader from "../../../../shared/Loader";
import SpecificData from "./SpecificData";
import Button from "../../../../components/button";
import AdminTitle from "../../../../components/title";


const AllProducts = () => {
    const axiosSecure = useAxiosSecure();
    const [furnitures, refetch, isLoading] = useFurnitures();
    let [isOpen, setIsOpen] = useState(false);
    const [searchFurniture, setSearchFurniture] = useState("");
    const [filteredItems, setFilteredItems] = useState(furnitures);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);
    const [findData, setFindData] = useState([]);

    useEffect(() => {
        const filtered = furnitures.filter((item) => item.title.toLowerCase().includes(searchFurniture.toLowerCase()));
        setFilteredItems(filtered);
        setCurrentPage(1);
    }, [searchFurniture, furnitures]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems?.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (isLoading) {
        return <Loader />
    }

    const handleProductDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/furniture/${id}`)
                refetch()
                    .then(() => {
                        toast.success('Deleted successfully!');
                    })
            }
        });
    }
    function openModal() {
        setIsOpen(true)
    }

    function closeModal() {
        setIsOpen(false)
    }
    const handleFindData = (findId) => {
        openModal();
        const currentData = filteredItems?.find(item => item?._id === findId);
        setFindData(currentData)
    }
    return (
        <div className="mb-20">
            <SpecificData isOpen={isOpen} closeModal={closeModal} findData={findData} />
            <div className=" flex items-center justify-between flex-col lg:flex-row">
                <AdminTitle className="lg:!text-start">
                    All Products({furnitures?.length})
                </AdminTitle>
                <form className="w-full h-auto flex items-center justify-center lg:justify-end gap-3">
                    <h1 className="hidden lg:block">Find Product : </h1>
                    <div className="relative">
                        <input type="text" name="search" className="rounded-md relative w-auto h-auto" onChange={() => setSearchFurniture(event.target.value)} id="search" placeholder="Search Here....." />
                        <BsSearch className="absolute top-3 right-2 text-xl text-black" />
                    </div>
                </form>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-12">
                {
                    currentItems?.length > 0 && currentItems?.map(furniture =>
                        <div key={furniture?._id} className="card text-black transition ease-in-out text-2xl text-center w-full h-auto shadow-2xl relative rounded-md mb-10  ">
                            <div className="flex items-center justify-center w-full py-3 -mt-12 group">
                                <figure className="w-32 h-32 group-hover:scale-110 [transition:0.5s]">
                                    <img src={furniture?.image} alt="love-image" className="w-full h-full rounded-full border border-purple-500 cursor-pointer" />
                                </figure>
                            </div>
                            <h3 className="text-xl">{furniture?.title}</h3>
                            <h3 className="text-xl">Price: $ {furniture?.price}</h3>
                            <p className='text-[17px] '>Shop Name: {furniture?.shop_name ? furniture?.shop_name : "Anonymous Shop"}</p>
                            <p className='text-[17px] '>Owner Name: {furniture?.owner_name ? furniture?.owner_name : "Anonymous Owner"}</p>
                            <div className=" grid grid-cols-2 gap-5 p-5">
                                <Button
                                    onClick={() => handleFindData(furniture?._id)}
                                    icon={FaRegEye}>
                                </Button>
                                <Button
                                    onClick={() => handleProductDelete(furniture?._id)}
                                    icon={MdDelete}>
                                </Button>
                            </div>
                        </div>)
                }
            </div>
            <div className="flex justify-center items-center mb-20">
                {Array.from({
                    length: Math.ceil(filteredItems.length / itemsPerPage),
                }).map((_, index) => (
                    <button className={`px-3 py-1 mx-1 rounded-full ${currentPage === index + 1 ? "custom-bg-color text-white hover:text-black" : "hover:shadow-md [transition:0.5s] text-black"
                        }`}
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AllProducts;