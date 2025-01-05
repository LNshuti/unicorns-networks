import React from 'react'
import { render, screen } from '@testing-library/react'
import DataSummary from './DataSummary'
import { CompanyData } from '../types/data'

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

describe('DataSummary', () => {
  it('renders correct summary information', () => {
    render(<DataSummary data={mockData} />)
    
    expect(screen.getByText('Total Companies')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('Total Investors')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('Avg. Valuation')).toBeInTheDocument()
    expect(screen.getByText('$7.50B')).toBeInTheDocument()
  })
})

