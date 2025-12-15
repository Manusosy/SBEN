import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

export type UserRole = 'admin' | 'editor' | 'viewer' | null;

export const useUserRole = (user: User | null) => {
  const [role, setRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      // Since we strictly enforce email domain at signup, 
      // we can assume all authenticated users are admins.
      setRole('admin');
    } else {
      setRole(null);
    }
    setLoading(false);
  }, [user]);

  return { role, loading };
};