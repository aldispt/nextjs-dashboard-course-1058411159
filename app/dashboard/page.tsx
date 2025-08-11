// app/dashboard/page.tsx
import { Suspense } from 'react';
import { Card } from '@/app/ui/dashboard/cards'; // Pastikan Card diekspor dari cards.tsx
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';

// Impor fungsi pengambilan data
import { fetchCardData, fetchLatestInvoices, fetchRevenue } from '@/app/lib/data';

// Impor komponen skeleton untuk fallback Suspense
import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
  CardsSkeleton,
} from '@/app/ui/skeletons';

export default async function Page() {
  // Ambil semua data secara paralel dengan Promise.all
  const [revenue, latestInvoices, cardData] = await Promise.all([
    fetchRevenue(),
    fetchLatestInvoices(),
    fetchCardData(),
  ]);

  // Ekstrak data dari cardData
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = cardData;

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>Dashboard</h1>

      {/* Kartu Ringkasan */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <Card title="Collected" value={totalPaidInvoices} type="collected" />
          <Card title="Pending" value={totalPendingInvoices} type="pending" />
          <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
          <Card title="Total Customers" value={numberOfCustomers} type="customers" />
        </Suspense>
      </div>

      {/* Grafik Pendapatan dan Faktur Terbaru */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart revenue={revenue} />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices latestInvoices={latestInvoices} />
        </Suspense>
      </div>
    </main>
  );
}
