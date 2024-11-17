import { cn } from '@/lib';
import { Column } from '@tanstack/react-table';

export const getCommonPinningStyles = <T>(
  column: Column<T>,
  className?: string
) => {
  const isPinned = column.getIsPinned();

  //   const isLastLeftPinnedColumn =
  //     isPinned === 'left' && column.getIsLastColumn('left');
  //   const isFirstRightPinnedColumn =
  //     isPinned === 'right' && column.getIsFirstColumn('right');

  return {
    style: {
      left:
        isPinned === 'left' ? `${column.getStart('left') - 1}px` : undefined,
      right:
        isPinned === 'right' ? `${column.getAfter('right') - 1}px` : undefined,
      width: column.getSize(),
    },
    className: cn(
      isPinned ? 'sticky' : 'relative',
      isPinned ? 'bg-muted' : 'transparent',
      isPinned ? 'z-[1]' : 'z-[0]',
      className
    ),
  };
};
