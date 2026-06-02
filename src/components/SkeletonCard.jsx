import Card from './Card';

/**
 * Premium, token-driven Skeleton loader for Metric Cards.
 * Features:
 * - Mimics MetricCard structure.
 * - Auto-responsive shimmers matching light/dark themes.
 */
const SkeletonCard = () => {
  return (
    <Card className="skeleton-card" style={{ cursor: 'default' }}>
      <div className="d-flex align-center justify-between">
        {/* Mock Title */}
        <div 
          className="skeleton-shimmer" 
          style={{ 
            width: '60%', 
            height: '14px', 
            borderRadius: 'var(--radius-sm)'
          }}
        ></div>
        {/* Mock Icon Circular Badge */}
        <div 
          className="skeleton-shimmer" 
          style={{ 
            width: '32px', 
            height: '32px', 
            borderRadius: 'var(--radius-full)' 
          }}
        ></div>
      </div>
      
      {/* Mock Value */}
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
      
      {/* Mock Trend Footer */}
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
};

export default SkeletonCard;
