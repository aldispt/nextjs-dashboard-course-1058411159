'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  DocumentDuplicateIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';

const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  { name: 'Invoices', href: '/dashboard/invoices', icon: DocumentDuplicateIcon },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-blue-500 text-white">
      <div className="mb-6 text-2xl font-bold">Dashboard</div>
      <nav className="space-y-2">
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-blue-400',
                { 'bg-blue-700': pathname === link.href }
              )}
            >
              <LinkIcon className="h-5 w-5" />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
