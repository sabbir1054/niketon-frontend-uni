/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import RequestSingleRow from "@/components/modules/RequestSingleRow";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetTenantAllRequestQuery } from "@/redux/api/requestApi";
import { useState } from "react";

const TenantRequest = () => {
  const [status, setStatus] = useState("PENDING");
  const { data, isLoading } = useGetTenantAllRequestQuery({
    requestStatus: status,
  });

  return (
    <div className="p-6">
      <div className="bg-white p-5 rounded-lg shadow-sm border flex justify-between mb-5">
        <h2 className="text-2xl font-semibold mb-4">My Requests</h2>
        {/* Filter Dropdown */}
        <div className="mb-4">
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="ACCEPTED">Accepted</SelectItem>
              <SelectItem value="CANCEL">Cancel</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto">
        <table className="min-w-full bg-white border rounded-lg shadow">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-3 px-4 border-b">House</th>
              <th className="py-3 px-4 border-b">Owner</th>
              <th className="py-3 px-4 border-b">Status</th>
              <th className="py-3 px-4 border-b">Requested At</th>
              <th className="py-3 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              [...Array(5)].map((_, idx) => (
                <tr key={idx}>
                  <td className="py-3 px-4 border-b">
                    <Skeleton className="h-4 w-24" />
                  </td>
                  <td className="py-3 px-4 border-b">
                    <Skeleton className="h-4 w-24" />
                  </td>
                  <td className="py-3 px-4 border-b">
                    <Skeleton className="h-4 w-16" />
                  </td>
                  <td className="py-3 px-4 border-b">
                    <Skeleton className="h-4 w-32" />
                  </td>
                </tr>
              ))
            ) : data?.data?.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-4 text-center text-gray-500">
                  No requests found.
                </td>
              </tr>
            ) : (
              data?.data?.map((request: any, idx: any) => (
                <RequestSingleRow key={idx} request={request} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TenantRequest;
