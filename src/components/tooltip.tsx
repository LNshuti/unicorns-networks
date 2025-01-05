import React from 'react'

interface TooltipProps {
  content: string
  style?: React.CSSProperties
}

export const Tooltip: React.FC<TooltipProps> = ({ content, style }) => {
  return (
    <div
      className="bg-black text-white px-2 py-1 rounded text-sm"
      style={style}
    >
      {content}
    </div>
  )
}

