"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";

type RequestStats = {
  month: string;
  received: number;
  accepted: number;
  rejected: number;
};

type Props = {
  data: RequestStats[];
};

const MonthlyRequestBarChart: React.FC<Props> = ({ data }) => {
  return (
    <Card className="p-6 bg-white rounded-2xl shadow-md">
      <CardContent className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <CalendarDays className="text-blue-600" /> Monthly Request Overview
        </h2>

        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="received" fill="#3B82F6" name="Requests Received" />
              <Bar dataKey="accepted" fill="#10B981" name="Accepted" />
              <Bar dataKey="rejected" fill="#EF4444" name="Rejected" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlyRequestBarChart;
