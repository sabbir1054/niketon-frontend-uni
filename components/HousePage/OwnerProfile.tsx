/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";

const OwnerProfile = ({ user }: any) => {
  return (
    <div>
      <Card className="w-full">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Owners Information
          </h2>
          <div className="flex justify-center">
            <img src={`${user?.photo}`} alt="" className="" srcSet="" />
          </div>
          <div className="space-y-4">
            <div>
              <Label>Name</Label>
              <p className="text-gray-700 border-1 border-gray-300 rounded-md my-1 p-2">
                {user?.name}
              </p>
            </div>
            <div>
              <Label>Email</Label>
              <p className="text-gray-700 border-1 border-gray-300 rounded-md my-1 p-2">
                {user?.email}
              </p>
            </div>
            <div>
              <Label>Phone</Label>
              <p className="text-gray-700 border-1 border-gray-300 rounded-md my-1 p-2">
                {user?.phone}
              </p>
            </div>
            <div>
              <Label>Address</Label>
              <p className="text-gray-700 border-1 border-gray-300 rounded-md my-1 p-2">
                {user?.address}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OwnerProfile;
