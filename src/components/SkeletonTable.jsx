/**
 * Premium, token-driven Skeleton loader for tabular grids.
 * Features:
 * - Simulated table head structure.
 * - Customizable rows (default 4 rows).
 * - Multi-column shimmer nodes.
 */
const SkeletonTable = ({ rows = 4 }) => {
  return (
    <div className="skeleton-table-wrapper" style={{ width: '100%' }}>
      {/* Mock Table Head */}
      <div 
        className="skeleton-table-header d-flex gap-md" 
        style={{ 
          borderBottom: '2px solid var(--border-color)',
          paddingBottom: 'var(--space-sm)',
          marginBottom: 'var(--space-md)'
        }}
      >
        <div className="skeleton-shimmer" style={{ width: '25%', height: '14px', borderRadius: 'var(--radius-sm)' }}></div>
        <div className="skeleton-shimmer" style={{ width: '35%', height: '14px', borderRadius: 'var(--radius-sm)' }}></div>
        <div className="skeleton-shimmer" style={{ width: '20%', height: '14px', borderRadius: 'var(--radius-sm)' }}></div>
        <div className="skeleton-shimmer" style={{ width: '20%', height: '14px', borderRadius: 'var(--radius-sm)' }}></div>
      </div>

      {/* Mock Table Rows */}
      <div className="skeleton-table-body d-flex flex-col gap-md">
        {Array.from({ length: rows }).map((_, idx) => (
          <div 
            key={idx} 
            className="skeleton-table-row d-flex gap-md align-center" 
            style={{ 
              borderBottom: '1px solid var(--border-color)',
              paddingBottom: 'var(--space-md)'
            }}
          >
            {/* Column 1 (Avatar & Name) */}
            <div className="d-flex align-center gap-xs" style={{ width: '25%' }}>
              <div className="skeleton-shimmer" style={{ width: '28px', height: '28px', borderRadius: 'var(--radius-full)' }}></div>
              <div className="skeleton-shimmer" style={{ width: '70%', height: '12px', borderRadius: 'var(--radius-sm)' }}></div>
            </div>
            
            {/* Column 2 (Email) */}
            <div style={{ width: '35%' }}>
              <div className="skeleton-shimmer" style={{ width: '80%', height: '12px', borderRadius: 'var(--radius-sm)' }}></div>
            </div>

            {/* Column 3 (Role Assignment) */}
            <div style={{ width: '20%' }}>
              <div className="skeleton-shimmer" style={{ width: '60%', height: '12px', borderRadius: 'var(--radius-sm)' }}></div>
            </div>

            {/* Column 4 (Status badge / Actions) */}
            <div style={{ width: '20%' }}>
              <div className="skeleton-shimmer" style={{ width: '50%', height: '12px', borderRadius: 'var(--radius-sm)' }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonTable;
