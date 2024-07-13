import Image from 'next/image';
import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="flex justify-between items-center p-5 bg-custom-background">
      <div className="flex items-center">
        <Image src="/logo.png" alt="Logo" width={140} height={48} className="mr-2" />
      </div>
      <div className="w-12 h-12">
        <img src="/top-right.png" alt="Profile" className="rounded-full" />
      </div>
    </div>
  );
};

export default Header;
