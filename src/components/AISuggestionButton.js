'use client'

import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import AIAnalysisModal from './AIAnalysisModal'

export default function AISuggestionButton({ data, type, className = "", variant = "default" }) {
  const [aiModal, setAiModal] = useState({ isOpen: false, data: null, type: '' })

  const handleAIAnalysis = () => {
    setAiModal({ isOpen: true, data, type })
  }

  const getButtonClass = () => {
    const baseClass = "flex items-center justify-center font-medium transition-all"
    
    switch (variant) {
      case 'compact':
        return `${baseClass} px-3 py-1 text-xs rounded-md bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700`
      case 'large':
        return `${baseClass} px-6 py-3 text-base rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl`
      case 'outline':
        return `${baseClass} px-4 py-2 text-sm rounded-lg border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white`
      default:
        return `${baseClass} px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700`
    }
  }

  const getIconSize = () => {
    switch (variant) {
      case 'compact':
        return 'h-3 w-3'
      case 'large':
        return 'h-6 w-6'
      default:
        return 'h-4 w-4'
    }
  }

  return (
    <>
      <button
        onClick={handleAIAnalysis}
        className={`${getButtonClass()} ${className}`}
        title={`Get AI analysis for ${data?.name || data?.symbol}`}
      >
        <Sparkles className={`${getIconSize()} mr-2`} />
        <span>AI Analysis</span>
      </button>

      <AIAnalysisModal
        isOpen={aiModal.isOpen}
        onClose={() => setAiModal({ isOpen: false, data: null, type: '' })}
        data={aiModal.data}
        type={aiModal.type}
      />
    </>
  )
}
