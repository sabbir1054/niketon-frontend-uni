/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCreateRequestMutation } from "@/redux/api/requestApi";
import { useState } from "react";
import { toast } from "sonner";
import SpinnerOverlay from "../shared/SpinnerOverlay";

export default function BookingDialog({ data }: any) {
  const [open, setOpen] = useState(false);
  const [sendRequest, { isLoading }] = useCreateRequestMutation();
  const handleSendRequest = async () => {
    try {
      const response = await sendRequest({ houseId: data?.id }).unwrap();
      if (response?.success === true) {
        toast.success("Request send successfully");
        setOpen(false);
        window.location.reload();
      }
    } catch (error: any) {
      toast.error("Something went wrong");
    }
  };
  if (isLoading) {
    <SpinnerOverlay />;
  }
  return (
    <div className="">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="rounded-none  font-medium cursor-pointer w-full p-7 py-5  mb-5 bg-green-500 hover:bg-green-600">
            Send Booking Request Now
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {" "}
              Are you sure you want to send this request?
            </DialogTitle>
          </DialogHeader>

          <div className="py-4">
            You should pay{" "}
            <span className="text-lg font-medium text-red-500">
              {" "}
              ${data?.minBookingCharge}{" "}
            </span>{" "}
            for Booking Charge
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSendRequest}>Yes, Send Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
