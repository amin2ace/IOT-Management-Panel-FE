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
    <div className="dashboardAssignContainer space-y-4">
      <AssignPageHeader deviceCount={devices.length} loading={loading} />

      <AssignPageIntro deviceCount={devices.length} />

      <div className="bg-white/5 rounded-2xl backdrop-blur-md border border-white/10 overflow-hidden">
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
