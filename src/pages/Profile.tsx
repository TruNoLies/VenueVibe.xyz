import { PageHeader } from '../components/layout/PageHeader';

export default function Profile() {
  // ... existing code

  return (
    <div className="space-y-8">
      <PageHeader
        title={profile?.name || 'Profile'}
        backTo="/"
        backLabel="Back to Home"
      />
      {/* Rest of the component */}
    </div>
  );
}