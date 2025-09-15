import React from 'react';
import { LayoutDashboard, Users, Calendar, BarChart3, Package, Bell, Settings, DivideIcon as LucideIcon } from 'lucide-react';

interface SidebarItem {
  icon: LucideIcon;
  label: string;
  active?: boolean;
}

interface SidebarProps {
  activeItem: string;
  onItemClick: (item: string) => void;
}

const sidebarItems: SidebarItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard' },
  { icon: Users, label: 'Leads' },
  { icon: Calendar, label: 'Follow-ups' },
  { icon: BarChart3, label: 'Sales Activity' },
  { icon: Package, label: 'Products' },
  { icon: Bell, label: 'Notifications' },
  { icon: Settings, label: 'Settings' },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeItem, onItemClick }) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-900">CRM Dashboard</h1>
      </div>
      <nav className="mt-6">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.label.toLowerCase() === activeItem.toLowerCase();
          
          return (
            <button
              key={item.label}
              onClick={() => onItemClick(item.label.toLowerCase())}
              className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
                isActive 
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                  : 'text-gray-700'
              }`}
            >
              <Icon className="h-5 w-5 mr-3" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};