import React from 'react';

interface StatusBadgeProps {
  status: 'New' | 'Follow-Up' | 'Qualified' | 'Converted';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusConfig = {
    'New': { bg: 'bg-blue-100', text: 'text-blue-800', dot: 'bg-blue-400' },
    'Follow-Up': { bg: 'bg-orange-100', text: 'text-orange-800', dot: 'bg-orange-400' },
    'Qualified': { bg: 'bg-green-100', text: 'text-green-800', dot: 'bg-green-400' },
    'Converted': { bg: 'bg-purple-100', text: 'text-purple-800', dot: 'bg-purple-400' },
  };

  const config = statusConfig[status];

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${config.dot}`}></span>
      {status}
    </span>
  );
};