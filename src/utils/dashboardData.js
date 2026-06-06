/**
 * Structured mock metrics data representing the UpToSkill dashboard KPI states.
 * Easily swappable with a live API backend.
 */
export const INITIAL_METRICS = [
  {
    id: 'total-users',
    title: "Total Users",
    value: "15,840",
    icon: "fa-solid fa-users",
    trend: "+12.3%",
    description: "vs last month",
    variant: "primary"
  },
  {
    id: 'total-courses',
    title: "Total Courses",
    value: "420",
    icon: "fa-solid fa-book-open",
    trend: "+8.2%",
    description: "new courses",
    variant: "secondary"
  },
  {
    id: 'enrollments',
    title: "Enrollments",
    value: "32,450",
    icon: "fa-solid fa-graduation-cap",
    trend: "+15.1%",
    description: "active students",
    variant: "success"
  },
  {
    id: 'pending-approvals',
    title: "Pending Approvals",
    value: "18",
    icon: "fa-solid fa-clock-rotate-left",
    trend: "-10.5%",
    description: "vs yesterday",
    variant: "warning"
  },
  {
    id: 'active-sessions',
    title: "Active Sessions",
    value: "1,280",
    icon: "fa-solid fa-laptop-code",
    trend: "+5.4%",
    description: "live learning",
    variant: "danger"
  }
];

/**
 * Simulates a backend API call to fetch dashboard KPI metrics.
 * Supports loading delay, empty state simulation, and error simulation.
 * 
 * @param {Object} options Options for simulating different backend conditions.
 * @param {boolean} options.simulateError If true, the returned promise rejects with an error.
 * @param {boolean} options.simulateEmpty If true, returns metrics with empty/placeholder values.
 * @param {number} options.delay Mock latency delay in milliseconds (default: 1200ms).
 * @returns {Promise<Array>} Resolves to the array of KPI metrics or rejects with an error.
 */
export const fetchDashboardMetrics = (options = {}) => {
  const { simulateError = false, simulateEmpty = false, delay = 1200 } = options;
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (simulateError) {
        reject(new Error("Unable to synchronize dashboard metrics. Please check network connection."));
      } else if (simulateEmpty) {
        // Return metrics but with empty values to verify empty state behavior
        const emptyMetrics = INITIAL_METRICS.map((metric) => ({
          ...metric,
          value: "",
          trend: "",
          description: "No recent updates"
        }));
        resolve(emptyMetrics);
      } else {
        resolve(INITIAL_METRICS);
      }
    }, delay);
  });
};
