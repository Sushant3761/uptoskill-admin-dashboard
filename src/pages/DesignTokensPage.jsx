import { useState, useEffect } from 'react';
import MetricCard from '../components/MetricCard';
import TokenShowcase from '../components/TokenShowcase';
import SkeletonCard from '../components/SkeletonCard';

const DesignTokensPage = ({ addToast }) => {
  const [loading, setLoading] = useState(true);

  // Simulated live fetch loading cycle on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      if (addToast) {
        addToast('success', 'Dashboard metrics synchronized successfully.');
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [addToast]);

  return (
    <div className="dashboard-section active">
      {/* Phase 2/5: Metrics Grid / Loading placeholders */}
      <div className="metrics-grid" aria-busy={loading ? 'true' : 'false'}>
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <>
            <MetricCard
              title="Total Users"
              value="15,840"
              icon="fa-solid fa-users"
              trend="+12.3%"
              description="vs last month"
              variant="primary"
            />
            <MetricCard
              title="Total Courses"
              value="420"
              icon="fa-solid fa-book-open"
              trend="+8.2%"
              description="new courses"
              variant="secondary"
            />
            <MetricCard
              title="Enrollments"
              value="32,450"
              icon="fa-solid fa-graduation-cap"
              trend="+15.1%"
              description="active students"
              variant="success"
            />
            <MetricCard
              title="Pending Approvals"
              value="18"
              icon="fa-solid fa-clock-rotate-left"
              trend="-10.5%"
              description="vs yesterday"
              variant="warning"
            />
            <MetricCard
              title="Active Sessions"
              value="1,280"
              icon="fa-solid fa-laptop-code"
              trend="+5.4%"
              description="live learning"
              variant="danger"
            />
          </>
        )}
      </div>

      <TokenShowcase />
    </div>
  );
};

export default DesignTokensPage;
