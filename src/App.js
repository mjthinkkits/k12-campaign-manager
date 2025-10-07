import React, { useState, useEffect } from 'react';
import { Download, Users, TrendingUp, Calendar, Mail, Phone, Target, FileText, BarChart3, Settings, Plus, Edit2, Trash2, Eye, CheckCircle, Clock, XCircle, Search, Filter, ChevronDown, ExternalLink, Lock, LogOut } from 'lucide-react';

// Login credentials - CHANGE THESE!
const VALID_USERS = [
  { username: 'mjthinkkits', password: 'Thinkkit2025', name: 'Administrator' },
  { username: 'lindseythinkkits', password: 'Thinkkit2025', name: 'User One' },
  { username: 'stephaniethinkkits', password: 'Thinkkit2025', name: 'User Two' }
];

export default function K12CampaignManager() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('k12_campaign_user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrentUser(user);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');

    const user = VALID_USERS.find(
      u => u.username === loginUsername && u.password === loginPassword
    );

    if (user) {
      const userData = { username: user.username, name: user.name };
      setCurrentUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('k12_campaign_user', JSON.stringify(userData));
      setLoginUsername('');
      setLoginPassword('');
    } else {
      setLoginError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem('k12_campaign_user');
    setLoginUsername('');
    setLoginPassword('');
  };

  // Sample campaign data
  const [campaigns] = useState([
    {
      id: 1,
      name: 'K-5 Hands-On Learning Kits - Fall Launch',
      status: 'active',
      startDate: '2025-09-15',
      endDate: '2025-12-15',
      budget: 25000,
      spent: 12500,
      leads: 147,
      meetings: 23,
      opportunities: 8,
      channels: ['Email', 'LinkedIn', 'Webinar'],
      targetAudience: 'District Curriculum Directors, Elementary Principals',
      conversionRate: 15.6
    },
    {
      id: 2,
      name: 'Title I Funding Workshop Series',
      status: 'active',
      startDate: '2025-10-01',
      endDate: '2026-01-31',
      budget: 15000,
      spent: 6200,
      leads: 89,
      meetings: 12,
      opportunities: 5,
      channels: ['Email', 'Paid Search'],
      targetAudience: 'Title I Coordinators, Grant Managers',
      conversionRate: 13.5
    },
    {
      id: 3,
      name: 'Partner Channel - Q4 Distributor Outreach',
      status: 'planning',
      startDate: '2025-11-01',
      endDate: '2026-02-28',
      budget: 20000,
      spent: 0,
      leads: 0,
      meetings: 0,
      opportunities: 0,
      channels: ['Direct Outreach', 'Email'],
      targetAudience: 'Educational Distributors, Publishers',
      conversionRate: 0
    }
  ]);

  // Sample leads data
  const [leads] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      title: 'Director of Curriculum',
      organization: 'Springfield School District',
      email: 'sjohnson@springfield.k12.edu',
      phone: '(555) 123-4567',
      status: 'qualified',
      source: 'Webinar',
      campaignId: 1,
      score: 85,
      lastContact: '2025-10-05',
      notes: 'Interested in pilot program for 3 schools'
    },
    {
      id: 2,
      name: 'Michael Chen',
      title: 'Elementary Principal',
      organization: 'Riverside Elementary',
      email: 'mchen@riverside.edu',
      phone: '(555) 234-5678',
      status: 'meeting-scheduled',
      source: 'Email Campaign',
      campaignId: 1,
      score: 72,
      lastContact: '2025-10-06',
      notes: 'Meeting scheduled for 10/15 - demo requested'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      title: 'Title I Coordinator',
      organization: 'Lincoln County Schools',
      email: 'erodriguez@lincoln.k12.us',
      phone: '(555) 345-6789',
      status: 'new',
      source: 'LinkedIn',
      campaignId: 2,
      score: 45,
      lastContact: '2025-10-07',
      notes: 'Downloaded funding guide'
    }
  ]);

  // Analytics data
  const analyticsData = {
    totalLeads: 236,
    qualifiedLeads: 89,
    meetings: 35,
    opportunities: 13,
    conversionRate: 14.8,
    avgDealSize: 18500,
    emailOpenRate: 28.5,
    emailClickRate: 4.2,
    webinarAttendance: 67
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'planning': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'qualified': return 'bg-green-100 text-green-800';
      case 'meeting-scheduled': return 'bg-purple-100 text-purple-800';
      case 'new': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'qualified': return <CheckCircle size={16} />;
      case 'meeting-scheduled': return <Calendar size={16} />;
      case 'new': return <Clock size={16} />;
      default: return null;
    }
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesFilter = filterStatus === 'all' || campaign.status === filterStatus;
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.targetAudience.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <Lock className="text-indigo-600" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">K-12 Campaign Manager</h1>
            <p className="text-gray-600">Sign in to access your dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter your username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter your password"
                required
              />
            </div>

            {loginError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 font-medium transition-colors"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 text-center mb-2 font-semibold">Demo Credentials:</p>
            <div className="space-y-1 text-xs text-gray-600">
              <p><strong>Admin:</strong> admin / admin123</p>
              <p><strong>User 1:</strong> user1 / pass123</p>
              <p><strong>User 2:</strong> user2 / pass456</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard Component (same as before, but now protected)
  const Dashboard = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Campaign Dashboard</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2"
        >
          <Plus size={20} />
          New Campaign
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Leads</p>
              <p className="text-3xl font-bold text-gray-900">{analyticsData.totalLeads}</p>
              <p className="text-xs text-green-600 mt-1">↑ 12% from last month</p>
            </div>
            <Users className="text-indigo-600" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Qualified Leads</p>
              <p className="text-3xl font-bold text-gray-900">{analyticsData.qualifiedLeads}</p>
              <p className="text-xs text-green-600 mt-1">↑ 8% from last month</p>
            </div>
            <Target className="text-green-600" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Meetings Scheduled</p>
              <p className="text-3xl font-bold text-gray-900">{analyticsData.meetings}</p>
              <p className="text-xs text-green-600 mt-1">↑ 15% from last month</p>
            </div>
            <Calendar className="text-purple-600" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Opportunities</p>
              <p className="text-3xl font-bold text-gray-900">{analyticsData.opportunities}</p>
              <p className="text-xs text-green-600 mt-1">↑ 5% from last month</p>
            </div>
            <TrendingUp className="text-blue-600" size={32} />
          </div>
        </div>
      </div>

      {/* Campaign Performance Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Active Campaigns Performance</h3>
        <div className="space-y-4">
          {campaigns.filter(c => c.status === 'active').map(campaign => {
            const budgetUsed = (campaign.spent / campaign.budget) * 100;
            const conversionRate = campaign.conversionRate;
            
            return (
              <div key={campaign.id} className="border-b pb-4 last:border-b-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                    <p className="text-sm text-gray-600">{campaign.channels.join(', ')}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                    {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                  </span>
                </div>
                
                <div className="grid grid-cols-4 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-gray-600">Leads</p>
                    <p className="text-lg font-semibold text-gray-900">{campaign.leads}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Meetings</p>
                    <p className="text-lg font-semibold text-gray-900">{campaign.meetings}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Opportunities</p>
                    <p className="text-lg font-semibold text-gray-900">{campaign.opportunities}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Conv. Rate</p>
                    <p className="text-lg font-semibold text-gray-900">{conversionRate}%</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Budget Usage</span>
                    <span className="text-gray-900 font-medium">${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${budgetUsed}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-lg border border-indigo-200">
          <Mail className="text-indigo-600 mb-3" size={32} />
          <h3 className="font-semibold text-gray-900 mb-2">Email Campaigns</h3>
          <p className="text-sm text-gray-600 mb-4">28.5% open rate • 4.2% click rate</p>
          <button className="text-indigo-600 text-sm font-medium hover:text-indigo-700">
            View Email Performance →
          </button>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
          <Calendar className="text-purple-600 mb-3" size={32} />
          <h3 className="font-semibold text-gray-900 mb-2">Upcoming Webinars</h3>
          <p className="text-sm text-gray-600 mb-4">2 scheduled • 67% avg attendance</p>
          <button className="text-purple-600 text-sm font-medium hover:text-purple-700">
            Manage Webinars →
          </button>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
          <Target className="text-green-600 mb-3" size={32} />
          <h3 className="font-semibold text-gray-900 mb-2">Hot Leads</h3>
          <p className="text-sm text-gray-600 mb-4">12 leads ready for outreach</p>
          <button className="text-green-600 text-sm font-medium hover:text-green-700">
            View Hot Leads →
          </button>
        </div>
      </div>
    </div>
  );

  // Campaigns Component (truncated for space - same as before)
  const Campaigns = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Campaigns</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2"
        >
          <Plus size={20} />
          New Campaign
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md flex flex-wrap gap-4">
        <div className="flex-1 min-w-64">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 rounded-lg ${filterStatus === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilterStatus('active')}
            className={`px-4 py-2 rounded-lg ${filterStatus === 'active' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Active
          </button>
          <button
            onClick={() => setFilterStatus('planning')}
            className={`px-4 py-2 rounded-lg ${filterStatus === 'planning' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Planning
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCampaigns.map(campaign => (
          <div key={campaign.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{campaign.name}</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {campaign.channels.map(channel => (
                    <span key={channel} className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-full">
                      {channel}
                    </span>
                  ))}
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
              </span>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">Target Audience</p>
              <p className="text-sm text-gray-900">{campaign.targetAudience}</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b">
              <div>
                <p className="text-xs text-gray-600 mb-1">Leads</p>
                <p className="text-xl font-bold text-gray-900">{campaign.leads}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Meetings</p>
                <p className="text-xl font-bold text-gray-900">{campaign.meetings}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Opps</p>
                <p className="text-xl font-bold text-gray-900">{campaign.opportunities}</p>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Budget</span>
                <span className="text-gray-900 font-medium">
                  ${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-indigo-600 h-2 rounded-full"
                  style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>{campaign.startDate} - {campaign.endDate}</span>
              <div className="flex gap-2">
                <button className="text-indigo-600 hover:text-indigo-700 p-1">
                  <Eye size={18} />
                </button>
                <button className="text-gray-600 hover:text-gray-700 p-1">
                  <Edit2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Leads and Analytics components would go here (same as before)
  const Leads = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Leads Management</h2>
      <p className="text-gray-600">Lead management interface here...</p>
    </div>
  );

  const Analytics = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Analytics & Reporting</h2>
      <p className="text-gray-600">Analytics dashboard here...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Target className="text-indigo-600" size={32} />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">K-12 Campaign Manager</h1>
              <p className="text-sm text-gray-600">Educational Materials Marketing Platform</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right mr-4">
              <p className="text-sm font-medium text-gray-900">{currentUser?.name}</p>
              <p className="text-xs text-gray-600">@{currentUser?.username}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut size={18} />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 px-6">
        <div className="flex gap-1">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
            { id: 'campaigns', label: 'Campaigns', icon: Target },
            { id: 'leads', label: 'Leads', icon: Users },
            { id: 'analytics', label: 'Analytics', icon: TrendingUp }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'campaigns' && <Campaigns />}
        {activeTab === 'leads' && <Leads />}
        {activeTab === 'analytics' && <Analytics />}
      </div>

      {/* Add Campaign Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Create New Campaign</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Name</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
                <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience</label>
                <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" rows="3"></textarea>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Create Campaign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
