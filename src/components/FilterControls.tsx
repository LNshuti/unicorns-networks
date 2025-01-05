'use client'

import * as React from "react"
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CompanyData } from '../utils/fetchData'
import { Filters } from '../types/filters'
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface FilterControlsProps {
  data: CompanyData[]
  filters: Filters
  onFilterChange: (filters: Filters) => void
}

export default function FilterControls({ data, filters, onFilterChange }: FilterControlsProps) {
  const [uniqueValues, setUniqueValues] = React.useState({
    countries: [] as string[],
    cities: [] as string[],
    industries: [] as string[],
    companies: [] as string[],
    investors: [] as string[]
  })

  React.useEffect(() => {
    setUniqueValues({
      countries: Array.from(new Set(data.map(d => d.country || 'Unknown'))).filter(Boolean),
      cities: Array.from(new Set(data.map(d => d.city || 'Unknown'))).filter(Boolean),
      industries: Array.from(new Set(data.map(d => d.industry || 'Unknown'))).filter(Boolean),
      companies: Array.from(new Set(data.map(d => d.name || 'Unknown'))).filter(Boolean),
      investors: Array.from(new Set(data.flatMap(d => d.investors || []))).filter(Boolean)
    })
  }, [data])

  const handleFilterChange = (key: keyof Filters, value: any) => {
    const newFilters = { ...filters, [key]: value }
    onFilterChange(newFilters)
  }

  const renderSearchableSelect = (key: keyof Filters, label: string, options: string[]) => {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState(filters[key])

    return (
      <div className="mb-4">
        <Label htmlFor={key}>{label}</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {value || `Select ${label}...`}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder={`Search ${label}...`} className="h-9" />
              <CommandList>
                <CommandEmpty>No {label} found.</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      key={option}
                      value={option}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue)
                        handleFilterChange(key, currentValue === value ? "" : currentValue)
                        setOpen(false)
                      }}
                    >
                      {option}
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          value === option ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    )
  }

  const valuationRanges = ['All', '1-5', '5-10', '10-15', '15-20', '20+']

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="location">
        <AccordionTrigger>Location</AccordionTrigger>
        <AccordionContent>
          {renderSearchableSelect('country', 'Country', ['None', ...uniqueValues.countries])}
          {renderSearchableSelect('city', 'City', ['None', ...uniqueValues.cities])}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="company">
        <AccordionTrigger>Company</AccordionTrigger>
        <AccordionContent>
          {renderSearchableSelect('industry', 'Industry', ['None', ...uniqueValues.industries])}
          {renderSearchableSelect('company', 'Company', ['None', ...uniqueValues.companies])}
          {renderSearchableSelect('valuationRange', 'Valuation Range (Billions)', ['None', ...valuationRanges])}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="investors">
        <AccordionTrigger>Investors</AccordionTrigger>
        <AccordionContent>
          {renderSearchableSelect('investors', 'Select Investors', ['None', ...uniqueValues.investors])}
          {renderSearchableSelect('excludeInvestors', 'Exclude Investors', ['None', ...uniqueValues.investors])}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

