
import { useQuery } from '@tanstack/react-query';
import { proposalsService } from '@/lib/database';

export const useProposals = () => {
  return useQuery({
    queryKey: ['proposals'],
    queryFn: proposalsService.getProposals,
  });
};

export const useProposalsByCategory = (category: string) => {
  return useQuery({
    queryKey: ['proposals', category],
    queryFn: () => proposalsService.getProposalsByCategory(category),
    enabled: !!category,
  });
};
