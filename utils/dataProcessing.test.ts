import { processData, getUniqueValues, applyFilters } from './dataProcessing'
import { CompanyData, Filters } from '../types/data'

describe('dataProcessing', () => {
  const testData: CompanyData[] = [
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

  describe('processData', () => {
    it('should process raw data correctly', () => {
      const rawData = [
        { name: 'Company A', valuation: '$10', industry: 'Tech', country: 'USA', investors: 'Investor 1, Investor 2' },
        { name: 'Company B', valuation: '$5', industry: 'Finance', country: 'UK', investors: 'Investor 2, Investor 3' },
      ]
      const processed = processData(rawData)
      expect(processed).toEqual(testData)
    })
  })

  describe('getUniqueValues', () => {
    it('should return unique values for each field', () => {
      const uniqueValues = getUniqueValues(testData)
      expect(uniqueValues).toEqual({
        countries: ['All', 'USA', 'UK'],
        industries: ['All', 'Tech', 'Finance'],
        companies: ['All', 'Company A', 'Company B'],
        investors: ['All', 'Investor 1', 'Investor 2', 'Investor 3'],
      })
    })
  })

  describe('applyFilters', () => {
    it('should filter data based on given filters', () => {
      const filters: Filters = {
        country: 'USA',
        industry: 'All',
        company: 'All',
        investors: 'All',
        valuationRange: 'All',
        excludeCountry: 'All',
        excludeIndustry: 'All',
        excludeCompany: 'All',
        excludeInvestors: 'All',
      }
      const filtered = applyFilters(testData, filters)
      expect(filtered).toEqual([testData[0]])
    })
  })
})

