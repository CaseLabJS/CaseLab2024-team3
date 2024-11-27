'use client';

import * as React from 'react';
import { add, format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/UI/Button';
import { Calendar } from '@/components/UI/Calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/UI/Popover';
import { TimePicker } from './time-picker';

import { ru } from 'date-fns/locale';

interface DateTimePickerProps {
  setDeadline: (deadline: Date | undefined) => void;
  deadline: Date | undefined;
}

export function DateTimePicker({ setDeadline, deadline }: DateTimePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(deadline);

  const handleSetDate = (newDate: Date | undefined) => {
    setDate(newDate);
    setDeadline(newDate);
  };

  /**
   * carry over the current time when a user clicks a new day
   * instead of resetting to 00:00
   */
  const handleSelect = (newDay: Date | undefined) => {
    if (!newDay) return;
    if (!date) {
      setDate(new Date(newDay.getTime() + 1000 * 60 * 60 * 24 - 1000)); // при первичном выборе даты автоматически ставится время до конца дня
      setDeadline(newDay);
      return;
    }
    const diff = newDay.getTime() - date.getTime();
    const diffInDays = diff / (1000 * 60 * 60 * 24);
    const newDateFull = add(date, { days: Math.ceil(diffInDays) });
    setDate(newDateFull);
    setDeadline(newDateFull);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-[280px] justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, 'PPP HH:mm:ss', { locale: ru })
          ) : (
            <span>Выберите дату и время</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => handleSelect(d)}
          initialFocus
        />
        <div className="p-3 border-t border-border">
          <TimePicker date={date} setDate={handleSetDate} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
