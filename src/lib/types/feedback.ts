export interface FeedbackCategory {
  id: string;
  label: string;
  description: string;
}

export interface Feedback {
  id: string;
  message: string;
  category: string;
  rating: number;
  status: 'pending' | 'resolved';
  created_at: string;
  profiles: {
    name: string;
  };
}

export const feedbackCategories: FeedbackCategory[] = [
  {
    id: 'technical',
    label: 'Technical Issues',
    description: 'Sound system, lighting, or equipment problems'
  },
  {
    id: 'staff',
    label: 'Staff Interaction',
    description: 'Experience with venue staff and management'
  },
  {
    id: 'facilities',
    label: 'Facilities',
    description: 'Stage, green room, or venue amenities'
  },
  {
    id: 'payment',
    label: 'Payment/Contract',
    description: 'Issues with payment or contract terms'
  }
];