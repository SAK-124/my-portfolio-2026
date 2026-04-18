'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { getSupabaseBrowserClient } from '@/lib/supabase/client'
import { hasSupabaseClientEnv } from '@/lib/supabase/config'
import { getProvider } from '@/lib/tools/storage'
import { loadCollection, saveCollection } from '@/lib/tools/storage/migrations'
import { profile } from '@/data/profile'
import { projects } from '@/data/projects'
import { siteConfig } from '@/lib/site'
import { createEmptyPortfolio, seedPortfolioFromProfile, defaultResumeConfig } from '@/lib/tools/resume/seed'
import type { Portfolio, ResumeConfig, ResumeConfigsState } from '@/lib/tools/resume/types'

export interface PortfolioState {
  portfolio: Portfolio
  configs: ResumeConfigsState
}

const ADMIN_EMAIL = 'saboor12124@gmail.com'

async function getAuthenticatedEmail(): Promise<string | null> {
  if (!hasSupabaseClientEnv()) return null
  try {
    const {
      data: { user },
    } = await getSupabaseBrowserClient().auth.getUser()
    return user?.email?.toLowerCase() ?? null
  } catch {
    return null
  }
}

export function usePortfolioState() {
  const [state, setState] = useState<PortfolioState | null>(null)
  const initializedRef = useRef(false)

  useEffect(() => {
    if (initializedRef.current) return
    initializedRef.current = true
    const provider = getProvider()
    ;(async () => {
      const pEnv = await loadCollection<Portfolio>(provider, 'portfolio')
      const cEnv = await loadCollection<ResumeConfigsState>(provider, 'resumeConfigs')

      let portfolio = pEnv?.data
      let configs = cEnv?.data

      if (!portfolio) {
        const email = await getAuthenticatedEmail()
        const isAdmin = email === ADMIN_EMAIL

        portfolio = isAdmin
          ? seedPortfolioFromProfile(profile, projects, {
              email: siteConfig.email,
              linkedin: siteConfig.linkedin,
              github: siteConfig.github,
            })
          : createEmptyPortfolio()

        await saveCollection(provider, 'portfolio', portfolio)
      }

      if (!configs || configs.configs.length === 0) {
        const defaultCfg = defaultResumeConfig(portfolio)
        configs = { activeId: defaultCfg.id, configs: [defaultCfg] }
        await saveCollection(provider, 'resumeConfigs', configs)
      }

      setState({ portfolio, configs })
    })()

    const unsubP = provider.subscribe?.('portfolio', async () => {
      const env = await loadCollection<Portfolio>(provider, 'portfolio')
      if (env) setState((prev) => (prev ? { ...prev, portfolio: env.data } : prev))
    })
    const unsubC = provider.subscribe?.('resumeConfigs', async () => {
      const env = await loadCollection<ResumeConfigsState>(provider, 'resumeConfigs')
      if (env) setState((prev) => (prev ? { ...prev, configs: env.data } : prev))
    })
    return () => {
      unsubP?.()
      unsubC?.()
    }
  }, [])

  const savePortfolio = useCallback(async (next: Portfolio) => {
    await saveCollection(getProvider(), 'portfolio', next)
    setState((prev) => (prev ? { ...prev, portfolio: next } : prev))
  }, [])

  const saveConfigs = useCallback(async (next: ResumeConfigsState) => {
    await saveCollection(getProvider(), 'resumeConfigs', next)
    setState((prev) => (prev ? { ...prev, configs: next } : prev))
  }, [])

  const updatePortfolio = useCallback(
    (updater: (prev: Portfolio) => Portfolio) => {
      setState((prev) => {
        if (!prev) return prev
        const next = updater(prev.portfolio)
        void saveCollection(getProvider(), 'portfolio', next)
        return { ...prev, portfolio: next }
      })
    },
    [],
  )

  const updateConfigs = useCallback(
    (updater: (prev: ResumeConfigsState) => ResumeConfigsState) => {
      setState((prev) => {
        if (!prev) return prev
        const next = updater(prev.configs)
        void saveCollection(getProvider(), 'resumeConfigs', next)
        return { ...prev, configs: next }
      })
    },
    [],
  )

  const activeConfig = useMemo<ResumeConfig | null>(() => {
    if (!state) return null
    const { configs, activeId } = state.configs
    return configs.find((c) => c.id === activeId) ?? configs[0] ?? null
  }, [state])

  return {
    state,
    activeConfig,
    savePortfolio,
    saveConfigs,
    updatePortfolio,
    updateConfigs,
  }
}
