import {
  DevicesService,
  DiscoveryRequestDto,
  SensorConfigRequestDto,
  SensorFunctionalityRequestDto,
} from "@/api";
import { QueryDeviceDto } from "@/api/models/device/QueryDeviceDto";
import { useQuery, useMutation } from "@tanstack/react-query";

export const useQueryDevices = (params: QueryDeviceDto) =>
  useQuery({
    queryKey: ["devices", params],
    queryFn: async () => {
      const res = await DevicesService.deviceControllerGetSensors(params);
      return res.data;
    },
  });

export const useDevices = () =>
  useMutation({
    mutationFn: () => DevicesService.deviceControllerGetAllSensors(),
  });

export const useUnassignedDevices = () =>
  useQuery({
    queryKey: ["unassigned"],
    queryFn: async () => {
      const res = await DevicesService.deviceControllerGetUnassignedSensor();
      console.log({ res });
      console.log(res.data);
      return res.data;
    },
  });

export const useProvisionDevice = () =>
  useMutation({
    mutationFn: (payload: SensorFunctionalityRequestDto) =>
      DevicesService.deviceControllerProvisionDevice(payload),
  });

export const useConfigureDevice = () =>
  useMutation({
    mutationFn: (payload: SensorConfigRequestDto) =>
      DevicesService.deviceControllerReconfigureDevice(payload),
  });

export const useDiscoveryBroadcast = () =>
  useMutation({
    mutationFn: (payload: DiscoveryRequestDto) =>
      DevicesService.deviceControllerDiscoverDevicesBroadcast(payload),
  });
