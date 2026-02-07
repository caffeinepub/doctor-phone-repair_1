import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Appointment } from '../backend';
import type { Principal } from '@dfinity/principal';

export function useRequestAppointment() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      customerName: string;
      deviceType: string;
      issueDescription: string;
      preferredDate: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.requestAppointment(
        data.customerName,
        data.deviceType,
        data.issueDescription,
        data.preferredDate
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
  });
}

export function useGetAllAppointments() {
  const { actor, isFetching } = useActor();

  return useQuery<Array<[Principal, string, Appointment]>>({
    queryKey: ['appointments', 'all'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAllAppointments();
    },
    enabled: !!actor && !isFetching,
  });
}

