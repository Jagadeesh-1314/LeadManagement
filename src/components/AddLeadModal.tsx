import React, { useState } from 'react';
import { Modal } from './ui/Modal';
import { Input } from './ui/Input';
import { Dropdown } from './ui/Dropdown';
import { Button } from './ui/Button';
import type { Lead } from '../types';

interface AddLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

const statusOptions = [
  { value: 'New', label: 'New' },
  { value: 'Follow-Up', label: 'Follow-Up' },
  { value: 'Qualified', label: 'Qualified' },
  { value: 'Converted', label: 'Converted' },
];

const qualificationOptions = [
  { value: 'Hot', label: 'Hot' },
  { value: 'Warm', label: 'Warm' },
  { value: 'Cold', label: 'Cold' },
];

const interestOptions = [
  { value: 'High', label: 'High' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Low', label: 'Low' },
];

const sourceOptions = [
  { value: 'Website', label: 'Website' },
  { value: 'Social Media', label: 'Social Media' },
  { value: 'Referral', label: 'Referral' },
  { value: 'Email Campaign', label: 'Email Campaign' },
  { value: 'Phone Call', label: 'Phone Call' },
];

const assignedToOptions = [
  { value: 'John Doe', label: 'John Doe' },
  { value: 'Jane Smith', label: 'Jane Smith' },
  { value: 'Mike Johnson', label: 'Mike Johnson' },
  { value: 'Sarah Wilson', label: 'Sarah Wilson' },
];

const jobInterestOptions = [
  { value: 'Software Engineer', label: 'Software Engineer' },
  { value: 'Data Analyst', label: 'Data Analyst' },
  { value: 'Product Manager', label: 'Product Manager' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Sales', label: 'Sales' },
];

export const AddLeadModal: React.FC<AddLeadModalProps> = ({
  isOpen,
  onClose,
  onAddLead,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    altPhone: '',
    email: '',
    altEmail: '',
    status: 'New' as const,
    qualification: '',
    interest: '',
    source: '',
    assignedTo: '',
    jobInterest: '',
    state: '',
    city: '',
    passoutYear: '',
    heardFrom: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddLead(formData);
    setFormData({
      name: '',
      phone: '',
      altPhone: '',
      email: '',
      altEmail: '',
      status: 'New',
      qualification: '',
      interest: '',
      source: '',
      assignedTo: '',
      jobInterest: '',
      state: '',
      city: '',
      passoutYear: '',
      heardFrom: '',
    });
    onClose();
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Lead" size="xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Name"
            value={formData.name}
            onChange={(value) => updateFormData('name', value)}
            required
          />
          <Input
            label="Phone"
            type="tel"
            value={formData.phone}
            onChange={(value) => updateFormData('phone', value)}
            required
          />
          <Input
            label="Alt. Phone"
            type="tel"
            value={formData.altPhone}
            onChange={(value) => updateFormData('altPhone', value)}
          />
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(value) => updateFormData('email', value)}
            required
          />
          <Input
            label="Alt. Email"
            type="email"
            value={formData.altEmail}
            onChange={(value) => updateFormData('altEmail', value)}
          />
          <Dropdown
            label="Status"
            value={formData.status}
            onChange={(value) => updateFormData('status', value)}
            options={statusOptions}
            required
          />
          <Dropdown
            label="Qualification"
            value={formData.qualification}
            onChange={(value) => updateFormData('qualification', value)}
            options={qualificationOptions}
            required
          />
          <Dropdown
            label="Interest"
            value={formData.interest}
            onChange={(value) => updateFormData('interest', value)}
            options={interestOptions}
            required
          />
          <Dropdown
            label="Source"
            value={formData.source}
            onChange={(value) => updateFormData('source', value)}
            options={sourceOptions}
            required
          />
          <Dropdown
            label="Assigned To"
            value={formData.assignedTo}
            onChange={(value) => updateFormData('assignedTo', value)}
            options={assignedToOptions}
            required
          />
          <Dropdown
            label="Job Interest"
            value={formData.jobInterest}
            onChange={(value) => updateFormData('jobInterest', value)}
            options={jobInterestOptions}
            required
          />
          <Input
            label="State"
            value={formData.state}
            onChange={(value) => updateFormData('state', value)}
            required
          />
          <Input
            label="City"
            value={formData.city}
            onChange={(value) => updateFormData('city', value)}
            required
          />
          <Input
            label="Passout Year"
            value={formData.passoutYear}
            onChange={(value) => updateFormData('passoutYear', value)}
            required
          />
          <Input
            label="Heard From"
            value={formData.heardFrom}
            onChange={(value) => updateFormData('heardFrom', value)}
            required
          />
        </div>
        
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            Add Lead
          </Button>
        </div>
      </form>
    </Modal>
  );
};