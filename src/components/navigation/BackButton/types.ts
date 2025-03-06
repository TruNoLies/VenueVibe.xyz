export interface BackButtonProps {
  /** Target route for navigation. If not provided, will go back in history */
  to?: string;
  /** Button label text */
  label?: string;
  /** Optional className for custom styling */
  className?: string;
}