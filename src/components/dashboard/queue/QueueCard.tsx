'use client';

import {
  Calendar,
  Clock,
  User,
  AlertTriangle,
} from 'lucide-react';

interface QueueCardProps {
  position: number;
  patientName: string;
  serviceName: string;
  duration: number;
  date: string;
  time: string;
  needs: string;
  staffAvailable: boolean;
}

export function QueueCard({
  position,
  patientName,
  serviceName,
  duration,
  date,
  time,
  needs,
  staffAvailable,
}: QueueCardProps) {
  return (
    <div className="border rounded-xl p-5 bg-white space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
          Position #{position}
        </span>

        {!staffAvailable && (
          <span className="text-sm text-muted-foreground">
            No staff available
          </span>
        )}
      </div>

      {/* Patient */}
      <div className="flex items-center gap-2">
        <User className="w-4 h-4 text-muted-foreground" />
        <span className="font-semibold">{patientName}</span>
      </div>

      {/* Service */}
      <div className="text-sm space-y-1">
        <p className="text-muted-foreground">
          Service: <span className="text-black">{serviceName}</span>
        </p>
        <p className="text-muted-foreground">
          Duration:{' '}
          <span className="text-black">{duration} minutes</span>
        </p>
      </div>

      {/* Date & Time */}
      <div className="flex justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          {date}
        </div>

        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {time}
        </div>
      </div>

      {/* Needs */}
      <div className="text-sm">
        <span className="text-muted-foreground">Needs:</span>{' '}
        <span className="font-medium">{needs}</span>
      </div>

      {/* Warning */}
      {!staffAvailable && (
        <div className="flex gap-2 items-start bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm p-3 rounded-lg">
          <AlertTriangle className="w-4 h-4 mt-0.5" />
          <p>
            No available <b>{needs}</b> staff for this time slot. Staff may be at
            capacity or on leave.
          </p>
        </div>
      )}
    </div>
  );
}