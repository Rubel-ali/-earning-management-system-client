export interface IOverview {
  totalUsers: number;
  totalRevenue: number;
  totalCourses: number;
  totalEnrollments: number;
}

export interface IMonthlyRevenue {
  month: string;
  revenue: number;
}

export interface IUserGrowth {
  students: number;
  instructors: number;
}

export interface IPlatformHealth {
  percentage: number;
  status: string;
}

export interface ISuperAdminDashboardResponse {
  overview: IOverview;
  monthlyRevenue: IMonthlyRevenue[];
  userGrowthByType: IUserGrowth;
  platformHealth: IPlatformHealth;
  pendingActions: number;
  enrollmentTrend: { month: string; enrollments: number }[];
  categoryDistribution: { categoryId: string; percentage: number }[];
  topInstructors: { name: string; revenue: number; totalStudents: number }[];
}

export interface IRevenueByCourse {
  courseId: string;
  title: string;
  revenue: number;
}

export interface IInstructorAnalytics {
  totalStudents: number;
  totalCompletions: number;
  completionRate: number;
  avgRating: number;
  totalReviews: number;
  totalRevenue: number;
  revenueByCourse: IRevenueByCourse[];
}

export interface IOverview {
  totalUsers: number;
  totalRevenue: number;
  totalCourses: number;
  totalEnrollments: number;
}

export interface IMonthlyRevenue {
  month: string;
  revenue: number;
}

export interface IUserGrowthByType {
  students: number;
  instructors: number;
}

export interface IPlatformHealth {
  percentage: number;
  status: string;
}

export interface IAnalyticsData {
  overview: IOverview;
  monthlyRevenue: IMonthlyRevenue[];
  userGrowthByType: IUserGrowthByType;
  platformHealth: IPlatformHealth;
  pendingActions: number;
}

export interface IAnalyticsResponse {
  success: boolean;
  message: string;
  data: IAnalyticsData;
}
