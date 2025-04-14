/* eslint-disable @typescript-eslint/no-unused-vars */
import { authKey } from "@/constance/authKey";
import { useUpdateRequestStatusMutation } from "@/redux/api/requestApi";
import { getUserRoleFromLocal } from "@/utils/AuthServices";
import { getFromLocalStorage } from "@/utils/localStorage";
import { CircleX } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";

/* eslint-disable @typescript-eslint/no-explicit-any */
const RequestSingleRow = ({ request }: any) => {
  const token = getFromLocalStorage(authKey);
  const user = getUserRoleFromLocal(token as string);
  const [updateStatus, { isLoading }] = useUpdateRequestStatusMutation();
  const handleUpdateStatus = async (status: string) => {
    const payload = { status: status };
    try {
      const res = await updateStatus({
        id: request?.id,
        payload: { ...payload },
      }).unwrap();
      if (res?.success === true) {
        toast.success("Status updated");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <tr key={request.id}>
      <td className="py-3 px-4 border-b">{request.house.houseName}</td>
      <td className="py-3 px-4 border-b">{request.owner.name}</td>
      <td className="py-3 px-4 border-b">{request.requestStatus}</td>

      <td className="py-3 px-4 border-b">
        {new Date(request.createdAt).toLocaleDateString()}
      </td>
      <td className="py-3 px-4 border-b">
        <Button
          onClick={() => handleUpdateStatus("CANCEL")}
          className="bg-red-500 cursor-pointer hover:bg-red-600"
        >
          <CircleX /> Cancel
        </Button>
      </td>
    </tr>
  );
};

export default RequestSingleRow;
