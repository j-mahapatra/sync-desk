import React from 'react';
import { AlignLeft, LayoutGrid } from 'lucide-react';
import { LayoutType } from '@/lib/types';
import { cn } from '@/lib/utils';

type LayoutSelectorProps = {
  selectedLayout: LayoutType;
  onLayoutChange: (layout: LayoutType) => void;
};

export default function LayoutSelector({
  selectedLayout,
  onLayoutChange,
}: LayoutSelectorProps) {
  return (
    <div className='flex cursor-pointer'>
      <div
        className={cn(
          'flex items-center justify-center border-2 p-1 hover:bg-slate-200 rounded-l-sm',
          selectedLayout === 'grid' ? 'bg-slate-300' : '',
        )}
        onClick={() => onLayoutChange('grid')}
      >
        <LayoutGrid />
      </div>
      <div
        className={cn(
          'flex items-center justify-center border-2 p-1 hover:bg-slate-200 rounded-r-sm',
          selectedLayout === 'list' ? 'bg-slate-300' : '',
        )}
        onClick={() => onLayoutChange('list')}
      >
        <AlignLeft />
      </div>
    </div>
  );
}
