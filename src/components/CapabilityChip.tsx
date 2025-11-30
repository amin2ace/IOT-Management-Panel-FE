import { CapabilityColorMap } from "@/api/models/extra/ColorMaps";

type props = {
  cap: string;
  selected: boolean;
  onToggle: (c: string) => void;
};
export function CapabilityChip({ cap, selected, onToggle }: props) {
  return (
    <button
      type="button"
      onClick={() => onToggle(cap)}
      className={`px-2 py-1 rounded-md text-xs font-medium border transition inline-flex items-center gap-2 ${
        selected
          ? "ring-2 ring-indigo-400 bg-indigo-700 text-white"
          : `${CapabilityColorMap[cap]} hover:scale-105`
      }`}
    >
      {cap}
    </button>
  );
}
