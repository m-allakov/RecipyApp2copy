import React, { useState } from 'react';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';

const commonIngredients = [
  'domates',
  'salatalık',
  'soğan',
  'sarımsak',
  'patates',
  'havuç',
  'biber',
  'patlıcan',
  'kabak',
  'pirinç',
  'makarna',
  'kıyma',
  'tavuk',
  'yumurta',
  'süt',
  'peynir',
  'tereyağı',
  'zeytinyağı',
  'un',
  'şeker',
  'tuz',
  'karabiber',
].sort();

interface IngredientInputProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export function IngredientInput({ value, onChange }: IngredientInputProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleSelect = (currentValue: string) => {
    if (!value.includes(currentValue)) {
      onChange([...value, currentValue]);
    }
    setInputValue('');
  };

  const handleRemove = (ingredient: string) => {
    onChange(value.filter((i) => i !== ingredient));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue) {
      e.preventDefault();
      if (!value.includes(inputValue)) {
        onChange([...value, inputValue]);
      }
      setInputValue('');
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between text-left font-normal"
          >
            Malzeme ekle...
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput 
              placeholder="Malzeme ara veya ekle..."
              value={inputValue}
              onValueChange={setInputValue}
              onKeyDown={handleKeyDown}
            />
            <CommandEmpty>
              Enter'a basarak "{inputValue}" ekleyin
            </CommandEmpty>
            <CommandGroup heading="Önerilen Malzemeler">
              {commonIngredients
                .filter(ingredient => 
                  ingredient.toLowerCase().includes(inputValue.toLowerCase()) &&
                  !value.includes(ingredient)
                )
                .map((ingredient) => (
                  <CommandItem
                    key={ingredient}
                    value={ingredient}
                    onSelect={handleSelect}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value.includes(ingredient) ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {ingredient}
                  </CommandItem>
                ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      <div className="flex flex-wrap gap-2">
        {value.map((ingredient) => (
          <Badge
            key={ingredient}
            variant="secondary"
            className="flex items-center gap-1"
          >
            {ingredient}
            <X
              className="h-3 w-3 cursor-pointer"
              onClick={() => handleRemove(ingredient)}
            />
          </Badge>
        ))}
      </div>
    </div>
  );
}