import Markets from './components/markets';
import Chat from './components/chat';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Futarchy Market</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3">
            <Markets />
          </div>
          <div className="lg:col-span-1 h-[500px] bg-white rounded-lg shadow">
            <Chat />
          </div>
        </div>
      </div>
    </div>
  );
}
