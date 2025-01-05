'use client'

import { useRef, useEffect, useState } from 'react'
import * as d3 from 'd3'
import { CompanyData } from '../utils/fetchData'
import { Tooltip } from "@/components/ui/tooltip"

interface NetworkGraphProps {
  data: CompanyData[]
  onNodeClick: (node: CompanyData) => void
}

export default function NetworkGraph({ data, onNodeClick }: NetworkGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [tooltip, setTooltip] = useState<{ x: number; y: number; content: string } | null>(null)

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        setDimensions({ width, height })
      }
    }

    window.addEventListener('resize', updateDimensions)
    updateDimensions()

    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  useEffect(() => {
    if (!svgRef.current || !data.length || dimensions.width === 0 || dimensions.height === 0) return

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const { width, height } = dimensions

    const simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id((d: any) => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))

    const nodes: any[] = []
    const links: any[] = []

    const valuationScale = d3.scaleLog()
      .domain([1, d3.max(data, d => d.valuation) || 1])
      .range([5, 30])

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10)

    data.forEach((company) => {
      nodes.push({ id: company.name, group: 'company', ...company })
      company.investors.forEach((investor) => {
        if (!nodes.some(n => n.id === investor)) {
          nodes.push({ id: investor, group: 'investor' })
        }
        links.push({ source: investor, target: company.name })
      })
    })

    const link = svg.append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)

    const node = svg.append('g')
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', (d: any) => d.group === 'company' ? valuationScale(Math.max(1, d.valuation)) : 5)
      .attr('fill', (d: any) => d.group === 'company' ? colorScale(d.industry) : '#2196F3')
      .call(d3.drag<SVGCircleElement, any>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended) as any
      )

    node.on('mouseover', (event, d: any) => {
      if (d.group === 'company') {
        const [x, y] = d3.pointer(event)
        setTooltip({
          x: x + 10,
          y: y - 10,
          content: `${d.name}: $${d.valuation.toFixed(2)}B`
        })
      }
    })
    .on('mouseout', () => {
      setTooltip(null)
    })
    .on('click', (event, d: any) => {
      if (d.group === 'company') {
        onNodeClick(d)
      }
    })

    node.append('title')
      .text((d: any) => `${d.id}${d.group === 'company' ? ` - $${d.valuation}B` : ''}`)

    const label = svg.append('g')
      .selectAll('text')
      .data(nodes)
      .join('text')
      .text((d: any) => d.id)
      .attr('font-size', '8px')
      .attr('dx', 12)
      .attr('dy', 4)

    simulation
      .nodes(nodes)
      .on('tick', ticked)

    simulation.force<d3.ForceLink<any, any>>('link')!.links(links)

    function ticked() {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y)

      node
        .attr('cx', (d: any) => d.x)
        .attr('cy', (d: any) => d.y)

      label
        .attr('x', (d: any) => d.x)
        .attr('y', (d: any) => d.y)
    }

    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      event.subject.fx = event.subject.x
      event.subject.fy = event.subject.y
    }

    function dragged(event: any) {
      event.subject.fx = event.x
      event.subject.fy = event.y
    }

    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0)
      event.subject.fx = null
      event.subject.fy = null
    }

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        svg.selectAll('g').attr('transform', event.transform)
      })

    svg.call(zoom as any)

  }, [data, dimensions, onNodeClick])

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <svg ref={svgRef} className="w-full h-full" />
      {tooltip && (
        <Tooltip
          content={tooltip.content}
          style={{
            position: 'absolute',
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  )
}

