export const appRoutes = {
  dashboard: '',
  events: '/events',
  event_logs: '/events/logs',
  activities: '/activities',
  activity_logs: '/activities/logs',
  settings: '/settings',
} as const;

export type AppRoutes = typeof appRoutes[keyof typeof appRoutes];

export const getAppRoute = (route: AppRoutes, app_id: string) => {
  return `/${app_id}${route}`;
};
