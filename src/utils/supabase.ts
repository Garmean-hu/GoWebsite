import { createClient } from "@supabase/supabase-js";

// 使用默认值，确保即使环境变量缺失，应用也能正常启动
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || '';
const supabaseKey = process.env.REACT_APP_SUPABASE_PUBLISHABLE_DEFAULT_KEY || '';

// 只有在两个环境变量都存在时才创建客户端
let supabaseInstance = null;
try {
  if (supabaseUrl && supabaseKey) {
    supabaseInstance = createClient(supabaseUrl, supabaseKey);
  } else {
    console.warn('Supabase环境变量未设置，某些功能可能无法正常工作');
  }
} catch (error) {
  console.error('Supabase客户端初始化失败:', error);
}

export const supabase = supabaseInstance;

// 导出一个安全的客户端访问方法
export const getSupabase = () => {
  if (!supabase) {
    console.warn('Supabase client not initialized. Some features may not work.');
  }
  return supabase;
};

