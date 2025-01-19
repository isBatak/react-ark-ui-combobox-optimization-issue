declare module "react-lag-radar" {
  import { ComponentType } from "react";

  /**
   * Configuration options for the lag radar visualization.
   */
  export interface LagRadarOptions {
    /**
     * Number of frames to draw. Higher numbers may impact performance.
     * @default 50
     */
    frames?: number;

    /**
     * Speed of the sweep in radians per millisecond.
     * @default 0.0017
     */
    speed?: number;

    /**
     * Outer frame size in pixels.
     * @default 300
     */
    size?: number;

    /**
     * Circle inset in pixels.
     * @default 3
     */
    inset?: number;

    /**
     * DOM node to attach the radar to. Defaults to `document.body`.
     * @default document.body
     */
    parent?: HTMLElement;
  }

  /**
   * The Radar React component renders a lag radar visualization.
   */
  const Radar: ComponentType<LagRadarOptions>;

  export default Radar;
}
