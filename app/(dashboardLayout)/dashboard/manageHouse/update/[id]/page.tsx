"use client";
import UpdateHouseForm from "@/components/Forms/UpdateHouseForm";
import { useParams } from "next/navigation";

const AddHousePage = () => {
  const params = useParams();
  return (
    <div className="container mx-auto">
      <div className="my-10 ">
        <UpdateHouseForm houseId={params?.id} />
      </div>
    </div>
  );
};

export default AddHousePage;
