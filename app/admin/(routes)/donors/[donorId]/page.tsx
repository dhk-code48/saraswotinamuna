import db from "@/lib/prismadb";

import { DonorForm } from "./_components/donor-form";

const DonorPage = async ({ params }: { params: { donorId: string; siteId: string } }) => {
  const author = await db.donor.findUnique({
    where: {
      id: params.donorId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <DonorForm initialData={author} />
      </div>
    </div>
  );
};

export default DonorPage;
