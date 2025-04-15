/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useGiveFeedbackMutation } from "@/redux/api/houseApi";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import SpinnerOverlay from "../shared/SpinnerOverlay";

export function FeedbackDialog() {
  const [open, setOpen] = useState(false);
  const params = useParams();
  const { register, handleSubmit, setValue, reset } = useForm<any>();
  const [submitFeedback, { isLoading }] = useGiveFeedbackMutation();
  const onSubmit = async (data: any) => {
    console.log(data);

    try {
      const res = await submitFeedback({
        payload: { comment: data?.comment, rating: parseFloat(data?.rating) },
        id: params.id,
      }).unwrap();
      if (res?.success === true) {
        toast.success("Submit feedback");
        window.location.reload();
        reset();
        setOpen(false);
      }
    } catch (err: any) {
      toast.error(err.data.message);
    }
  };
  if (isLoading) {
    return <SpinnerOverlay />;
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="mt-5 w-full">
        <Button variant="outline" className="">
          Write a Feedback
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rate this House</DialogTitle>
          <DialogDescription>
            Your feedback helps us improve the experience.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="rating">Rating</Label>
            <Select onValueChange={(val) => setValue("rating", val)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a rating (1-5)" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} Star{num > 1 && "s"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="comment">Comment</Label>
            <Textarea
              {...register("comment")}
              placeholder="Write your feedback here..."
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
