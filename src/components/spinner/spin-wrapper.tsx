'use client'
import { useEffect, useState } from 'react';
import ToggleButton from '@/components/ui/toggle-button';
import Image from 'next/image';
export default function SpinWrapper() {
  const [isRotated, setIsRotated] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // Thêm trạng thái kiểm tra đã mounted

  useEffect(() => {
    setIsMounted(true); // Đánh dấu component đã mounted
  }, []);

  const handleRotate = () => {
    setIsRotated(true);
    setTimeout(() => {
      setIsRotated(false);
    }, 10000); // Dừng quay sau 10 giây
  };

  if (!isMounted) {
    return null; // Chỉ render sau khi đã mounted
  }

  return (
    <div className="min-h-screen overflow-y-auto flex flex-col justify-center">
      <div className="relative bg-[url('/images/bg_roulette.jpg')] bg-cover bg-no-repeat h-[1632px] w-[1920px]">
      </div>
      <p className='relative transform -translate-x-[-425px] -translate-y-[1045px]'>
        <Image
          src="/images/img_board01.png"
          alt="spinner"
          width={680}
          height={680}
          priority
          className={`transition-transform duration-1000 ${isRotated ? 'rotate' : ''}`}
        />
      </p>
      <p 
        className={`transform -translate-x-[-660px] -translate-y-[1500px] cursor-pointer`}
        onClick={handleRotate}
      >
        <Image src="/images/btn_start.png" alt="spinner" width={217} height={218} />
      </p>
      <p className='transform -translate-x-[-1250px] -translate-y-[1900px]'>
        <ToggleButton />
      </p>
    </div>
  );
}