import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useQuery, gql } from '@apollo/client';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const GET_TRANSACTIONS = gql`
  query GetMerchantTransactions($merchantId: String!) {
    getMerchantTransactions(merchantId: $merchantId) {
      _id
      to
      from
      amount
      status
      timestamp
    }
  }
`;

const Analytics = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  const merchantId = localStorage.getItem('merchantId'); // Changed from 'userId' to 'merchantId'
  
  const { loading, error, data } = useQuery(GET_TRANSACTIONS, {
    variables: { merchantId },
    skip: !merchantId // Skip the query if merchantId is not available
  });

  useEffect(() => {
    if (!merchantId) {
      console.error('No merchant ID found in localStorage');
      return;
    }
    
    if (loading) return;
    if (error) {
      console.error('Error fetching transaction data:', error);
      return;
    }
    if (!data) return;

    const transactions = data.getMerchantTransactions;
    
    // Process transactions for the chart
    const sortedTransactions = [...transactions].sort((a, b) => 
      new Date(a.timestamp) - new Date(b.timestamp)
    );

    const labels = sortedTransactions.map(t => 
      new Date(t.timestamp).toLocaleDateString()
    );

    const sentAmounts = sortedTransactions.map(t => 
      t.from === merchantId ? t.amount : 0
    );

    const receivedAmounts = sortedTransactions.map(t => 
      t.to === merchantId ? t.amount : 0
    );

    setChartData({
      labels,
      datasets: [
        {
          label: 'Sent Amount',
          data: sentAmounts,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          tension: 0.1
        },
        {
          label: 'Received Amount',
          data: receivedAmounts,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          tension: 0.1
        }
      ]
    });
  }, [loading, error, data, merchantId]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Transaction History',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount (₹)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Date'
        }
      }
    }
  };

  if (!merchantId) return (
    <div className="flex justify-center items-center h-64">
      <div className="text-xl text-red-500">Please log in to view analytics</div>
    </div>
  );

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="text-xl">Loading...</div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center h-64">
      <div className="text-xl text-red-500">Error loading transaction data</div>
    </div>
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl text-white font-bold mb-6">Transaction Analytics</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <Line options={options} data={chartData} />
      </div>
    </div>
  );
};

export default Analytics;
