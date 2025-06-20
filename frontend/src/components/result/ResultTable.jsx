function ResultTable({ results }) {
  return (
    <table className="table" border="1" cellPadding="10">
      <thead>
        <tr>
          <th>Student</th>
          <th>Exam</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {results.map(r => (
          <tr key={r.id}>
            <td>{r.studentId}</td>
            <td>{r.examId}</td>
            <td>{r.score}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ResultTable;