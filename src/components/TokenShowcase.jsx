import { useState } from 'react';
import Card from './Card';

const TokenShowcase = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const tokenCategories = [
    {
      id: 'colors',
      title: '1. HSL Theme Colors',
      subtitle: 'Core color palettes designed for visual harmony and contrast.',
      searchKeys: 'colors palette core primary secondary brand success warning danger',
      description: 'Core brand palettes including Indigo and Purple scales along with semantic success, danger, warning and neutrals.',
      renderContent: () => (
        <>
          <div className="mt-md">
            <h5 className="h6-premium">Primary</h5>
            <div className="color-preview-container">
              {[100, 300, 500, 700, 900].map((level) => (
                <div key={level} className="color-swatch-item">
                  <div className="swatch-circle" style={{ backgroundColor: `var(--primary-${level})` }}></div>
                  <span className="swatch-name">{level}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-md">
            <h5 className="h6-premium">Secondary</h5>
            <div className="color-preview-container">
              {[100, 300, 500, 700, 900].map((level) => (
                <div key={level} className="color-swatch-item">
                  <div className="swatch-circle" style={{ backgroundColor: `var(--secondary-${level})` }}></div>
                  <span className="swatch-name">{level}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-md">
            <h5 className="h6-premium">Semantic Utilities</h5>
            <div className="color-preview-container">
              <div className="color-swatch-item">
                <div className="swatch-circle" style={{ backgroundColor: 'var(--success-500)' }}></div>
                <span className="swatch-name">Success</span>
              </div>
              <div className="color-swatch-item">
                <div className="swatch-circle" style={{ backgroundColor: 'var(--warning-500)' }}></div>
                <span className="swatch-name">Warning</span>
              </div>
              <div className="color-swatch-item">
                <div className="swatch-circle" style={{ backgroundColor: 'var(--danger-500)' }}></div>
                <span className="swatch-name">Danger</span>
              </div>
              <div className="color-swatch-item">
                <div className="swatch-circle" style={{ backgroundColor: 'var(--neutral-400)' }}></div>
                <span className="swatch-name">Neutral</span>
              </div>
              <div className="color-swatch-item">
                <div className="swatch-circle" style={{ backgroundColor: 'var(--neutral-800)' }}></div>
                <span className="swatch-name">Slate</span>
              </div>
            </div>
          </div>
        </>
      )
    },
    {
      id: 'typography',
      title: '2. Typography Scale',
      subtitle: 'Systematic font sizes, weights, and hierarchies.',
      searchKeys: 'typography size fonts heading weight line-height',
      description: 'Consistent typography systems matching size multipliers from Outfitters scale and standardized weights.',
      renderContent: () => (
        <div className="typo-showcase-list mt-md">
          <div className="typo-item">
            <span className="typo-label">h1 --4xl</span>
            <span className="h1-premium" style={{ fontSize: 'var(--font-size-2xl)' }}>Heading 4XL</span>
          </div>
          <div className="typo-item">
            <span className="typo-label">h3 --2xl</span>
            <span className="h3-premium" style={{ fontSize: 'var(--font-size-xl)' }}>Heading 2XL</span>
          </div>
          <div className="typo-item">
            <span className="typo-label">Base font</span>
            <span style={{ fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-regular)' }}>Base Regular 16px</span>
          </div>
          <div className="typo-item">
            <span className="typo-label">Small --sm</span>
            <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>Small Medium 14px</span>
          </div>
          <div className="typo-item" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-xs)', alignItems: 'start' }}>
            <span className="typo-label" style={{ width: '100%', marginBottom: 0 }}>Weights scale</span>
            <div className="d-grid gap-xs" style={{ 
              gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', 
              fontSize: 'var(--font-size-sm)',
              width: '100%' 
            }}>
              <span className="font-light">Light</span>
              <span className="font-regular">Regular</span>
              <span className="font-medium">Medium</span>
              <span className="font-semibold">Semibold</span>
              <span className="font-bold">Bold</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'spacing',
      title: '3. Spacing Scale',
      subtitle: 'Strict linear-exponential layouts scaling from 4px to 64px.',
      searchKeys: 'spacing scale gap padding margin size',
      description: 'Proportional layout spacing constants: 4px, 8px, 12px, 16px, 24px, 32px, 48px scale.',
      renderContent: () => (
        <div className="typo-showcase-list mt-md">
          {[
            { token: '--space-2xs', size: '4px' },
            { token: '--space-xs', size: '8px' },
            { token: '--space-sm', size: '12px' },
            { token: '--space-md', size: '16px' },
            { token: '--space-lg', size: '24px' },
            { token: '--space-xl', size: '32px' }
          ].map((item) => (
            <div key={item.token} className="d-flex flex-col gap-2xs">
              <div className="d-flex justify-between" style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)' }}>
                <span>{item.token} ({item.size})</span>
                <span className="font-semibold">{item.size}</span>
              </div>
              <div className="spacing-showcase-bar" style={{ width: `var(${item.token})` }}></div>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'radius',
      title: '4. Border Radius Curvature',
      subtitle: 'Standard curves defining structural UI component shapes.',
      searchKeys: 'border radius curvature shapes box radius',
      description: 'Consistent corner border curves: 6px small, 12px medium, 16px large.',
      renderContent: () => (
        <div className="d-grid grid-col flex-col gap-md mt-md">
          <div className="radius-box-swatch" style={{ borderRadius: 'var(--radius-sm)' }}>
            <span>--radius-sm (6px)</span>
          </div>
          <div className="radius-box-swatch" style={{ borderRadius: 'var(--radius-md)' }}>
            <span>--radius-md (12px)</span>
          </div>
          <div className="radius-box-swatch" style={{ borderRadius: 'var(--radius-lg)' }}>
            <span>--radius-lg (16px)</span>
          </div>
        </div>
      )
    },
    {
      id: 'shadows',
      title: '5. Elevation & Shadows',
      subtitle: 'Multi-layered drop-shadow weights for spatial layering.',
      searchKeys: 'elevation shadows card modal depth box-shadow',
      description: 'Organic soft multi-layered drop shadows representing layout height depths.',
      renderContent: () => (
        <div className="d-grid flex-col gap-md mt-md">
          <div className="shadow-showcase-card" style={{ boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)', color: 'var(--text-secondary)' }}>
              Small Shadow (--shadow-sm)
            </span>
          </div>
          <div className="shadow-showcase-card" style={{ boxShadow: 'var(--shadow-card)' }}>
            <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)', color: 'var(--text-primary)' }}>
              Card Shadow (--shadow-card)
            </span>
          </div>
          <div className="shadow-showcase-card" style={{ boxShadow: 'var(--shadow-hover)', border: '1px solid var(--primary-100)' }}>
            <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)', color: 'var(--primary-700)' }}>
              Hover Focus Shadow (--shadow-hover)
            </span>
          </div>
        </div>
      )
    },
    {
      id: 'transitions',
      title: '6. Easing & Motion Presets',
      subtitle: 'Cubic-bezier curves (standard ease) for modern hover responses.',
      searchKeys: 'transition timings animations fast normal easing cubic-bezier',
      description: 'Animation transitions: 150ms fast, 300ms normal timing curves.',
      renderContent: () => (
        <div className="d-flex flex-col gap-md mt-md">
          <div className="d-flex flex-col gap-xs">
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)' }}>
              Hover to test Fast Transition (150ms)
            </span>
            <div className="transition-swatch-box fast">--transition-fast</div>
          </div>
          <div className="d-flex flex-col gap-xs">
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)' }}>
              Hover to test Normal Transition (300ms)
            </span>
            <div className="transition-swatch-box normal">--transition-normal</div>
          </div>
        </div>
      )
    }
  ];

  const filteredCategories = tokenCategories.filter((cat) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return cat.title.toLowerCase().includes(query) ||
           cat.searchKeys.toLowerCase().includes(query) ||
           cat.description.toLowerCase().includes(query);
  });

  return (
    <>
      <Card className="p-lg">
        <h3 className="h3-premium">Design System Sandbox</h3>
        <p className="mt-xs text-color-secondary font-regular" style={{ fontSize: 'var(--font-size-sm)' }}>
          Centralized Design Tokens are CSS variables located in <code>tokens.css</code>. 
          They act as the single source of truth across the codebase, ensuring styling consistency and light/dark theme adaptivity.
        </p>
        
        <div className="search-container mt-lg">
          <input
            type="text"
            className="input-base"
            placeholder="Search tokens... (e.g. primary, radius, space, font)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </Card>

      <div className="showcase-grid">
        {filteredCategories.map((cat) => (
          <Card key={cat.id} className="token-showcase-item">
            <h4 className="h4-premium">{cat.title}</h4>
            <p className="text-color-secondary font-regular mt-2xs" style={{ fontSize: 'var(--font-size-xs)' }}>
              {cat.subtitle}
            </p>
            {cat.renderContent()}
          </Card>
        ))}
        {filteredCategories.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 'var(--space-xl)', color: 'var(--text-secondary)' }}>
            No tokens found matching "{searchQuery}"
          </div>
        )}
      </div>
    </>
  );
};

export default TokenShowcase;
