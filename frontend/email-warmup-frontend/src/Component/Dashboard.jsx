// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [emailConfigs, setEmailConfigs] = useState([]);
  const [emailStatuses, setEmailStatuses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/dashboard');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setEmailConfigs(data.emailConfigs);
        setEmailStatuses(data.emailStatuses);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data', error);
        setLoading(false);
      }
    };
    setInterval(fetchData, 2000);  // Calls myFunction every 2 seconds indefinitely

    // fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-700 mb-6">Email Dashboard</h1>

        {/* Email Configurations Table */}
        <section className="mb-8">
          <h2 className="text-2xl font-medium text-gray-600 mb-4">Email Configurations</h2>
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Emails/Day</th>
                  <th className="px-6 py-3 text-left">Interval (Min)</th>
                  <th className="px-6 py-3 text-left">Receivers Email</th>
                  <th className="px-6 py-3 text-left">Created At</th>
                </tr>
              </thead>
              <tbody>
                {emailConfigs.map((config) => (
                  <tr key={config._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{config.email}</td>
                    <td className="px-6 py-4">{config.numberOfEmailsPerDay}</td>
                    <td className="px-6 py-4">{config.intervalInMinutes}</td>
                    <td className="px-6 py-4">{config.receiversEmail}</td>
                    <td className="px-6 py-4">{new Date(config.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Email Statuses Table */}
        <section>
          <h2 className="text-2xl font-medium text-gray-600 mb-4">Email Statuses</h2>
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Timestamp</th>
                  <th className="px-6 py-3 text-left">Expected Reply Time</th>
                </tr>
              </thead>
              <tbody>
                {emailStatuses.map((status) => (
                  <tr key={status._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{status.email}</td>
                    <td className="px-6 py-4">{status.status}</td>
                    <td className="px-6 py-4">{new Date(status.timestamp).toLocaleString()}</td>
                    <td className="px-6 py-4">
                      {status.expectedReplyTime ? new Date(status.expectedReplyTime).toLocaleString() : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
