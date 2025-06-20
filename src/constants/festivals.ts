/**
 * Air Nomad festivals, rituals, and ceremonial contexts
 * Centralized constants to prevent duplication across modules
 */

/**
 * Comprehensive list of Air Nomad festivals and rituals for serving contexts
 * Used by prose composition to add cultural authenticity
 */
export const FESTIVALS_AND_RITUALS = [
  "Vow of Silence Retreat",
  "Sky Bison Appreciation Ceremony", 
  "Wind Walker's Pilgrimage",
  "Guru's Festival of Repose",
  "Festival of Four Winds",
  "Harmonic Convergence Feast",
  "Monk's Awakening Festival",
  "Temple Bells Celebration",
  "Mountain Wind Ceremony",
  "Sacred Air Nomad Gathering",
  "Floating Meditation Retreat",
  "Avatar's Remembrance Day",
  "Eastern Temple Pilgrimage",
  "Western Air Temple Festival",
  "Northern Sanctuary Ceremony",
  "Southern Temple Observance",
  "Airbending Master's Conclave",
  "Spirit World Communion",
  "Prayer Flag Blessing",
  "Cloud Dancing Festival"
] as const;

/**
 * Wildcard event templates for structural narrative variety
 * Adds unexpected elements to break template monotony
 */
export const WILDCARD_EVENTS = [
  "During preparation, a mischievous lemur interrupted the sacred ritual, yet somehow the dish became even more divine. ",
  "Legend tells that this recipe was discovered when a sky bison accidentally knocked over ingredient jars in the temple kitchen. ",
  "Master Pathik once declared this dish 'impossible to ruin,' challenging novice cooks across all four temples. ",
  "An ancient proverb warns: 'Those who rush this dish will taste only their own impatience.' ",
  "Temple records note seven different arguments among elders about the proper preparation method. All were correct. ",
  "It's said that Avatar Aang himself couldn't resist sneaking extra portions during meditation retreats. "
] as const;

/**
 * Type definitions for festival and event constants
 */
export type FestivalName = typeof FESTIVALS_AND_RITUALS[number];
export type WildcardEvent = typeof WILDCARD_EVENTS[number]; 