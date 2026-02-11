import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

// 检查环境变量是否存在
if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase环境变量未设置，某些功能可能无法正常工作');
}

export const supabase = createClient(supabaseUrl || '', supabaseKey || '');

