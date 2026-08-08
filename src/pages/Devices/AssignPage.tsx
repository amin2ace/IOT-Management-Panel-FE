import AssignPageHeader from "../../components/AssignPage/AssignPageHeader";
import AssignPageIntro from "../../components/AssignPage/AssignPageIntro";
import AssignTableRefactored from "../../components/AssignPage/AssignTableRefactored";
import {
  useLoadUnassignedDevices,
  useAssignEditState,
  ASSIGN_CONSTANTS,
} from "../../hooks/useAssignPage";

/**
 * AssignPage Component
 *
 * Manages assignment of functionalities to unassigned devices
 *
 * Features:
 * - Load unassigned devices from WebSocket
 * - Configure device functionality selection
 * - Set topic, interval, and setpoints
 * - Assign configuration to devices
 *
 * Separated concerns:
 * - useLoadUnassignedDevices: Device loading logic
 * - useAssignEditState: Form state management
 * - AssignPageHeader: Header display
 * - AssignPageIntro: Introduction section
 * - AssignTableRefactored: Table display
 * - AssignTableRow: Individual row logic
 */

export default function AssignPage() {
  const { devices, loading } = useLoadUnassignedDevices();
  const { editState, updateFor, toggleFunctionality, resetDevice } =
    useAssignEditState(devices);

  return (
    <div className="relative space-y-4">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 start-1/3 -z-10 h-72 w-72 rounded-full bg-indigo-400/15 blur-3xl dark:bg-indigo-500/10"
      />

      <AssignPageHeader deviceCount={devices.length} loading={loading} />
      <AssignPageIntro deviceCount={devices.length} />

      <div className="overflow-hidden rounded-2xl border border-white/40 bg-white/60 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/50">
        <AssignTableRefactored
          devices={devices}
          loading={loading}
          editState={editState}
          onUpdate={updateFor}
          onToggleFunctionality={toggleFunctionality}
          onReset={resetDevice}
          constants={{
            interval: ASSIGN_CONSTANTS.INTERVAL,
            lowSetPoint: ASSIGN_CONSTANTS.LOW_SET_POINT,
            highSetPoint: ASSIGN_CONSTANTS.HIGH_SET_POINT,
          }}
        />
      </div>
    </div>
  );
}
