
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { designsService, Design } from '@/lib/database';
import { toast } from 'sonner';

export const useDesigns = () => {
  return useQuery({
    queryKey: ['designs'],
    queryFn: designsService.getUserDesigns,
  });
};

export const useSaveDesign = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: designsService.saveDesign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['designs'] });
      toast.success('Design saved successfully!');
    },
    onError: (error) => {
      toast.error('Failed to save design');
      console.error('Save design error:', error);
    },
  });
};

export const useUpdateDesign = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Design> }) =>
      designsService.updateDesign(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['designs'] });
      toast.success('Design updated successfully!');
    },
    onError: (error) => {
      toast.error('Failed to update design');
      console.error('Update design error:', error);
    },
  });
};

export const useDeleteDesign = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: designsService.deleteDesign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['designs'] });
      toast.success('Design deleted successfully!');
    },
    onError: (error) => {
      toast.error('Failed to delete design');
      console.error('Delete design error:', error);
    },
  });
};
