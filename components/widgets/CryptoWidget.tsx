import { useApiData } from '@/hooks/useApiData';
import { API_ENDPOINTS } from '@/utils/constants';

interface CryptoData {
  bitcoin: {
    usd: number;
  };
  ethereum: {
    usd: number;
  };
}
export const CryptoWidget = () => {
  const { data, loading, error } = useApiData<CryptoData>(API_ENDPOINTS.CRYPTO);

  if (loading) return <div className="p-4">Loading crypto prices...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Crypto Prices</h3>
      <div className="space-y-2">
        {data && (
          <>
            <div className="flex justify-between items-center">
              <span>Bitcoin:</span>
              <span className="font-semibold">${data.bitcoin.usd.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Ethereum:</span>
              <span className="font-semibold">${data.ethereum.usd.toLocaleString()}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};