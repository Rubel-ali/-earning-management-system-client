'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { useAllQueueQuery } from '@/redux/features/queue/queueApi';
import { AssignStaffDialog } from '@/components/dashboard/queue/assign-staff-dialog';

export default function QueuePage() {
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useAllQueueQuery([]);

  const [selectedQueue, setSelectedQueue] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  if (isLoading)
    return <p className="p-10 text-center">Loading queue...</p>;

  if (isError)
    return (
      <p className="p-10 text-center text-red-500">
        Failed to load queue
      </p>
    );

  return (
    <div className="flex h-screen">
      <main className="flex-1 overflow-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Waiting Queue</h1>

        {data?.data?.length === 0 && (
          <p className="text-muted-foreground">Queue empty</p>
        )}

        <div className="space-y-5">
          {data?.data?.map((entry: any) => (
            <div
              key={entry.queueId}
              className="border rounded-lg p-6 bg-white"
            >
              <div className="flex justify-between mb-3">
                <span className="bg-primary text-white px-3 py-1 rounded text-sm">
                  Position #{entry.position}
                </span>

                {!entry.staff && (
                  <Button
                    onClick={() => {
                      setSelectedQueue(entry);
                      setDialogOpen(true);
                    }}
                  >
                    Assign Staff
                  </Button>
                )}
              </div>

              <p><b>Patient:</b> {entry.customerName}</p>
              <p>
                <b>Date:</b>{' '}
                {new Date(entry.appointmentDate).toLocaleDateString()} |{' '}
                {entry.startTime} - {entry.endTime}
              </p>

              {!entry.staff && (
                <div className="mt-3 flex items-center gap-2 text-yellow-700 bg-yellow-50 p-2 rounded">
                  <AlertCircle className="w-4 h-4" />
                  Staff not assigned
                </div>
              )}

              {entry.staff && (
                <div className="mt-3 flex items-center gap-2 text-green-700 bg-green-50 p-2 rounded">
                  <CheckCircle className="w-4 h-4" />
                  Assigned to {entry.staff}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Assign Staff Dialog */}
      {selectedQueue && (
        <AssignStaffDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          queueId={selectedQueue.queueId}
          queuePosition={selectedQueue.position}
          patientName={selectedQueue.customerName}
          onAssigned={refetch}     // ✅ auto refresh
        />
      )}
    </div>
  );
}