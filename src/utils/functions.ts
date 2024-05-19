/**
 * This function truncates a given text to a specified maximum length. If the text
 * exceeds the maximum length, it adds ellipsis (...) at the end.
 * @param {string} text - The text to be truncated.
 * @param {number} maxLength - The maximum length of the truncated text.
 * @returns {string} - The truncated text with ellipsis if it exceeds the maximum length.
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
};

