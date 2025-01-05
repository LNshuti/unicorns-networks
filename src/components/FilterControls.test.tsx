import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import FilterControls from './FilterControls'
import { CompanyData, Filters } from '../types/data'

const mockData: CompanyData[] = [
  {
    name: 'Company A',
    valuation: 10,
    industry: 'Tech',
    country: 'USA',
    investors: ['Investor 1', 'Investor 2'],
  },
  {
    name: 'Company B',
    valuation: 5,
    industry: 'Finance',
    country: 'UK',
    investors: ['Investor 2', 'Investor 3'],
  },
]

const mockFilters: Filters = {
  country: 'All',
  industry: 'All',
  company: 'All',
  investors: 'All',
  valuationRange: 'All',
  excludeCountry: 'All',
  excludeIndustry: 'All',
  excludeCompany: 'All',
  excludeInvestors: 'All',
}

describe('FilterControls', () => {
  it('renders all filter options', () => {
    render(<FilterControls data={mockData} filters={mockFilters} onFilterChange={() => {}} />)
    
    expect(screen.getByText('Location')).toBeInTheDocument()
    expect(screen.getByText('Company')).toBeInTheDocument()
    expect(screen.getByText('Investors')).toBeInTheDocument()
  })

  it('calls onFilterChange when a filter is changed', () => {
    const mockOnFilterChange = jest.fn()
    render(<FilterControls data={mockData} filters={mockFilters} onFilterChange={mockOnFilterChange} />)
    
    fireEvent.click(screen.getByText('Location'))
    fireEvent.click(screen.getByText('Select Country...'))
    fireEvent.click(screen.getByText('USA'))

    expect(mockOnFilterChange).toHaveBeenCalledWith(expect.objectContaining({ country: 'USA' }))
  })
})

