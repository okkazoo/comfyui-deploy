import { create } from 'zustand'

interface PublicRunStore {
  runId?: string
  loading: boolean
  status: string
  setRunId: (id: string) => void
  setLoading: (loading: boolean) => void
  setStatus: (status: string) => void
}

export const publicRunStore = create<PublicRunStore>((set) => ({
  loading: false,
  status: '',
  setRunId: (runId) => set({ runId }),
  setLoading: (loading) => set({ loading }),
  setStatus: (status) => set({ status })
})) 