import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/axios'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [dashboard, setDashboard] = useState(null);
    const [zoneData, setZoneData] = useState([]);
    const [violationData, setViolationData] = useState([]);
    const [driverList, setDriverList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const stats = dashboard ? [
        { title: "Registered Rickshaws", value: dashboard.registeredRickshaws },
        { title: "Active Today", value: dashboard.activeToday },
        { title: "Suspended", value: dashboard.suspended },
        { title: "Voilations Today", value: dashboard.violationsToday },
        { title: "High Risk Drivers", value: dashboard.highRiskDrivers },
    ] : [];

    const chartZone = zoneData.map((zone) => ({ name: zone.zone, v: zone.active }));
    const monthly = [
        { m: "Jan", s: 90 },
        { m: "Feb", s: 82 },
        { m: "Mar", s: 76 },
    ];

    const pieData = [
      { name: "Safe", value: 70 },
      { name: "Risk", value: 30 },
    ];

    const COLORS = ["#22c55e", "#dc2626"];

    useEffect(() => {
      const fetchDashboard = async () => {
        try {
          const [dashboardRes, zonesRes, violationsRes, driversRes] = await Promise.all([
            api.get('/api/admin/dashboard'),
            api.get('/api/admin/zones'),
            api.get('/api/admin/violations'),
            api.get('/api/admin/drivers'),
          ]);

          setDashboard(dashboardRes.data);
          setZoneData(zonesRes.data);
          setViolationData(violationsRes.data);
          setDriverList(driversRes.data);
        } catch (err) {
          setError(err.response?.data?.message || err.message || 'Unable to load admin data');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchDashboard();
    }, []);

    const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      navigate('/login');
    };

  return (
    <div className='bg-neutral-100 min-h-screen'>
        {/* sidebar */}
        <div className='fixed top-0 left-0 w-64 h-screen bg-blue-950 shadow-sm z-30 p-6 text-white'>
            <h2 className='text-2xl font-semibold mb-6'>Admin Panel</h2>
            <ul className='space-y-4 text-neutral-300'>
                <li className='font-medium hover:text-white cursor-pointer transition'>Dashboard</li>
                <li className='font-medium hover:text-white cursor-pointer transition'>Drivers</li>
                <li className='font-medium hover:text-white cursor-pointer transition'>Zones</li>
                <li className='font-medium hover:text-white cursor-pointer transition'>Voilations</li>
                <li className='font-medium hover:text-white cursor-pointer transition'>Reports</li>
            </ul>
        </div>

        {/* navbar */}
        <div className='fixed left-64 top-0 right-0 h-24 bg-white shadow-sm shadow-black z-20 px-4 flex justify-between items-center'>
            <h1 className='text-2xl font-bold bg-linear-to-b from-neutral-700 via-neutral-800 to-neutral-900 bg-clip-text text-transparent'>City Regulation Dashboard</h1>
            <button onClick={handleLogout} className='bg-red-500 text-white font-medium rounded-lg px-8 py-2 shadow-sm shadow-black active:shadow-none transition duration-200 cursor-pointer'>Logout</button>
        </div>

        {/* content */}

        <div className='mt-24 ml-64 p-8 space-y-8'>

            {loading ? (
              <div className='bg-white p-8 rounded-xl shadow'>
                <p className='text-lg font-medium'>Loading admin dashboard...</p>
              </div>
            ) : error ? (
              <div className='bg-white p-8 rounded-xl shadow'>
                <p className='text-lg font-medium text-red-600'>Error loading admin dashboard: {error}</p>
              </div>
            ) : (
              <>
                {/* statCards */}
                <div className='grid grid-cols-5 gap-4'>
                    {stats.map((stat, index)=>(
                        <div key={index} className='bg-white p-4 rounded-xl shadow hover:scale-110 transition duration-200'>
                            <h2 className='text-neutral-500'>{stat.title}</h2>
                            <p className='text-2xl font-bold'>{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* zone regulation */}
                <div>
                    <h2 className='text-2xl font-semibold mb-4'>Zone Regulation</h2>
                    <table className='w-full rounded-t-lg overflow-hidden bg-white'>
                        <thead className='bg-neutral-200 '>
                            <tr>
                                <th className='p-3 text-left'>Zone</th>
                                <th className='p-3 text-left'>Total Rickshaws</th>
                                <th className='p-3 text-left'>Active Rickshaws</th>
                            </tr>
                        </thead>
                        <tbody className='border-b'>
                            {zoneData.map((zone,i)=>(
                                <tr key={i} className='border-t'>
                                    <td className='p-3'>{zone.zone}</td>
                                    <td className='p-3'>{zone.totalRickshaws}</td>
                                    <td className={`p-3 ${zone.activeRickshaws > 0 ? 'text-green-500' : 'text-gray-500'}`}>{zone.activeRickshaws}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* voilations */}
                
                <div>
                    <h2 className='text-2xl font-semibold mb-4'>Recent Violations</h2>
                    <table className='w-full rounded-t-lg overflow-hidden bg-white'>
                        <thead className='bg-neutral-200 '>
                            <tr>
                                <th className='p-3 text-left'>Vehicle</th>
                                <th className='p-3 text-left'>Driver</th>
                                <th className='p-3 text-left'>Violation</th>
                                <th className='p-3 text-left'>Severity</th>
                            </tr>
                        </thead>
                        <tbody className='border-b'>
                            {violationData.map((v,i)=>(
                                <tr key={i} className='border-t'>
                                    <td className='p-3'>{v.rickshaw?.vehicleNumber || 'N/A'}</td>
                                    <td className='p-3'>{v.driver?.name || 'Unknown'}</td>
                                    <td className='p-3'>{v.type || 'Unknown'}</td>
                                    <td className='p-3'><span className={`py-1 px-3 rounded-full text-sm ${v.severity === 'High' ? 'text-red-600 bg-red-100':'text-yellow-600 bg-yellow-100'}`}>{v.severity || 'Medium'}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
              </>
            )}

            {/* Charts */}

            <div className="grid grid-cols-3 gap-6 pt-4">

                <div className="bg-white rounded-xl shadow p-4 h-72">
                    <h3 className="font-bold mb-3">Violations per Zone</h3>
                    <ResponsiveContainer width="100%" height="90%">
                    <BarChart data={chartZone}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="v" fill="#036bfc" />
                    </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-xl shadow p-4 h-72">
                    <h3 className="font-bold mb-3">Safety Trend</h3>
                    <ResponsiveContainer width="100%" height="90%">
                        <LineChart data={monthly}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="m" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="s"
                                stroke="#22c55e"
                                strokeWidth={3}
                                activeDot={{ r: 8 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-xl shadow p-4 h-72">
                    <h3 className="font-bold mb-3">Driver Risk Ratio</h3>
                    <ResponsiveContainer width="100%" height="90%">
                        <PieChart>
                            <Pie data={pieData} dataKey="value">
                                {pieData.map((entry, index) => (
                                <Cell key={index} fill={COLORS[index]} />
                                ))}
                            </Pie>
                            <Tooltip/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>

            </div>


            {/* Driver Management */}
            <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-4">Driver Management</h2>
            <table className="w-full border-collapse">
                <thead className="bg-neutral-100">
                <tr>
                    <th className="p-3 text-left">Driver</th>
                    <th className="p-3 text-left">Vehicle</th>
                    <th className="p-3 text-left">Safety Score</th>
                    <th className="p-3 text-left">Violations</th>
                    <th className="p-3 text-left">Status</th>
                </tr>
                </thead>
                <tbody>
                {driverList.map((d, i) => (
                    <tr key={i} className="border-t hover:bg-neutral-50">
                    <td className="p-3">{d.name}</td>
                    <td className="p-3">{d.vehicleNumber || 'N/A'}</td>
                    <td className="p-3 font-semibold">{d.safetyScore || 0}</td>
                    <td className="p-3">{d.totalViolations ?? 0}</td>
                    <td className={`p-3 font-semibold ${d.status === "suspended" || d.status === "Risk" ? "text-red-500" : "text-green-600"}`}>
                        {d.status || 'pending'}
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>




        </div>
      
    </div>
  )
}

export default AdminDashboard
