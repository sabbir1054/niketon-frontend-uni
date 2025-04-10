import MonthlyRequestBarChart from "@/components/modules/MonthlyRequestBarCharts";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@radix-ui/react-dropdown-menu";
const chartData = [
  { month: "Jan", received: 10, accepted: 6, rejected: 2 },
  { month: "Feb", received: 12, accepted: 7, rejected: 3 },
  { month: "Mar", received: 8, accepted: 5, rejected: 2 },
  { month: "Apr", received: 15, accepted: 10, rejected: 1 },
  { month: "May", received: 9, accepted: 6, rejected: 2 },
];

const DashboardPage = () => {
  return (
    <div className="min-h-screen my-10">
      <Label className="mb-5 mt-7 text-lg">Houses Info</Label>
      <Separator />
      <div className="grid grid-cols-1 md:grid-cols-4 mt-5 gap-5">
        <Card>
          <CardContent className="text-center">
            <h4>854</h4>
            <p>Total Houses</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center">
            <h4>854</h4>
            <p>Empty House</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center">
            <h4>854</h4>
            <p>Booked House</p>
          </CardContent>
        </Card>
      </div>
      <Label className="mb-5 mt-7 text-lg">Booking request Info</Label>
      <Separator />
      <div className="grid grid-cols-1 md:grid-cols-4 mt-5 gap-5">
        <Card>
          <CardContent className="text-center">
            <h4>854</h4>
            <p>Total Request</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center">
            <h4>854</h4>
            <p>Pending Request</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center">
            <h4>854</h4>
            <p>Accepted Request</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center">
            <h4>854</h4>
            <p>Canceled Request</p>
          </CardContent>
        </Card>
      </div>
      <Label className="mb-5 mt-7 text-lg">Total Feedback</Label>
      <Separator />
      <div className="grid grid-cols-1 md:grid-cols-4 mt-5 gap-5">
        <Card>
          <CardContent className="text-center">
            <h4>854</h4>
            <p>Total Request</p>
          </CardContent>
        </Card>
      </div>
      <Label className="mb-5 mt-7 text-lg">Total Feedback</Label>
      <Separator />
      <MonthlyRequestBarChart data={chartData} />
    </div>
  );
};

export default DashboardPage;
