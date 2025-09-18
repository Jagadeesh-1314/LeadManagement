import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Mail, Phone, Grid3X3, List, Eye, MapPin } from 'lucide-react';
import type { Lead } from '../types';
import { StatusBadge } from './ui/StatusBadge';

interface LeadsTableProps {
  leads: Lead[];
  onLeadClick: (lead: Lead) => void;
}

type SortField = keyof Lead;
type SortDirection = 'asc' | 'desc';

export const LeadsTable: React.FC<LeadsTableProps> = ({ leads, onLeadClick }) => {
  const [sortField, setSortField] = useState<SortField>('updatedAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedLeads = [...leads].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];

    // Handle undefined values
    if (aValue === undefined && bValue === undefined) return 0;
    if (aValue === undefined) return sortDirection === 'asc' ? 1 : -1;
    if (bValue === undefined) return sortDirection === 'asc' ? -1 : 1;

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const SortIcon: React.FC<{ field: SortField }> = ({ field }) => {
    if (sortField !== field) return null;

    return sortDirection === 'asc' ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    );
  };

  const formatDate = (date?: string | Date) => {
    if (!date) return 'N/A';

    const d = typeof date === 'string' ? new Date(date) : date;

    if (isNaN(d.getTime())) return 'Invalid date';

    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(d);
  };

  if (leads.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <Grid3X3 className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No leads found</h3>
        <p className="text-gray-500 max-w-sm mx-auto">
          Try adjusting your search or filters to find more leads, or add your first lead to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header with View Toggle */}
      <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gray-50/50">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Leads</h3>
          <p className="text-sm text-gray-500 mt-1">{sortedLeads.length} total leads</p>
        </div>
        <div className="flex gap-1 bg-white rounded-lg p-1 border border-gray-200 shadow-sm">
          <button
            onClick={() => setViewMode('table')}
            className={`p-2.5 rounded-md transition-all duration-200 ${
              viewMode === 'table' 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
            title="Table view"
          >
            <List className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode('cards')}
            className={`p-2.5 rounded-md transition-all duration-200 ${
              viewMode === 'cards' 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
            title="Card view"
          >
            <Grid3X3 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {viewMode === 'table' ? (
        <div className="lg:block overflow-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-200 last:border-r-0"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center space-x-2">
                    <span>Name & Location</span>
                    <SortIcon field="name" />
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-r border-gray-200 last:border-r-0">
                  Contact Info
                </th>
                <th
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-200 last:border-r-0"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center space-x-2">
                    <span>Status</span>
                    <SortIcon field="status" />
                  </div>
                </th>
                <th
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-200 last:border-r-0"
                  onClick={() => handleSort('qualification')}
                >
                  <div className="flex items-center space-x-2">
                    <span>Qualification</span>
                    <SortIcon field="qualification" />
                  </div>
                </th>
                <th
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-200 last:border-r-0"
                  onClick={() => handleSort('interest')}
                >
                  <div className="flex items-center space-x-2">
                    <span>Interest</span>
                    <SortIcon field="interest" />
                  </div>
                </th>
                <th
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-200 last:border-r-0"
                  onClick={() => handleSort('source')}
                >
                  <div className="flex items-center space-x-2">
                    <span>Source</span>
                    <SortIcon field="source" />
                  </div>
                </th>
                <th
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors border-r border-gray-200 last:border-r-0"
                  onClick={() => handleSort('assignedTo')}
                >
                  <div className="flex items-center space-x-2">
                    <span>Assigned To</span>
                    <SortIcon field="assignedTo" />
                  </div>
                </th>
                <th
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('updatedAt')}
                >
                  <div className="flex items-center space-x-2">
                    <span>Last Updated</span>
                    <SortIcon field="updatedAt" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedLeads.map((lead, index) => (
                <tr
                  key={lead._id}
                  className={`hover:bg-blue-50 transition-all duration-200 cursor-pointer group ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                  }`}
                  onClick={() => onLeadClick(lead)}
                >
                  <td className="px-6 py-5 whitespace-nowrap border-r border-gray-100 last:border-r-0">
                    <div>
                      <div className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                        {lead.name}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {lead.city}, {lead.state}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap border-r border-gray-100 last:border-r-0">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-900">
                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="truncate max-w-[200px]">{lead.email}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-4 w-4 mr-2 text-gray-400" />
                        {lead.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap border-r border-gray-100 last:border-r-0">
                    <StatusBadge status={lead.status} />
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-900 border-r border-gray-100 last:border-r-0">
                    <span className="font-medium">{lead.qualification}</span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-900 border-r border-gray-100 last:border-r-0">
                    <span className="font-medium">{lead.interest}</span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-900 border-r border-gray-100 last:border-r-0">
                    <span className="px-2 py-1 bg-gray-100 rounded-md text-xs font-medium">
                      {lead.source}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-900 border-r border-gray-100 last:border-r-0">
                    <span className="font-medium">{lead.assignedTo}</span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(lead.updatedAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
      <div className={`${viewMode === 'cards' ? 'block' : 'lg:hidden'} p-6`}>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {sortedLeads.map((lead) => (
            <div
              key={lead._id}
              className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg hover:border-blue-200 transition-all duration-300 cursor-pointer group"
              onClick={() => onLeadClick(lead)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors truncate">
                    {lead.name}
                  </h4>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                    <span className="truncate">{lead.city}, {lead.state}</span>
                  </div>
                </div>
                <StatusBadge status={lead.status} />
              </div>

              {/* Contact Info */}
              <div className="space-y-3 mb-4 p-3 bg-white rounded-lg border border-gray-100">
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <Mail className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  <span className="truncate font-medium">{lead.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  <span className="font-medium">{lead.phone}</span>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <span className="text-gray-500 block mb-1">Qualification</span>
                  <span className="text-gray-900 font-semibold">{lead.qualification}</span>
                </div>
                <div>
                  <span className="text-gray-500 block mb-1">Interest</span>
                  <span className="text-gray-900 font-semibold">{lead.interest}</span>
                </div>
                <div>
                  <span className="text-gray-500 block mb-1">Source</span>
                  <span className="inline-block px-2 py-1 bg-gray-100 rounded-md text-xs font-medium text-gray-700">
                    {lead.source}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block mb-1">Assigned To</span>
                  <span className="text-gray-900 font-semibold">{lead.assignedTo}</span>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="text-xs text-gray-500">
                  Updated {formatDate(lead.updatedAt)}
                </div>
                <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors group-hover:shadow-md">
                  <Eye className="h-4 w-4" />
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      )}
    </div>
  );
}