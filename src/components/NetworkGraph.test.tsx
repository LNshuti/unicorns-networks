import React from 'react'
import { render, screen } from '@testing-library/react'
import NetworkGraph from './NetworkGraph'
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

describe('NetworkGraph', () => {
  it('renders the SVG element', () => {
    render(<NetworkGraph data={mockData} onNodeClick={() => {}} />)
    const svgElement = screen.getByRole('img')
    expect(svgElement).toBeInTheDocument()
  })
})

