import { CompanyData, Filters } from '../types/data'

export function processData(rawData: any[]): CompanyData[] {
  return rawData
    .filter(item => item.name && item.valuation) // Filter out invalid entries
    .map((item) => ({
      name: item.name || 'Unknown',
      valuation: parseFloat(item.valuation.replace('$', '').replace(',', '')) || 0,
      industry: item.industry || 'Unknown',
      country: item.country || 'Unknown',
      investors: item.investors 
        ? item.investors
            .split(',')
            .map((inv: string) => inv.trim())
            .filter((inv: string) => inv !== '')
        : [],
    }))
}

export function getUniqueValues(data: CompanyData[]) {
  return {
    countries: ['All', ...Array.from(new Set(data.map(company => company.country))).filter(Boolean).sort()],
    industries: ['All', ...Array.from(new Set(data.map(company => company.industry))).filter(Boolean).sort()],
    companies: ['All', ...Array.from(new Set(data.map(company => company.name))).filter(Boolean).sort()],
    investors: ['All', ...Array.from(new Set(data.flatMap(company => company.investors))).filter(Boolean).sort()]
  }
}

export function applyFilters(data: CompanyData[], filters: Filters): CompanyData[] {
  return data.filter((company) => {
    // Include filters
    if (filters.country !== 'All' && company.country !== filters.country) return false
    if (filters.industry !== 'All' && company.industry !== filters.industry) return false
    if (filters.company !== 'All' && company.name !== filters.company) return false
    if (filters.investors !== 'All' && !company.investors.includes(filters.investors)) return false

    // Exclude filters
    if (filters.excludeCountry !== 'All' && company.country === filters.excludeCountry) return false
    if (filters.excludeIndustry !== 'All' && company.industry === filters.excludeIndustry) return false
    if (filters.excludeCompany !== 'All' && company.name === filters.excludeCompany) return false
    if (filters.excludeInvestors !== 'All' && company.investors.includes(filters.excludeInvestors)) return false

    // Valuation range
    if (filters.valuationRange !== 'All') {
      const [min, max] = filters.valuationRange.split('-').map(Number)
      if (company.valuation < min || (max && company.valuation >= max)) return false
    }

    return true
  })
}

