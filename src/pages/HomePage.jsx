import React, { useEffect } from 'react';
import {
    Users,
    ShoppingBag,
    TrendingUp,
    DollarSign,
    Package,
    ChevronRight,
    ArrowUpRight,
} from 'lucide-react';
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    PieChart,
    Pie,
    Cell,
} from 'recharts';
import { useDashboardStatsStore } from '../store/DashboardStats.store';
import Loader from '../utils/Loader';

const COLORS = ['#f7ac5c', '#3b82f6', '#10b981', '#f43f5e', '#8b5cf6'];

export default function HomePage() {
    const { stats, loading, getDashboardStats } = useDashboardStatsStore();

    useEffect(() => {
        getDashboardStats();
    }, [getDashboardStats]);

    if (loading && !stats) {
        return (
            <Loader title="Statistics" />
        );
    }

    if (!stats) return null;

    const statCards = [
        { id: 1, name: 'Total Revenue', value: `${stats.stats?.totalRevenue?.toLocaleString()} EGP`, icon: DollarSign, color: 'text-green-400', bg: 'bg-green-400/10' },
        { id: 2, name: 'Total Orders', value: stats.stats?.totalOrders?.toLocaleString(), icon: ShoppingBag, color: 'text-blue-400', bg: 'bg-blue-400/10' },
        { id: 3, name: 'Total Users', value: stats.stats?.totalUsers?.toLocaleString(), icon: Users, color: 'text-yellow', bg: 'bg-yellow/10' },
        { id: 4, name: 'Total Products', value: stats.stats?.totalProducts?.toLocaleString(), icon: Package, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    ];

    // Format sales trend days
    const formattedSalesTrend = stats.salesTrend?.map(item => ({
        ...item,
        day: new Date(item.date).toLocaleDateString('en-US', { weekday: 'short' })
    }));

    // Format status distribution for pie chart
    const formattedStatusData = stats.statusDistribution?.map(item => ({
        name: item.status,
        value: item.count
    }));

    return (
        <div className="space-y-8 animate-fade-in pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl md:text-5xl font-modern-negra text-white mb-2">
                        Dashboard <span className="text-yellow">Overview</span>
                    </h1>
                    <p className="text-white/50 font-sans">Optimized real-time analytics for your burger shop.</p>
                </div>
                <div className="bg-green-400/10 border border-green-400/20 px-4 py-2 rounded-2xl flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-green-400 text-sm font-bold">Real-time Analytics</span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat) => (
                    <div key={stat.id} className="bg-black/40 border border-yellow/10 p-6 rounded-3xl backdrop-blur-md group hover:border-yellow/30 transition-all duration-300">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                            <span className="text-green-400 flex items-center text-xs font-bold">
                                <ArrowUpRight size={14} className="mr-1" />
                                +Live
                            </span>
                        </div>
                        <h3 className="text-white/60 text-sm font-sans mb-1">{stat.name}</h3>
                        <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                        <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden mt-4">
                            <div className={`h-full ${stat.color.replace('text', 'bg')} w-[70%] rounded-full`} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sales Chart */}
                <div className="lg:col-span-2 bg-black/40 border border-yellow/10 p-6 rounded-3xl backdrop-blur-md">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="text-xl font-bold text-white">Sales Revenue</h3>
                            <p className="text-white/40 text-sm">Revenue trend from recent activity</p>
                        </div>
                    </div>

                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={formattedSalesTrend}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f7ac5c" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#f7ac5c" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                <XAxis
                                    dataKey="day"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#ffffff60', fontSize: 12 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#ffffff60', fontSize: 12 }}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#111', border: '1px solid #f7ac5c30', borderRadius: '16px' }}
                                    itemStyle={{ color: '#f7ac5c' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#f7ac5c"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorRevenue)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Status Distribution */}
                <div className="bg-black/40 border border-yellow/10 p-6 rounded-3xl backdrop-blur-md flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-2">Order Status</h3>
                    <p className="text-white/40 text-sm mb-8">Current order breakdown</p>

                    <div className="h-[200px] w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={formattedStatusData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {formattedStatusData?.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff2d4', border: '1px solid #ffffff10', borderRadius: '16px' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-2xl font-bold text-white">{stats.stats?.totalOrders}</span>
                            <span className="text-xs text-white/40">Total</span>
                        </div>
                    </div>

                    <div className="mt-6 space-y-3">
                        {formattedStatusData?.map((item, index) => (
                            <div key={item.name} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                                    <span className="text-sm text-white/70">{item.name}</span>
                                </div>
                                <span className="text-sm font-bold text-white">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Top Selling Products */}
                <div className="bg-black/40 border border-yellow/10 p-6 rounded-3xl backdrop-blur-md">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-white">Top Selling Products</h3>
                        <button className="text-yellow text-sm font-bold flex items-center hover:underline">
                            View All <ChevronRight size={16} />
                        </button>
                    </div>
                    <div className="space-y-4">
                        {stats.topProducts?.map((product, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-black overflow-hidden border border-white/10 group-hover:border-yellow/30 transition-colors">
                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold">{product.name}</h4>
                                        <p className="text-white/40 text-sm">{product.qty} units sold</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-yellow font-bold">{product.revenue?.toLocaleString()} EGP</p>
                                    <p className="text-green-400 text-xs flex items-center justify-end">
                                        <TrendingUp size={12} className="mr-1" />
                                        Popular
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activities */}
                <div className="bg-black/40 border border-yellow/10 p-6 rounded-3xl backdrop-blur-md">
                    <h3 className="text-xl font-bold text-white mb-6">Recent Orders</h3>
                    <div className="space-y-4">
                        {stats.recentOrders?.map((order) => (
                            <div key={order.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-yellow/20 flex items-center justify-center text-yellow font-bold">
                                        {order.userName?.charAt(0) || 'U'}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-sm">{order.userName || 'Unknown User'}</h4>
                                        <p className="text-white/40 text-xs">{new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    <span className="text-sm font-bold text-white">{order.total?.toLocaleString()} EGP</span>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${order.status === 'DELIVERED' ? 'text-green-400 border-green-400/20 bg-green-400/10' :
                                        order.status === 'PENDING' ? 'text-yellow border-yellow/20 bg-yellow/10' :
                                            'text-blue-400 border-blue-400/20 bg-blue-400/10'
                                        }`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
