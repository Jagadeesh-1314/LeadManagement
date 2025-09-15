import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from './ui/Button';
import { Dropdown } from './ui/Dropdown';
import { Input } from './ui/Input';
import type { FilterState, FilterCondition } from '../types';

interface FilterSectionProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

const filterFields = [
  { value: 'name', label: 'Name' },
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'status', label: 'Status' },
  { value: 'qualification', label: 'Qualification' },
  { value: 'source', label: 'Source' },
];

const operators = [
  { value: 'contains', label: 'Contains' },
  { value: 'equals', label: 'Equals' },
  { value: 'startsWith', label: 'Starts with' },
  { value: 'endsWith', label: 'Ends with' },
];

export const FilterSection: React.FC<FilterSectionProps> = ({
  filters,
  onFiltersChange,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const addFilter = () => {
    const newCondition: FilterCondition = {
      id: Date.now().toString(),
      field: '',
      operator: 'contains',
      value: '',
    };

    onFiltersChange({
      ...filters,
      conditions: [...filters.conditions, newCondition],
    });
    setIsExpanded(true);
  };

  const removeFilter = (id: string) => {
    onFiltersChange({
      ...filters,
      conditions: filters.conditions.filter(condition => condition.id !== id),
    });
  };

  const updateFilter = (id: string, field: keyof FilterCondition, value: string) => {
    onFiltersChange({
      ...filters,
      conditions: filters.conditions.map(condition =>
        condition.id === id ? { ...condition, [field]: value } : condition
      ),
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      conditions: [],
      logic: 'AND',
    });
    setIsExpanded(false);
  };

  const applyFilters = () => {
    // Logic to apply filters would go here
    console.log('Applying filters:', filters);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-700">Advanced Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          icon={Plus}
          onClick={addFilter}
        >
          Add Filter
        </Button>
      </div>

      {filters.conditions.length > 0 && (
        <div className="space-y-4">
          {filters.conditions.length > 1 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Match</span>
              <Dropdown
                value={filters.logic}
                onChange={(value) => onFiltersChange({ ...filters, logic: value as 'AND' | 'OR' })}
                options={[
                  { value: 'AND', label: 'ALL conditions' },
                  { value: 'OR', label: 'ANY condition' },
                ]}
                className="w-40"
              />
            </div>
          )}

          {filters.conditions.map((condition, index) => (
            <div key={condition.id} className="flex items-end space-x-2">
              {index > 0 && (
                <span className="text-sm text-gray-500 mb-2">
                  {filters.logic}
                </span>
              )}

              <Dropdown
                value={condition.field}
                onChange={(value) => updateFilter(condition.id, 'field', value)}
                options={filterFields}
                placeholder="Select field"
                className="flex-1"
              />

              <Dropdown
                value={condition.operator}
                onChange={(value) => updateFilter(condition.id, 'operator', value)}
                options={operators}
                className="flex-1"
              />

              <Input
                value={condition.value}
                onChange={(value) => updateFilter(condition.id, 'value', value)}
                placeholder="Enter value"
                className="flex-1"
              />

              <Button
                variant="ghost"
                size="sm"
                icon={X}
                onClick={() => removeFilter(condition.id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                children={undefined}
              />
            </div>
          ))}

          <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200">
            <Button variant="outline" size="sm" onClick={clearFilters}>
              Clear
            </Button>
            <Button size="sm" onClick={applyFilters}>
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};