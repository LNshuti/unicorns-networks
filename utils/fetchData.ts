import Papa from 'papaparse'

export interface CompanyData {
  name: string
  valuation: number
  date: string
  country: string
  city: string
  industry: string
  investors: string[]
}

export async function fetchData(): Promise<CompanyData[]> {
  const response = await fetch('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cbinsights_data-d59PWCggAWMgiTct1WYnMLZDSystNO.csv')
  const csvText = await response.text()
  
  const result = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
    transform: (value) => value.trim(),
    transformHeader: (header) => header.trim()
  })

  return result.data.map((row: any) => ({
    name: row.Company || '',
    valuation: parseFloat(row.Valuation_Billions.replace('$', '')) || 0,
    date: row.Date_Joined || '',
    country: row.Country || '',
    city: row.City || '',
    industry: row.Industry || '',
    investors: row.Select_Investors ? row.Select_Investors.split(',').map((inv: string) => inv.trim()) : []
  }))
}

