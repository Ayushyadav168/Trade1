"use client";
import { useState, useEffect } from 'react';
import AIChatbot from '@/components/AIChatbot';

export default function SettingsPage() {
  const [theme, setTheme] = useState('light');
  const [email, setEmail] = useState('user@email.com');
  const [phone, setPhone] = useState('+91 9876543210');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [twoFA, setTwoFA] = useState(false);
  const [aiChatOpen, setAiChatOpen] = useState(false);

  useEffect(() => {
    // Load theme from localStorage
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) setTheme(storedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleThemeChange = (t) => {
    setTheme(t);
  };

  const handleUpdate = (type) => {
    setSuccess(`${type} updated successfully!`);
    setTimeout(() => setSuccess(''), 2000);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setSuccess('Passwords do not match!');
      return;
    }
    setPassword(''); setNewPassword(''); setConfirmPassword('');
    setSuccess('Password changed successfully!');
    setTimeout(() => setSuccess(''), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>
      {success && (
        <div className="mb-6 p-3 rounded bg-green-100 text-green-800 font-medium text-center animate-fade-in-up">{success}</div>
      )}
      {/* Theme Section */}
      <div className="mb-8 p-6 rounded-xl shadow bg-white flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Website Theme</h2>
        <div className="flex gap-4">
          <button
            className={`px-4 py-2 rounded-lg font-medium ${theme === 'light' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => handleThemeChange('light')}
          >
            Light
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium ${theme === 'dark' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => handleThemeChange('dark')}
          >
            Dark
          </button>
        </div>
      </div>
      {/* 2FA Section */}
      <div className="mb-8 p-6 rounded-xl shadow bg-white flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Two-Factor Authentication (2FA)</h2>
        <div className="flex items-center gap-4">
          <span className="text-gray-700">2FA is {twoFA ? <span className='text-green-600 font-semibold'>Enabled</span> : <span className='text-red-600 font-semibold'>Disabled</span>}</span>
          <button
            className={`px-4 py-2 rounded-lg font-medium ${twoFA ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => { setTwoFA(v => !v); setSuccess(`2FA ${!twoFA ? 'enabled' : 'disabled'}!`); setTimeout(() => setSuccess(''), 2000); }}
          >
            {twoFA ? 'Disable 2FA' : 'Enable 2FA'}
          </button>
        </div>
        <p className="text-xs text-gray-500">2FA adds an extra layer of security to your account. (Demo only)</p>
      </div>
      {/* Email/Phone Section */}
      <div className="mb-8 p-6 rounded-xl shadow bg-white flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Account Info</h2>
        <div className="flex flex-col gap-3">
          <label className="block">
            <span className="text-gray-700">Email</span>
            <input
              type="email"
              className="input-field mt-1"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <button
              className="mt-2 px-4 py-2 rounded bg-blue-600 text-white font-semibold"
              onClick={() => handleUpdate('Email')}
            >
              Update Email
            </button>
          </label>
          <label className="block">
            <span className="text-gray-700">Phone</span>
            <input
              type="tel"
              className="input-field mt-1"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
            <button
              className="mt-2 px-4 py-2 rounded bg-blue-600 text-white font-semibold"
              onClick={() => handleUpdate('Phone')}
            >
              Update Phone
            </button>
          </label>
        </div>
      </div>
      {/* Change Password Section */}
      <div className="mb-8 p-6 rounded-xl shadow bg-white flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Change Password</h2>
        <form onSubmit={handlePasswordChange} className="flex flex-col gap-3">
          <input
            type="password"
            className="input-field"
            placeholder="Current Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            className="input-field"
            placeholder="New Password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            className="input-field"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="mt-2 px-4 py-2 rounded bg-purple-600 text-white font-semibold"
          >
            Change Password
          </button>
        </form>
      </div>
      {/* Customer Support Section */}
      <div className="mb-8 p-6 rounded-xl shadow bg-white flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Customer Support</h2>
        <div className="flex flex-col gap-2 text-gray-700">
          <div>Email: <a href="mailto:support@tradeapp.com" className="text-blue-600 hover:underline">support@tradeapp.com</a></div>
          <div>Phone: <a href="tel:+911234567890" className="text-blue-600 hover:underline">+91 12345 67890</a></div>
          <div>
            <button
              className="px-4 py-2 rounded bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
              onClick={() => setAiChatOpen(true)}
            >
              Live Chat (AI)
            </button>
          </div>
          <div>Support Hours: 9:00 AM – 6:00 PM IST (Mon–Sat)</div>
        </div>
      </div>
      {aiChatOpen && <AIChatbot open={aiChatOpen} onClose={() => setAiChatOpen(false)} forceOpen />}
      {/* More Features Placeholder */}
      <div className="p-6 rounded-xl shadow bg-white">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">More Features Coming Soon</h2>
        <ul className="list-disc ml-6 text-gray-700 text-sm space-y-1">
          <li>Notification Preferences</li>
          <li>Account Deletion</li>
          <li>Linked Social Accounts</li>
          <li>Export Data</li>
        </ul>
      </div>
    </div>
  );
} 