import { TrendingUp, User } from 'lucide-react';

const mockLeaders = [
  { name: 'Alice', returns: 18.2, avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { name: 'Bob', returns: 15.7, avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { name: 'Charlie', returns: 13.9, avatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
  { name: 'Diana', returns: 12.5, avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { name: 'Eve', returns: 11.3, avatar: 'https://randomuser.me/api/portraits/women/12.jpg' },
];

export default function Leaderboard() {
  return (
    <div className="card p-6">
      <div className="flex items-center mb-4 gap-2">
        <TrendingUp className="h-6 w-6 text-blue-500" />
        <h3 className="text-lg font-semibold text-gray-900">Top Investors Leaderboard</h3>
      </div>
      <div className="space-y-3">
        {mockLeaders.map((user, idx) => (
          <div key={user.name} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 border border-gray-200">
            <span className="text-xl font-bold text-gray-400 w-6 text-center">{idx + 1}</span>
            <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border-2 border-blue-200" />
            <span className="font-medium text-gray-900 flex-1">{user.name}</span>
            <span className="text-green-600 font-semibold">+{user.returns}%</span>
          </div>
        ))}
      </div>
    </div>
  );
} 