'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ConnectionStatus from './ConnectionStatus';
import { config } from '@/config';

const Navigation = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="shadow-lg" style={{ backgroundColor: '#003274' }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-white text-xl font-bold">
                {config.app.name}
              </h1>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive('/')
                    ? 'text-blue-100 bg-blue-800'
                    : 'text-blue-100 hover:text-white hover:bg-blue-800'
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/readings"
                className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive('/readings')
                    ? 'text-blue-100 bg-blue-800'
                    : 'text-blue-100 hover:text-white hover:bg-blue-800'
                }`}
              >
                Histórico de Leituras
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <ConnectionStatus />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
