import { useCallback, useEffect, useState } from 'react'
import { supabase } from './supabase.js'

/**
 * Realtime-synced table hook.
 *
 * Returns `[items, ops]` where:
 *   items = current rows (always newest-first by created_at)
 *   ops   = { loading, error, insert, update, remove, refetch }
 *
 * Drop-in replacement for the old useStorage hook used by the admin panels —
 * same `[value, setValue]`-ish shape, but rows live in Supabase and changes
 * stream back via Postgres-changes channels (so other open tabs / devices
 * stay in sync automatically).
 */
export function useTable(table, { order = 'created_at', ascending = false } = {}) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refetch = useCallback(async () => {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .order(order, { ascending })
    if (error) setError(error)
    setItems(data || [])
    setLoading(false)
  }, [table, order, ascending])

  useEffect(() => {
    refetch()
    // Unique per hook instance: two components subscribing to the same table
    // (e.g. Admin shell + AdminInbox) must have their own channels, otherwise
    // Supabase throws "cannot add postgres_changes callbacks after subscribe()".
    const channelName = `pub:${table}:${Math.random().toString(36).slice(2, 10)}`
    const channel = supabase
      .channel(channelName)
      .on('postgres_changes', { event: '*', schema: 'public', table }, () => {
        refetch()
      })
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [table, refetch])

  const insert = useCallback(async (row) => {
    const { data, error } = await supabase.from(table).insert(row).select().single()
    if (error) throw error
    // Optimistic — channel will reconcile shortly.
    setItems((prev) => [data, ...prev])
    return data
  }, [table])

  const update = useCallback(async (id, patch) => {
    const { data, error } = await supabase.from(table).update(patch).eq('id', id).select().single()
    if (error) throw error
    setItems((prev) => prev.map((r) => r.id === id ? data : r))
    return data
  }, [table])

  const remove = useCallback(async (id) => {
    const { error } = await supabase.from(table).delete().eq('id', id)
    if (error) throw error
    setItems((prev) => prev.filter((r) => r.id !== id))
  }, [table])

  return [items, { loading, error, insert, update, remove, refetch }]
}
