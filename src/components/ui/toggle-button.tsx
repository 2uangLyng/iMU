'use client';

import { useState } from 'react';

const buttonData = [
  { name: 'goblin', label: 'Goblin Point Roulette', bgPosition: '0 0' }, // Phần nút màu xanh
  { name: 'dimensional', label: 'Dimensional Roulette', bgPosition: '-291px 0' }, // Phần nút màu đen
  { name: 'playtime', label: 'Play Time Roulette', bgPosition: '-582px 0' }, // Phần nút màu đen
];

export default function ToggleButton() {
  const [active, setActive] = useState('goblin');

  const toggleButton = (buttonName: string) => {
    setActive(buttonName);
  };

  return (
    <div className="flex flex-col gap-4 asol">
      {buttonData.map(({ name, label, bgPosition }) => (
        <button
          key={name}
          className={`relative flex items-center justify-center rounded-md transition-opacity duration-300 
            ${active === name ? 'opacity-100' : 'opacity-50'}`}
          onClick={() => toggleButton(name)}
          style={{
            backgroundImage: "url('/images/bg_roulette_tab.png')",
            backgroundPosition: active === name ? 'top right' : bgPosition,
            backgroundSize: 'cover',
            width: '300px',
            height: '35px',
            textIndent: '-9999px',
            cursor: 'pointer',
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
