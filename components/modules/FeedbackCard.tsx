/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";

export const FeedbackCard = ({ feedback }: any) => {
  const { rating, comment, tenant } = feedback;

  return (
    <Card className="w-full rounded-lg shadow-xs bg-white p-6 flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden border">
          <Image
            src={tenant.photo}
            alt={tenant.name}
            width={48}
            height={48}
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <p className="font-semibold text-base">{tenant.name}</p>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={
                  i < rating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
          </div>
        </div>
      </div>
      <CardContent className="px-0 text-sm text-gray-700">
        <p className="border-l-5 border-primary p-2 bg-secondary rounded-md text-lg">
          {comment}
        </p>
      </CardContent>
    </Card>
  );
};
