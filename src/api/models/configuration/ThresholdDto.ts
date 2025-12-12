import { MeasurementUnit } from "../enums/MeasurementUnits";

/**
 * Represents threshold boundaries and unit for a sensor.
 */
export type ThresholdDto = {
  /** High threshold limit */
  high?: number;

  /** Low threshold limit */
  low?: number;

  /** Measurement unit of the threshold */
  unit?: MeasurementUnit;
};
