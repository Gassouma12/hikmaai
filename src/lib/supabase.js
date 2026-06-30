import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!url || !key) {
  // eslint-disable-next-line no-console
  console.warn(
    '[hikma] Supabase env vars missing. Set VITE_SUPABASE_URL and ' +
    'VITE_SUPABASE_ANON_KEY in .env.local (local) or repo secrets (CI).',
  )
}

export const supabase = createClient(url, key, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  },
})

/* ─── Auth helpers ───
   The admin gate UX is "type the password = you're in". Under the hood we
   sign in to a single, hidden Supabase auth user. The user's email is fixed
   in code; only the password they type matters. */
export const ADMIN_EMAIL = 'admin@hikmaai.app'

export async function adminSignIn(password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: ADMIN_EMAIL,
    password,
  })
  return { ok: !error, error, session: data?.session }
}

export async function adminSignOut() {
  await supabase.auth.signOut()
}

/* ─── Storage upload (images) ───
   Returns the public URL of the uploaded file in the `media` bucket. */
export async function uploadImage(file, folder = 'misc') {
  const ext = (file.name.split('.').pop() || 'bin').toLowerCase()
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
  const { error } = await supabase.storage.from('media').upload(path, file, {
    cacheControl: '3600',
    upsert: false,
    contentType: file.type || undefined,
  })
  if (error) throw error
  const { data } = supabase.storage.from('media').getPublicUrl(path)
  return data.publicUrl
}
