'use client'

import { useState } from 'react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';


const marketData = [
  { name: 'Jan', yes: 4000, no: 2400, amm: 2400, volume: 1000 },
  { name: 'Feb', yes: 3000, no: 1398, amm: 2210, volume: 1500 },
  { name: 'Mar', yes: 2000, no: 9800, amm: 2290, volume: 2000 },
  { name: 'Apr', yes: 2780, no: 3908, amm: 2000, volume: 2500 },
  { name: 'May', yes: 1890, no: 4800, amm: 2181, volume: 3000 },
  { name: 'Jun', yes: 2390, no: 3800, amm: 2500, volume: 3500 },
  { name: 'Jul', yes: 3490, no: 4300, amm: 2100, volume: 4000 },
];

const probabilityData = [
  { name: 'Yes', value: 65 },
  { name: 'No', value: 35 },
];

const COLORS = ['#0088FE', '#FF8042'];


const marketsData = [
  { id: 1, title: 'Will ETH merge happen in 2023?', liquidity: '$250,000', volume: '$1.2M', probability: 82 },
  { id: 2, title: 'Will SOL reach $200 by Q2?', liquidity: '$120,000', volume: '$450K', probability: 35 },
  { id: 3, title: 'Will BTC halving increase price by 50%?', liquidity: '$500,000', volume: '$2.5M', probability: 75 },
];

export default function Markets() {
  const [selectedMarket, setSelectedMarket] = useState(1);
  const [activeTab, setActiveTab] = useState('price');

  const handleMarketSelect = (id: number) => {
    setSelectedMarket(id);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const renderChart = () => {
    switch (activeTab) {
      case 'price':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={marketData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="yes" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="no" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'volume':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={marketData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="volume" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'liquidity':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={marketData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="amm" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        );
      case 'probability':
        return (
          <div className="flex justify-between items-center">
            <ResponsiveContainer width="45%" height={300}>
              <PieChart>
                <Pie
                  data={probabilityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {probabilityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="w-45% p-6 bg-gray-100 rounded-lg">
              <h3 className="font-bold text-lg mb-4">Current Probability</h3>
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-sm text-gray-500">Yes</p>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div className="bg-blue-600 h-4 rounded-full" style={{ width: `${probabilityData[0].value}%` }}></div>
                  </div>
                  <p className="text-right font-semibold">{probabilityData[0].value}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">No</p>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div className="bg-orange-500 h-4 rounded-full" style={{ width: `${probabilityData[1].value}%` }}></div>
                  </div>
                  <p className="text-right font-semibold">{probabilityData[1].value}%</p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Select a tab to view data</div>;
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Futarchy Markets</h1>
      
      {/* Markets Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {marketsData.map((market) => (
          <div 
            key={market.id}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              selectedMarket === market.id 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-blue-300'
            }`}
            onClick={() => handleMarketSelect(market.id)}
          >
            <h3 className="font-bold text-lg mb-2">{market.title}</h3>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div>
                <p className="text-gray-500">Liquidity</p>
                <p className="font-semibold">{market.liquidity}</p>
              </div>
              <div>
                <p className="text-gray-500">Volume</p>
                <p className="font-semibold">{market.volume}</p>
              </div>
              <div>
                <p className="text-gray-500">Probability</p>
                <p className="font-semibold">{market.probability}%</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Market Details */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">
          {marketsData.find(m => m.id === selectedMarket)?.title}
        </h2>
        
        {/* Tab Navigation */}
        <div className="border-b mb-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => handleTabChange('price')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'price' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Price Chart
            </button>
            <button
              onClick={() => handleTabChange('volume')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'volume' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Volume
            </button>
            <button
              onClick={() => handleTabChange('liquidity')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'liquidity' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Liquidity
            </button>
            <button
              onClick={() => handleTabChange('probability')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'probability' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Probability
            </button>
          </nav>
        </div>
        
        {/* Chart Area */}
        <div className="h-80">
          {renderChart()}
        </div>
      </div>

      {/* Trading Interface */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">Trade</h3>
          <div className="flex flex-col space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Position</label>
              <div className="mt-1 flex">
                <button className="flex-1 py-2 border border-r-0 rounded-l-md bg-blue-50 border-blue-500 text-blue-700 font-medium">
                  YES
                </button>
                <button className="flex-1 py-2 border rounded-r-md border-gray-300 text-gray-700 hover:bg-gray-50">
                  NO
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Amount</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="text"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                  placeholder="0.00"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">USD</span>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Est. Payout</label>
              <div className="mt-1 p-3 bg-gray-100 rounded-md text-green-600 font-medium">
                $182.45 (+82.45%)
              </div>
            </div>
            <button
              type="button"
              className="mt-4 w-full bg-blue-600 border border-transparent rounded-md py-3 px-8 font-medium text-white hover:bg-blue-700"
            >
              Buy YES Shares
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">Market Information</h3>
          <dl className="divide-y divide-gray-200">
            <div className="py-3 flex justify-between">
              <dt className="text-sm font-medium text-gray-500">Resolution Date</dt>
              <dd className="text-sm font-medium">Dec 31, 2023</dd>
            </div>
            <div className="py-3 flex justify-between">
              <dt className="text-sm font-medium text-gray-500">Market Type</dt>
              <dd className="text-sm font-medium">Binary</dd>
            </div>
            <div className="py-3 flex justify-between">
              <dt className="text-sm font-medium text-gray-500">Oracle</dt>
              <dd className="text-sm font-medium">Futarchy DAO</dd>
            </div>
            <div className="py-3 flex justify-between">
              <dt className="text-sm font-medium text-gray-500">Trading Fee</dt>
              <dd className="text-sm font-medium">2%</dd>
            </div>
            <div className="py-3 flex justify-between">
              <dt className="text-sm font-medium text-gray-500">Created</dt>
              <dd className="text-sm font-medium">Jan 15, 2023</dd>
            </div>
            <div className="py-3 flex justify-between">
              <dt className="text-sm font-medium text-gray-500">Category</dt>
              <dd className="text-sm font-medium">Cryptocurrency</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
