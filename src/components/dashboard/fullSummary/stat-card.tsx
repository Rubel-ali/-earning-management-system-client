import { ReactNode } from 'react';

interface StatCardProps {
  icon: ReactNode;
  value: string | number;
  label: string;
  iconBgColor: string;
  link?: string;
}

export function StatCard({ icon, value, label, iconBgColor, link }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg border border-border p-6 hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${iconBgColor}`}>
        {icon}
      </div>
      <p className="text-3xl font-bold text-foreground mb-1">{value}</p>
      <p className="text-sm text-muted-foreground mb-3">{label}</p>
      {link && <a href={link} className="text-xs text-primary hover:underline font-medium">{link}</a>}
    </div>
  );
}
