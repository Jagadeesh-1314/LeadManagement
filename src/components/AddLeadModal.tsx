import React, { useRef, useState } from 'react';
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

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const fieldRefs: { [key: string]: React.RefObject<HTMLInputElement | null> } = {
    name: useRef<HTMLInputElement>(null),
    phone: useRef<HTMLInputElement>(null),
    altPhone: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    altEmail: useRef<HTMLInputElement>(null),
    assignedTo: useRef<HTMLInputElement>(null),
    state: useRef<HTMLInputElement>(null),
    city: useRef<HTMLInputElement>(null),
    passoutYear: useRef<HTMLInputElement>(null),
    heardFrom: useRef<HTMLInputElement>(null),
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};

    // Required fields
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone must be 10 digits';
    if (formData.altPhone && !/^\d{10}$/.test(formData.altPhone)) newErrors.altPhone = 'Alt phone must be 10 digits';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (formData.altEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.altEmail)) newErrors.altEmail = 'Invalid alt email';
    if (!formData.qualification) newErrors.qualification = 'Qualification is required';
    if (!formData.interest) newErrors.interest = 'Interest is required';
    if (!formData.source) newErrors.source = 'Source is required';
    if (!formData.jobInterest) newErrors.jobInterest = 'Job Interest is required';
    if (!formData.assignedTo.trim()) newErrors.assignedTo = 'Assigned to is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!/^\d{4}$/.test(formData.passoutYear)) newErrors.passoutYear = 'Passout year must be 4 digits';
    if (!formData.heardFrom.trim()) newErrors.heardFrom = 'Heard From is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstField = Object.keys(newErrors)[0];
      const ref = fieldRefs[firstField];
      if (ref && ref.current) {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        ref.current.focus();
      }

      return;
    }

    // No errors — submit
    onAddLead(formData);
    setErrors({});
    onClose();

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
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Lead" size="xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[70vh] overflow-y-auto pr-2">
          <Input
            label="Name"
            value={formData.name}
            onChange={(value) => updateFormData('name', value)}
            ref={fieldRefs.name}
            className={errors.name ? 'border-red-500 animate-shake' : ''}
            error={errors.name}
            required
          />
          <Input
            label="Phone"
            type="tel"
            value={formData.phone}
            onChange={(value) => updateFormData('phone', value.replace(/\D/g, ''))}
            ref={fieldRefs.phone}
            className={errors.phone ? 'border-red-500 animate-shake' : ''}
            error={errors.phone}
            required
          />
          <Input
            label="Alt. Phone"
            type="tel"
            value={formData.altPhone}
            onChange={(value) => updateFormData('altPhone', value.replace(/\D/g, ''))}
            ref={fieldRefs.altPhone}
            className={errors.altPhone ? 'border-red-500 animate-shake' : ''}
            error={errors.altPhone}
          />
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(value) => updateFormData('email', value)}
            ref={fieldRefs.email}
            className={errors.email ? 'border-red-500 animate-shake' : ''}
            error={errors.email}
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
          <Input
            label="Assigned To"
            value={formData.assignedTo}
            onChange={(value) => updateFormData('assignedTo', value)}
            ref={fieldRefs.assignedTo}
            className={errors.assignedTo ? 'border-red-500 animate-shake' : ''}
            error={errors.assignedTo}
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
            ref={fieldRefs.state}
            className={errors.state ? 'border-red-500 animate-shake' : ''}
            error={errors.state}
            required
          />
          <Input
            label="City"
            value={formData.city}
            onChange={(value) => updateFormData('city', value)}
            ref={fieldRefs.city}
            className={errors.city ? 'border-red-500 animate-shake' : ''}
            error={errors.city}
            required
          />
          <Input
            label="Passout Year"
            type="text"
            value={formData.passoutYear}
            onChange={(value) => updateFormData('passoutYear', value.replace(/\D/g, ''))}
            ref={fieldRefs.passoutYear}
            className={errors.passoutYear ? 'border-red-500 animate-shake' : ''}
            error={errors.passoutYear}
            required
          />
          <Input
            label="Heard From"
            value={formData.heardFrom}
            onChange={(value) => updateFormData('heardFrom', value)}
            ref={fieldRefs.heardFrom}
            className={errors.heardFrom ? 'border-red-500 animate-shake' : ''}
            error={errors.heardFrom}
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