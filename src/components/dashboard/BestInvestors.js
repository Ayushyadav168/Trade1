"use client";
import { useState, forwardRef } from 'react';
import { User, Lightbulb, TrendingUp, Building2 } from 'lucide-react';

const bestEntities = [
  {
    type: 'investor',
    name: 'Warren Buffett',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Warren_Buffett_KU_Visit.jpg',
    vision: 'Long-term value investing in fundamentally strong companies.',
    strategy: 'Buy wonderful businesses at a fair price and hold them forever.',
    returns: '20% CAGR (50+ years)',
    bio: 'Chairman and CEO of Berkshire Hathaway, known as the "Oracle of Omaha". Famous for his disciplined, value-oriented approach and legendary annual letters to shareholders.'
  },
  {
    type: 'investor',
    name: 'Rakesh Jhunjhunwala',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Rakesh_Jhunjhunwala.jpg',
    vision: 'India growth story and contrarian investing.',
    strategy: 'Spotting undervalued stocks and holding with conviction.',
    returns: '18% CAGR (30+ years)',
    bio: 'Indian billionaire investor, trader, and chartered accountant. Known as the "Big Bull of Dalal Street".'
  },
  {
    type: 'investor',
    name: 'Ray Dalio',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Ray_Dalio_2011.jpg',
    vision: 'All-weather portfolio and macroeconomic cycles.',
    strategy: 'Diversification and risk parity across asset classes.',
    returns: '12% CAGR (40+ years)',
    bio: 'Founder of Bridgewater Associates, the world’s largest hedge fund. Author of "Principles".'
  },
  {
    type: 'investor',
    name: 'Catherine Wood',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Cathie_Wood_2021.jpg',
    vision: 'Disruptive innovation and technology.',
    strategy: 'Invest in high-growth tech and innovation leaders.',
    returns: '30% CAGR (10 years)',
    bio: 'Founder, CEO, and CIO of ARK Invest. Focuses on disruptive innovation and future technologies.'
  },
  {
    type: 'trader',
    name: 'Paul Tudor Jones',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Paul_Tudor_Jones_2019.jpg',
    vision: 'Macro trading and trend following.',
    strategy: 'Technical analysis, macro trends, and risk management.',
    returns: '19% CAGR (40+ years)',
    bio: 'American billionaire hedge fund manager, founder of Tudor Investment Corporation.'
  },
  {
    type: 'trader',
    name: 'Linda Raschke',
    avatar: 'https://www.tradinggame.com.au/wp-content/uploads/2017/10/linda-raschke.jpg',
    vision: 'Short-term trading and pattern recognition.',
    strategy: 'Swing trading, technical setups, and disciplined risk control.',
    returns: 'Consistent profitability (30+ years)',
    bio: 'Legendary trader, CTA, and author of "Street Smarts". Known for her technical trading expertise.'
  },
  {
    type: 'company',
    name: 'Apple Inc.',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
    vision: 'Innovate and lead in consumer technology.',
    strategy: 'Design, ecosystem, and premium branding.',
    returns: '30% CAGR (20 years)',
    bio: 'World’s most valuable company. Known for the iPhone, Mac, and a culture of innovation.'
  },
  {
    type: 'company',
    name: 'Reliance Industries',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Reliance_Industries_Logo.svg',
    vision: 'Diversified growth across energy, retail, and telecom.',
    strategy: 'Aggressive expansion, vertical integration, and digital transformation.',
    returns: '18% CAGR (25 years)',
    bio: 'India’s largest private sector company, led by Mukesh Ambani.'
  },
  {
    type: 'company',
    name: 'Tesla, Inc.',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg',
    vision: 'Accelerate the world’s transition to sustainable energy.',
    strategy: 'Disruptive innovation in electric vehicles and energy storage.',
    returns: '50% CAGR (10 years)',
    bio: 'Founded by Elon Musk. Leader in electric vehicles, batteries, and solar energy.'
  },
  // Add more mock entries as needed
];

function InvestorModal({ open, onClose, entity }) {
  if (!open || !entity) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-8 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl">&times;</button>
        <div className="flex flex-col items-center mb-4">
          {entity.type === 'company' ? (
            <img src={entity.avatar} alt={entity.name} className="w-28 h-28 rounded bg-white border-4 border-blue-200 object-contain shadow-lg" />
          ) : (
            <img src={entity.avatar} alt={entity.name} className="w-28 h-28 rounded-full border-4 border-blue-200 object-cover shadow-lg" />
          )}
        </div>
        <div className="flex items-center gap-4 mb-4">
          <div>
            <div className="font-bold text-2xl text-gray-900">{entity.name}</div>
            <div className="text-xs text-gray-500">{entity.returns} returns</div>
            <div className="mt-1">
              {entity.type === 'company' ? (
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-700"><Building2 className="h-4 w-4 mr-1" /> Company</span>
              ) : (
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-700"><User className="h-4 w-4 mr-1" /> {entity.type === 'trader' ? 'Trader' : 'Investor'}</span>
              )}
            </div>
          </div>
        </div>
        <div className="mb-2 text-gray-700"><span className="font-semibold">Vision:</span> {entity.vision}</div>
        <div className="mb-2 text-gray-700"><span className="font-semibold">Strategy:</span> {entity.strategy}</div>
        <div className="mb-2 text-gray-700"><span className="font-semibold">Bio:</span> {entity.bio}</div>
      </div>
    </div>
  );
}

const BestInvestors = forwardRef(function BestInvestors(props, ref) {
  const [selected, setSelected] = useState(null);
  return (
    <div ref={ref} className="card p-6">
      <div className="flex items-center mb-4 gap-2">
        <Lightbulb className="h-6 w-6 text-yellow-500" />
        <h3 className="text-lg font-semibold text-gray-900">Best Investors, Traders & Top Companies</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bestEntities.map((entity) => (
          <button
            key={entity.name}
            className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100 flex flex-col gap-2 shadow-sm text-left hover:shadow-lg transition-shadow"
            onClick={() => setSelected(entity)}
          >
            <div className="flex items-center gap-3 mb-2">
              {entity.type === 'company' ? (
                <img src={entity.avatar} alt={entity.name} className="w-12 h-12 rounded bg-white border-2 border-blue-200 object-contain" />
              ) : (
                <img src={entity.avatar} alt={entity.name} className="w-12 h-12 rounded-full border-2 border-blue-200 object-cover" />
              )}
              <div>
                <div className="font-bold text-gray-900 text-lg flex items-center gap-2">{entity.name} <TrendingUp className="h-4 w-4 text-green-500" /></div>
                <div className="text-xs text-gray-500">{entity.returns} returns</div>
              </div>
            </div>
            <div className="text-sm text-gray-700 mb-1"><span className="font-semibold text-blue-700">Vision:</span> {entity.vision}</div>
            <div className="text-sm text-gray-700"><span className="font-semibold text-purple-700">Strategy:</span> {entity.strategy}</div>
          </button>
        ))}
      </div>
      <InvestorModal open={!!selected} onClose={() => setSelected(null)} entity={selected} />
    </div>
  );
});

export default BestInvestors; 