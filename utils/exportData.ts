import { CompanyData } from './fetchData'

export function exportToCSV(data: CompanyData[], filename: string) {
  const headers = ['Name', 'Valuation', 'Date', 'Country', 'City', 'Industry', 'Investors']
  const csvContent = [
    headers.join(','),
    ...data.map(company => [
      company.name,
      company.valuation,
      company.date,
      company.country,
      company.city,
      company.industry,
      company.investors.join(';')
    ].join(','))
  ].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

