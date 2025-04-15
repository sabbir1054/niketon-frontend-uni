"use client";
import MonthlyRequestBarChart from "@/components/modules/MonthlyRequestBarCharts";
import SpinnerOverlay from "@/components/shared/SpinnerOverlay";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useOwnerDashboardQuery } from "@/redux/api/userApi";
import { Separator } from "@radix-ui/react-dropdown-menu";
const chartData = [
  { month: "Jan", received: 80, accepted: 16, rejected: 12 },
  { month: "Feb", received: 112, accepted: 37, rejected: 30 },
  { month: "Mar", received: 84, accepted: 50, rejected: 20 },
  { month: "Apr", received: 15, accepted: 10, rejected: 1 },
  { month: "May", received: 9, accepted: 6, rejected: 2 },
  { month: "June", received: 9, accepted: 64, rejected: 2 },
  { month: "July", received: 94, accepted: 67, rejected: 62 },
  { month: "August", received: 92, accepted: 63, rejected: 12 },
  { month: "September", received: 98, accepted: 67, rejected: 82 },
  { month: "October", received: 29, accepted: 61, rejected: 92 },
  { month: "November", received: 23, accepted: 65, rejected: 22 },
  { month: "December", received: 12, accepted: 4, rejected: 8 },
];

const DashboardPage = () => {
  const { data, isLoading } = useOwnerDashboardQuery({});
  if (isLoading) {
    return <SpinnerOverlay />;
  }
  console.log(data);

  return (
    <div className="min-h-screen my-10">
      <Label className="mb-5 mt-7 text-lg">Houses Info</Label>
      <Separator />
      <div className="grid grid-cols-1 md:grid-cols-4 mt-5 gap-5">
        <Card>
          <CardContent className="text-center">
            <h4>{data?.data?.totalHouses || 0}</h4>
            <p>Total Houses</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center">
            <h4>{data?.data?.availableHouses || 0}</h4>
            <p>Empty House</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center">
            <h4>{data?.data?.bookedHouses || 0}</h4>
            <p>Booked House</p>
          </CardContent>
        </Card>
      </div>
      <Label className="mb-5 mt-7 text-lg">Booking request Info</Label>
      <Separator />
      <div className="grid grid-cols-1 md:grid-cols-4 mt-5 gap-5">
        <Card>
          <CardContent className="text-center">
            <h4>
              {parseInt(data?.data?.requestStatusSummary?.PENDING) +
                parseInt(data?.data?.requestStatusSummary?.ACCEPTED) +
                parseInt(data?.data?.requestStatusSummary?.CANCEL) || 0}
            </h4>
            <p>Total Request</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center">
            <h4>{data?.data?.requestStatusSummary?.PENDING || 0}</h4>
            <p>Pending Request</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center">
            <h4>{data?.data?.requestStatusSummary?.ACCEPTED || 0}</h4>
            <p>Accepted Request</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center">
            <h4>{data?.data?.requestStatusSummary?.CANCEL || 0}</h4>
            <p>Canceled Request</p>
          </CardContent>
        </Card>
      </div>
      <Label className="mb-5 mt-7 text-lg">Total Feedback</Label>
      <Separator />
      <div className="grid grid-cols-1 md:grid-cols-4 mt-5 gap-5">
        <Card>
          <CardContent className="text-center">
            <h4>{data?.data?.totalFeedbacks}</h4>
            <p>Total Feedback</p>
          </CardContent>
        </Card>
      </div>
      <Label className="mb-5 mt-7 text-lg">Tracker</Label>
      <Separator />
      <MonthlyRequestBarChart data={chartData} />
    </div>
  );
};

export default DashboardPage;
