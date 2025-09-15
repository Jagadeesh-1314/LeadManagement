import type { Lead, FilterState } from '../types';

export const applyFiltersToLeads = (
  leads: Lead[],
  filters: FilterState
): Lead[] => {
  if (!filters.conditions.length) return leads;

  return leads.filter((lead) => {
    const results = filters.conditions.map((condition) => {
      const fieldValue = (lead[condition.field as keyof Lead] ?? '').toString().toLowerCase();
      const filterValue = condition.value.toLowerCase();

      switch (condition.operator) {
        case 'contains':
          return fieldValue.includes(filterValue);
        case 'equals':
          return fieldValue === filterValue;
        case 'startsWith':
          return fieldValue.startsWith(filterValue);
        case 'endsWith':
          return fieldValue.endsWith(filterValue);
        default:
          return true;
      }
    });

    return filters.logic === 'AND'
      ? results.every(Boolean)
      : results.some(Boolean);
  });
};
