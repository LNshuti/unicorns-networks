export interface CompanyData {
  name: string
  valuation: number
  industry: string
  country: string
  investors: string[]
}

export interface Filters {
  country: string
  industry: string
  company: string
  investors: string
  valuationRange: string
  excludeCountry: string
  excludeIndustry: string
  excludeCompany: string
  excludeInvestors: string
}

