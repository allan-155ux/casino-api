const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://wefpuphlrgelavxdkzea.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndlZnB1cGhscmdlbGF2eGRremVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg1MTUxOTksImV4cCI6MjAyNDA5MTE5OX0.HHTr6eqqYbEb-B2W2u5q7akULhyZdkA7RQ8wVD2u60U"

const supabase = createClient(supabaseUrl, supabaseKey)

module.exports = supabase