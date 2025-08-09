'use client';

import {
  HomeIcon,
  UserGroupIcon,
  DocumentDuplicateIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import AcmeLogo from '@/app/ui/acme-logo';

const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  { name: 'Invoices', href: '/dashboard/invoices', icon: DocumentDuplicateIcon },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-blue-50">
      <div className="flex h-20 items-center justify-center rounded-lg bg-blue-500 p-4 md:h-32">
        <AcmeLogo />
      </div>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-blue-100 p-3 text-sm font-medium hover:bg-blue-200 md:flex-none md:justify-start md:p-2 md:px-3',
                { 'bg-blue-200 text-blue-900': pathname === link.href },
              )}
            >
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
            </Link>
          );
        })}
        <form>
          <button className="flex h-[48px] w-full items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-gray-100 md:justify-start md:p-2 md:px-3">
            <ArrowLeftOnRectangleIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
