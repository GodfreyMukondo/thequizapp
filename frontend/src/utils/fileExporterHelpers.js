export const exportToCSV = (data, filename = 'data.csv') => {
  const csvContent = data.map(row => row.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToPDF = (data, filename = 'data.pdf') => {
  import('jspdf').then(jsPDF => {
    const doc = new jsPDF.jsPDF();
    data.forEach((row, i) => {
      doc.text(row.join(' '), 10, 10 + i * 10);
    });
    doc.save(filename);
  });
};

export const exportToExcel = (data, filename = 'data.xlsx') => {
  import('xlsx').then(XLSX => {
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, filename);
  });
};
