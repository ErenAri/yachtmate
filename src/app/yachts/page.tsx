import { Suspense } from 'react';
import YachtsClient from './YachtsClient';

export default function YachtsPage() {
  return (
    <Suspense fallback={<div>Loading yachts...</div>}>
      <YachtsClient />
    </Suspense>
  );
}
