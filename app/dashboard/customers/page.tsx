export const dynamic = 'force-dynamic';
import { fetchFilteredCustomers } from '@/app/lib/data';
import CustomersTable  from '@/app/ui/customers/table';


export default async function CustomersPage() {
  const customers = await fetchFilteredCustomers('');

  return (
    <main>
      <CustomersTable customers={customers} />
    </main>
  );
}