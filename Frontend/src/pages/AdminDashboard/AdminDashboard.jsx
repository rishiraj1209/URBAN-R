import React from 'react'

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
    const stats = [
        {title:"Registered Rickshaws", value:1245},
        {title:"Active Today", value:980},
        {title:"Suspended", value:45},
        {title:"Voilations Today", value:132},
        {title:"High Risk Drivers", value:28},
    ]

    const zoneData = [
        { zone: "Market", limit: 50, active: 62 },
        { zone: "School", limit: 30, active: 25 },
        { zone: "Station", limit: 80, active: 75 },
    ]

    const voilationData = [
        { no: "JH01AB1234", driver: "Raj", type: "Overspeed", severity: "Medium" },
        { no: "JH01AB5678", driver: "Aman", type: "Restricted Zone", severity: "High" },
    ]

    const chartZone = [
        { name: "Market", v: 40 },
        { name: "School", v: 15 },
        { name: "Station", v: 28 },
    ];

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

    const driverList = [
        { name: "Raj", vehicle: "JH01AB1234", battery: "Local", score: 45, status: "Risk" },
        { name: "Aman", vehicle: "JH01AB5678", battery: "Exide", score: 82, status: "Safe" },
    ];


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
            <button className='bg-red-500 text-white font-medium rounded-lg px-8 py-2 shadow-sm shadow-black active:shadow-none transition duration-200 cursor-pointer'>Logout</button>
        </div>

        {/* content */}

        <div className='mt-24 ml-64 p-8 space-y-8'>

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
                <table className='w-full rounded-t-lg overflow-hidden'>
                    <thead className='bg-neutral-200 '>
                        <tr>
                            <th className='p-3 text-left'>Zone</th>
                            <th className='p-3 text-left'>Max Allowed</th>
                            <th className='p-3 text-left'>Active</th>
                        </tr>
                    </thead>
                    <tbody className='border-b'>
                        {zoneData.map((zone,i)=>(
                            <tr key={i} className='border-t'>
                                <td className='p-3'>{zone.zone}</td>
                                <td className='p-3'>{zone.limit}</td>
                                <td className={`${zone.active > zone.limit ? 'text-red-500':'text-green-500'} p-3`}>{zone.active}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* voilations */}
            
            <div>
                <h2 className='text-2xl font-semibold mb-4'>Recent Voilations</h2>
                <table className='w-full rounded-t-lg overflow-hidden'>
                    <thead className='bg-neutral-200 '>
                        <tr>
                            <th className='p-3 text-left'>Vehicle</th>
                            <th className='p-3 text-left'>Driver</th>
                            <th className='p-3 text-left'>Voilation</th>
                            <th className='p-3 text-left'>Severity</th>
                        </tr>
                    </thead>
                    <tbody className='border-b'>
                        {voilationData.map((v,i)=>(
                            <tr key={i} className='border-t'>
                                <td className='p-3'>{v.no}</td>
                                <td className='p-3'>{v.driver}</td>
                                <td className='p-3'>{v.type}</td>
                                <td className='p-3'><span className={`py-1 px-3 rounded-full text-sm ${v.severity === 'High' ? 'text-red-600 bg-red-100':'text-yellow-600 bg-yellow-100'}`}>{v.severity}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

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
                    <th className="p-3 text-left">Battery</th>
                    <th className="p-3 text-left">Safety Score</th>
                    <th className="p-3 text-left">Status</th>
                </tr>
                </thead>
                <tbody>
                {driverList.map((d, i) => (
                    <tr key={i} className="border-t hover:bg-neutral-50">
                    <td className="p-3">{d.name}</td>
                    <td className="p-3">{d.vehicle}</td>
                    <td className="p-3">{d.battery}</td>
                    <td className="p-3 font-semibold">{d.score}</td>
                    <td className={`p-3 font-semibold ${d.status === "Risk" ? "text-red-500" : "text-green-600"}`}>
                        {d.status}
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
