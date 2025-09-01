'use client';
import Image from 'next/image';
import prashant from '../public/prashant.png'
export const Navbar = () => {
  return (
    <header className="bg-white shadow">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-gray-800">Personalized Dashboard</h1>
        </div>
        <div className="flex items-center">
          <div className="relative">
            <button className="flex items-center p-2 text-gray-600 hover:text-gray-800">
             <Image
  src={prashant}
  alt="Your Profile"
  width={40}
  height={40}
  className="rounded-full"
/>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};