import AdminTitle from "../../../../components/title";
import useFurnitures from "../../../../hooks/useFurnitures";
import RelatedCard from "../../../../pages/sub-furniture-home/furni details/RelatedCard";
import Loader from "../../../../shared/Loader";

const ManageProduct = () => {
    const [furnitures, refetch, isLoading] = useFurnitures();
    refetch();
    if (isLoading) {
        return <Loader />
    }
    return (
        <div className="w-full h-auto mb-10">
            <AdminTitle>
                Manage Products
            </AdminTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 mt-2 gap-5">
                {
                    furnitures?.length > 0 && furnitures?.slice(0, 15)?.map(furniture => <RelatedCard
                        key={furniture?._id}
                        furniture={furniture}
                    />)
                }
            </div>
        </div>
    );
};

export default ManageProduct;