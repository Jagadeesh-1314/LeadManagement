import { useState, useRef, useEffect } from 'react';
import { Filter, X, Plus, Zap, ChevronDown, Check } from 'lucide-react';
import { Button } from './ui/Button';
import type { FilterState, FilterCondition } from '../types';

interface FilterSectionProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
}

function CustomSelect({ value, onChange, options, placeholder = "Select...", className = "" }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const selectRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && highlightedIndex >= 0 && optionsRef.current) {
      const highlightedElement = optionsRef.current.children[highlightedIndex] as HTMLElement;
      highlightedElement?.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightedIndex, isOpen]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isOpen && (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown')) {
      event.preventDefault();
      setIsOpen(true);
      setHighlightedIndex(0);
      return;
    }

    if (!isOpen) return;

    switch (event.key) {
      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
      case 'ArrowDown':
        event.preventDefault();
        setHighlightedIndex(prev => 
          prev < options.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        event.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : prev);
        break;
      case 'Enter':
        event.preventDefault();
        if (highlightedIndex >= 0) {
          onChange(options[highlightedIndex].value);
          setIsOpen(false);
          setHighlightedIndex(-1);
        }
        break;
    }
  };

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  return (
    <div ref={selectRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={`
          w-full px-4 py-2.5 text-left bg-white border border-gray-300 rounded-lg shadow-sm
          hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          transition-all duration-200 flex items-center justify-between
          ${isOpen ? 'ring-2 ring-blue-500 border-blue-500' : ''}
        `}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={`text-sm ${selectedOption ? 'text-gray-900' : 'text-gray-500'}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown 
          className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          <div ref={optionsRef} className="py-1" role="listbox">
            {options.map((option, index) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleOptionClick(option.value)}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={`
                  w-full px-4 py-2.5 text-left text-sm transition-colors duration-150
                  flex items-center justify-between
                  ${highlightedIndex === index ? 'bg-blue-50 text-blue-900' : 'text-gray-900'}
                  ${option.value === value ? 'bg-blue-100 text-blue-900' : ''}
                  hover:bg-blue-50 hover:text-blue-900
                `}
                role="option"
                aria-selected={option.value === value}
              >
                <span>{option.label}</span>
                {option.value === value && (
                  <Check className="h-4 w-4 text-blue-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const fieldOptions = [
  { value: 'name', label: 'Name' },
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'status', label: 'Status' },
  { value: 'source', label: 'Source' },
  { value: 'value', label: 'Value' }
];

const operatorOptions = [
  { value: 'equals', label: 'Equals' },
  { value: 'contains', label: 'Contains' },
  { value: 'greater', label: 'Greater than' },
  { value: 'less', label: 'Less than' }
];

export function FilterSection({ filters, onFiltersChange }: FilterSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const addCondition = () => {
    const newCondition: FilterCondition = {
      id: crypto.randomUUID(),
      field: 'name',
      operator: 'contains',
      value: ''
    };
    
    onFiltersChange({
      ...filters,
      conditions: [...filters.conditions, newCondition]
    });
  };

  const removeCondition = (index: number) => {
    onFiltersChange({
      ...filters,
      conditions: filters.conditions.filter((_, i) => i !== index)
    });
  };

  const updateCondition = (index: number, updates: Partial<FilterCondition>) => {
    const updatedConditions = filters.conditions.map((condition, i) =>
      i === index ? { ...condition, ...updates } : condition
    );
    
    onFiltersChange({
      ...filters,
      conditions: updatedConditions
    });
  };

  const hasActiveFilters = filters.conditions.length > 0;

  return (
    <div className="w-full">
      {/* Filter Toggle Button */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setIsExpanded(!isExpanded)}
          icon={Filter}
          className={`relative transition-all duration-200 ${
            hasActiveFilters 
              ? 'ring-2 ring-blue-200 border-blue-300 bg-blue-50 text-blue-700' 
              : 'hover:bg-gray-50'
          }`}
        >
          Advanced Filters
          {hasActiveFilters && (
            <span className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-md animate-pulse">
              {filters.conditions.length}
            </span>
          )}
        </Button>

        {hasActiveFilters && (
          <button
            onClick={() => onFiltersChange({ conditions: [], logic: 'AND' })}
            className="ml-3 text-sm text-gray-500 hover:text-red-600 underline transition-colors duration-200 hover:no-underline flex items-center gap-1"
          >
            <X className="h-3 w-3" />
            Clear all
          </button>
        )}
      </div>

      {/* Filter Panel */}
      {isExpanded && (
        <div className="mt-4 p-6 bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl shadow-lg backdrop-blur-sm">
          <div className="space-y-6">
            {/* Logic Selector */}
            {filters.conditions.length > 1 && (
              <div className="flex items-center gap-3 p-3 bg-white/80 rounded-lg border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">Match:</span>
                </div>
                <CustomSelect
                  value={filters.logic}
                  onChange={(value) => onFiltersChange({ ...filters, logic: value as 'AND' | 'OR' })}
                  options={[
                    { value: 'AND', label: 'All conditions' },
                    { value: 'OR', label: 'Any condition' }
                  ]}
                  className="w-40"
                />
              </div>
            )}

            {/* Conditions */}
            <div className="space-y-4">
              {filters.conditions.map((condition, index) => (
                <div 
                  key={condition.id || index} 
                  className="group relative p-4 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div className="flex flex-col lg:flex-row gap-3">
                    {/* Field Select */}
                    <div className="flex-1 min-w-0">
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">Field</label>
                      <CustomSelect
                        value={condition.field}
                        onChange={(value) => updateCondition(index, { field: value })}
                        options={fieldOptions}
                        className="w-full"
                      />
                    </div>

                    {/* Operator Select */}
                    <div className="flex-1 min-w-0">
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">Condition</label>
                      <CustomSelect
                        value={condition.operator}
                        onChange={(value) => updateCondition(index, { operator: value as any })}
                        options={operatorOptions}
                        className="w-full"
                      />
                    </div>

                    {/* Value Input */}
                    <div className="flex-1 min-w-0">
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">Value</label>
                      <input
                        type="text"
                        value={condition.value?.toString() || ''}
                        onChange={(e) => updateCondition(index, { value: e.target.value })}
                        placeholder="Enter value..."
                        className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg bg-white shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      />
                    </div>

                    {/* Remove Button */}
                    <div className="flex items-end lg:items-center">
                      <button
                        onClick={() => removeCondition(index)}
                        className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200 rounded-lg opacity-0 group-hover:opacity-100"
                        title="Remove condition"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Condition Button */}
            <div className="pt-2">
              <Button
                variant="outline"
                onClick={addCondition}
                icon={Plus}
                size="md"
                className="w-full sm:w-auto border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200"
              >
                Add Condition
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}