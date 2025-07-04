
import { supabase } from './supabase';

export interface Design {
  id: string;
  user_id: string;
  title: string;
  category: string;
  canvas_data: any;
  thumbnail_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Proposal {
  id: string;
  title: string;
  description?: string;
  category: string;
  image_url?: string;
  template_data?: any;
  is_featured: boolean;
  created_at: string;
}

export const designsService = {
  // Get all designs for the current user
  async getUserDesigns(): Promise<Design[]> {
    const { data, error } = await supabase
      .from('designs')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Save a new design
  async saveDesign(design: Omit<Design, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<Design> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('designs')
      .insert({
        ...design,
        user_id: user.id,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update an existing design
  async updateDesign(id: string, updates: Partial<Design>): Promise<Design> {
    const { data, error } = await supabase
      .from('designs')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete a design
  async deleteDesign(id: string): Promise<void> {
    const { error } = await supabase
      .from('designs')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};

export const proposalsService = {
  // Get all proposals
  async getProposals(): Promise<Proposal[]> {
    const { data, error } = await supabase
      .from('proposals')
      .select('*')
      .order('is_featured', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Get proposals by category
  async getProposalsByCategory(category: string): Promise<Proposal[]> {
    const { data, error } = await supabase
      .from('proposals')
      .select('*')
      .eq('category', category)
      .order('is_featured', { ascending: false });

    if (error) throw error;
    return data || [];
  }
};
