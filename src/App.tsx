import { useEffect, useState } from 'react';
import Axios from 'axios';
import { Search, Plus } from 'lucide-react';
import { Sidebar } from './components/ui/Sidebar';
import { Button } from './components/ui/Button';
import { FilterSection } from './components/FilterSection';
import { LeadsTable } from './components/LeadsTable';
import { AddLeadModal } from './components/AddLeadModal';
import type { Lead, FilterState } from './types';
import { applyFiltersToLeads } from './components/applyFiltersToLeads';


function App() {
  const [activeView, setActiveView] = useState('leads');
  const [searchQuery, setSearchQuery] = useState('');
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    conditions: [],
    logic: 'AND',
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = () => {
    try {
      Axios.get('/api/leads/get')
        .then(response => {
          const loadedLeads = (response.data as Lead[]).map(lead => ({
            ...lead,
            createdAt: lead.createdAt ? new Date(lead.createdAt) : new Date(),
            updatedAt: lead.updatedAt ? new Date(lead.updatedAt) : new Date(),
          }));
          setLeads(loadedLeads);
        })
        .catch(error => {
          console.error('Error fetching leads:', error);
          setLeads([]);
        });
    } catch (error) {
      console.error('Error fetching leads:', error);
      setLeads([]);
    }
  };

  const handleAddLead = async (newLead: Omit<Lead, '_id' | 'createdAt' | 'updatedAt'>) => {
    try {
      // For development, simulate adding to mock data
      const tempLead: Lead = {
        ...newLead,
        _id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setLeads(prev => prev ? [tempLead, ...prev] : [tempLead]);
      const response = await Axios.post('/api/leads/create', newLead);
      const createdLead: Lead = response.data as Lead;
      setLeads(prev => prev ? [createdLead, ...prev] : [createdLead]);
    } catch (error) {
      console.error('Failed to add lead', error);
    }
  };

  const handleLeadClick = (lead: Lead) => {
    console.log('Lead clicked:', lead);
  };

  if (leads === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading leads...</p>
        </div>
      </div>
    );
  }

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

  if (activeView.toLowerCase() !== 'leads') {
    return (
      <div className="flex min-h-screen flex-col md:flex-row bg-gray-50">
        <Sidebar activeItem={activeView} onItemClick={setActiveView} />
        <div className="flex-1 flex items-center justify-center p-4">
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
    <div className="flex min-h-screen flex-col md:flex-row bg-gray-50">
      <Sidebar activeItem={activeView} onItemClick={setActiveView} />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 pt-16 md:pt-8 w-full">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Leads Management</h1>
            <Button icon={Plus} onClick={() => setIsAddModalOpen(true)} className="w-full sm:w-auto">
              Add New Lead
            </Button>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col gap-6 mb-8">
            {/* Search Bar */}
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search leads by name, email, or phone..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              />
            </div>

            {/* Filters */}
            <FilterSection filters={filters} onFiltersChange={setFilters} />
          </div>

          {/* Results Summary */}
          <div className="mb-6">
            <p className="text-sm text-gray-600">
              Showing <span className="font-medium">{filteredLeads.length}</span> of <span className="font-medium">{leads.length}</span> leads
              {searchQuery && (
                <span> matching "{searchQuery}"</span>
              )}
            </p>
          </div>

          {/* Leads Table */}
          <LeadsTable leads={filteredLeads} onLeadClick={handleLeadClick} />
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