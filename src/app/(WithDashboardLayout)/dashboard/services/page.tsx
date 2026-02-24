'use client';

import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ServiceCard } from '@/components/dashboard/services/service-card';
import { AddServiceDialog } from '@/components/dashboard/services/add-service-dialog';
import {
  useAllServicesQuery,
  useDeleteServiceMutation,
  useUpdateServiceMutation,
} from '@/redux/features/services/servicesApi';

interface Service {
  id: string;
  name: string;
  duration: number;
  requiredStaffType: string;
}

export default function ServicesPage() {
  const { data, isLoading } = useAllServicesQuery(undefined);
  const [deleteService] = useDeleteServiceMutation();
  const [updateService] = useUpdateServiceMutation();

  const [services, setServices] = useState<Service[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // 🔄 API → Local state
  useEffect(() => {
    if (data?.data) {
      setServices(data.data);
    }
  }, [data]);

  // 🗑 Delete Service
  const handleDelete = async (id: string) => {
    try {
      await deleteService(id).unwrap();
      setServices((prev) => prev.filter((s) => s.id !== id));
    } catch (error) {
      console.error('Delete failed', error);
      alert('Failed to delete service');
    }
  };

  // ✏️ Edit Service (placeholder – dialog later)
  const handleEdit = async (id: string) => {
    const service = services.find((s) => s.id === id);
    if (!service) return;

    try {
      await updateService({
        id,
        data: {
          name: service.name,
          duration: service.duration,
          requiredStaffType: service.requiredStaffType,
        },
      }).unwrap();
    } catch (error) {
      console.error('Update failed', error);
      alert('Failed to update service');
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-border px-8 py-6">
          <h1 className="text-3xl font-bold text-foreground mb-1">
            Service Management
          </h1>
          <p className="text-muted-foreground text-sm">
            Define services offered and their requirements
          </p>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* ➕ Add Service Button */}
          <div className="flex justify-end mb-6">
            <Button
              onClick={() => setIsAddDialogOpen(true)}
              className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Service
            </Button>
          </div>

          {/* Services Grid */}
          {isLoading ? (
            <p className="text-muted-foreground text-center">
              Loading services...
            </p>
          ) : services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  id={service.id}
                  name={service.name}
                  duration={service.duration}
                  requiredStaffType={service.requiredStaffType}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No services added yet.
              </p>
              <p className="text-muted-foreground/60 mt-1">
                Click “Add Service” to create your first service.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* 🧾 Add Service Dialog */}
      <AddServiceDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />
    </div>
  );
}