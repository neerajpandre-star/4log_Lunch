export const CINEMATIC_TIMINGS = {
  /**
   * The duration (in ms) that a world holds living in the viewport
   * before new user input can trigger another transition.
   */
  WORLD_HOLD_DURATION: 250,

  /**
   * The duration (in ms) of the cinematic visual transition between worlds.
   */
  TRANSITION_DURATION: 450,

  /**
   * The duration (in ms) for typography and copy to reveal.
   */
  TEXT_REVEAL_DURATION: 450,

  /**
   * The buffer duration (in ms) after hold completes before input unlocks.
   */
  INPUT_COOLDOWN: 100,

  /**
   * Minimum wheel delta required to trigger a world change.
   * Lowered to 15 for light, natural scrolling.
   */
  WHEEL_THRESHOLD: 15,

  /**
   * Minimum touch distance (in px) required to trigger a world change on mobile.
   */
  SWIPE_THRESHOLD: 30,
};
