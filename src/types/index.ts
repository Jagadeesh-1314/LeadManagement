export interface Lead {
  id: string;
  name: string;
  phone: string;
  altPhone?: string;
  email: string;
  altEmail?: string;
  status: 'New' | 'Follow-Up' | 'Qualified' | 'Converted';
  qualification: string;
  interest: string;
  source: string;
  assignedTo: string;
  jobInterest: string;
  state: string;
  city: string;
  passoutYear: string;
  heardFrom: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface FilterCondition {
  id: string;
  field: string;
  operator: string;
  value: string;
}

export interface FilterState {
  conditions: FilterCondition[];
  logic: 'AND' | 'OR';
}