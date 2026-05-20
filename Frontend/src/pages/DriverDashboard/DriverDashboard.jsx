import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api/axios'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import SafetyScoreChart from './DriverContent/SafetyScoreChart'
import StatCards from './DriverContent/StatCards'
import AlertSection from './DriverContent/AlertSection'
import VoilationTable from './DriverContent/VoilationTable'
import RickshawForm from './DriverContent/RickshawForm'

const DriverDashboard = () => {
  const [stats, setStats] = useState(null);
  const [violations, setViolations] = useState([]);
  const [rickshaw, setRickshaw] = useState(null);
  const [training, setTraining] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const statsRes = await api.get('/api/driver/stats');
        const vRes = await api.get('/api/driver/violations');
        const rRes = await api.get('/api/rickshaw/my');
        const tRes = await api.get('/api/training/mytrainings');

        setStats(statsRes.data);
        setViolations(vRes.data || []);
        setRickshaw(rRes.data);
        setTraining(tRes.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();

  },[]);

  if(error) {
    return (
      <div className='flex'>
        <Sidebar/>
        <div className='flex-1 bg-neutral-200'>
          <Navbar driver={"Driver"}/>
          <div className='ml-64 mt-30 min-h-screen p-8'>
            <div className='bg-red-100 border border-red-500 text-red-700 p-4 rounded'>
              <p className='font-bold'>Error: {error}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='flex'>
      <Sidebar/>
      <div className='flex-1 bg-neutral-200'>
        <Navbar driver={"Rishi Raj"}/>
        <div className='ml-64 mt-30 min-h-screen'>

          {!rickshaw ? (
            <RickshawForm onSuccess={setRickshaw} />
          ) : (
            <div className="bg-white p-4 rounded shadow m-4">
              <h3 className="font-bold">Vehicle: {rickshaw.vehicleNumber}</h3>
              <p>Status: {rickshaw.status}</p>
            </div>
          )}

          {/* If driver hasn't passed training, show button */}
          {(!training || !training.some(t => t.passed)) && (
            <div className="m-4">
              <Link to="/training" className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
                Take Mandatory Training
              </Link>
            </div>
          )}

          {loading ? (
            <div className='p-8'><p>Loading statistics...</p></div>
          ) : (
            <>
              <StatCards data={stats}/>
              <AlertSection data={stats}/>
              <VoilationTable data={violations}/>
              <SafetyScoreChart data={stats}/>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default DriverDashboard
