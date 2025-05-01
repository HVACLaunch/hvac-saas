

import React, { useEffect, useState } from 'react';
import { supabase } from '../../services/supabaseClient';

interface Job {
  id: number;
  client_id: number;
  description: string;
  scheduled_at: string;
  status: string;
}

export const JobHistory: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data, error } = await supabase
          .from<Job>('jobs')
          .select('*')
          .order('scheduled_at', { ascending: false });
        if (error) throw error;
        setJobs(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) return <p>Loading job history...</p>;
  if (error) return <p>Error loading jobs: {error}</p>;
  if (jobs.length === 0) return <p>No job history available.</p>;

  return (
    <div>
      <h2>Job History</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Client ID</th>
            <th>Description</th>
            <th>Scheduled At</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td>{job.id}</td>
              <td>{job.client_id}</td>
              <td>{job.description}</td>
              <td>{new Date(job.scheduled_at).toLocaleString()}</td>
              <td>{job.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};