import Card from './Card';

/**
 * Enhanced, API-ready KPI Metric Card.
 * Supports:
 * - loaded (normal data rendering)
 * - loading (shimmer skeleton)
 * - error (displays connection alert and retry trigger)
 * - empty (displays '-' when values are null/empty)
 */
const MetricCard = ({
  title,
  value,
  icon,
  trend,
  description,
  variant = 'primary',
  loading = false,
  error = null,
  isEmpty = false,
  onRetry = null
}) => {
  // 1. Loading State (renders inline shimmer skeleton mimicking the normal structure)
  if (loading) {
    return (
      <Card className="skeleton-card" style={{ cursor: 'default' }}>
        <div className="d-flex align-center justify-between">
          <div 
            className="skeleton-shimmer" 
            style={{ 
              width: '60%', 
              height: '14px', 
              borderRadius: 'var(--radius-sm)'
            }}
          ></div>
          <div 
            className="skeleton-shimmer" 
            style={{ 
              width: '32px', 
              height: '32px', 
              borderRadius: 'var(--radius-full)' 
            }}
          ></div>
        </div>
        
        <div className="mt-xs">
          <div 
            className="skeleton-shimmer" 
            style={{ 
              width: '45%', 
              height: '28px', 
              borderRadius: 'var(--radius-sm)' 
            }}
          ></div>
        </div>
        
        <div className="mt-xs d-flex align-center gap-xs">
          <div 
            className="skeleton-shimmer" 
            style={{ 
              width: '25%', 
              height: '12px', 
              borderRadius: 'var(--radius-sm)' 
            }}
          ></div>
          <div 
            className="skeleton-shimmer" 
            style={{ 
              width: '35%', 
              height: '12px', 
              borderRadius: 'var(--radius-sm)' 
            }}
          ></div>
        </div>
      </Card>
    );
  }

  // 2. Error State (displays warnings and inline retry triggers)
  if (error) {
    return (
      <Card className="metric-card metric-card-error" style={{ cursor: 'default' }}>
        <div className="d-flex align-center justify-between">
          <span className="metric-title">{title}</span>
          <div className="metric-icon metric-icon-danger" aria-hidden="true">
            <i className="fa-solid fa-triangle-exclamation"></i>
          </div>
        </div>
        
        <div className="metric-value-container mt-xs d-flex align-center justify-between">
          <span className="metric-value" style={{ fontSize: 'var(--font-size-lg)', color: 'var(--danger-500)' }}>
            Error
          </span>
          {onRetry && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRetry();
              }}
              className="btn btn-outline btn-sm"
              style={{
                padding: '2px 6px',
                fontSize: '10px',
                minHeight: 'auto',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2xs)'
              }}
              aria-label={`Retry loading ${title}`}
            >
              <i className="fa-solid fa-rotate-right" style={{ fontSize: '9px' }}></i>
              <span>Retry</span>
            </button>
          )}
        </div>
        
        <div className="metric-trend-container mt-2xs">
          <span className="metric-desc" style={{ color: 'var(--danger-500)', fontSize: 'var(--font-size-xs)' }}>
            {typeof error === 'string' ? error : 'Failed to retrieve data'}
          </span>
        </div>
      </Card>
    );
  }

  // 3. Normal / Empty State resolving
  const isValEmpty = isEmpty || value === undefined || value === null || String(value).trim() === '';
  const displayValue = isValEmpty ? '—' : value;
  const displayDescription = isValEmpty ? 'No data synchronized' : description;
  
  const isPositive = trend && !trend.startsWith('-');
  const trendClass = isPositive ? 'trend-positive' : 'trend-negative';
  const trendIcon = isPositive ? 'fa-solid fa-arrow-trend-up' : 'fa-solid fa-arrow-trend-down';

  return (
    <Card interactive className="metric-card">
      <div className="d-flex align-center justify-between">
        <span className="metric-title">{title}</span>
        <div className={`metric-icon metric-icon-${variant}`} aria-hidden="true">
          <i className={icon}></i>
        </div>
      </div>
      
      <div className="metric-value-container mt-xs">
        <span className="metric-value">{displayValue}</span>
      </div>
      
      {!isValEmpty && trend ? (
        <div className="metric-trend-container mt-2xs d-flex align-center gap-xs">
          <span className={`metric-trend ${trendClass}`}>
            <i className={trendIcon} style={{ marginRight: 'var(--space-2xs)' }} aria-hidden="true"></i>
            {trend}
          </span>
          <span className="metric-desc">{description}</span>
        </div>
      ) : (
        <div className="metric-trend-container mt-2xs">
          <span className="metric-desc">{displayDescription}</span>
        </div>
      )}
    </Card>
  );
};

export default MetricCard;
