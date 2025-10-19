/**
 * Helper Functions (PRE-BUILT - 100% Complete)
 *
 * Utility functions for number formatting and manipulation.
 * These are ready to use if you want to extend the counter functionality!
 *
 * Available Functions:
 * - formatNumber: Format numbers with commas (e.g., 1000 → 1,000)
 * - formatWithSign: Add + or - sign to numbers (e.g., 5 → +5, -3 → -3)
 * - clamp: Restrict a number to a min/max range
 * - isEven: Check if a number is even
 */

/**
 * Format a number with commas for thousands
 * Example: 1234567 → "1,234,567"
 */
export function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Format a number with + or - sign
 * Example: 5 → "+5", -3 → "-3", 0 → "0"
 */
export function formatWithSign(num) {
  if (num > 0) return `+${num}`;
  if (num < 0) return `${num}`;
  return '0';
}

/**
 * Clamp a number between min and max values
 * Example: clamp(15, 0, 10) → 10 (max limit)
 *          clamp(-5, 0, 10) → 0 (min limit)
 *          clamp(5, 0, 10) → 5 (within range)
 */
export function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

/**
 * Check if a number is even
 * Example: isEven(4) → true, isEven(5) → false
 */
export function isEven(num) {
  return num % 2 === 0;
}

/**
 * Get a description based on count value
 * Example: getCountDescription(0) → "Zero"
 *          getCountDescription(10) → "Getting high!"
 */
export function getCountDescription(count) {
  if (count === 0) return 'Zero';
  if (count > 0 && count <= 5) return 'Low count';
  if (count > 5 && count <= 20) return 'Medium count';
  if (count > 20) return 'High count!';
  if (count < 0 && count >= -5) return 'Negative low';
  if (count < -5) return 'Very negative!';
  return '';
}
