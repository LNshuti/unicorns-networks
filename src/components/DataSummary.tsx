import { CompanyData } from '../utils/fetchData'

interface DataSummaryProps {
  data: CompanyData[]
}

export default function DataSummary({ data }: DataSummaryProps) {
  const totalCompanies = data.length
  const totalInvestors = new Set(data.flatMap(company => company.investors)).size
  const averageValuation = data.reduce((sum, company) => sum + company.valuation, 0) / totalCompanies

  return (
    <div className="bg-secondary p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">Data Summary</h2>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <p className="text-sm text-muted-foreground">Total Companies</p>
          <p className="text-2xl font-bold">{totalCompanies}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Total Investors</p>
          <p className="text-2xl font-bold">{totalInvestors}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Avg. Valuation</p>
          <p className="text-2xl font-bold">${averageValuation.toFixed(2)}B</p>
        </div>
      </div>
    </div>
  )
}

