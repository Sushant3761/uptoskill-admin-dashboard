import { useState } from 'react';
import Card from './Card';

const SpacingPlayground = () => {
  const [padding, setPadding] = useState('var(--space-md)');
  const [radius, setRadius] = useState('var(--radius-md)');

  return (
    <Card className="playground-widget">
      <Card.Header>
        <h3 className="h4-premium">Spacing Playground</h3>
        <i className="fa-solid fa-gamepad text-color-secondary"></i>
      </Card.Header>
      
      <p className="text-color-secondary" style={{ fontSize: 'var(--font-size-xs)' }}>
        Adjust spacing and border radius variables below in real time to observe the token scaling properties in action.
      </p>
      
      <div className="playground-controls mt-md">
        <div className="d-flex flex-col gap-2xs">
          <label
            htmlFor="spacing-demo-select"
            style={{ fontSize: '11px', fontWeight: 'var(--font-weight-semibold)', color: 'var(--text-secondary)' }}
          >
            Padding Token
          </label>
          <select
            id="spacing-demo-select"
            className="input-base"
            value={padding}
            onChange={(e) => setPadding(e.target.value)}
          >
            <option value="var(--space-2xs)">--space-2xs (4px)</option>
            <option value="var(--space-xs)">--space-xs (8px)</option>
            <option value="var(--space-sm)">--space-sm (12px)</option>
            <option value="var(--space-md)">--space-md (16px)</option>
            <option value="var(--space-lg)">--space-lg (24px)</option>
            <option value="var(--space-xl)">--space-xl (32px)</option>
            <option value="var(--space-2xl)">--space-2xl (48px)</option>
          </select>
        </div>

        <div className="d-flex flex-col gap-2xs">
          <label
            htmlFor="radius-demo-select"
            style={{ fontSize: '11px', fontWeight: 'var(--font-weight-semibold)', color: 'var(--text-secondary)' }}
          >
            Border Radius Token
          </label>
          <select
            id="radius-demo-select"
            className="input-base"
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
          >
            <option value="var(--radius-sm)">--radius-sm (6px)</option>
            <option value="var(--radius-md)">--radius-md (12px)</option>
            <option value="var(--radius-lg)">--radius-lg (16px)</option>
            <option value="var(--radius-full)">--radius-full (9999px)</option>
          </select>
        </div>
      </div>
      
      <div className="demo-target-container mt-lg">
        <div
          className="demo-target-box-layout"
          style={{ padding: padding, borderRadius: radius }}
        >
          <div style={{ fontSize: 'var(--font-size-xs)', opacity: 0.5, fontWeight: 'var(--font-weight-semibold)', textTransform: 'uppercase' }}>
            Sandbox Element
          </div>
          <div className="mt-2xs" style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-bold)' }}>
            Padding: <span style={{ color: 'var(--primary-500)' }}>{padding}</span><br />
            Radius: <span style={{ color: 'var(--primary-500)' }}>{radius}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SpacingPlayground;
