/**
 * Additional device information
 *
 * @example
 * {
 *   "manufacturer": "IoTTech Inc.",
 *   "model": "TX-9000"
 * }
 */
export type AdditionalInfoDto = {
  /**
   * Device manufacturer
   * @example "IoTTech Inc."
   */
  manufacturer?: string;

  /**
   * Device model
   * @example "TX-9000"
   */
  model?: string;
};
