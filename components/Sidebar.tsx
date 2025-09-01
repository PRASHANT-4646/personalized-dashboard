'use client';
import Image from 'next/image'
import Dashboard from '../public/dashboard.png'
import { AddWidgetMenu } from './AddWidgetMenu';
export const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center h-16 shadow-md">
        <Image src={Dashboard}
         alt="Your Profile"
  width={40}
  height={40}
  className="rounded-full"
        />
        </div>
        <nav className="flex-1 overflow-y-auto">
          <div className="px-4 py-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Widgets</h2>
              <AddWidgetMenu />
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};