import ResultsChart from '../components/result/ResultsChart';
import { useEffect, useState, useContext } from 'react';
import API from '../api/resultApi';
import { AuthContext } from '../contexts/AuthContext';

function ResultPage() {
  const [results, setResults] = useState([]);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const fetch = async () => {
      const res = await API.get(auth.user?.role === 'student' ? `/results?studentId=${auth.user.id}` : '/results');
      setResults(res.data);
    };
    if (auth.user) fetch();
  }, [auth.user]);

  return (
    <div>
      <h2>Results</h2>
      <ResultsChart results={results} />
    </div>
  );
}

export default ResultPage;
