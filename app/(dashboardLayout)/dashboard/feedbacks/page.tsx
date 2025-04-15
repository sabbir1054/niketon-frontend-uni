/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import SpinnerOverlay from "@/components/shared/SpinnerOverlay";
import { Card } from "@/components/ui/card";
import { useOwnerAllFeedbackQuery } from "@/redux/api/houseApi";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ManageFeedbacksPage = () => {
  const { data, isLoading } = useOwnerAllFeedbackQuery({});
  const feedbacks = data?.data || [];
  if (isLoading) {
    return <SpinnerOverlay />;
  }
  return (
    <div className="space-y-4">
      {/* Title section */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">
          Manage Feedbacks {`(${feedbacks.length})`}
        </h2>
      </div>

      {/* Feedback Table */}
      <Card className="overflow-x-auto w-full p-4">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2">Tenant</th>
              <th className="px-4 py-2">House</th>
              <th className="px-4 py-2">Rating</th>
              <th className="px-4 py-2">Feedback</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((fb: any) => (
              <tr key={fb?.id} className="border-b hover:bg-gray-50">
                {/* Tenant Info */}
                <td className="px-4 py-3 flex items-center gap-2">
                  <Image
                    src={fb?.tenant?.photo}
                    alt={fb?.tenant?.name}
                    width={32}
                    height={32}
                    className="rounded-full object-cover"
                  />
                  <span>{fb?.tenant?.name}</span>
                </td>

                {/* House Info (Stacked Image and Name) */}
                <td className="px-4 py-3">
                  <div className="flex flex-col items-start gap-1">
                    <Link className="" href={`/houses/${fb?.house?.id}`}>
                      {" "}
                      <span className="text-sm text-blue-800 underline ">
                        {fb?.house?.houseName}
                      </span>
                    </Link>
                  </div>
                </td>

                {/* Rating */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < fb.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                </td>

                {/* Feedback Text */}
                <td className="px-4 py-3 text-gray-700">{fb?.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default ManageFeedbacksPage;
