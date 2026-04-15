import React, { useState } from 'react';
import { ChevronRight, Home, BarChart3, User, Settings, Bell, Lock, Wallet, LogOut, Menu, X } from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import image444 from '../image444.jpg';
import image555 from '../image555.jpg';
import img222 from '../img222.jpg';
import img333 from '../img333.jpg';

export function MyInformationDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    month: '',
    day: '',
    year: '',
    email: 'arshdeepkaur24@navgurukul.org',
    phone: '',
    country: 'India',
    language: 'English',
    currency: 'USD ($)',
    measure: 'Cm',
    currentPassword: '',
    newPassword: '',
    repeatPassword: '',
    budget: 'No budget',
    notifications: {
      promotions: true,
      favoriteArtists: true,
      favoriteGalleries: true,
      favoriteArtworks: true,
    },
  });

  const activityData = [
    { month: 'Jan', views: 400, purchases: 240, favorites: 320 },
    { month: 'Feb', views: 500, purchases: 310, favorites: 420 },
    { month: 'Mar', views: 450, purchases: 280, favorites: 380 },
    { month: 'Apr', views: 620, purchases: 420, favorites: 510 },
    { month: 'May', views: 780, purchases: 580, favorites: 650 },
    { month: 'Jun', views: 890, purchases: 720, favorites: 780 },
  ];

  const purchaseStats = [
    { category: 'Paintings', count: 12 },
    { category: 'Sculptures', count: 8 },
    { category: 'Digital Art', count: 15 },
    { category: 'Photography', count: 6 },
  ];

  const paintingsByArtist = [
    { artist: 'John Smith', paintings: 5 },
    { artist: 'Emma Wilson', paintings: 8 },
    { artist: 'Michael Brown', paintings: 6 },
    { artist: 'Sarah Davis', paintings: 4 },
    { artist: 'James Chen', paintings: 7 },
  ];

  const monthlySpending = [
    { month: 'Jan', amount: 2400 },
    { month: 'Feb', amount: 3000 },
    { month: 'Mar', amount: 2800 },
    { month: 'Apr', amount: 3200 },
    { month: 'May', amount: 3800 },
    { month: 'Jun', amount: 4200 },
  ];

  const collectionStats = [
    { name: 'Modern', value: 30 },
    { name: 'Classical', value: 25 },
    { name: 'Abstract', value: 25 },
    { name: 'Digital', value: 20 },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [name]: checked
      }
    }));
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'personal', label: 'Personal Information', icon: User },
    { id: 'preferences', label: 'Notifications', icon: Bell },
    { id: 'password', label: 'Password', icon: Lock },
    { id: 'budget', label: 'My Budget', icon: Wallet },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Sidebar - FIXED BELOW NAVBAR */}
        <div
          className={`fixed left-0 z-40 w-64 bg-gradient-to-b from-amber-700 via-amber-800 to-amber-900 shadow-2xl transform transition-transform duration-300 lg:translate-x-0 flex flex-col top-16 h-[calc(100vh-4rem)] ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
        {/* Close Button for Mobile */}
        <div className="lg:hidden absolute top-4 right-4">
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-white hover:bg-amber-600 p-2 rounded-lg transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Profile Section - Compact */}
        <div className="p-6 text-center border-b border-amber-600">
          <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-white flex items-center justify-center font-bold text-amber-700 text-2xl">
            AS
          </div>
          <h3 className="text-white font-semibold text-base">Arsh Deep</h3>
          <p className="text-amber-100 text-xs">arshdeepkaur24@navgurukul.org</p>
        </div>

        {/* Menu Items - Compact */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
                  activeSection === item.id
                    ? 'bg-white text-amber-700 shadow-md'
                    : 'text-amber-100 hover:bg-amber-600'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout Button - Pinned at Bottom */}
        <div className="p-3 border-t border-amber-600">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-amber-700 text-white p-2 rounded-lg shadow-lg"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Main Content - Adjusted for Fixed Sidebar */}
      <div className="flex-1 w-full overflow-auto ml-0 lg:ml-64">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200 py-4 px-4 md:px-8 sticky top-0 z-10">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Home className="w-4 h-4" />
            <span>My Account</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-semibold capitalize">
              {menuItems.find(item => item.id === activeSection)?.label}
            </span>
          </div>
        </div>

        {/* Dashboard Section */}
        {activeSection === 'dashboard' && (
          <div className="w-full p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
              {/* Dashboard Header */}
              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2">
                  Your Activity Dashboard
                </h1>
                <p className="text-gray-600">Track your purchases, views, and artistic journey</p>
              </div>

              {/* Statistics Cards with Images */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {/* Total Views Card */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                  <div className="w-full h-40 overflow-hidden bg-gray-200">
                    <img src={image444} alt="Total Views" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 border-l-4 border-amber-500">
                    <div className="text-gray-500 text-sm font-semibold uppercase">Total Views</div>
                    <div className="text-3xl font-bold text-amber-700 mt-2">3,640</div>
                    <div className="text-green-600 text-xs mt-2">↑ 12% from last month</div>
                  </div>
                </div>

                {/* Total Spent Card */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                  <div className="w-full h-40 overflow-hidden bg-gray-200">
                    <img src={image555} alt="Total Spent" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 border-l-4 border-orange-500">
                    <div className="text-gray-500 text-sm font-semibold uppercase">Total Spent</div>
                    <div className="text-3xl font-bold text-orange-700 mt-2">$18,600</div>
                    <div className="text-green-600 text-xs mt-2">↑ 18% from last month</div>
                  </div>
                </div>

                {/* Items Owned Card */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                  <div className="w-full h-40 overflow-hidden bg-gray-200">
                    <img src={img222} alt="Items Owned" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 border-l-4 border-purple-500">
                    <div className="text-gray-500 text-sm font-semibold uppercase">Items Owned</div>
                    <div className="text-3xl font-bold text-purple-700 mt-2">41</div>
                    <div className="text-green-600 text-xs mt-2">↑ 8% from last month</div>
                  </div>
                </div>

                {/* Collections Card */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                  <div className="w-full h-40 overflow-hidden bg-gray-200">
                    <img src={img333} alt="Collections" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 border-l-4 border-pink-500">
                    <div className="text-gray-500 text-sm font-semibold uppercase">Collections</div>
                    <div className="text-3xl font-bold text-pink-700 mt-2">12</div>
                    <div className="text-green-600 text-xs mt-2">↑ 3 new collections</div>
                  </div>
                </div>
              </div>

              {/* Main Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Monthly Activity Trends</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={activityData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }} />
                      <Legend />
                      <Line type="monotone" dataKey="views" stroke="#b45309" strokeWidth={2} dot={{ fill: '#b45309', r: 5 }} />
                      <Line type="monotone" dataKey="purchases" stroke="#ea580c" strokeWidth={2} dot={{ fill: '#ea580c', r: 5 }} />
                      <Line type="monotone" dataKey="favorites" stroke="#a855f7" strokeWidth={2} dot={{ fill: '#a855f7', r: 5 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Monthly Spending</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlySpending}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }} />
                      <Bar dataKey="amount" fill="#b45309" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Category and Artist Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Content Type Distribution</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={collectionStats}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry) => `${entry.name} ${entry.value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {collectionStats.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={['#b45309', '#ea580c', '#f97316', '#fb923c'][index]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Top Paintings by Artist</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={paintingsByArtist} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis type="number" />
                      <YAxis dataKey="artist" type="category" width={80} />
                      <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }} />
                      <Bar dataKey="paintings" fill="#ea580c" radius={[0, 8, 8, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Purchase by Category */}
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Purchases by Category</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={purchaseStats}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }} />
                    <Bar dataKey="count" fill="#b45309" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Recent Activity */}
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Purchases & Activities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { date: 'Today at 2:30 PM', action: 'Purchased "Abstract Dreams"', artist: 'John Smith', price: '$1,200', category: 'Painting' },
                    { date: 'Yesterday at 5:45 PM', action: 'Added "Moon Light" to favorites', artist: 'Emma Wilson', price: '$850', category: 'Photography' },
                    { date: '2 days ago', action: 'Purchased "Serenity Canvas"', artist: 'Michael Brown', price: '$650', category: 'Painting' },
                    { date: '3 days ago', action: 'Followed Artist "Sarah Davis"', artist: 'Sarah Davis', price: 'Free', category: 'Artist' },
                  ].map((activity, idx) => (
                    <div key={idx} className="p-6 rounded-lg border border-gray-200 hover:border-amber-400 hover:bg-amber-50 transition">
                      <p className="text-gray-800 font-bold text-base mb-2">{activity.action}</p>
                      <p className="text-amber-700 font-semibold text-sm mb-3">By {activity.artist}</p>
                      <p className="text-gray-600 text-sm mb-4">{activity.date}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-white bg-amber-600 px-3 py-1 rounded">{activity.category}</span>
                        <span className="text-amber-700 font-bold text-base">{activity.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Insights Card */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-8 rounded-lg border-2 border-amber-300 shadow-md">
                <h3 className="text-2xl font-bold text-amber-900 mb-4">Your Collection Insights</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg">
                    <p className="text-3xl font-bold text-amber-700">287</p>
                    <p className="text-sm text-gray-600 mt-1">Favorite Items</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg">
                    <p className="text-3xl font-bold text-orange-700">43</p>
                    <p className="text-sm text-gray-600 mt-1">Artists Followed</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg">
                    <p className="text-3xl font-bold text-amber-700">12</p>
                    <p className="text-sm text-gray-600 mt-1">Collections</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg">
                    <p className="text-3xl font-bold text-orange-700">18</p>
                    <p className="text-sm text-gray-600 mt-1">Galleries Visited</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Sections */}
        {activeSection !== 'dashboard' && (
          <div className="p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
              
              {/* Personal Information Section */}
              {activeSection === 'personal' && (
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <h2 className="text-3xl font-serif font-bold text-black mb-8 pb-4 border-b-3 border-amber-500">
                    PERSONAL INFORMATION
                  </h2>

                  <div className="max-w-4xl mx-auto space-y-6">
                    {/* Name Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-3">Last name</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                          placeholder="Enter your last name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-3">First name</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                          placeholder="Enter your first name"
                        />
                      </div>
                    </div>

                    {/* Date of Birth */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-4">Date of Birth</label>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs text-gray-600 mb-2">Month</label>
                          <input
                            type="text"
                            name="month"
                            value={formData.month}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                            placeholder="MM"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-2">Day</label>
                          <input
                            type="text"
                            name="day"
                            value={formData.day}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                            placeholder="DD"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-2">Year</label>
                          <input
                            type="text"
                            name="year"
                            value={formData.year}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                            placeholder="YYYY"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-3">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition bg-gray-50"
                        disabled
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-3">Phone number *</label>
                      <div className="flex gap-3">
                        <div className="w-24">
                          <div className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 h-full">
                            <span className="text-lg">🇮🇳</span>
                            <span className="text-gray-700 font-medium">+91</span>
                          </div>
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="flex-1 px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                          placeholder="Enter phone number"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-center mt-8">
                    <button className="px-16 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-900 transition shadow-lg hover:shadow-xl">
                      Save my information
                    </button>
                  </div>
                </div>
              )}

              {/* Preferences Section - NOW Shows Email Notifications */}
              {activeSection === 'preferences' && (
                <div className="space-y-8">
                  {/* Email Notifications Section */}
                  <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-3xl font-serif font-bold text-black mb-8 pb-4 border-b-3 border-amber-500">
                      MY EMAIL NOTIFICATIONS
                    </h2>

                    <div className="max-w-2xl mx-auto">
                      <p className="text-center text-gray-600 text-sm mb-8">
                        Choose which notifications you'd like to receive to stay updated
                      </p>

                      <div className="space-y-3">
                        {[
                          { key: 'promotions', label: 'Notifications concerning promotions', icon: '🎁' },
                          { key: 'favoriteArtists', label: 'Notifications concerning your favorite artists', icon: '🎨' },
                          { key: 'favoriteGalleries', label: 'Notifications concerning your favorite galleries', icon: '🏛️' },
                          { key: 'favoriteArtworks', label: 'Notifications concerning your favorite artworks', icon: '✨' },
                        ].map((notification) => (
                          <label 
                            key={notification.key} 
                            className="flex items-center cursor-pointer p-4 rounded-lg border border-gray-200 hover:border-amber-500 hover:bg-amber-50 transition"
                          >
                            <input
                              type="checkbox"
                              name={notification.key}
                              checked={formData.notifications[notification.key]}
                              onChange={handleCheckboxChange}
                              className="w-5 h-5 accent-amber-500 rounded cursor-pointer"
                            />
                            <span className="ml-3 text-sm text-gray-800 font-medium">{notification.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Notification Frequency Section */}
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-8 rounded-lg border-2 border-amber-200 shadow-md">
                    <h3 className="text-2xl font-bold text-amber-900 mb-6">NOTIFICATION FREQUENCY</h3>
                    <p className="text-gray-600 mb-6">Select how often you'd like to receive notifications:</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { value: 'instant', label: 'Instant', desc: 'Get notified immediately' },
                        { value: 'daily', label: 'Daily Digest', desc: 'Once per day' },
                        { value: 'weekly', label: 'Weekly Digest', desc: 'Once per week' },
                      ].map((freq) => (
                        <label key={freq.value} className="flex flex-col items-center cursor-pointer p-4 rounded-lg border-2 border-amber-200 hover:border-amber-500 hover:bg-white transition-all">
                          <span className="font-semibold text-gray-800">{freq.label}</span>
                          <span className="text-xs text-gray-600 text-center mt-2">{freq.desc}</span>
                          <input type="radio" name="frequency" value={freq.value} className="mt-3 w-4 h-4 accent-amber-500" defaultChecked={freq.value === 'daily'} />
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Push Notifications Section */}
                  <div className="bg-white p-8 rounded-lg shadow-md">
                    <h3 className="text-2xl font-bold text-black mb-6 pb-4 border-b-2 border-amber-300">PUSH NOTIFICATIONS</h3>
                    <div className="max-w-2xl mx-auto space-y-4">
                      {[
                        { label: 'New artwork from favorite artists', enabled: true },
                        { label: 'Price drops on saved items', enabled: true },
                        { label: 'Gallery events and exhibitions', enabled: false },
                        { label: 'New collection recommendations', enabled: true },
                        { label: 'Account and security updates', enabled: true },
                      ].map((push, idx) => (
                        <label key={idx} className="flex items-center cursor-pointer p-4 rounded-lg border border-gray-200 hover:border-amber-400 hover:bg-amber-50 transition">
                          <input type="checkbox" defaultChecked={push.enabled} className="w-4 h-4 accent-amber-500 rounded" />
                          <span className="ml-3 text-sm text-gray-800 font-medium">{push.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Notification History Section */}
                  <div className="bg-white p-8 rounded-lg shadow-md">
                    <h3 className="text-2xl font-bold text-black mb-6 pb-4 border-b-2 border-amber-300">RECENT NOTIFICATIONS</h3>
                    <div className="space-y-3 max-w-2xl mx-auto">
                      {[
                        { date: 'Today at 10:30 AM', message: 'New artwork from Emma Wilson' },
                        { date: 'Yesterday at 3:15 PM', message: 'Price drop on "Abstract Dreams" - Save $200!' },
                        { date: '2 days ago', message: 'Modern Art Exhibition at City Gallery' },
                        { date: '3 days ago', message: 'Recommended: Contemporary Collection' },
                      ].map((notif, idx) => (
                        <div key={idx} className="p-4 rounded-lg border-l-4 border-amber-500 bg-amber-50 hover:bg-amber-100 transition">
                          <p className="text-gray-800 font-medium">{notif.message}</p>
                          <p className="text-gray-500 text-xs mt-1">{notif.date}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-center">
                    <button className="px-16 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-900 transition shadow-lg hover:shadow-xl">
                      Save notification settings
                    </button>
                  </div>
                </div>
              )}

              {/* Password Section */}
              {activeSection === 'password' && (
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <h2 className="text-3xl font-serif font-bold text-black mb-8 pb-4 border-b-3 border-amber-500">
                    NEW PASSWORD
                  </h2>

                  <div className="max-w-4xl mx-auto space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-3">Current password *</label>
                      <input
                        type="password"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                        className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                        placeholder="Enter current password"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-3">New password *</label>
                      <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                        placeholder="Enter new password"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-3">Repeat new password *</label>
                      <input
                        type="password"
                        name="repeatPassword"
                        value={formData.repeatPassword}
                        onChange={handleInputChange}
                        className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                        placeholder="Repeat new password"
                      />
                    </div>
                  </div>

                  {/* Change Button */}
                  <div className="flex justify-center mt-8">
                    <button className="px-16 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-900 transition shadow-lg hover:shadow-xl">
                      Change password
                    </button>
                  </div>
                </div>
              )}

              {/* Budget Section */}
              {activeSection === 'budget' && (
                <div className="space-y-8">
                  {/* Budget Selection */}
                  <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-3xl font-serif font-bold text-black mb-8 pb-4 border-b-3 border-amber-500">
                      MY BUDGET
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {[
                        'Under $ 500',
                        '$ 500 - $ 1,000',
                        '$ 1,000 - $ 2,500',
                        '$ 2,500 - $ 5,000',
                        '$ 5,000 - $ 10,000',
                        '$ 10,000 - $ 25,000',
                        '$ 25,000 - $ 50,000',
                        'Over $ 50,000',
                      ].map((budget) => (
                        <label key={budget} className="flex items-center cursor-pointer p-3 rounded-lg border-2 border-gray-200 hover:border-amber-500 transition">
                          <input
                            type="radio"
                            name="budget"
                            value={budget}
                            checked={formData.budget === budget}
                            onChange={handleInputChange}
                            className="w-4 h-4 accent-amber-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">{budget}</span>
                        </label>
                      ))}
                      
                      <label className="flex items-center cursor-pointer p-3 rounded-lg border-2 border-gray-200 hover:border-amber-500 transition">
                        <input
                          type="radio"
                          name="budget"
                          value="No budget"
                          checked={formData.budget === 'No budget'}
                          onChange={handleInputChange}
                          className="w-4 h-4 accent-amber-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">No budget</span>
                      </label>
                    </div>
                  </div>

                  {/* Budget Analysis Graphs */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Budget Distribution Pie Chart */}
                    <div className="bg-white p-8 rounded-lg shadow-md">
                      <h3 className="text-xl font-bold text-gray-800 mb-6">Your Budget Range Distribution</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'Under $500', value: 15 },
                              { name: '$500-$1K', value: 20 },
                              { name: '$1K-$2.5K', value: 25 },
                              { name: '$2.5K-$5K', value: 22 },
                              { name: 'Over $5K', value: 18 },
                            ]}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={(entry) => `${entry.name} ${entry.value}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {[
                              { name: 'Under $500', value: 15 },
                              { name: '$500-$1K', value: 20 },
                              { name: '$1K-$2.5K', value: 25 },
                              { name: '$2.5K-$5K', value: 22 },
                              { name: 'Over $5K', value: 18 },
                            ].map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={['#b45309', '#ea580c', '#f97316', '#fb923c', '#fbbf24'][index]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Budget Spending Trend */}
                    <div className="bg-white p-8 rounded-lg shadow-md">
                      <h3 className="text-xl font-bold text-gray-800 mb-6">Monthly Budget Spending Trend</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={[
                          { month: 'Jan', spent: 1200, budget: 2500 },
                          { month: 'Feb', spent: 1800, budget: 2500 },
                          { month: 'Mar', spent: 1500, budget: 2500 },
                          { month: 'Apr', spent: 2100, budget: 2500 },
                          { month: 'May', spent: 2400, budget: 2500 },
                          { month: 'Jun', spent: 2300, budget: 2500 },
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }} />
                          <Legend />
                          <Bar dataKey="spent" fill="#ea580c" name="Amount Spent" radius={[8, 8, 0, 0]} />
                          <Bar dataKey="budget" fill="#dbeafe" name="Budget Limit" radius={[8, 8, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Budget Summary Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-lg border-l-4 border-amber-600">
                      <div className="text-gray-600 text-sm font-semibold uppercase mb-2">Total Budget</div>
                      <div className="text-3xl font-bold text-amber-700">$15,000</div>
                      <div className="text-xs text-gray-600 mt-2">Annual allocation</div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-lg border-l-4 border-blue-600">
                      <div className="text-gray-600 text-sm font-semibold uppercase mb-2">Amount Spent</div>
                      <div className="text-3xl font-bold text-blue-700">$12,300</div>
                      <div className="text-xs text-gray-600 mt-2">82% of total budget</div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border-l-4 border-green-600">
                      <div className="text-gray-600 text-sm font-semibold uppercase mb-2">Remaining</div>
                      <div className="text-3xl font-bold text-green-700">$2,700</div>
                      <div className="text-xs text-gray-600 mt-2">18% available</div>
                    </div>
                  </div>

                  {/* Budget Tips */}
                  <div className="bg-white p-8 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-black mb-6">Budget Management Tips</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { tip: 'Track high-value purchases', icon: '💎' },
                        { tip: 'Set alerts for budget limits', icon: '🔔' },
                        { tip: 'Review monthly spending', icon: '📊' },
                        { tip: 'Explore budget-friendly collections', icon: '🎨' },
                      ].map((item, idx) => (
                        <div key={idx} className="flex gap-3 p-4 rounded-lg border border-amber-200 hover:bg-amber-50 transition">
                          <span className="text-2xl">{item.icon}</span>
                          <p className="text-gray-700 font-medium">{item.tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-center">
                    <button className="px-16 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-900 transition shadow-lg hover:shadow-xl">
                      Save budget settings
                    </button>
                  </div>
                </div>
              )}

              {/* Settings Section - NOW Shows Preferences Form */}
              {activeSection === 'settings' && (
                <div className="space-y-8">
                  {/* Main Settings Card */}
                  <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-3xl font-serif font-bold text-black mb-2 pb-4 border-b-3 border-amber-500">
                      ACCOUNT PREFERENCES & SETTINGS
                    </h2>
                    <p className="text-gray-600 text-sm mb-8">Customize your experience on Zigguratss</p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Regional Settings */}
                      <div className="space-y-6">
                        <h3 className="text-xl font-bold text-gray-800">Regional Settings</h3>

                        {/* Country Dropdown */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-800 mb-3">Select Country *</label>
                          <select
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition bg-white cursor-pointer text-gray-800"
                          >
                            <option value="">Choose your country</option>
                            <option value="India">🇮🇳 India</option>
                            <option value="United States">🇺🇸 United States</option>
                            <option value="United Kingdom">🇬🇧 United Kingdom</option>
                            <option value="Canada">🇨🇦 Canada</option>
                            <option value="Australia">🇦🇺 Australia</option>
                            <option value="Germany">🇩🇪 Germany</option>
                            <option value="France">🇫🇷 France</option>
                            <option value="Japan">🇯🇵 Japan</option>
                          </select>
                        </div>

                        {/* Language Dropdown */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-800 mb-3">Preferred Language *</label>
                          <select
                            name="language"
                            value={formData.language}
                            onChange={handleInputChange}
                            className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition bg-white cursor-pointer text-gray-800"
                          >
                            <option value="">Select language</option>
                            <option value="English">🇬🇧 English</option>
                            <option value="Hindi">🇮🇳 हिंदी (Hindi)</option>
                            <option value="Spanish">🇪🇸 Español (Spanish)</option>
                            <option value="French">🇫🇷 Français (French)</option>
                            <option value="German">🇩🇪 Deutsch (German)</option>
                            <option value="Japanese">🇯🇵 日本語 (Japanese)</option>
                            <option value="Mandarin">🇨🇳 中文 (Mandarin)</option>
                            <option value="Portuguese">🇵🇹 Português (Portuguese)</option>
                          </select>
                        </div>

                        {/* Timezone */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-800 mb-3">Time Zone *</label>
                          <select
                            className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition bg-white cursor-pointer text-gray-800"
                          >
                            <option value="">Select timezone</option>
                            <option value="IST">India Standard Time (IST) UTC+5:30</option>
                            <option value="EST">Eastern Standard Time (EST) UTC-5</option>
                            <option value="PST">Pacific Standard Time (PST) UTC-8</option>
                            <option value="GMT">Greenwich Mean Time (GMT) UTC+0</option>
                            <option value="CET">Central European Time (CET) UTC+1</option>
                            <option value="JST">Japan Standard Time (JST) UTC+9</option>
                          </select>
                        </div>
                      </div>

                      {/* Display & Currency Settings */}
                      <div className="space-y-6">
                        <h3 className="text-xl font-bold text-gray-800">Currency & Display</h3>

                        {/* Currency Dropdown */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-800 mb-3">Currency *</label>
                          <select
                            name="currency"
                            value={formData.currency}
                            onChange={handleInputChange}
                            className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition bg-white cursor-pointer text-gray-800"
                          >
                            <option value="">Select currency</option>
                            <option value="USD ($)">💵 US Dollar (USD $)</option>
                            <option value="EUR (€)">💶 Euro (EUR €)</option>
                            <option value="GBP (£)">💷 British Pound (GBP £)</option>
                            <option value="INR (₹)">₹ Indian Rupee (INR ₹)</option>
                            <option value="JPY (¥)">¥ Japanese Yen (JPY ¥)</option>
                            <option value="AUD ($)">🇦🇺 Australian Dollar (AUD $)</option>
                            <option value="CAD ($)">🇨🇦 Canadian Dollar (CAD $)</option>
                          </select>
                        </div>

                        {/* Measurement Unit */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-800 mb-3">Measurement Unit *</label>
                          <select
                            name="measure"
                            value={formData.measure}
                            onChange={handleInputChange}
                            className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition bg-white cursor-pointer text-gray-800"
                          >
                            <option value="">Select unit</option>
                            <option value="Cm">📏 Centimeters (Cm)</option>
                            <option value="Inches">📏 Inches (In)</option>
                            <option value="Meters">📏 Meters (M)</option>
                            <option value="Feet">📏 Feet (Ft)</option>
                          </select>
                        </div>

                        {/* Date Format */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-800 mb-3">Date Format *</label>
                          <select
                            className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition bg-white cursor-pointer text-gray-800"
                          >
                            <option value="">Select format</option>
                            <option value="DD/MM/YYYY">📅 DD/MM/YYYY</option>
                            <option value="MM/DD/YYYY">📅 MM/DD/YYYY</option>
                            <option value="YYYY-MM-DD">📅 YYYY-MM-DD</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Privacy & Security Settings */}
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-8 rounded-lg border-2 border-amber-200 shadow-md">
                    <h3 className="text-xl font-bold text-amber-900 mb-6">Privacy & Security</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        { label: 'Two-Factor Authentication', status: 'Enabled' },
                        { label: 'Profile Visibility', status: 'Public' },
                        { label: 'Email Verification', status: 'Verified' },
                        { label: 'Activity Tracking', status: 'On' },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-white rounded-lg border border-amber-200 hover:border-amber-500 transition">
                          <div>
                            <p className="font-semibold text-gray-800">{item.label}</p>
                            <p className="text-xs text-gray-600">{item.status}</p>
                          </div>
                          <button className="px-3 py-1 text-xs font-semibold text-amber-700 bg-amber-100 rounded-full hover:bg-amber-200 transition">
                            Configure
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Display Preferences */}
                  <div className="bg-white p-8 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-black mb-6">Display Preferences</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { label: 'Theme', current: 'Light Mode', options: ['Light', 'Dark', 'Auto'] },
                        { label: 'Items per Page', current: '12', options: ['6', '12', '24', '36'] },
                        { label: 'Font Size', current: 'Normal', options: ['Small', 'Normal', 'Large'] },
                      ].map((pref, idx) => (
                        <div key={idx} className="p-4 border-2 border-gray-200 rounded-lg hover:border-amber-500 transition">
                          <label className="block text-sm font-semibold text-gray-800 mb-3">{pref.label}</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm bg-white cursor-pointer">
                            {pref.options.map((opt) => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                          <p className="text-xs text-gray-600 mt-2">Current: {pref.current}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-center gap-4">
                    <button className="px-16 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-900 transition shadow-lg hover:shadow-xl">
                      Save all settings
                    </button>
                    <button className="px-16 py-3 bg-gray-300 text-gray-800 rounded-full font-semibold hover:bg-gray-400 transition shadow-lg hover:shadow-xl">
                      Reset to default
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden top-16"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      </div>
    </div>
  );
}
