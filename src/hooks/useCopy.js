import { useCallback } from 'react'
import { useToast } from '../components/providers/Toaster'

// Copie un texte dans le presse-papiers et confirme par une notification
export function useCopy() {
  const notify = useToast()

  return useCallback(
    async (text, message = 'Copié dans le presse-papiers') => {
      try {
        await navigator.clipboard.writeText(text)
        notify(message)
      } catch {
        notify('Copie impossible — sélectionnez le texte à la main')
      }
    },
    [notify],
  )
}
