import { useApiData } from '@/hooks/useApiData';
import { API_ENDPOINTS } from '@/utils/constants';
import { useState } from 'react';
import Image from 'next/image';
interface DogData {
  message: string;
  status: string;
}

export const DogWidget = () => {
  const [refreshCount, setRefreshCount] = useState(0);
  const { data, loading, error, refetch } = useApiData<DogData>(
    `${API_ENDPOINTS.DOG}?v=${refreshCount}`
  );

  const handleRefresh = () => {
    setRefreshCount(prev => prev + 1);
    refetch();
  };

  if (loading) return <div className="p-4">Loading dog image...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">Random Dog</h3>
        <button 
          onClick={handleRefresh}
          className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-sm hover:bg-indigo-200 transition-colors"
        >
          Refresh
        </button>
      </div>
      {data && (
        <div className="overflow-hidden rounded-lg">
          <Image
  src={data.message}
  alt={data.message}
  width={300} 
  height={160}
  className="w-full h-40 object-cover rounded-lg"
/>
        </div>
      )}
    </div>
  );
};