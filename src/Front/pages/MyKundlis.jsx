import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FaDownload } from 'react-icons/fa';

const MyKundlis = () => {
  const [kundlis, setKundlis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedKundli, setSelectedKundli] = useState(null);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const fetchKundlis = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('https://astrology-backend-1.onrender.com/api/kundli', {
        headers: getAuthHeaders(),
      });
      setKundlis(data.data);
    } catch (err) {
      console.error('Error fetching Kundlis:', err);
      alert('Error fetching Kundlis. Please login.');
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async (kundli) => {
    try {
      const element = document.createElement('div');
      element.innerHTML = `
        <div style="padding: 20px; font-family: Arial, sans-serif;">
          <h1 style="color: #1f2937; text-align: center; margin-bottom: 30px;">${kundli.name} की कुंडली</h1>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
            <div style="background: #f9fafb; padding: 15px; border-radius: 8px;">
              <h3 style="color: #374151; margin-bottom: 15px;">जन्म विवरण</h3>
              <p><strong>तारीख:</strong> ${kundli.date}</p>
              <p><strong>समय:</strong> ${kundli.time}</p>
              <p><strong>स्थान:</strong> ${kundli.city}</p>
              <p><strong>निर्देशांक:</strong> ${kundli.lat?.toFixed(2)}, ${kundli.lon?.toFixed(2)}</p>
            </div>
            
            <div style="background: #f9fafb; padding: 15px; border-radius: 8px;">
              <h3 style="color: #374151; margin-bottom: 15px;">ग्रह स्थिति</h3>
              ${kundli.planets ? Object.entries(kundli.planets).map(([planet, data]) => 
                `<p><strong>${planet}:</strong> ${data.sign} (${data.degree?.toFixed(1)}°)</p>`
              ).join('') : ''}
            </div>
          </div>
          
          <div style="background: #f9fafb; padding: 15px; border-radius: 8px;">
            <h3 style="color: #374151; margin-bottom: 15px;">विस्तृत भविष्यफल</h3>
            <div style="white-space: pre-wrap; line-height: 1.6;">${kundli.interpretation}</div>
          </div>
        </div>
      `;
      
      document.body.appendChild(element);
      
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      });
      
      document.body.removeChild(element);
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save(`${kundli.name}_Kundli.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchKundlis();
    } else {
      alert('Please login to view your Kundlis');
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-[#0b0b22] to-[#1a0d24] flex items-center justify-center text-white text-xl pt-20">
        Loading your Kundlis...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0b0b22] to-[#1a0d24] text-white py-10 px-6 pt-24">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-10 text-yellow-400"
        >
          My Kundlis
        </motion.h2>

        {kundlis.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <h3 className="text-2xl text-gray-400 mb-4">No Kundlis found</h3>
            <p className="text-gray-500 mb-6">You haven't generated any Kundlis yet.</p>
            <a
              href="/kundli"
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg font-semibold transition"
            >
              Generate Your First Kundli
            </a>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {kundlis.map((kundli, index) => (
              <motion.div
                key={kundli._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#121212]/80 border border-yellow-600/30 rounded-lg p-6 shadow-lg cursor-pointer hover:border-yellow-500/50 transition"
                onClick={() => setSelectedKundli(kundli)}
              >
                <h3 className="text-xl font-semibold text-yellow-300 mb-2">
                  {kundli.name}
                </h3>
                <div className="text-sm text-gray-400 space-y-1">
                  <p>Date: {kundli.date}</p>
                  <p>Time: {kundli.time}</p>
                  <p>Place: {kundli.city}</p>
                  <p>Generated: {new Date(kundli.createdAt).toLocaleDateString()}</p>
                </div>
                <button className="mt-4 w-full bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 py-2 rounded transition">
                  View Details
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {selectedKundli && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedKundli(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-[#121212] border border-yellow-600/30 rounded-lg p-6 max-w-4xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-yellow-400">
                  {selectedKundli.name} की कुंडली
                </h2>
                <button
                  onClick={() => setSelectedKundli(null)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-800/50 p-4 rounded">
                  <h3 className="text-yellow-300 font-semibold mb-2">जन्म विवरण</h3>
                  <p><span className="text-gray-400">तारीख:</span> {selectedKundli.date}</p>
                  <p><span className="text-gray-400">समय:</span> {selectedKundli.time}</p>
                  <p><span className="text-gray-400">स्थान:</span> {selectedKundli.city}</p>
                  <p><span className="text-gray-400">निर्देशांक:</span> {selectedKundli.lat?.toFixed(2)}, {selectedKundli.lon?.toFixed(2)}</p>
                </div>
                
                <div className="bg-gray-800/50 p-4 rounded">
                  <h3 className="text-yellow-300 font-semibold mb-2">ग्रह स्थिति</h3>
                  <div className="text-sm space-y-1">
                    {selectedKundli.planets && Object.entries(selectedKundli.planets).map(([planet, data]) => (
                      <p key={planet}>
                        <span className="capitalize text-yellow-200">{planet}:</span> 
                        <span className="text-gray-300"> {data.sign} ({data.degree?.toFixed(1)}°)</span>
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800/50 p-4 rounded">
                <h3 className="text-yellow-300 font-semibold mb-3">विस्तृत भविष्यफल</h3>
                <div className="whitespace-pre-wrap text-gray-200 leading-relaxed">
                  {selectedKundli.interpretation}
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => downloadPDF(selectedKundli)}
                  className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg font-semibold transition"
                >
                  <FaDownload /> Download PDF
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyKundlis;