
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://armmwzefrgukaneliojs.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFybW13emVmcmd1a2FuZWxpb2pzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2MzA2MTAsImV4cCI6MjA2NzIwNjYxMH0._7twg-mwwQNTZVrQ74Ad7GXQdDTwMdH0lv1T2hOQW60'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
