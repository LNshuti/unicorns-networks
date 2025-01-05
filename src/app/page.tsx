'use client'

import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { fetchData, CompanyData } from '../utils/fetchData'
import NetworkGraph from '../components/NetworkGraph'
import FilterControls from '../components/FilterControls'
import { Filters } from '../types/filters'
import { Button } from "@/components/ui/button"
import { exportToCSV } from '../utils/exportData'
import TotalMarketCap from '../components/TotalMarketCap'
import DataSummary from '../components/DataSummary'
import Legend from '../components/Legend'

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [data, setData] = useState<CompanyData[]>([])
  const [filteredData, setFilteredData] = useState<CompanyData[]>([])
  const [filters, setFilters] = useState<Filters>({
    country: 'United States',
    city: 'None',
    industry: 'None',
    company: 'None',
    investors: 'None',
    excludeInvestors: 'None',
    valuationRange: 'None'
  })
  const [loading, setLoading] = useState(true)
  const [selectedNode, setSelectedNode] = useState<CompanyData | null>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated') {
      const loadData = async () => {
        const fetchedData = await fetchData()
        setData(fetchedData)
        setFilteredData(fetchedData)
        setLoading(false)
      }
      loadData()
    }
  }, [status, router])

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters)
    const filtered = applyFilters(data, newFilters)
    setFilteredData(filtered)
  }

  const handleNodeClick = (node: CompanyData) => {
    setSelectedNode(node)
  }

  const handleExport = () => {
    exportToCSV(filteredData, 'venture_capital_data.csv')
  }

  if (status === 'loading' || loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  if (!session) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Venture Capital Network Visualization</h1>
        <div className="flex items-center space-x-4">
          <span>Welcome, {session.user?.email}</span>
          <Button onClick={() => signOut()}>Sign Out</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-1">
          <FilterControls data={data} filters={filters} onFilterChange={handleFilterChange} />
          <Button onClick={handleExport} className="w-full mt-4">Export Filtered Data</Button>
        </div>
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <TotalMarketCap data={filteredData} />
            <DataSummary data={filteredData} />
          </div>
          <div className="relative h-[600px] border rounded-lg overflow-hidden">
            <NetworkGraph data={filteredData} onNodeClick={handleNodeClick} />
            <Legend />
          </div>
        </div>
      </div>
      {selectedNode && (
        <div className="mt-4 p-4 bg-secondary rounded-lg">
          <h2 className="text-xl font-bold mb-2">{selectedNode.name}</h2>
          <p>Valuation: ${selectedNode.valuation}B</p>
          <p>Industry: {selectedNode.industry}</p>
          <p>Location: {selectedNode.city}, {selectedNode.country}</p>
          <p>Investors: {selectedNode.investors.join(', ')}</p>
        </div>
      )}
    </div>
  )
}

function applyFilters(data: CompanyData[], filters: Filters): CompanyData[] {
  return data.filter(company => {
    if (filters.country !== 'None' && company.country && company.country !== filters.country) return false
    if (filters.city !== 'None' && company.city && company.city !== filters.city) return false
    if (filters.industry !== 'None' && company.industry && company.industry !== filters.industry) return false
    if (filters.company !== 'None' && company.name && company.name !== filters.company) return false
    if (filters.investors !== 'None' && company.investors && !company.investors.includes(filters.investors)) return false
    if (filters.excludeInvestors !== 'None' && company.investors && company.investors.includes(filters.excludeInvestors)) return false

    if (filters.valuationRange !== 'None') {
      const [min, max] = filters.valuationRange.split('-').map(Number)
      if (company.valuation < min || (max && company.valuation >= max)) return false
    }

    return true
  })
}

