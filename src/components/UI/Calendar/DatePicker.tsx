import React from 'react';

import { format, subMonths, addMonths } from 'date-fns';
import { CalendarIcon, XIcon } from 'lucide-react';

import { cn } from '../../../lib/utils';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

import { Button } from '../Button';
import { Calendar } from '../Calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover';

export interface DatepickerProps {
  title?: string | React.ReactNode;
  minDate?: string;
  maxDate?: string;
  getSelectedDate?: (date: Date) => void;
}

const Datepicker: React.FC<DatepickerProps> = ({
  title,
  getSelectedDate,
  minDate = new Date('11/11/1991'),
  maxDate = new Date('11/11/3059'),
}) => {
  const [date, setDate] = React.useState<Date | undefined>();
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);
  const [month, setMonth] = React.useState(new Date());

  const onSelect = (date: Date | undefined) => {
    if (date && getSelectedDate) {
      setDate(date);
      getSelectedDate(date);
    }
  };

  const onHandleClear = () => {
    setIsCalendarOpen(false);
    setDate(undefined);
  };

  const onHandleOpenChangePopover = (isOpen: boolean) => {
    setIsCalendarOpen(isOpen);
  };

  const onClickCancel = () => {
    setIsCalendarOpen(false);
    setDate(undefined);
  };

  const onHandleApply = () => {
    setIsCalendarOpen(false);
  };

  const onClickCalendarIcon = () => {
    setIsCalendarOpen(true);
  };

  const handlePrevMonthClick = () => {
    setMonth(subMonths(month, 1));
  };

  const handleNextMonthClick = () => {
    setMonth(addMonths(month, 1));
  };

  return (
    <div>
      {title && (
        <div className="text-[14px] leading-[16px] font-normal text-[#4B5563] mb-[4px]">
          {title}
        </div>
      )}
      <div className="flex h-[38px] border border-[#E5E7EB] overflow-hidden rounded-[4px]">
        <Popover open={isCalendarOpen} onOpenChange={onHandleOpenChangePopover}>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-full h-[38px] justify-between font-normal p-[0px] pl-[12px] overflow-hidden border-none',
                !date && 'text-muted-foreground'
              )}
            >
              {date ? (
                format(date, 'dd-mm-yyyy')
              ) : (
                <span className="text-[#A9A9A9] text-[14px] leading-[16px]">
                  DD-MM-YYYY
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto rounded-none shadow-none p-[0px]">
            <div>
              <div className="border-b pt-[6px] pl-[12px] pr-[12px]">
                <Calendar
                  month={month}
                  mode="single"
                  selected={date}
                  onSelect={onSelect}
                  autoFocus
                  hidden={{
                    before: new Date(minDate),
                    after: new Date(maxDate),
                  }}
                  components={{
                    IconLeft: () => (
                      // Previous month button
                      <div onClick={handlePrevMonthClick}>
                        <ChevronLeftIcon />
                      </div>
                    ),
                    IconRight: () => (
                      // Next month button
                      <div onClick={handleNextMonthClick}>
                        <ChevronRightIcon />
                      </div>
                    ),
                  }}
                />
              </div>
              <div className="flex justify-end items-center pt-[18px] pb-[18px] pr-[24px] pl-[24px]">
                <Button
                  onClick={onClickCancel}
                  variant={'outline'}
                  className="rounded-8px h-[36px] pr-[20px] pl-[20px] pt-[10px] pb-[10px] text-[14px] leading-[16px] text-[#4B5563] border-[#D1D5DB] border"
                >
                  Cancel
                </Button>

                <Button
                  onClick={onHandleApply}
                  className="ml-[16px] h-[36px] rounded-8px bg-[#007AFF] text-[white] pr-[20px] pl-[20px] pt-[10px] pb-[10px] text-[14px] leading-[16px]"
                >
                  Apply
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <div className="w-[80px] h-full bg-[#F9FAFB] flex justify-center items-center border-l pl-[15px] pr-[15px]">
          {date && (
            <XIcon
              onClick={onHandleClear}
              className="h-[20px] mr-[4px] w-[20px] text-[#9CA3AF] cursor-pointer"
            />
          )}
          <CalendarIcon
            onClick={onClickCalendarIcon}
            className="h-[20px] ml-[4px] w-[20px] text-[#9CA3AF] cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default Datepicker;
