import { getSupabase } from '../utils/supabase.ts';

export const authService = {
  async signUp(email, password) {
    const supabase = getSupabase();
    if (!supabase) {
      throw new Error('Supabase客户端未初始化');
    }
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (error) {
      throw error;
    }
    
    return data;
  },

  async signIn(email, password) {
    const supabase = getSupabase();
    if (!supabase) {
      throw new Error('Supabase客户端未初始化');
    }
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      throw error;
    }
    
    return data;
  },

  async signOut() {
    const supabase = getSupabase();
    if (!supabase) {
      throw new Error('Supabase客户端未初始化');
    }
    
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      throw error;
    }
  },

  async getCurrentUser() {
    const supabase = getSupabase();
    if (!supabase) {
      return null;
    }
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      return user;
    } catch (error) {
      console.error('获取用户信息失败:', error);
      return null;
    }
  },

  onAuthStateChange(callback) {
    const supabase = getSupabase();
    if (!supabase) {
      return {
        data: {
          subscription: {
            unsubscribe: () => {}
          }
        }
      };
    }
    
    return supabase.auth.onAuthStateChange(callback);
  },
};
