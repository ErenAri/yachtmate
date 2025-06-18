import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const YachtsClient = dynamic(() => import('./YachtsClient'), { ssr: false });

export default function YachtsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <YachtsClient />
    </Suspense>
  );
}
