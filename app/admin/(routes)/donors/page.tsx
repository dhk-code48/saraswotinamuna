import { format } from "date-fns";

import db from "@/lib/prismadb";

import { DonorColumn } from "./_components/columns";
import { DonorsClient } from "./_components/client";

const DonorsPage = async () => {
  const donors = await db.donor.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedDonors: DonorColumn[] = donors.map((item) => ({
    id: item.id,
    amount: item.amount,
    name: item.name,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <DonorsClient data={formattedDonors} />
      </div>
    </div>
  );
};

export default DonorsPage;
