
import { createClient } from '@supabase/supabase-js'


const supabaseUrl = "https://hlprrellgqppivpzwwap.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhscHJyZWxsZ3FwcGl2cHp3d2FwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUwMDkxMTYsImV4cCI6MjAyMDU4NTExNn0.OYGeCz9aR7dm5YORxSehRe7ndYd3eEvVZ2CBwKG_uGw"


const supabase = createClient(supabaseUrl, supabaseKey)


export default supabase 