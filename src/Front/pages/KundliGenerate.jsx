import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

// Add print styles
const printStyles = `
  @media print {
    body * {
      visibility: hidden;
    }
    .printable-content, .printable-content * {
      visibility: visible;
    }
    .printable-content {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
    }
    .no-print {
      display: none !important;
    }
    footer, header, nav, .footer, .header, .navbar {
      display: none !important;
    }
  }
`;

const KundliGenerate = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  
  const { kundliData, paymentId } = location.state || {};

  useEffect(() => {
    if (!kundliData || !paymentId) {
      navigate('/kundli');
      return;
    }
    
    generateKundli();
  }, []);

  const generateKundli = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to generate Kundli');
        navigate('/login');
        return;
      }
      
      const res = await axios.post(
        "https://astrology-backend-1.onrender.com/api/kundli/generate",
        {
          ...kundliData,
          paymentId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setResult(res.data.data);
    } catch (err) {
      console.error("Error generating kundli:", err);
      alert(`Error: ${err.response?.data?.message || err.message}`);
      navigate('/kundli');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-[#0b0b22] to-[#1a0d24] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-yellow-400 mb-2">Generating Your Kundli</h2>
          <p className="text-gray-300">Please wait while we prepare your personalized birth chart...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{printStyles}</style>
      <div className="min-h-screen bg-gradient-to-b from-black via-[#0b0b22] to-[#1a0d24] text-white py-10 px-6 pt-24">
        <div className="max-w-4xl mx-auto">
          {result && (
            <div className="printable-content bg-[#121212]/80 p-6 rounded-lg border border-yellow-600/30">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-yellow-400 mb-2">Your Kundli Report</h1>
              <p className="text-green-400">✅ Payment Successful - Report Generated</p>
            </div>
            
            <h2 className="text-2xl font-bold text-yellow-400 mb-4 text-center">
              Kundli for {result.name}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-800/50 p-4 rounded">
                <h3 className="text-yellow-300 font-semibold mb-3">Birth Details</h3>
                <div className="space-y-2">
                  <p><span className="text-gray-400">Date:</span> <span className="text-white">{result.date}</span></p>
                  <p><span className="text-gray-400">Time:</span> <span className="text-white">{result.time}</span></p>
                  <p><span className="text-gray-400">Place:</span> <span className="text-white">{result.city}</span></p>
                  <p><span className="text-gray-400">Coordinates:</span> <span className="text-white">{result.lat?.toFixed(2)}, {result.lon?.toFixed(2)}</span></p>
                </div>
              </div>
              
              <div className="bg-gray-800/50 p-4 rounded">
                <h3 className="text-yellow-300 font-semibold mb-3">Planetary Positions</h3>
                <div className="text-sm space-y-1 max-h-40 overflow-y-auto">
                  {result.planets && Object.entries(result.planets).map(([planet, data]) => (
                    <p key={planet} className="flex justify-between">
                      <span className="capitalize text-yellow-200">{planet}:</span> 
                      <span className="text-gray-300">{data.sign} ({data.degree?.toFixed(1)}°)</span>
                    </p>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/50 p-4 rounded mb-6">
              <h3 className="text-yellow-300 font-semibold mb-3">Detailed Prediction</h3>
              <div className="whitespace-pre-wrap text-gray-200 leading-relaxed max-h-60 overflow-y-auto">
                {result.interpretation}
              </div>
            </div>

            <div className="flex gap-4 justify-center no-print">
              <button
                onClick={() => window.print()}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Print Report
              </button>
              <button
                onClick={() => navigate('/my-kundlis')}
                className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                View All Kundlis
              </button>
              <button
                onClick={() => navigate('/kundli')}
                className="px-6 py-2 bg-yellow-600 text-black rounded hover:bg-yellow-700 transition-colors"
              >
                Generate New Kundli
              </button>
            </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default KundliGenerate;