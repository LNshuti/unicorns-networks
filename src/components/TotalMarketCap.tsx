import { CompanyData } from '../utils/fetchData'

interface TotalMarketCapProps {
  data: CompanyData[]
}

export default function TotalMarketCap({ data }: TotalMarketCapProps) {
  const totalMarketCap = data.reduce((sum, company) => sum + (company.valuation || 0), 0)

  return (
    <div className="bg-primary text-primary-foreground p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">Total Market Cap</h2>
      <p className="text-2xl font-bold">
        ${totalMarketCap.toFixed(2)} Billion
      </p>
    </div>
  )
}

