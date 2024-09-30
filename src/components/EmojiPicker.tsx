'use client';

import React, { useEffect, useRef, useState } from 'react';
import ReactEmojiPicker, { EmojiClickData } from 'emoji-picker-react';

type EmojiPickerProps = {
  children: React.ReactNode;
  handleEmojiClick: (emoji: string) => void;
};

export default function EmojiPicker({
  children,
  handleEmojiClick,
}: EmojiPickerProps) {
  const [isEmojiPickerVisible, setIsEmojiPickerVisible] =
    useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsEmojiPickerVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='relative'>
      <div onClick={() => setIsEmojiPickerVisible((prev) => !prev)}>
        {children}
      </div>
      <div ref={ref} className='absolute top-0 -left-[22rem] z-10'>
        <ReactEmojiPicker
          open={isEmojiPickerVisible}
          onEmojiClick={(event: EmojiClickData) => {
            handleEmojiClick(event.emoji);
            setIsEmojiPickerVisible(false);
          }}
          lazyLoadEmojis={true}
        />
      </div>
    </div>
  );
}
