import Card from './Card';

const MetricCard = ({
  title,
  value,
  icon,
  trend,
  description,
  variant = 'primary'
}) => {
  const isPositive = trend && !trend.startsWith('-');
  const trendClass = isPositive ? 'trend-positive' : 'trend-negative';
  const trendIcon = isPositive ? 'fa-solid fa-arrow-trend-up' : 'fa-solid fa-arrow-trend-down';

  return (
    <Card interactive className="metric-card">
      <div className="d-flex align-center justify-between">
        <span className="metric-title">{title}</span>
        <div className={`metric-icon metric-icon-${variant}`}>
          <i className={icon}></i>
        </div>
      </div>
      
      <div className="metric-value-container mt-xs">
        <span className="metric-value">{value}</span>
      </div>
      
      {trend && (
        <div className="metric-trend-container mt-2xs d-flex align-center gap-xs">
          <span className={`metric-trend ${trendClass}`}>
            <i className={`${trendIcon}`} style={{ marginRight: '4px' }}></i>
            {trend}
          </span>
          <span className="metric-desc">{description}</span>
        </div>
      )}
    </Card>
  );
};

export default MetricCard;
