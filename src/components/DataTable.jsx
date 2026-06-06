import { useState, useMemo, useCallback, useEffect, useId } from 'react';
import SkeletonTable from './SkeletonTable';
import EmptyState from './EmptyState';
import ErrorState from './ErrorState';
import Button from './Button';

/**
 * Generic, accessible, and premium Data Table Component.
 * Supports:
 * - Columns configuration (headers, custom cell rendering, sorting, alignment)
 * - Filtering (multiple select drop-downs)
 * - Search (case-insensitive across target fields)
 * - Row selection and master check toggle
 * - Bulk actions toolbar with select counters
 * - Pagination controls (customizable page size, prev/next, page selection buttons)
 * - Shimmer loading, empty, and error feedback states
 * - Design tokens and responsive layouts
 */
const DataTable = ({
  data = [],
  columns = [],
  filters = [],
  bulkActions = [],
  rowKey,
  searchable = true,
  searchPlaceholder = 'Search records...',
  searchKeys,
  pagination = true,
  pageSizeOptions = [5, 10, 20],
  initialPageSize = 5,
  loading = false,
  error = false,
  errorTitle,
  errorDescription,
  onRetry,
  emptyTitle = 'No Records Found',
  emptyDescription = 'There are no active records in this directory.',
  emptyIcon = 'fa-solid fa-folder-open',
  emptyActionLabel,
  onEmptyActionClick,
  selectedRows,
  onSelectionChange,
}) => {
  // --- States ---
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [internalSelected, setInternalSelected] = useState([]);
  const [shouldRenderBulkBar, setShouldRenderBulkBar] = useState(false);
  const [isBulkBarExiting, setIsBulkBarExiting] = useState(false);

  const pageSizeSelectId = useId();

  // --- Controlled / Uncontrolled Selection Handling ---
  const isControlledSelection = selectedRows !== undefined && onSelectionChange !== undefined;
  const currentSelected = isControlledSelection ? selectedRows : internalSelected;

  const hasSelection = currentSelected.length > 0;
  useEffect(() => {
    let timer;
    if (hasSelection) {
      timer = setTimeout(() => {
        setShouldRenderBulkBar(true);
        setIsBulkBarExiting(false);
      }, 0);
    } else {
      timer = setTimeout(() => {
        setIsBulkBarExiting(true);
        const exitTimer = setTimeout(() => {
          setShouldRenderBulkBar(false);
          setIsBulkBarExiting(false);
        }, 300);
        return () => clearTimeout(exitTimer);
      }, 0);
    }
    return () => clearTimeout(timer);
  }, [hasSelection]);

  const setSelected = (newSelection) => {
    if (isControlledSelection) {
      onSelectionChange(newSelection);
    } else {
      setInternalSelected(newSelection);
    }
  };

  // --- Row Identifier Helper ---
  const getRowId = useCallback((row, index) => {
    if (typeof rowKey === 'function') return rowKey(row);
    if (typeof rowKey === 'string' && row[rowKey] !== undefined) return row[rowKey];
    return row.id !== undefined ? row.id : (row.email !== undefined ? row.email : index);
  }, [rowKey]);

  const getRowName = useCallback((row) => {
    if (row.name) return row.name;
    if (row.title) return row.title;
    if (row.email) return row.email;
    return `item ${getRowId(row)}`;
  }, [getRowId]);

  // --- Reset Pagination when page size changes ---
  const handlePageSizeChange = (e) => {
    const nextSize = parseInt(e.target.value, 10);
    setPageSize(nextSize);
    setCurrentPage(1);
  };

  // --- Filters: update active filters state ---
  const handleFilterChange = (filterKey, value) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterKey]: value,
    }));
    setCurrentPage(1);
  };

  // --- Clear all active search & filters ---
  const handleClearFilters = () => {
    setSearchQuery('');
    setActiveFilters({});
    setCurrentPage(1);
  };

  // --- Sorting toggle logic (Ascending -> Descending -> Reset Unsorted) ---
  const handleSort = (key) => {
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'asc') {
        setSortConfig({ key, direction: 'desc' });
      } else if (sortConfig.direction === 'desc') {
        setSortConfig({ key: null, direction: null }); // Reset sorting state
      } else {
        setSortConfig({ key, direction: 'asc' });
      }
    } else {
      setSortConfig({ key, direction: 'asc' });
    }
  };

  // --- 1. Filter Logic ---
  const filteredData = useMemo(() => {
    return data.filter((row) => {
      // Apply active drop-down filters
      for (const filter of filters) {
        const filterVal = activeFilters[filter.key];
        if (filterVal) {
          if (String(row[filter.key]) !== String(filterVal)) {
            return false;
          }
        }
      }
      return true;
    });
  }, [data, filters, activeFilters]);

  // --- 2. Search Logic (Case-Insensitive) ---
  const searchedData = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return filteredData;

    return filteredData.filter((row) => {
      // Determine which keys to search
      const keysToSearch = searchKeys || columns.map((col) => col.key).filter(Boolean);
      if (keysToSearch.length === 0) {
        keysToSearch.push(...Object.keys(row));
      }

      return keysToSearch.some((key) => {
        const value = row[key];
        if (value === undefined || value === null) return false;
        return String(value).toLowerCase().includes(query);
      });
    });
  }, [filteredData, searchQuery, searchKeys, columns]);

  // --- 3. Sorting Logic ---
  const sortedData = useMemo(() => {
    if (!sortConfig.key || !sortConfig.direction) return searchedData;

    return [...searchedData].sort((a, b) => {
      const valA = a[sortConfig.key];
      const valB = b[sortConfig.key];

      if (valA === undefined || valA === null) return 1;
      if (valB === undefined || valB === null) return -1;

      // Numeric Sort
      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortConfig.direction === 'asc' ? valA - valB : valB - valA;
      }

      // String Sort
      return sortConfig.direction === 'asc'
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  }, [searchedData, sortConfig]);

  // --- 4. Pagination Layout Ranges ---
  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;

  // Determine activePage (clamp it within valid totalPages range dynamically)
  const activePage = Math.min(currentPage, totalPages);

  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;
    const startIndex = (activePage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, pagination, activePage, pageSize]);

  const pageStartIndex = (activePage - 1) * pageSize;
  const pageEndIndex = Math.min(pageStartIndex + pageSize, totalItems);

  // --- Checkbox Selection Handlers ---
  const hasSelectionSupport = bulkActions.length > 0;

  const allPageRowsSelected = useMemo(() => {
    if (paginatedData.length === 0) return false;
    return paginatedData.every((row, idx) =>
      currentSelected.some((item) => getRowId(item, pageStartIndex + idx) === getRowId(row, pageStartIndex + idx))
    );
  }, [paginatedData, currentSelected, pageStartIndex, getRowId]);

  const handleSelectAllToggle = () => {
    if (allPageRowsSelected) {
      // Remove all current page rows from selection
      const nextSelected = currentSelected.filter((selectedRow) => {
        const selectedId = getRowId(selectedRow);
        return !paginatedData.some((row, idx) => getRowId(row, pageStartIndex + idx) === selectedId);
      });
      setSelected(nextSelected);
    } else {
      // Add all current page rows to selection (avoiding duplicates)
      const nextSelected = [...currentSelected];
      paginatedData.forEach((row, idx) => {
        const id = getRowId(row, pageStartIndex + idx);
        if (!nextSelected.some((item) => getRowId(item) === id)) {
          nextSelected.push(row);
        }
      });
      setSelected(nextSelected);
    }
  };

  const handleRowSelectToggle = (row, globalIdx) => {
    const targetId = getRowId(row, globalIdx);
    const isSelected = currentSelected.some((item) => getRowId(item) === targetId);

    let nextSelected;
    if (isSelected) {
      nextSelected = currentSelected.filter((item) => getRowId(item) !== targetId);
    } else {
      nextSelected = [...currentSelected, row];
    }
    setSelected(nextSelected);
  };

  const handleClearSelection = () => {
    setSelected([]);
  };

  // --- Render State Handlers ---
  if (error) {
    return (
      <ErrorState
        title={errorTitle || 'Failed to Load Table Data'}
        description={errorDescription || 'An error occurred while loading content from the system repository.'}
        onRetry={onRetry}
      />
    );
  }

  if (loading) {
    return <SkeletonTable rows={pageSize} />;
  }

  // Check if overall records empty
  if (data.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        icon={emptyIcon}
        actionLabel={emptyActionLabel}
        onActionClick={onEmptyActionClick}
      />
    );
  }

  // Check if filtering/searching produces 0 results
  const isSearchEmpty = totalItems === 0;

  return (
    <div className="data-table-system" style={{ animation: 'modalSlideIn var(--transition-normal) forwards' }}>
      {/* 1. Header Control Bar (Search, Filters, and Bulk Actions) */}
      <div className="data-table-toolbar">
        {/* Search Field */}
        {searchable && (
          <div className="data-table-search">
            <span className="search-icon-decor">
              <i className="fa-solid fa-magnifying-glass"></i>
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={searchPlaceholder}
              className="input-base search-input-field"
              aria-label={searchPlaceholder}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="search-clear-btn"
                aria-label="Clear search input"
              >
                <i className="fa-solid fa-circle-xmark"></i>
              </button>
            )}
          </div>
        )}

        {/* Dropdown Filters */}
        {filters.length > 0 && (
          <div className="data-table-filters-grid">
            {filters.map((filter) => (
              <div key={filter.key} className="filter-select-wrapper">
                <select
                  value={activeFilters[filter.key] || ''}
                  onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                  className="input-base filter-dropdown"
                  aria-label={`Filter by ${filter.label}`}
                >
                  <option value="">All {filter.label}s</option>
                  {filter.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}

        {/* Clean Reset Filters Button */}
        {(searchQuery || Object.values(activeFilters).some(Boolean)) && (
          <Button variant="outline" size="sm" onClick={handleClearFilters} className="clear-filters-btn">
            <i className="fa-solid fa-filter-circle-xmark mr-2xs"></i>
            Reset Filter
          </Button>
        )}
      </div>

      {/* 2. Bulk Selection Banner Alert */}
      {hasSelectionSupport && shouldRenderBulkBar && (
        <div className={`bulk-action-bar ${isBulkBarExiting ? 'bulk-action-bar-exiting' : ''}`} role="alert" aria-live="polite">
          <div className="bulk-info-side">
            <span className="bulk-select-badge">{currentSelected.length}</span>
            <span className="bulk-select-label">item{currentSelected.length !== 1 ? 's' : ''} selected</span>
            <Button variant="text" size="sm" onClick={handleClearSelection} className="bulk-clear-link">
              Clear Selection
            </Button>
          </div>
          <div className="bulk-actions-buttons">
            {bulkActions.map((act) => (
              <Button
                key={act.label}
                variant={act.variant || 'primary'}
                size="sm"
                onClick={() => act.onClick(currentSelected, handleClearSelection)}
                className="d-flex align-center gap-2xs"
              >
                {act.icon && <i className={act.icon}></i>}
                <span>{act.label}</span>
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* 3. Main Tabular Grid */}
      {isSearchEmpty ? (
        <div style={{ border: '1px dashed var(--border-color)', borderRadius: 'var(--radius-md)', padding: 'var(--space-xl) 0' }}>
          <EmptyState
            title="No Results Match Criteria"
            description="Adjust your search terms or filters to find records."
            icon="fa-solid fa-magnifying-glass-chart"
            actionLabel="Reset Active Search filters"
            onActionClick={handleClearFilters}
          />
        </div>
      ) : (
        <div className="admin-table-responsive">
          <table className="custom-data-table">
            <thead>
              <tr className="table-header-row">
                {/* Master checkbox header cell */}
                {hasSelectionSupport && (
                  <th className="table-cell-checkbox">
                    <input
                      type="checkbox"
                      checked={allPageRowsSelected}
                      onChange={handleSelectAllToggle}
                      aria-label="Select all visible items on this page"
                      className="checkbox-control"
                    />
                  </th>
                )}
                
                {/* Dynamic column headers */}
                {columns.map((col, idx) => {
                  const isSortable = col.sortable;
                  const isSorted = sortConfig.key === col.key;
                  const direction = isSorted ? sortConfig.direction : null;
                  const cellAlign = col.align || 'left';
                  
                  return (
                    <th
                      key={col.key || idx}
                      onClick={isSortable ? () => handleSort(col.key) : undefined}
                      className={`table-header-cell ${isSortable ? 'table-header-cell-sortable' : ''}`}
                      style={{ textAlign: cellAlign }}
                      aria-sort={
                        isSortable
                          ? direction === 'asc'
                            ? 'ascending'
                            : direction === 'desc'
                            ? 'descending'
                            : 'none'
                          : undefined
                      }
                      tabIndex={isSortable ? 0 : -1}
                      onKeyDown={
                        isSortable
                          ? (e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handleSort(col.key);
                              }
                            }
                          : undefined
                      }
                    >
                      <div className="table-header-cell-content" style={{ justifyContent: cellAlign === 'center' ? 'center' : cellAlign === 'right' ? 'flex-end' : 'flex-start' }}>
                        <span>{col.header}</span>
                        {isSortable && (
                          <>
                            <span className="sr-only">, sortable column</span>
                            <span className={`sort-indicator-shield ${isSorted ? 'active-sort' : ''}`} aria-hidden="true">
                              {direction === 'asc' && <i className="fa-solid fa-arrow-up-long"></i>}
                              {direction === 'desc' && <i className="fa-solid fa-arrow-down-long"></i>}
                              {!direction && <i className="fa-solid fa-arrows-up-down sort-inactive-icon"></i>}
                            </span>
                          </>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, idx) => {
                const globalIdx = pageStartIndex + idx;
                const targetId = getRowId(row, globalIdx);
                const isSelected = hasSelectionSupport && currentSelected.some((item) => getRowId(item) === targetId);

                return (
                  <tr
                    key={targetId}
                    className={`table-data-row ${isSelected ? 'selected-row' : ''}`}
                  >
                    {/* Row checkbox selection cell */}
                    {hasSelectionSupport && (
                      <td className="table-cell-checkbox">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleRowSelectToggle(row, globalIdx)}
                          aria-label={`Select ${getRowName(row)}`}
                          className="checkbox-control"
                        />
                      </td>
                    )}

                    {/* Dynamic cells */}
                    {columns.map((col, colIdx) => {
                      const cellAlign = col.align || 'left';
                      return (
                        <td
                          key={col.key || colIdx}
                          className="table-body-cell"
                          style={{ textAlign: cellAlign }}
                        >
                          {col.render ? col.render(row, globalIdx) : row[col.key]}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* 4. Pagination Control Bar Footer */}
      {pagination && !isSearchEmpty && (
        <div className="pagination-container">
          <div className="pagination-range-info">
            Showing <span className="highlight-val">{pageStartIndex + 1}</span> to{' '}
            <span className="highlight-val">{pageEndIndex}</span> of{' '}
            <span className="highlight-val">{totalItems}</span> entries
          </div>

          <div className="pagination-controls-right">
            {/* Page Size Selector */}
            <div className="page-size-selector-wrapper">
              <label htmlFor={pageSizeSelectId} className="page-size-label">
                Rows per page:
              </label>
              <select
                id={pageSizeSelectId}
                value={pageSize}
                onChange={handlePageSizeChange}
                className="input-base page-size-select"
              >
                {pageSizeOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Nav Arrows & Numbers */}
            <div className="pagination-nav-group" role="navigation" aria-label="Pagination Navigation">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={activePage === 1}
                className="pagination-btn pagination-arrow"
                aria-label="Previous Page"
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>

              {Array.from({ length: totalPages }).map((_, pIdx) => {
                const pageNum = pIdx + 1;
                // Show pagination buttons intelligently
                const isCurrent = pageNum === activePage;
                const isFirstOrLast = pageNum === 1 || pageNum === totalPages;
                const isWithinRange = Math.abs(pageNum - activePage) <= 1;

                if (isFirstOrLast || isWithinRange) {
                  return (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => setCurrentPage(pageNum)}
                      className={`pagination-btn ${isCurrent ? 'active-page-btn' : ''}`}
                      aria-label={`Go to page ${pageNum}`}
                      aria-current={isCurrent ? 'page' : undefined}
                    >
                      {pageNum}
                    </button>
                  );
                } else if (
                  (pageNum === 2 && activePage > 3) ||
                  (pageNum === totalPages - 1 && activePage < totalPages - 2)
                ) {
                  return (
                    <span key={pageNum} className="pagination-ellipsis" aria-hidden="true">
                      ...
                    </span>
                  );
                }
                return null;
              })}

              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={activePage === totalPages}
                className="pagination-btn pagination-arrow"
                aria-label="Next Page"
              >
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
