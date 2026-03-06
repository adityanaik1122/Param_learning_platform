import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export interface CourseProgress {
  id: string;
  progress: number;
  is_current: boolean;
  last_accessed: string;
}

export interface UpdateProgressRequest {
  course_id: string;
  progress_percentage?: number;
  is_current?: boolean;
}

class CourseProgressAPI {
  private getAuthHeaders() {
    const token = localStorage.getItem('access_token');
    return {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
  }

  async getCourseProgress(): Promise<CourseProgress[]> {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/syllabus/course-progress/`,
        this.getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching course progress:', error);
      throw error;
    }
  }

  async updateCourseProgress(data: UpdateProgressRequest): Promise<any> {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/syllabus/update-course-progress/`,
        data,
        this.getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      console.error('Error updating course progress:', error);
      throw error;
    }
  }

  async setCurrentCourse(courseId: string): Promise<any> {
    return this.updateCourseProgress({
      course_id: courseId,
      is_current: true,
    });
  }
}

export const courseProgressAPI = new CourseProgressAPI();
