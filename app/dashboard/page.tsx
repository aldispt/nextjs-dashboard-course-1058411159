import { fetchCardData, fetchLatestInvoices, fetchRevenue } from '@/app/lib/data';
import CardWrapper from '@/app/ui/dashboard/cards';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import { lusitana } from '@/app/ui/fonts';

export default async function Page() {
  const {
    numberOfCustomers,
    numberOfInvoices,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();

  const latestInvoices = await fetchLatestInvoices();
  const revenue = await fetchRevenue();

  return (
    <main className="space-y-6">
      <h1 className={`${lusitana.className} text-2xl`}>Dashboard</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CardWrapper
          numberOfCustomers={numberOfCustomers}
          numberOfInvoices={numberOfInvoices}
          totalPaidInvoices={totalPaidInvoices}
          totalPendingInvoices={totalPendingInvoices}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart revenue={revenue} />
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  );
}
