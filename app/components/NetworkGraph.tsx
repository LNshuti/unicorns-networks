'use client'

import { useRef, useEffect, useState } from 'react'
import * as d3 from 'd3'
import { CompanyData } from '../../types/data'

interface NetworkGraphProps {
  data: CompanyData[]
}

export default function NetworkGraph({ data }: NetworkGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateDimensions = () => {
      if (svgRef.current) {
        setDimensions({
          width: svgRef.current.clientWidth,
          height: svgRef.current.clientHeight
        })
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

    // Use log10 scale for node sizes
    const valuationScale = d3.scaleLog()
      .domain([1, d3.max(data, d => d.valuation) || 1])
      .range([5, 30])
      .clamp(true)

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10)

    data.forEach((company) => {
      nodes.push({
        id: company.name,
        group: 'company',
        valuation: company.valuation,
        industry: company.industry
      })
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
      .attr('stroke-width', 1)

    const node = svg.append('g')
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', (d: any) => d.group === 'company' ? valuationScale(Math.max(1, d.valuation)) : 5)
      .attr('fill', (d: any) => d.group === 'company' ? colorScale(d.industry) : '#2196F3')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .call(d3.drag<SVGCircleElement, any>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended) as any
      )

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

  }, [data, dimensions])

  return (
    <svg ref={svgRef} className="w-full h-full" />
  )
}

