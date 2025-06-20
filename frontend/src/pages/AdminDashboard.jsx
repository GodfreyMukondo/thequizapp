import React, { useEffect, useState } from 'react';
import API from '../api/api';
import ResultTable from '../components/result/ResultTable';
import { exportToCSV, exportToPDF, exportToExcel } from '../utils/fileExporterHelpers';

function AdminDashboard() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await API.get('/results');
        setResults(res.data);
      } catch (error) {
        console.error('Error fetching all results:', error);
      }
    };
    fetchResults();
  }, []);

  const exportDataArray = [
    ['Student ID', 'Exam ID', 'Score'],
    ...results.map(r => [r.studentId, r.examId, r.score]),
  ];

  return (
    <div style={{ marginLeft: '220px', padding: '20px', width: '100%' }}>
      <h2>Admin Dashboard</h2>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => exportToCSV(exportDataArray, 'results.csv')} style={{ marginRight: '10px' }}>
          Export CSV
        </button>
        <button onClick={() => exportToPDF(exportDataArray, 'results.pdf')} style={{ marginRight: '10px' }}>
          Export PDF
        </button>
        <button onClick={() => exportToExcel(exportDataArray, 'results.xlsx')}>
          Export Excel
        </button>
      </div>

      <ResultTable results={results} />
    </div>
  );
}

export default AdminDashboard;
