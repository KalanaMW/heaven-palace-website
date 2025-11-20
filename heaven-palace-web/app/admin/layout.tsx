'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Mail, Users, CalendarDays, LogOut } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Define the menu items in an array to make the active logic cleaner
  const menuItems = [
    { 
      name: 'Dashboard', 
      href: '/admin/dashboard', 
      icon: LayoutDashboard 
    },
    { 
      name: 'Bookings', 
      href: '/admin/bookings', 
      icon: CalendarDays 
    },
    { 
      name: 'Email System', 
      href: '/admin/emails', 
      icon: Mail 
    },
    { 
      name: 'Guests', 
      href: '/admin/guests', 
      icon: Users 
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* MAIN ADMIN SIDEBAR */}
      <aside className="w-64 bg-brand-dark text-white flex flex-col fixed h-full z-50">
        <div className="p-6 border-b border-gray-800">
          <span className="text-xl font-serif font-bold tracking-widest">HP ADMIN</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            // Check if the current path starts with the link href
            // This ensures it stays active even if you go to sub-pages like /admin/bookings/123
            const isActive = pathname?.startsWith(item.href);

            const Icon = item.icon;

            return (
              <Link 
                key={item.href}
                href={item.href} 
                className={`flex items-center gap-3 px-4 py-3 rounded transition duration-200 ${
                  isActive 
                    ? 'bg-brand-blue text-white shadow-lg'  // Active Style
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white' // Inactive Style
                }`}
              >
                <Icon size={18} />
                <span className="text-sm uppercase tracking-wider">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button className="flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-gray-800/50 rounded transition w-full text-left">
            <LogOut size={18} />
            <span className="text-sm uppercase tracking-wider">Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="ml-64 flex-1 h-full overflow-y-auto bg-gray-100">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
