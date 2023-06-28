import Navbar from '@/components/Navbar/Navbar';
import React from 'react';

type AuthPageProps = {
  
};

const AuthPage:React.FC<AuthPageProps> = () => {
  
  return (
    <div className='h-screen relative bg-gradient-to-b from-gray-600 to-black'>
      <div className="max-w-7xl mx-auto">
        <Navbar />
      </div>
      <div className='flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none'>
        <img src="/hero.png" alt="Hero img" />
      </div>
    </div>
  );
}
export default AuthPage;