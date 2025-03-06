export interface PageHeaderProps {
  /** Page title */
  title: string;
  /** Optional page description */
  description?: string;
  /** Back navigation target route */
  backTo?: string;
  /** Back button label */
  backLabel?: string;
  /** Additional className for custom styling */
  className?: string;
  /** Optional children to render below the header */
  children?: React.ReactNode;
}