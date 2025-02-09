
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xmjuhtcxkxdqfsaonwlb.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

console.log('init supabase', supabase)

export default function useSupabase () {
  return { supabase }
}
