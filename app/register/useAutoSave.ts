// Auto-save hook for form data persistence

import { useEffect, useRef, useCallback } from 'react'

const STORAGE_KEY = 'registration-form-data'
const AUTO_SAVE_DELAY = 2000 // 2 seconds debounce

interface AutoSaveOptions {
  key?: string
  delay?: number
  onSave?: () => void
  onRestore?: () => void
}

export function useAutoSave<T>(
  data: T,
  options: AutoSaveOptions = {}
) {
  const {
    key = STORAGE_KEY,
    delay = AUTO_SAVE_DELAY,
    onSave,
    onRestore
  } = options

  const timeoutRef = useRef<NodeJS.Timeout>()
  const lastSavedRef = useRef<string>('')

  // Save data to localStorage
  const saveData = useCallback(() => {
    try {
      const serialized = JSON.stringify(data)
      // Only save if data has changed
      if (serialized !== lastSavedRef.current) {
        localStorage.setItem(key, serialized)
        lastSavedRef.current = serialized
        onSave?.()
      }
    } catch (error) {
      console.error('Failed to save form data:', error)
    }
  }, [data, key, onSave])

  // Load saved data from localStorage
  const loadSavedData = useCallback((): T | null => {
    try {
      const saved = localStorage.getItem(key)
      if (saved) {
        const parsed = JSON.parse(saved)
        onRestore?.()
        return parsed
      }
    } catch (error) {
      console.error('Failed to load saved form data:', error)
    }
    return null
  }, [key, onRestore])

  // Clear saved data
  const clearSavedData = useCallback(() => {
    try {
      localStorage.removeItem(key)
      lastSavedRef.current = ''
    } catch (error) {
      console.error('Failed to clear saved form data:', error)
    }
  }, [key])

  // Auto-save effect with debouncing
  useEffect(() => {
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Set new timeout for auto-save
    timeoutRef.current = setTimeout(() => {
      saveData()
    }, delay)

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [data, delay, saveData])

  // Save on page unload
  useEffect(() => {
    const handleUnload = () => {
      saveData()
    }

    window.addEventListener('beforeunload', handleUnload)
    return () => {
      window.removeEventListener('beforeunload', handleUnload)
    }
  }, [saveData])

  return {
    loadSavedData,
    clearSavedData,
    saveData
  }
}

// Hook to show save status
export function useAutoSaveStatus() {
  const showSaveStatus = useCallback((status: 'saving' | 'saved' | 'error') => {
    // Create or update save status element
    let statusElement = document.getElementById('auto-save-status')

    if (!statusElement) {
      statusElement = document.createElement('div')
      statusElement.id = 'auto-save-status'
      statusElement.className = 'fixed bottom-4 right-4 z-50 transition-all duration-300'
      document.body.appendChild(statusElement)
    }

    // Update status content
    switch (status) {
      case 'saving':
        statusElement.innerHTML = `
          <div class="bg-dark-800 border border-electric-purple-500/30 rounded-lg px-4 py-2 flex items-center gap-2 shadow-lg">
            <div class="loading-spinner h-4 w-4"></div>
            <span class="text-sm text-gray-300">Saving...</span>
          </div>
        `
        statusElement.style.opacity = '1'
        break

      case 'saved':
        statusElement.innerHTML = `
          <div class="bg-dark-800 border border-neon-green/30 rounded-lg px-4 py-2 flex items-center gap-2 shadow-lg">
            <svg class="w-4 h-4 text-neon-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span class="text-sm text-gray-300">Progress saved</span>
          </div>
        `
        statusElement.style.opacity = '1'
        // Auto-hide after 2 seconds
        setTimeout(() => {
          if (statusElement) {
            statusElement.style.opacity = '0'
          }
        }, 2000)
        break

      case 'error':
        statusElement.innerHTML = `
          <div class="bg-dark-800 border border-red-500/30 rounded-lg px-4 py-2 flex items-center gap-2 shadow-lg">
            <svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            <span class="text-sm text-gray-300">Failed to save</span>
          </div>
        `
        statusElement.style.opacity = '1'
        setTimeout(() => {
          if (statusElement) {
            statusElement.style.opacity = '0'
          }
        }, 3000)
        break
    }
  }, [])

  return { showSaveStatus }
}