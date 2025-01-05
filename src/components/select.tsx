import React from 'react'

interface SelectProps {
  label: string
  options: string[]
  value: string
  onChange: (value: string) => void
}

export function Select({ label, options, value, onChange }: SelectProps) {
  return (
    <div className="mb-4">
      <label className="block mb-2 font-bold">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border rounded"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

