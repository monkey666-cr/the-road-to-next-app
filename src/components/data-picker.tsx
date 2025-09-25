"use client";

import { ChevronDownIcon, LucideCalendar } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { format } from "date-fns";

type DatePickerProps = {
  id: string;
  name: string;
  defaultValue?: string | null;
};

const DatePicker = ({ id, name, defaultValue }: DatePickerProps) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : new Date()
  );

  const formatedStringDate = date ? format(date, "yyyy-MM-dd") : "";

  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger id={id} asChild>
          <Button
            variant="outline"
            className="w-40 justify-start text-left font-normal"
          >
            <LucideCalendar className="mr-2 h-4 w-4" />
            {date ? formatedStringDate : "Select date"}
            <ChevronDownIcon />
            <input
              type="hidden"
              name={name}
              value={
                date
                  ? format(date, "yyyy-MM-dd")
                  : format(new Date(), "yyyy-MM-dd")
              }
            ></input>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export { DatePicker };
