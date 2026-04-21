export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface OtpResponse {
  otp: string; // The backend currently returns the OTP in the response for development/testing
}

export interface User {
  id: string;
  name?: string;
  email: string;
  phone?: string;
  avatar?: {
    secure_url: string;
    public_id: string;
  };
  accountId: string;
  account: {
    role: string;
  };
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: any;
}

export interface SubCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  categoryId: string;
  category?: Category;
}

export interface UserGoal {
  id: string;
  userId: string;
  subCategoryId: string;
  subCategory: SubCategory;
}

export interface UserGoalsResponse {
  goals: UserGoal[];
}

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface instructor {
  id: string;
  name: string;
  avatar?: string;
}

export interface CourseInstructor {
  instructor: instructor;
}

export interface Course {
  id: string;
  title: string;
  shortDescription?: string;
  description?: string;
  price: number;
  discountPrice?: number;
  thumbnail?: {
    public_id: string;
    secure_url: string;
  };
  status: 'Draft' | 'Published' | 'Upcoming' | 'Ongoing' | 'Completed';
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All';
  isFeatured: boolean;
  subCategory?: SubCategory;
  instructors?: CourseInstructor[];
  _count?: {
    enrollments: number;
    subjects: number;
  };
  createdAt: string;
}

export interface CourseListResponse {
  courses: Course[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
export interface Test {
  id: string;
  title: string;
  description?: string;
  type: string;
  subject?: string;
  duration: number;
  totalQuestions: number;
  totalMarks: number;
  date?: string;
  status: string;
  color: string;
  courseId?: string;
  course?: {
    id: string;
    title: string;
  };
}

export interface TestListResponse {
  tests: Test[];
}
