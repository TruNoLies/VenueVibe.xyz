import React from 'react';
import { BackButton } from '../navigation/BackButton';
import { cn } from '../../lib/utils';

interface PageHeaderProps {
  title: string;
  description?: string;
  backTo?: string;
  backLabel?: string;
  className?: string;
}

export function PageHeader({
  title,
  description,
  backTo,
  backLabel,
  className
}: PageHeaderProps) {
  return (
    <div className={cn("mb-8", className)}>
      {backTo && <BackButton to={backTo} label={backLabel} className="mb-4" />}
      <h1 className="text-3xl font-bold text-gray-100">{title}</h1>
      {description && (
        <p className="mt-2 text-gray-400">{description}</p>
      )}
    </div>
  );
}