import React, { useEffect, useState, useContext } from 'react';
import ExportButtons from './ExportButtons';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import { utils, writeFile } from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ResultView = () => {
  const { auth } = useContext(AuthContext);
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    if (!auth?.user?.isAdmin) return;

    axios
      .get('http://localhost:8080/api/results')
      .then(res => {
        setResults(res.data);
        setFilteredResults(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load results');
        setLoading(false);
      });
  }, [auth]);

  useEffect(() => {
    const lowerSearch = search.toLowerCase();
    const filtered = results.filter(r =>
      r.username.toLowerCase().includes(lowerSearch) ||
      r.examTitle.toLowerCase().includes(lowerSearch)
    );
    setFilteredResults(filtered);
    setCurrentPage(1);
  }, [search, results]);

  const sortResults = (key) => {
    const sorted = [...filteredResults].sort((a, b) => {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    });
    setFilteredResults(sorted);
    setSortKey(key);
  };

  const exportToCSV = () => {
    const ws = utils.json_to_sheet(filteredResults);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Results');
    writeFile(wb, 'results.csv');
  };

  const exportToExcel = () => {
    const ws = utils.json_to_sheet(filteredResults);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Results');
    writeFile(wb, 'results.xlsx');
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({ html: '#results-table' });
    doc.save('results.pdf');
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentResults = filteredResults.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (!auth?.user?.isAdmin) return <p>Access denied: Admins only</p>;
  if (loading) return <p>Loading results...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Exam Results</h2>
      <input
        type="text"
        placeholder="Filter by username or exam title"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ marginBottom: '10px' }}
      />
      <div style={{ marginBottom: '10px' }}>
        <button onClick={exportToCSV}>Export CSV</button>{' '}
        <button onClick={exportToExcel}>Export Excel</button>{' '}
        <button onClick={exportToPDF}>Export PDF</button>
      </div>
      <table id="results-table" border="1">
        <thead>
          <tr>
            <th onClick={() => sortResults('username')}>Username</th>
            <th onClick={() => sortResults('examTitle')}>Exam Title</th>
            <th onClick={() => sortResults('score')}>Score</th>
            <th onClick={() => sortResults('date')}>Date</th>
          </tr>
        </thead>
        <tbody>
          {currentResults.map((r, i) => (
            <tr key={i}>
              <td>{r.username}</td>
              <td>{r.examTitle}</td>
              <td>{r.score}</td>
              <td>{r.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {Array.from({ length: Math.ceil(filteredResults.length / itemsPerPage) }, (_, i) => (
          <button key={i + 1} onClick={() => paginate(i + 1)} disabled={currentPage === i + 1}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ResultView;
