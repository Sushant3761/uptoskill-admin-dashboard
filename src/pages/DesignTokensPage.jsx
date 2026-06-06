import { useState, useEffect, useCallback } from 'react';
import MetricCard from '../components/MetricCard';
import TokenShowcase from '../components/TokenShowcase';
import { fetchDashboardMetrics } from '../utils/dashboardData';
import { useToast } from '../hooks/useToast';

const DesignTokensPage = () => {
  const toast = useToast();
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [simulationMode, setSimulationMode] = useState('loaded'); // 'loaded' | 'loading' | 'error' | 'empty'

  // Dynamic fetch implementation
  const loadMetrics = useCallback(async (mode) => {
    try {
      const simulateError = mode === 'error';
      const simulateEmpty = mode === 'empty';
      
      // Delay is shortened to 800ms for simulated user-triggered refreshes/toggles
      const data = await fetchDashboardMetrics({
        simulateError,
        simulateEmpty,
        delay: mode === 'loading' ? 999999 : 800 // indefinitely load if 'loading' mode chosen
      });

      setMetrics(data);
      setLoading(false);
    } catch (err) {
      setError(err.message || "Failed to load metrics");
      setLoading(false);
      toast.showError(err.message || "Metrics sync failed.");
    }
  }, [toast]);

  const handleSimulationModeChange = (modeId) => {
    setSimulationMode(modeId);
    setLoading(true);
    setError(null);
  };

  // Sync state whenever simulation mode is changed
  useEffect(() => {
    if (simulationMode !== 'loading') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      loadMetrics(simulationMode);
    }
  }, [simulationMode, loadMetrics]);

  // Retry handler passed to MetricCards when in error state
  const handleRetry = () => {
    toast.showInfo('Re-fetching system console metrics...');
    setLoading(true);
    setError(null);
    loadMetrics(simulationMode);
  };

  return (
    <div className="dashboard-section active">
      {/* Title & Simulation Mode Switcher toolbar */}
      <div className="d-flex align-center justify-between mb-sm flex-wrap gap-sm">
        <h3 className="h6-premium" style={{ margin: 0, color: 'var(--text-secondary)' }}>
          System Performance Metrics
        </h3>
        
        {/* Subtle developer control area */}
        <div 
          className="d-inline-flex align-center gap-2xs p-2xs" 
          style={{ 
            backgroundColor: 'var(--bg-app)', 
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-color)',
            fontSize: 'var(--font-size-xs)'
          }}
        >
          <span className="px-xs" style={{ color: 'var(--text-tertiary)', fontWeight: 'var(--font-weight-semibold)', fontSize: '10px' }}>
            SIMULATE STATE:
          </span>
          {[
            { id: 'loaded', label: 'Normal' },
            { id: 'loading', label: 'Loading' },
            { id: 'error', label: 'Error' },
            { id: 'empty', label: 'Empty' }
          ].map((mode) => (
            <button
              key={mode.id}
              type="button"
              onClick={() => handleSimulationModeChange(mode.id)}
              className="btn btn-text"
              style={{
                padding: 'var(--space-2xs) var(--space-xs)',
                fontSize: '11px',
                minHeight: 'auto',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: simulationMode === mode.id ? 'var(--bg-card)' : 'transparent',
                color: simulationMode === mode.id ? 'var(--primary-500)' : 'var(--text-secondary)',
                boxShadow: simulationMode === mode.id ? 'var(--shadow-sm)' : 'none',
                fontWeight: simulationMode === mode.id ? 'var(--font-weight-bold)' : 'var(--font-weight-medium)',
                cursor: 'pointer'
              }}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stateful Metrics Grid */}
      <div className="metrics-grid" aria-busy={loading ? 'true' : 'false'}>
        {loading && simulationMode !== 'loading' ? (
          // Display initial loading shimmers during dynamic transitions
          Array.from({ length: 5 }).map((_, idx) => (
            <MetricCard key={idx} loading={true} title="System Metric" />
          ))
        ) : simulationMode === 'loading' ? (
          // Maintain loading skeleton state
          Array.from({ length: 5 }).map((_, idx) => (
            <MetricCard key={idx} loading={true} title="System Metric" />
          ))
        ) : error ? (
          // Render each card in error state with its own Retry button
          metrics.length > 0 ? (
            metrics.map((metric) => (
              <MetricCard
                key={metric.id}
                title={metric.title}
                icon={metric.icon}
                variant={metric.variant}
                error={error}
                onRetry={handleRetry}
              />
            ))
          ) : (
            // Fallback skeleton in error style if initial list was empty
            Array.from({ length: 5 }).map((_, idx) => (
              <MetricCard
                key={idx}
                title="System Metric"
                error={error}
                onRetry={handleRetry}
              />
            ))
          )
        ) : (
          // Standard / Empty rendering
          metrics.map((metric) => (
            <MetricCard
              key={metric.id}
              title={metric.title}
              value={metric.value}
              icon={metric.icon}
              trend={metric.trend}
              description={metric.description}
              variant={metric.variant}
              isEmpty={simulationMode === 'empty'}
            />
          ))
        )}
      </div>

      <TokenShowcase />
    </div>
  );
};

export default DesignTokensPage;
