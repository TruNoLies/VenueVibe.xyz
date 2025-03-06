import React from 'react';
import { Star, SlidersHorizontal } from 'lucide-react';

interface ReviewFiltersProps {
  filters: {
    rating: number;
    sortBy: string;
  };
  onChange: (filters: any) => void;
}

export function ReviewFilters({ filters, onChange }: ReviewFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center">
      <div className="flex items-center gap-2">
        <Star className="h-5 w-5 text-gray-400" />
        <select
          value={filters.rating}
          onChange={(e) => onChange({ ...filters, rating: Number(e.target.value) })}
          className="input rounded-md px-3 py-2"
        >
          <option value={0}>All Ratings</option>
          <option value={4}>4+ Stars</option>
          <option value={3}>3+ Stars</option>
          <option value={2}>2+ Stars</option>
          <option value={1}>1+ Stars</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <SlidersHorizontal className="h-5 w-5 text-gray-400" />
        <select
          value={filters.sortBy}
          onChange={(e) => onChange({ ...filters, sortBy: e.target.value })}
          className="input rounded-md px-3 py-2"
        >
          <option value="latest">Latest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>
    </div>
  );
}