// src/pages/Mqtt/MqttConfigPage.tsx
import { MqttConfigDto, MqttService } from "@/api";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function MqttConfigPage() {
  const { register, handleSubmit, reset } = useForm<MqttConfigDto>();

  useEffect(() => {
    MqttService.mqttManagementControllerGetConfig().then((r) => reset(r.data));
  }, [reset]);

  const onSubmit = async (data: MqttConfigDto) => {
    try {
      await MqttService.mqttManagementControllerUpdateConfig(data);
      alert("Updated");
    } catch (err) {
      console.error(err);
      alert("Failed");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">MQTT Configuration</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white/5 p-6 rounded"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label>Host</label>
            <input {...register("host")} className="input" />
          </div>
          <div>
            <label>Port</label>
            <input
              type="number"
              {...register("port", { valueAsNumber: true })}
              className="input"
            />
          </div>

          <div>
            <label>Client ID</label>
            <input {...register("clientId")} className="input" />
          </div>
          <div>
            <label>Protocol</label>
            <select {...register("protocol")} className="input">
              <option value="mqtt">mqtt</option>
              <option value="ws">ws</option>
              <option value="wss">wss</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button type="submit" className="px-4 py-2 bg-indigo-600 rounded">
            Save
          </button>
          <button
            type="button"
            onClick={() => {
              MqttService.mqttManagementControllerTestConnection({
                host: "localhost",
                port: 1883,
              } as MqttConfigDto)
                .then(() => alert("Connection OK"))
                .catch(() => alert("Connection failed"));
            }}
            className="px-4 py-2 bg-gray-700 rounded"
          >
            Test
          </button>
        </div>
      </form>
    </div>
  );
}
