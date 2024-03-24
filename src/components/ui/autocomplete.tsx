"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {useEffect} from "react";

export interface AutocompleteOption {
    label: string,
    value: string
}

export function Autocomplete({options, handleOnChange, defaultValue}: {options: AutocompleteOption[], handleOnChange: (value: string) => void, defaultValue?: AutocompleteOption}) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState(defaultValue?.value ?? "")
    
    useEffect(() => {
        if(defaultValue) {
            setValue(defaultValue.value)
        }
    }, [defaultValue])
    
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? options.find((opt) => opt.value.toString() === value.toString())?.label
                        : "Selectionne"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Recherche" />
                    <CommandEmpty>Aucun résultat.</CommandEmpty>
                    <CommandGroup>
                        {options.map((opt) => (
                            <CommandItem
                                key={opt.value.toString()}
                                value={opt.label}
                                onSelect={(currentValue) => {
                                    const value = options.find(
                                        (option) => option.label.toLowerCase() === currentValue,
                                    )?.value;
                                    setValue(value ?? "");
                                    setOpen(false);
                                    handleOnChange(value ?? "")
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        value.toString() === opt.value.toString() ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {opt.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
