const TerminalConsole = ({ logs = [], onClear }) => {
  return (
    <div className="terminal-widget">
      <div className="terminal-header">
        <div className="terminal-dots">
          <span className="term-dot dot-red"></span>
          <span className="term-dot dot-yellow"></span>
          <span className="term-dot dot-green"></span>
        </div>
        <span className="terminal-title">Action Event Console</span>
        <button
          onClick={onClear}
          className="btn btn-text btn-sm"
          style={{ color: 'var(--neutral-400)', padding: '2px 6px', fontSize: '9px', cursor: 'pointer' }}
        >
          Clear
        </button>
      </div>
      <div className="terminal-body">
        {logs.length === 0 ? (
          <div className="terminal-line placeholder">
            Click any button or interactive element to inspect the design token action pipeline here...
          </div>
        ) : (
          logs.map((log, index) => (
            <div key={index} className="terminal-line">
              <span className="term-time">[{log.time}]</span>{' '}
              {log.message ? (
                <span className={log.variant === 'success' ? 'text-success' : ''} style={{ color: log.variant === 'success' ? 'var(--success-500)' : undefined }}>{log.message}</span>
              ) : (
                <>
                  Action triggered:{' '}
                  <span className={`term-variant text-${log.variant}`}>{log.variant.toUpperCase()}</span>{' '}
                  button clicked. Transition duration:{' '}
                  <span className="term-timing">{log.duration || '150ms'}</span>.
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TerminalConsole;
