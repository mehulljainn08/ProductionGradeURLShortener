import React from 'react';
import { useFetchLinkAnalytics } from '../../hooks/useQuery';
import { useStoreContext } from '../../contextApi/ContextApi';
import dayjs from 'dayjs';

const LinkAnalytics = () => {
  const { token } = useStoreContext();

  const { isLoading, data = [], isError } = useFetchLinkAnalytics(token, () =>
    console.log("Analytics API failed")
  );

  if (isLoading) return <p>Loading link analytics...</p>;
  if (isError || !data.length) return <p>No link analytics available.</p>;

  return (
    <div className="mt-10 bg-white p-4 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-slate-700">Link-wise Click Analytics</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-slate-600">
          <thead className="bg-slate-200 text-slate-800">
            <tr>
              <th className="px-4 py-2">Short URL</th>
              <th className="px-4 py-2">Click Date</th>
              <th className="px-4 py-2">Click Count</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, idx) => (
              <tr key={idx} className="border-b hover:bg-slate-50">
                <td className="px-4 py-2">{entry.shortUrl}</td>
                <td className="px-4 py-2">{dayjs(entry.clickDate).format('MMM DD, YYYY')}</td>
                <td className="px-4 py-2">{entry.clickCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LinkAnalytics;
