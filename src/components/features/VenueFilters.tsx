import { VoiceSearch } from '../ai/VoiceSearch';

// ... existing imports ...

export function VenueFilters({ search, onSearchChange, ...props }: VenueFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative flex items-center">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="search"
            placeholder="Search venues..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-12"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <VoiceSearch onResult={onSearchChange} />
          </div>
        </div>
        
        {/* ... rest of the component */}
      </div>
    </div>
  );
}