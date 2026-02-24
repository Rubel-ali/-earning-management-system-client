'use client';

import { Clock, Edit2, Trash2 } from 'lucide-react';

interface ServiceCardProps {
  id: string;
  name: string;
  duration: number;
  requiredStaffType: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ServiceCard({
  id,
  name,
  duration,
  requiredStaffType,
  onEdit,
  onDelete,
}: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg border border-border p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold">{name}</h3>
        <div className="flex gap-2">
          <button onClick={() => onEdit(id)} className="p-2 hover:bg-gray-100 rounded-lg text-primary">
            <Edit2 size={18} />
          </button>
          <button onClick={() => onDelete(id)} className="p-2 hover:bg-gray-100 rounded-lg text-red-500">
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 text-muted-foreground mb-2">
        <Clock size={16} />
        <span>{duration} minutes</span>
      </div>

      <p className="text-sm">
        Required: <span className="font-medium">{requiredStaffType}</span>
      </p>
    </div>
  );
}