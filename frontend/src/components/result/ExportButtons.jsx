import React from 'react';

const ExportButtons = ({ results }) => {
  const exportCSV = () => {
    if (!results || results.length === 0) {
      alert('No data to export.');
      return;
    }

    const headers = Object.keys(results[0]).join(',');
    const rows = results.map(obj => Object.values(obj).join(',')).join('\n');
    const csv = `${headers}\n${rows}`;

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'results.csv';
    a.click();
  };

  const exportPDF = () => {
    if (!results || results.length === 0) {
      alert('No data to export.');
      return;
    }

    import('jspdf').then(jsPDF => {
      const doc = new jsPDF.jsPDF();
      doc.text('Results Report', 10, 10);
      results.forEach((r, i) => {
        doc.text(
          `Student ID: ${r.studentId}, Exam ID: ${r.examId}, Score: ${r.score}`,
          10,
          20 + i * 10
        );
      });
      doc.save('results.pdf');
    });
  };

  return (
    <div>
      <button onClick={exportCSV}>Export CSV</button>
      <button onClick={exportPDF}>Export PDF</button>
    </div>
  );
};

export default ExportButtons;
