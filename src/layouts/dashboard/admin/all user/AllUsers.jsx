import { useState } from "react";
import useAllUsers from "../../../../hooks/useAllUsers";
import ManagerModal from "../all managers/ManagerModal";
import { MdDelete } from "react-icons/md";
import Loader from "../../../../shared/Loader";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const AllUsers = () => {
    const [allUsers, refetch, isLoading] = useAllUsers();
    const [roleData, setRoleData] = useState([]);
    let [isOpen, setIsOpen] = useState(false);
    const axiosSecure = useAxiosSecure();
    refetch();

    const handleRoleChangeForm = async (e) => {
        e.preventDefault();
        const form = e.target;
        const role = form.role.value;
        if(role === 'Change Here'){
           return toast.error("Please select a role !")
        }
        const roleChangeData = {
            email: roleData?.email,
            image: roleData?.image,
            name: roleData?.name,
            role: role,
            status: roleData?.status

        }

        console.log(roleChangeData);
        try {
            await axiosSecure.patch(`/`)
                .then(res => {
                    console.log(res.data);
                    setIsOpen(false)
                })
        }
        catch (error) {
            toast.error(error.message)
        }

    }
    const handleRoleChange = async (id) => {
        setIsOpen(true)
        const findRole = allUsers?.find(user => user?._id === id);
        setRoleData(findRole);
    }

    if (isLoading) {
        return <Loader />
    }
    return (
        <div>
            <ManagerModal isOpen={isOpen} setIsOpen={setIsOpen}>
                <div>
                    <form onSubmit={handleRoleChangeForm} className="flex items-center justify-center gap-5 flex-col ">
                        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#0939e9] to-[#ff0fdb] hover:text-purple-500 text-xl cursor-pointer font-bold">Role Change</h1>
                        <select name="role" id="role" className=" rounded-md">
                            <option selected disabled>Change Here</option>
                            <option value='admin'>Admin</option>
                            <option value='manager'>Manager</option>
                            <option value='guest'>Guest</option>
                        </select>
                        <button className="btn bg-gradient-to-r from-[#0939e9] to-[#ff0fdb] text-white hover:text-black">Change</button>
                    </form>
                </div>
            </ManagerModal>
            <h1 className="text-3xl text-center font-bold my-5 text-transparent bg-clip-text bg-gradient-to-r from-[#0939e9] to-[#ff0fdb]">All Users</h1>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr className="text-xl">
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Change Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allUsers?.length > 0 && allUsers?.map((user, index) => <tr key={user?._id}>
                                <th>{index + 1}</th>
                                <td>{user?.name}</td>
                                <td>{user?.email}</td>
                                <td><span className=" bg-gradient-to-r from-[#0939e9] to-[#ff0fdb] text-white px-3 py-2 rounded-full">{user?.role}</span></td>
                                <td onClick={() => handleRoleChange(user?._id)}><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0939e9] to-[#ff0fdb] hover:text-purple-500 link-hover cursor-pointer font-bold">Click Here</span></td>
                                <td><span><MdDelete className="text-red-500 hover:text-red-500 hover:bg-transparent cursor-pointer text-3xl" /></span></td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;