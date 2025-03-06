import React from 'react';
import { Star, Trash2, TrendingUp } from 'lucide-react';
import { Card } from '../ui/Card';

interface ReviewStatsProps {
  reviews: any[];
}

export function ReviewStats({ reviews }: ReviewStatsProps) {
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length || 0;
  const totalComplaints = reviews.reduce((acc, review) => acc + review.complaint_count, 0);
  
  const stats = [
    {
      icon: <Star className="h-6 w-6 text-yellow-400" />,
      label: 'Average Rating',
      value: averageRating.toFixed(1)
    },
    {
      icon: <Trash2 className="h-6 w-6 text-red-400" />,
      label: 'Total Complaints',
      value: totalComplaints
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-neon-accent" />,
      label: 'Total Reviews',
      value: reviews.length
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-6">
          <div className="flex items-center gap-4">
            {stat.icon}
            <div>
              <p className="text-sm text-gray-400">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-100">{stat.value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}