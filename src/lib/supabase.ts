import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// Usar createBrowserClient do @supabase/ssr para garantir que cookies sejam criados corretamente
// Isso permite que a API leia os cookies de autentica??o via createServerClient
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)