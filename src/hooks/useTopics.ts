import { TopicsService } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useSubscribedTopics = () =>
  useQuery({
    queryKey: ["topics", "subscribed"],
    queryFn: async () => {
      const r = await TopicsService.topicControllerGetSubscribedTopics();
      return r.data;
    },
  });

export const useDeviceTopics = (id: string) =>
  useQuery({
    queryKey: ["topics", id],
    queryFn: async () => {
      const r =
        await TopicsService.topicControllerGetDeviceTopicsByDeviceId(id);
      return r.data;
    },
    enabled: !!id,
  });
