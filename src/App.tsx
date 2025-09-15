import { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { Sidebar } from './components/ui/Sidebar';
import { Button } from './components/ui/Button';
import { FilterSection } from './components/FilterSection';
import { LeadsTable } from './components/LeadsTable';
import { AddLeadModal } from './components/AddLeadModal';
import { mockLeads } from './data/mockLeads';
import type { Lead, FilterState } from './types';
import { applyFiltersToLeads } from './components/applyFiltersToLeads';

function App() {
  const [activeView, setActiveView] = useState('leads');
  const [searchQuery, setSearchQuery] = useState('');
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [filters, setFilters] = useState<FilterState>({
    conditions: [],
    logic: 'AND',
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddLead = (newLead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>) => {
    const lead: Lead = {
      ...newLead,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setLeads(prev => [lead, ...prev]);
  };

  const handleLeadClick = (lead: Lead) => {
    console.log('Lead clicked:', lead);
    // Here you would typically navigate to a lead detail page
  };

  const filteredByAdvanced = applyFiltersToLeads(leads, filters);

  const filteredLeads = filteredByAdvanced.filter(lead => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      lead.name.toLowerCase().includes(query) ||
      lead.email.toLowerCase().includes(query) ||
      lead.phone.toLowerCase().includes(query)
    );
  });

  if (activeView !== 'leads') {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar activeItem={activeView} onItemClick={setActiveView} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              {activeView.charAt(0).toUpperCase() + activeView.slice(1)}
            </h2>
            <p className="text-gray-600">This page is coming soon!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeItem={activeView} onItemClick={setActiveView} />
      
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Leads Management</h1>
            <Button 
              icon={Plus} 
              onClick={() => setIsAddModalOpen(true)}
            >
              Add New Lead
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="space-y-6 mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search leads by name, email, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <FilterSection
              filters={filters}
              onFiltersChange={setFilters}
            />
          </div>

          {/* Results Summary */}
          <div className="mb-6">
            <p className="text-sm text-gray-600">
              Showing {filteredLeads.length} of {leads.length} leads
            </p>
          </div>

          {/* Leads Table */}
          <LeadsTable 
            leads={filteredLeads} 
            onLeadClick={handleLeadClick}
          />
        </div>
      </div>

      {/* Add Lead Modal */}
      <AddLeadModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddLead={handleAddLead}
      />
    </div>
  );
}

export default App;