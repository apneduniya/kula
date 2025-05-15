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
    <div className="relative rounded-3xl bg-black text-white overflow-hidden p-8 max-w-xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-8">{question}</h2>

      {state === 'creation' && (
        <div className="flex justify-center">
          <button 
            onClick={onAddUsdc}
            className="px-6 py-3 bg-pink-300 text-black font-bold rounded-full text-xl hover:bg-pink-400 transition-colors cursor-pointer"
          >
            Add USDC
          </button>
        </div>
      )}

      {state === 'unresolved' && (
        <>
          <div className="mb-8">
            <div className="flex items-center mb-2">
              <div className="w-4 h-4 bg-white mr-2"></div>
              <span className="mr-2">${currentPrice?.toFixed(2)}</span>
              <span className="text-gray-400">Price</span>
            </div>
            <div className="flex items-center mb-2">
              <div className="w-4 h-4 bg-green-500 mr-2"></div>
              <span className="mr-2">${ifApprovedPrice?.toFixed(2)}</span>
              <span className="text-gray-400">If Approved</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-500 mr-2"></div>
              <span className="mr-2">${ifRejectedPrice?.toFixed(2)}</span>
              <span className="text-gray-400">If Rejected</span>
            </div>
          </div>

          <div className="h-64 mb-8">
            {chartData.length > 0 && (
              <LineChart
                width={500}
                height={250}
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
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

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={onAddAgents}
              className="px-6 py-3 bg-pink-300 text-black font-bold rounded-full text-xl hover:bg-pink-400 transition-colors cursor-pointer"
            >
              Add Agents
            </button>
            <button 
              onClick={onAddLiquidity}
              className="px-6 py-3 bg-pink-300 text-black font-bold rounded-full text-xl hover:bg-pink-400 transition-colors cursor-pointer"
            >
              Add Liquidity
            </button>
          </div>
        </>
      )}

      {state === 'resolved' && (
        <>
          <div className="flex justify-center mb-8">
            <button className="px-16 py-4 bg-green-400 text-white font-bold rounded-full text-5xl cursor-default">
              YES
            </button>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-green-500 mr-3"></div>
              <div>
                <span className="text-2xl font-bold">${yesPrice?.toFixed(3)}</span>
                <span className="ml-3 text-2xl text-green-500">YES</span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-red-500 mr-3"></div>
              <div>
                <span className="text-2xl font-bold">${noPrice?.toFixed(3)}</span>
                <span className="ml-3 text-2xl text-red-500">NO</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button 
              onClick={onRedeemTokens}
              className="px-6 py-3 bg-pink-300 text-black font-bold rounded-full text-xl hover:bg-pink-400 transition-colors cursor-pointer"
            >
              Redeem Tokens
            </button>
          </div>
        </>
      )}
    </div>
  );
}
