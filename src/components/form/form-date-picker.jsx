import React, { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";

export function DatePicker({
  onChange
}) {
  const [date, setDate] = useState();

  const handleSelect = (selectedDate) => {
    const from = selectedDate.from;
    const to = selectedDate.to || selectedDate.from; 
    if (!from) return;
    const fromDay = from.getDay();
    const toDay = to.getDay();
    const diffInDays = (to - from) / (1000 * 60 * 60 * 24);
  
    const isSingleValidDay = (diffInDays === 0 && (fromDay === 6 || fromDay === 0));
    
    const isWeekendRange = (fromDay === 6 && toDay === 0 && diffInDays === 1);
  
    if (isSingleValidDay || isWeekendRange) {
      setDate(selectedDate);
      if (onChange) onChange(selectedDate);
    } else {
      toast.error("Only Saturday, Sunday, or consecutive Saturday → Sunday are allowed in beta version");
    }
  };
  

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date?.from ? (
            date.to ? (
              <>{format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}</>
            ) : (
              format(date.from, "LLL dd, y")
            )
          ) : (
            <span>Pick a date range</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="range"
          selected={date}
          onSelect={handleSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
