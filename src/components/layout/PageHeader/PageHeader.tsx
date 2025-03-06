import React from 'react';
import { BackButton } from '../../navigation/BackButton';
import { cn } from '../../../lib/utils';
import type { PageHeaderProps } from './types';

export function PageHeader({
  title,
  description,
  backTo,
  backLabel,
  className,
  children
}: PageHeaderProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {backTo && (
        <BackButton 
          to={backTo} 
          label={backLabel} 
          className="mb-2" 
        />
      )}
      <div>
        <h1 className="text-3xl font-bold text-gray-100">{title}</h1>
        {description && (
          <p className="mt-2 text-gray-400">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
}