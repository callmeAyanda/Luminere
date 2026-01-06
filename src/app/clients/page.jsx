// src/app/clients/page.js
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Crown,
  Star,
  Users,
  Award,
  Clock,
  Calendar,
  Bell,
  Settings,
  LogOut,
  Eye,
  EyeOff,
  Download,
  Share2,
  Filter,
  Search,
  Plus,
  ChevronDown,
  CheckCircle,
  Gift,
  Ticket,
  Globe,
  Phone,
  Mail,
  MapPin,
  Lock,
  Unlock,
  Key,
  User,
  CreditCard,
  FileText,
  BarChart3,
  TrendingUp,
  Package,
  Truck,
  MessageSquare,
  Video,
  Headphones,
  Sparkles,
  Zap,
  Target,
  Medal,
  GlobeLock,
  Cpu,
  ShieldCheck,
  BellRing,
  FileCheck,
  FolderHeart,
  BadgeCheck,
  Wallet,
  Smartphone,
  Monitor,
  Tablet
} from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import * as Tabs from '@radix-ui/react-tabs';
import * as Dialog from '@radix-ui/react-dialog';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ClientsPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [clientLevel, setClientLevel] = useState('platinum');
  const [recentProjects, setRecentProjects] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    biometricLogin: true,
    sessionTimeout: 30,
    emailAlerts: true,
    smsAlerts: false
  });

  const clientTiers = [
    {
      level: 'platinum',
      name: 'Platinum Tier',
      minSpend: 'R5M+',
      benefits: [
        'Dedicated Artisan Team',
        '24/7 Concierge',
        'Global Installation',
        'Private Showroom Access',
        'Exclusive Previews',
        'Lifetime Warranty',
        'Investment Advisory'
      ],
      icon: <Crown className="w-8 h-8" />,
      color: 'from-amber-600 to-amber-800'
    },
    {
      level: 'gold',
      name: 'Gold Tier',
      minSpend: 'R1M - R5M',
      benefits: [
        'Personal Design Consultant',
        'Priority Scheduling',
        'International Shipping',
        'VIP Events Access',
        'Extended Warranty',
        'Trade Program'
      ],
      icon: <Star className="w-8 h-8" />,
      color: 'from-amber-500 to-amber-700'
    },
    {
      level: 'silver',
      name: 'Silver Tier',
      minSpend: 'R250K - R1M',
      benefits: [
        'Design Consultation',
        'Standard Warranty',
        'White Glove Delivery',
        'Showroom Access',
        'Maintenance Services'
      ],
      icon: <Award className="w-8 h-8" />,
      color: 'from-zinc-600 to-zinc-800'
    }
  ];

  const clientData = {
    name: 'Ayanda Makhubu',
    membership: 'Platinum Tier',
    memberSince: '2018',
    totalSpent: 'R8,450,000',
    activeProjects: 3,
    completedProjects: 12,
    pendingOrders: 2,
    nextAppointment: '2024-03-15',
    concierge: 'Isabella Rossi',
    artisianTeam: ['Giovanni Moretti', 'Isabelle Laurent'],
    recentActivity: [
      {
        id: 1,
        type: 'project',
        title: 'Melrose Estate Project',
        description: 'Final design approval completed',
        date: '2 hours ago',
        status: 'completed'
      },
      {
        id: 2,
        type: 'delivery',
        title: 'Celestial Collection Delivery',
        description: 'Installation scheduled for March 20',
        date: '1 day ago',
        status: 'scheduled'
      },
      {
        id: 3,
        type: 'consultation',
        title: 'Design Consultation',
        description: 'New project discussion with Isabella',
        date: '3 days ago',
        status: 'upcoming'
      },
      {
        id: 4,
        type: 'payment',
        title: 'Installment Payment',
        description: 'Payment of R450,000 processed',
        date: '1 week ago',
        status: 'completed'
      }
    ]
  };

  const exclusiveEvents = [
    {
      id: 1,
      title: 'Private Artisan Exhibition',
      date: '2024-03-25',
      location: 'Florence, Italy',
      description: 'Exclusive preview of new renaissance collection',
      rsvpStatus: 'confirmed',
      guests: 2
    },
    {
      id: 2,
      title: 'Design Masters Summit',
      date: '2024-04-12',
      location: 'Dubai',
      description: 'Annual gathering of world-class designers',
      rsvpStatus: 'pending',
      guests: 4
    },
    {
      id: 3,
      title: 'Artisan Workshop',
      date: '2024-05-08',
      location: 'Kyoto, Japan',
      description: 'Private metalworking demonstration',
      rsvpStatus: 'interested',
      guests: 1
    }
  ];

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Investment Value',
        data: [5000000, 5200000, 5800000, 6200000, 6500000, 6800000, 7200000, 7500000, 7800000, 8000000, 8300000, 8450000],
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function (context) {
            return `$${context.raw.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: function (value) {
            return '$' + (value / 1000000) + 'M';
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    }
  };

  const services = [
    {
      id: 1,
      name: 'Investment Advisory',
      description: 'Luxury furniture as investment assets',
      icon: <TrendingUp className="w-6 h-6" />,
      status: 'active'
    },
    {
      id: 2,
      name: 'Estate Management',
      description: 'Complete care for your collection',
      icon: <ShieldCheck className="w-6 h-6" />,
      status: 'active'
    },
    {
      id: 3,
      name: 'Digital Twin',
      description: '3D models of all your pieces',
      icon: <Cpu className="w-6 h-6" />,
      status: 'pending'
    },
    {
      id: 4,
      name: 'Global Logistics',
      description: 'International shipping and storage',
      icon: <GlobeLock className="w-6 h-6" />,
      status: 'active'
    }
  ];

  useEffect(() => {
    // Simulate notifications
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNotifications([
      {
        id: 1,
        title: 'Project Update',
        message: 'Your dining table is ready for final review',
        time: '2 hours ago',
        read: false,
        type: 'project'
      },
      {
        id: 2,
        title: 'Appointment Reminder',
        message: 'Design consultation tomorrow at 2 PM',
        time: '5 hours ago',
        read: true,
        type: 'appointment'
      },
      {
        id: 3,
        title: 'Exclusive Invitation',
        message: 'Private exhibition in Florence next month',
        time: '1 day ago',
        read: false,
        type: 'event'
      }
    ]);
  }, []);

  const handleNewProject = () => {
    setShowNewProjectModal(true);
  };

  const handleLogout = () => {
    // Handle logout logic
    console.log('Logging out...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-zinc-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-800 rounded-full" />
              <span className="text-2xl font-light tracking-widest">LUMINÈRE</span>
              <span className="text-xs tracking-widest text-amber-400 ml-4 px-2 py-1 border border-amber-600/30 rounded-full">
                PRIVATE CLIENT PORTAL
              </span>
            </div>

            {/* Navigation Links */}
            <div className="hidden lg:flex items-center space-x-8 ml-12">
              <a onClick={() => router.push('/')} className="text-sm font-light tracking-widest hover:text-amber-200 transition-colors cursor-pointer">
                HOME
              </a>
              <a onClick={() => router.push('/collections')} className="text-sm font-light tracking-widest hover:text-amber-200 transition-colors cursor-pointer">
                COLLECTIONS
              </a>
              <a onClick={() => router.push('/bespoke')} className="text-sm font-light tracking-widest hover:text-amber-200 transition-colors cursor-pointer">
                BESPOKE
              </a>
              <a onClick={() => router.push('/artisans')} className="text-sm font-light tracking-widest hover:text-amber-200 transition-colors cursor-pointer">
                ARTISANS
              </a>
              <a onClick={() => router.push('/clients')} className="text-sm font-light tracking-widest text-amber-200 border-b border-amber-200 cursor-pointer">
                CLIENTS
              </a>
              <a onClick={() => router.push('/showrooms')} className="text-sm font-light tracking-widest hover:text-amber-200 transition-colors cursor-pointer">
                SHOWROOMS
              </a>
            </div>

            <div className="flex items-center space-x-6">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search projects, documents..."
                  className="pl-10 pr-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-full text-sm focus:outline-none focus:border-amber-600 w-64"
                />
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 hover:bg-zinc-800 rounded-full transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-amber-400 rounded-full" />
                  )}
                </button>

                {/* Notifications Dropdown */}
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-80 bg-gradient-to-b from-zinc-900 to-black border border-amber-800/30 rounded-xl shadow-2xl shadow-amber-900/10"
                    >
                      <div className="p-4 border-b border-zinc-800">
                        <div className="flex items-center justify-between">
                          <h3 className="font-light">Notifications</h3>
                          <button className="text-sm text-amber-400 hover:text-amber-300">
                            Mark all as read
                          </button>
                        </div>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map(notification => (
                          <div
                            key={notification.id}
                            className={`p-4 border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors ${!notification.read ? 'bg-amber-900/10' : ''
                              }`}
                          >
                            <div className="flex items-start space-x-3">
                              <div className={`w-2 h-2 rounded-full mt-2 ${notification.read ? 'bg-zinc-600' : 'bg-amber-400'
                                }`} />
                              <div className="flex-1">
                                <div className="font-light mb-1">{notification.title}</div>
                                <p className="text-sm text-zinc-400 mb-2">{notification.message}</p>
                                <div className="text-xs text-zinc-500">{notification.time}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-4 text-center">
                        <button className="text-sm text-amber-400 hover:text-amber-300">
                          View all notifications
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Profile Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-3 group"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center">
                    <span className="text-lg font-light">AM</span>
                  </div>
                  <div className="hidden md:block text-left">
                    <div className="text-sm font-light">{clientData.name}</div>
                    <div className="text-xs text-amber-400">{clientData.membership}</div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-zinc-400 group-hover:text-amber-400 transition-colors" />
                </button>

                {/* Profile Dropdown */}
                <AnimatePresence>
                  {showProfileMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-64 bg-gradient-to-b from-zinc-900 to-black border border-amber-800/30 rounded-xl shadow-2xl shadow-amber-900/10"
                    >
                      <div className="p-4 border-b border-zinc-800">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center">
                            <span className="text-xl font-light">AM</span>
                          </div>
                          <div>
                            <div className="font-light">{clientData.name}</div>
                            <div className="text-sm text-amber-400">{clientData.membership}</div>
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-zinc-800 transition-colors">
                          <User className="w-4 h-4" />
                          <span>Profile Settings</span>
                        </button>
                        <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-zinc-800 transition-colors">
                          <Settings className="w-4 h-4" />
                          <span>Account Settings</span>
                        </button>
                        <button
                          onClick={() => setShowSecurityModal(true)}
                          className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-zinc-800 transition-colors"
                        >
                          <Shield className="w-4 h-4" />
                          <span>Security</span>
                        </button>
                        <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-zinc-800 transition-colors">
                          <FileText className="w-4 h-4" />
                          <span>Documents</span>
                        </button>
                        <div className="border-t border-zinc-800 my-2" />
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-red-900/20 text-red-400 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Log Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-32">
        {/* Welcome Section */}
        <section className="pb-12">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
              <div>
                <h1 className="text-5xl md:text-6xl font-light tracking-tight leading-none mb-4">
                  Welcome back,{' '}
                  <span className="text-amber-200">{clientData.name.split(' ')[0]}</span>
                </h1>
                <p className="text-xl text-zinc-400 font-light">
                  Your exclusive portal to the world of Luminère
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={handleNewProject}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-800 rounded-full text-sm font-light tracking-widest hover:shadow-xl hover:shadow-amber-500/20 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>NEW PROJECT</span>
                </button>
                <button
                  onClick={() => setShowInviteModal(true)}
                  className="px-6 py-3 border border-amber-600/30 rounded-full text-sm font-light tracking-widest hover:bg-amber-900/20 transition-all"
                >
                  INVITE GUEST
                </button>
              </div>
            </div>

            {/* Client Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gradient-to-br from-zinc-900 to-black border border-amber-800/30 rounded-2xl p-6">
                <div className="text-sm text-zinc-400 mb-2">Total Investment</div>
                <div className="text-3xl font-light text-amber-400">{clientData.totalSpent}</div>
              </div>
              <div className="bg-gradient-to-br from-zinc-900 to-black border border-amber-800/30 rounded-2xl p-6">
                <div className="text-sm text-zinc-400 mb-2">Active Projects</div>
                <div className="text-3xl font-light">{clientData.activeProjects}</div>
              </div>
              <div className="bg-gradient-to-br from-zinc-900 to-black border border-amber-800/30 rounded-2xl p-6">
                <div className="text-sm text-zinc-400 mb-2">Completed</div>
                <div className="text-3xl font-light">{clientData.completedProjects}</div>
              </div>
              <div className="bg-gradient-to-br from-zinc-900 to-black border border-amber-800/30 rounded-2xl p-6">
                <div className="text-sm text-zinc-400 mb-2">Member Since</div>
                <div className="text-3xl font-light">{clientData.memberSince}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Dashboard */}
        <section className="py-8">
          <div className="container mx-auto px-6">
            <Tabs.Root value={activeTab} onValueChange={setActiveTab} className="space-y-8">
              <Tabs.List className="flex space-x-2 border-b border-zinc-800">
                <Tabs.Trigger
                  value="overview"
                  className={`px-6 py-3 text-sm font-light tracking-widest transition-all relative ${activeTab === 'overview' ? 'text-amber-200' : 'text-zinc-400 hover:text-white'
                    }`}
                >
                  Overview
                  {activeTab === 'overview' && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-600 to-amber-800"
                    />
                  )}
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="projects"
                  className={`px-6 py-3 text-sm font-light tracking-widest transition-all relative ${activeTab === 'projects' ? 'text-amber-200' : 'text-zinc-400 hover:text-white'
                    }`}
                >
                  Projects
                  {activeTab === 'projects' && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-600 to-amber-800"
                    />
                  )}
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="services"
                  className={`px-6 py-3 text-sm font-light tracking-widest transition-all relative ${activeTab === 'services' ? 'text-amber-200' : 'text-zinc-400 hover:text-white'
                    }`}
                >
                  Services
                  {activeTab === 'services' && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-600 to-amber-800"
                    />
                  )}
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="events"
                  className={`px-6 py-3 text-sm font-light tracking-widest transition-all relative ${activeTab === 'events' ? 'text-amber-200' : 'text-zinc-400 hover:text-white'
                    }`}
                >
                  Events
                  {activeTab === 'events' && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-600 to-amber-800"
                    />
                  )}
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="documents"
                  className={`px-6 py-3 text-sm font-light tracking-widest transition-all relative ${activeTab === 'documents' ? 'text-amber-200' : 'text-zinc-400 hover:text-white'
                    }`}
                >
                  Documents
                  {activeTab === 'documents' && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-600 to-amber-800"
                    />
                  )}
                </Tabs.Trigger>
              </Tabs.List>

              {/* Overview Tab */}
              <Tabs.Content value="overview" className="space-y-8">
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Investment Chart */}
                  <div className="lg:col-span-2">
                    <div className="bg-gradient-to-br from-zinc-900 to-black border border-amber-800/30 rounded-2xl p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-light">Investment Portfolio</h3>
                        <div className="flex items-center space-x-2">
                          <button className="px-3 py-1 text-xs border border-amber-600/30 rounded-full hover:bg-amber-900/20 transition-all">
                            1 Year
                          </button>
                          <button className="px-3 py-1 text-xs border border-zinc-800 rounded-full hover:bg-zinc-800 transition-all">
                            3 Years
                          </button>
                          <button className="px-3 py-1 text-xs border border-zinc-800 rounded-full hover:bg-zinc-800 transition-all">
                            All Time
                          </button>
                        </div>
                      </div>
                      <div className="h-64">
                        <Line data={chartData} options={chartOptions} />
                      </div>
                      <div className="mt-6 grid grid-cols-2 gap-4">
                        <div className="p-4 border border-zinc-800 rounded-xl">
                          <div className="text-sm text-zinc-400 mb-1">Portfolio Growth</div>
                          <div className="text-2xl font-light text-green-400">+69%</div>
                          <div className="text-xs text-zinc-500">Since 2018</div>
                        </div>
                        <div className="p-4 border border-zinc-800 rounded-xl">
                          <div className="text-sm text-zinc-400 mb-1">Current Valuation</div>
                          <div className="text-2xl font-light">{clientData.totalSpent}</div>
                          <div className="text-xs text-zinc-500">Appraised value</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div>
                    <div className="bg-gradient-to-br from-zinc-900 to-black border border-amber-800/30 rounded-2xl p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-light">Recent Activity</h3>
                        <button className="text-sm text-amber-400 hover:text-amber-300">
                          View All
                        </button>
                      </div>
                      <div className="space-y-4">
                        {clientData.recentActivity.map(activity => (
                          <div key={activity.id} className="p-4 border border-zinc-800 rounded-xl hover:border-amber-600/30 transition-colors">
                            <div className="flex items-start justify-between mb-2">
                              <div className="font-light">{activity.title}</div>
                              <span className={`text-xs px-2 py-1 rounded-full ${activity.status === 'completed' ? 'bg-green-900/30 text-green-400' :
                                activity.status === 'scheduled' ? 'bg-blue-900/30 text-blue-400' :
                                  'bg-amber-900/30 text-amber-400'
                                }`}>
                                {activity.status}
                              </span>
                            </div>
                            <p className="text-sm text-zinc-400 mb-2">{activity.description}</p>
                            <div className="text-xs text-zinc-500">{activity.date}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Services & Team */}
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Your Team */}
                  <div className="bg-gradient-to-br from-zinc-900 to-black border border-amber-800/30 rounded-2xl p-6">
                    <h3 className="text-xl font-light mb-6">Your Dedicated Team</h3>
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-900/20 to-amber-800/10 border border-amber-800/30 flex items-center justify-center">
                          <Users className="w-8 h-8 text-amber-400" />
                        </div>
                        <div>
                          <div className="font-light">Personal Concierge</div>
                          <div className="text-amber-400">{clientData.concierge}</div>
                          <div className="text-sm text-zinc-400">24/7 Availability</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {clientData.artisianTeam.map((artisan, i) => (
                          <div key={i} className="p-4 border border-zinc-800 rounded-xl">
                            <div className="font-light text-sm mb-1">Master Artisan</div>
                            <div className="text-amber-400">{artisan}</div>
                          </div>
                        ))}
                      </div>
                      <button className="w-full py-3 border border-amber-600/30 rounded-xl text-sm hover:bg-amber-900/20 transition-all">
                        Schedule Team Meeting
                      </button>
                    </div>
                  </div>

                  {/* Exclusive Services */}
                  <div className="bg-gradient-to-br from-zinc-900 to-black border border-amber-800/30 rounded-2xl p-6">
                    <h3 className="text-xl font-light mb-6">Active Services</h3>
                    <div className="space-y-4">
                      {services.map(service => (
                        <div key={service.id} className="flex items-center justify-between p-4 border border-zinc-800 rounded-xl hover:border-amber-600/30 transition-colors">
                          <div className="flex items-center space-x-4">
                            <div className={`p-2 rounded-lg ${service.status === 'active' ? 'bg-amber-900/20' : 'bg-zinc-800'
                              }`}>
                              {service.icon}
                            </div>
                            <div>
                              <div className="font-light">{service.name}</div>
                              <div className="text-sm text-zinc-400">{service.description}</div>
                            </div>
                          </div>
                          <span className={`text-xs px-3 py-1 rounded-full ${service.status === 'active' ? 'bg-green-900/30 text-green-400' : 'bg-amber-900/30 text-amber-400'
                            }`}>
                            {service.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Tabs.Content>

              {/* Projects Tab */}
              <Tabs.Content value="projects">
                <div className="bg-gradient-to-br from-zinc-900 to-black border border-amber-800/30 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-light">Your Projects</h3>
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
                        <input
                          type="text"
                          placeholder="Search projects..."
                          className="pl-10 pr-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-full text-sm focus:outline-none focus:border-amber-600 w-64"
                        />
                      </div>
                      <button className="p-2 border border-zinc-800 rounded-lg hover:border-amber-600/30 transition-colors">
                        <Filter className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map(project => (
                      <div key={project} className="border border-zinc-800 rounded-2xl overflow-hidden hover:border-amber-600/30 transition-all group">
                        <div className="aspect-video bg-gradient-to-br from-amber-900/20 to-black/50 relative">
                          <div className="absolute inset-0 p-6 flex flex-col justify-between">
                            <div>
                              <span className="inline-block px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs mb-4">
                                Active
                              </span>
                              <h4 className="text-xl font-light mb-2">Manhattan Penthouse</h4>
                              <p className="text-sm text-zinc-400">Complete interior design project</p>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="text-sm text-amber-400">R2.8M Budget</div>
                              <div className="text-sm text-zinc-400">65% Complete</div>
                            </div>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="text-sm text-zinc-400">Progress</div>
                            <div className="text-sm">15/23 Tasks</div>
                          </div>
                          <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-amber-600 to-amber-800" style={{ width: '65%' }} />
                          </div>
                          <div className="flex items-center justify-between mt-6">
                            <button className="px-4 py-2 border border-zinc-800 rounded-lg text-sm hover:border-amber-600/30 transition-all">
                              View Details
                            </button>
                            <button className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-800 rounded-lg text-sm font-light hover:shadow-lg hover:shadow-amber-500/20 transition-all">
                              Manage
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Tabs.Content>

              {/* Events Tab */}
              <Tabs.Content value="events">
                <div className="bg-gradient-to-br from-zinc-900 to-black border border-amber-800/30 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-light">Exclusive Events</h3>
                    <button className="px-4 py-2 border border-amber-600/30 rounded-full text-sm hover:bg-amber-900/20 transition-all">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      View Calendar
                    </button>
                  </div>

                  <div className="space-y-6">
                    {exclusiveEvents.map(event => (
                      <div key={event.id} className="p-6 border border-zinc-800 rounded-2xl hover:border-amber-600/30 transition-all">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                          <div className="flex-1">
                            <div className="flex items-center space-x-4 mb-4">
                              <div className="p-3 bg-gradient-to-br from-amber-900/20 to-amber-800/10 border border-amber-800/30 rounded-xl">
                                <Calendar className="w-6 h-6 text-amber-400" />
                              </div>
                              <div>
                                <h4 className="text-xl font-light mb-2">{event.title}</h4>
                                <div className="flex items-center space-x-4 text-sm text-zinc-400">
                                  <div className="flex items-center space-x-1">
                                    <Calendar className="w-4 h-4" />
                                    <span>{event.date}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <MapPin className="w-4 h-4" />
                                    <span>{event.location}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <p className="text-zinc-400">{event.description}</p>
                          </div>

                          <div className="flex flex-col items-end space-y-4">
                            <span className={`px-4 py-2 rounded-full text-sm font-light ${event.rsvpStatus === 'confirmed' ? 'bg-green-900/30 text-green-400' :
                              event.rsvpStatus === 'pending' ? 'bg-amber-900/30 text-amber-400' :
                                'bg-blue-900/30 text-blue-400'
                              }`}>
                              {event.rsvpStatus.toUpperCase()}
                            </span>
                            <div className="flex items-center space-x-4">
                              <button className="px-4 py-2 border border-zinc-800 rounded-lg text-sm hover:border-amber-600/30 transition-all">
                                Details
                              </button>
                              <button className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-800 rounded-lg text-sm font-light hover:shadow-lg hover:shadow-amber-500/20 transition-all">
                                {event.rsvpStatus === 'confirmed' ? 'Update RSVP' : 'RSVP Now'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Tabs.Content>
            </Tabs.Root>
          </div>
        </section>

        {/* Client Tiers */}
        <section className="py-20 bg-gradient-to-b from-black/50 to-zinc-950/50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 mb-6">
                <Crown className="w-5 h-5 text-amber-400" />
                <span className="text-sm tracking-[0.3em] text-amber-400">EXCLUSIVE MEMBERSHIP</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-light mb-6">
                Client <span className="text-amber-200">Tiers</span>
              </h2>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                Unlock increasingly exclusive benefits as your relationship with Luminère grows
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {clientTiers.map((tier, index) => (
                <motion.div
                  key={tier.level}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative rounded-3xl overflow-hidden ${clientLevel === tier.level
                    ? 'border-2 border-amber-600 shadow-2xl shadow-amber-900/20'
                    : 'border border-zinc-800'
                    }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${tier.color} opacity-10`} />
                  <div className="relative p-8">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className={`p-4 rounded-xl bg-gradient-to-br ${tier.color}`}>
                        {tier.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-light">{tier.name}</h3>
                        <div className="text-amber-400">Minimum: {tier.minSpend}</div>
                      </div>
                    </div>

                    <div className="space-y-4 mb-8">
                      {tier.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-amber-400" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>

                    {clientLevel === tier.level ? (
                      <div className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-800 rounded-full text-center font-light tracking-widest">
                        CURRENT TIER
                      </div>
                    ) : (
                      <button className="w-full py-3 border border-amber-600/30 rounded-full text-sm hover:bg-amber-900/20 transition-all">
                        Upgrade to {tier.name}
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* New Project Modal */}
      <Dialog.Root open={showNewProjectModal} onOpenChange={setShowNewProjectModal}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl bg-gradient-to-br from-zinc-900 to-black border border-amber-800/30 rounded-3xl overflow-hidden">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <Dialog.Title className="text-3xl font-light">
                  Start New Project
                </Dialog.Title>
                <Dialog.Close className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-amber-600/30 flex items-center justify-center hover:bg-amber-900/30 transition-colors">
                  <X className="w-5 h-5" />
                </Dialog.Close>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-light tracking-widest mb-2">PROJECT NAME</label>
                  <input
                    type="text"
                    placeholder="e.g., London Residence Dining Room"
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-6 py-4 focus:outline-none focus:border-amber-600 transition-colors"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-light tracking-widest mb-2">PROJECT TYPE</label>
                    <select className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-6 py-4 focus:outline-none focus:border-amber-600 transition-colors">
                      <option value="">Select type</option>
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                      <option value="yacht">Yacht Interior</option>
                      <option value="private-jet">Private Jet</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-light tracking-widest mb-2">BUDGET RANGE</label>
                    <select className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-6 py-4 focus:outline-none focus:border-amber-600 transition-colors">
                      <option value="">Select budget</option>
                      <option value="250-500">$250K - $500K</option>
                      <option value="500-1000">$500K - $1M</option>
                      <option value="1000-2500">$1M - $2.5M</option>
                      <option value="2500+">$2.5M+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-light tracking-widest mb-2">TIMELINE</label>
                  <select className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px=6 py-4 focus:outline-none focus:border-amber-600 transition-colors">
                    <option value="">Select timeline</option>
                    <option value="3-6">3-6 months</option>
                    <option value="6-12">6-12 months</option>
                    <option value="12-18">12-18 months</option>
                    <option value="18+">18+ months</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-light tracking-widest mb-2">PROJECT DESCRIPTION</label>
                  <textarea
                    rows="4"
                    placeholder="Describe your vision, requirements, and any specific needs..."
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-6 py-4 focus:outline-none focus:border-amber-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-light tracking-widest mb-2">ATTACH FILES (Optional)</label>
                  <div className="border-2 border-dashed border-zinc-800 rounded-xl p-8 text-center hover:border-amber-600/50 transition-colors cursor-pointer">
                    <div className="text-4xl mb-4">📎</div>
                    <div className="text-zinc-400">Drop files here or click to browse</div>
                    <div className="text-sm text-zinc-500 mt-2">Floor plans, inspiration images, etc.</div>
                  </div>
                </div>

                <button className="w-full py-4 bg-gradient-to-r from-amber-600 to-amber-800 rounded-xl text-lg font-light tracking-widest hover:shadow-xl hover:shadow-amber-500/20 transition-all">
                  SUBMIT PROJECT REQUEST
                </button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Security Modal */}
      <AnimatePresence>
        {showSecurityModal && (
          <SecurityModal
            isOpen={showSecurityModal}
            onClose={() => setShowSecurityModal(false)}
            settings={securitySettings}
            onSettingsChange={setSecuritySettings}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Security Modal Component
function SecurityModal({ isOpen, onClose, settings, onSettingsChange }) {
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [devices, setDevices] = useState([
    { id: 1, name: 'iPhone 14 Pro', type: 'mobile', lastActive: '2 hours ago', trusted: true },
    { id: 2, name: 'MacBook Pro', type: 'laptop', lastActive: '1 day ago', trusted: true },
    { id: 3, name: 'iPad Pro', type: 'tablet', lastActive: '1 week ago', trusted: false }
  ]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-gradient-to-br from-zinc-900 to-black border border-amber-800/30 rounded-3xl overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-amber-600/30 flex items-center justify-center hover:bg-amber-900/30 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          <h3 className="text-3xl font-light mb-2">Security Settings</h3>
          <p className="text-zinc-400 mb-8">Manage your account security and privacy</p>

          <div className="space-y-8">
            {/* Two-Factor Authentication */}
            <div className="p-6 border border-zinc-800 rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <Shield className="w-6 h-6 text-amber-400" />
                    <h4 className="text-xl font-light">Two-Factor Authentication</h4>
                  </div>
                  <p className="text-zinc-400">Add an extra layer of security to your account</p>
                </div>
                <button
                  onClick={() => setShowTwoFactor(!showTwoFactor)}
                  className={`px-6 py-2 rounded-full text-sm font-light tracking-widest transition-all ${settings.twoFactorAuth
                    ? 'bg-gradient-to-r from-amber-600 to-amber-800'
                    : 'border border-amber-600/30 hover:bg-amber-900/20'
                    }`}
                >
                  {settings.twoFactorAuth ? 'ENABLED' : 'ENABLE'}
                </button>
              </div>

              {showTwoFactor && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="overflow-hidden"
                >
                  <div className="pt-6 border-t border-zinc-800">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center p-4 border border-amber-800/30 rounded-xl">
                        <div className="text-2xl mb-2">📱</div>
                        <div className="font-light mb-2">Authenticator App</div>
                        <button className="w-full py-2 bg-gradient-to-r from-amber-600 to-amber-800 rounded-lg text-sm">
                          Setup
                        </button>
                      </div>
                      <div className="text-center p-4 border border-zinc-800 rounded-xl">
                        <div className="text-2xl mb-2">📞</div>
                        <div className="font-light mb-2">SMS Verification</div>
                        <button className="w-full py-2 border border-zinc-800 rounded-lg text-sm hover:border-amber-600/30">
                          Setup
                        </button>
                      </div>
                      <div className="text-center p-4 border border-zinc-800 rounded-xl">
                        <div className="text-2xl mb-2">🔑</div>
                        <div className="font-light mb-2">Security Key</div>
                        <button className="w-full py-2 border border-zinc-800 rounded-lg text-sm hover:border-amber-600/30">
                          Setup
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Security Settings */}
            <div className="p-6 border border-zinc-800 rounded-2xl">
              <h4 className="text-xl font-light mb-6">Security Preferences</h4>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-light mb-1">Biometric Login</div>
                    <div className="text-sm text-zinc-400">Use Face ID or fingerprint</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.biometricLogin}
                      onChange={(e) => onSettingsChange({ ...settings, biometricLogin: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600" />
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-light mb-1">Email Alerts</div>
                    <div className="text-sm text-zinc-400">Security notifications via email</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.emailAlerts}
                      onChange={(e) => onSettingsChange({ ...settings, emailAlerts: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600" />
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-light mb-1">Session Timeout</div>
                    <div className="text-sm text-zinc-400">Auto-logout after inactivity</div>
                  </div>
                  <select
                    value={settings.sessionTimeout}
                    onChange={(e) => onSettingsChange({ ...settings, sessionTimeout: parseInt(e.target.value) })}
                    className="bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-2 focus:outline-none focus:border-amber-600"
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="120">2 hours</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Trusted Devices */}
            <div className="p-6 border border-zinc-800 rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-xl font-light">Trusted Devices</h4>
                <button className="text-sm text-amber-400 hover:text-amber-300">
                  Add New Device
                </button>
              </div>

              <div className="space-y-4">
                {devices.map(device => (
                  <div key={device.id} className="flex items-center justify-between p-4 border border-zinc-800 rounded-xl">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${device.type === 'mobile' ? 'bg-blue-900/20' :
                        device.type === 'laptop' ? 'bg-purple-900/20' :
                          'bg-amber-900/20'
                        }`}>
                        {device.type === 'mobile' ? <Smartphone className="w-5 h-5" /> :
                          device.type === 'laptop' ? <Monitor className="w-5 h-5" /> :
                            <Tablet className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="font-light">{device.name}</div>
                        <div className="text-sm text-zinc-400">Last active: {device.lastActive}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {device.trusted ? (
                        <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-sm">
                          Trusted
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-amber-900/30 text-amber-400 rounded-full text-sm">
                          Review Needed
                        </span>
                      )}
                      <button className="text-red-400 hover:text-red-300">
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Helper components
function X(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export default ClientsPage;

