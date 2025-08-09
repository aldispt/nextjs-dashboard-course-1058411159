import { fetchInvoicesPages } from '@/app/lib/data';
import InvoicesTable from '@/app/ui/invoices/table';
import Pagination from '@/app/ui/invoices/pagination';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';

export default async function Page(props: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const searchParamsResolved = await props.searchParams;
  const query =
    typeof searchParamsResolved?.query === 'string' ? searchParamsResolved.query : '';
  const pageParam =
    typeof searchParamsResolved?.page === 'string' ? searchParamsResolved.page : '1';
  const currentPage = Number(pageParam) || 1;

  const totalPages = await fetchInvoicesPages(query);

  return (
    <div className="w-full">
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <InvoicesTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}