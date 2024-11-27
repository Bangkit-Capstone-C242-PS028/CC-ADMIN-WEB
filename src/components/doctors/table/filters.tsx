import { Checkbox } from "@/components/ui/checkbox";

interface FiltersProps {
  showPending: boolean;
  showDocument: boolean;
  onFilterChange: (updates: Record<string, string | undefined>) => void;
}

export function DoctorFilters({
  showPending,
  showDocument,
  onFilterChange,
}: FiltersProps) {
  return (
    <div className="flex gap-6 mb-4">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="showPending"
          checked={showPending}
          onCheckedChange={(checked) => {
            onFilterChange({ showPending: checked ? "true" : undefined });
          }}
        />
        <label htmlFor="showPending" className="text-sm">
          Show pending doctors
        </label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="showDocument"
          checked={showDocument}
          onCheckedChange={(checked) => {
            onFilterChange({ showDocument: checked ? "true" : undefined });
          }}
        />
        <label htmlFor="showDocument" className="text-sm">
          Show doctors with documents
        </label>
      </div>
    </div>
  );
}
