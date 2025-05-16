'use client'

import { LineChart, Line, YAxis, Tooltip } from 'recharts';

// Define the type for the card props
type CardProps = {
  state: 'creation' | 'unresolved' | 'resolved';
  question: string;
  currentPrice?: number;
  ifApprovedPrice?: number;
  ifRejectedPrice?: number;
  chartData?: Array<{
    name: string;
    currentPrice: number;
    ifApproved: number;
    ifRejected: number;
  }>;
  yesPrice?: number;
  noPrice?: number;
  onAddUsdc?: () => void;
  onAddAgents?: () => void;
  onAddLiquidity?: () => void;
  onRedeemTokens?: () => void;
  onResolveMarket?: () => void;
};

export default function Card({
  state,
  question,
  currentPrice,
  ifApprovedPrice,
  ifRejectedPrice,
  chartData = [],
  yesPrice,
  noPrice,
  onAddUsdc,
  onAddAgents,
  onAddLiquidity,
  onRedeemTokens,
}: CardProps) {
  return (
    <div className="relative rounded-xl bg-gray-900 text-white overflow-hidden p-6 w-full mx-auto border border-gray-800 shadow-lg">
      <h2 className="text-xl font-medium text-center mb-6">{question}</h2>

      {state === 'creation' && (
        <div className="flex justify-center">
          <button 
            onClick={onAddUsdc}
            className="px-5 py-2 bg-pink-500 text-white font-medium rounded-md text-sm hover:bg-pink-600 transition-colors cursor-pointer"
          >
            Add USDC
          </button>
        </div>
      )}

      {state === 'unresolved' && (
        <>
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <div className="w-3 h-3 bg-white mr-2 rounded-full"></div>
              <span className="mr-2 text-sm">${currentPrice?.toFixed(2)}</span>
              <span className="text-xs text-gray-400">Price</span>
            </div>
            <div className="flex items-center mb-2">
              <div className="w-3 h-3 bg-green-500 mr-2 rounded-full"></div>
              <span className="mr-2 text-sm">${ifApprovedPrice?.toFixed(2)}</span>
              <span className="text-xs text-gray-400">If Approved</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 mr-2 rounded-full"></div>
              <span className="mr-2 text-sm">${ifRejectedPrice?.toFixed(2)}</span>
              <span className="text-xs text-gray-400">If Rejected</span>
            </div>
          </div>

          <div className="h-48 mb-6">
            {chartData.length > 0 && (
              <LineChart
                width={400}
                height={180}
                data={chartData}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="currentPrice"
                  stroke="#FFFFFF"
                  strokeWidth={1}
                  dot={false}
                  strokeDasharray="3 3"
                />
                <Line
                  type="monotone"
                  dataKey="ifApproved"
                  stroke="#4ADE80"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="ifRejected"
                  stroke="#F87171"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={onAddAgents}
              className="px-4 py-2 bg-pink-500 text-white font-medium rounded-md text-sm hover:bg-pink-600 transition-colors cursor-pointer"
            >
              Add Agents
            </button>
            <button 
              onClick={onAddLiquidity}
              className="px-4 py-2 bg-pink-500 text-white font-medium rounded-md text-sm hover:bg-pink-600 transition-colors cursor-pointer"
            >
              Add Liquidity
            </button>
          </div>
        </>
      )}

      {state === 'resolved' && (
        <>
          <div className="flex justify-center mb-6">
            <button className="px-12 py-3 bg-green-500 text-white font-medium rounded-md text-2xl cursor-default">
              YES
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-500 mr-2 rounded-full"></div>
              <div>
                <span className="text-lg font-medium">${yesPrice?.toFixed(3)}</span>
                <span className="ml-2 text-green-500 text-sm">YES</span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-500 mr-2 rounded-full"></div>
              <div>
                <span className="text-lg font-medium">${noPrice?.toFixed(3)}</span>
                <span className="ml-2 text-red-500 text-sm">NO</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button 
              onClick={onRedeemTokens}
              className="px-4 py-2 bg-pink-500 text-white font-medium rounded-md text-sm hover:bg-pink-600 transition-colors cursor-pointer"
            >
              Redeem Tokens
            </button>
          </div>
        </>
      )}
    </div>
  );
}
