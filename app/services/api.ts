import axios from 'axios';
import Cookies from 'js-cookie';
import { requestToBodyStream } from 'next/dist/server/body-streams';

const API_URL =`${process.env.NEXT_PUBLIC_APP_URL}api`;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export interface VideoData {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  status: 'uploading' | 'processing' | 'ready' | 'error';
  duration: number;
  createdAt: string;
}

interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
}

interface CreateSubscriptionParams {
  planName: string;
  email: string;
}

interface SubscriptionResponse {
  data: {
    sessionId: string;
    url: string;
  };
}

export const statsService={
  stats: async () => {
    const response=await api.get('/admin/stats')
    return response.data
  }
}


export const authService = {
  register: async (data: { 
    email: string; 
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    return await api.post('/auth/register', data);
  },

  login: async (credentials: { email: string; password: string }) => {
    try {
      const response = await api.post('/auth/login', credentials);
      console.log('API login response:', response.data); // Debug log
      return response.data;
    } catch (error) {
      console.error('API login error:', error); // Debug log
      throw error;
    }
  },

  verify2FA: async (data: { email: string; code: string; isLogin: boolean }) => {
    try {
      const response = await api.post('/auth/verify-2fa', data);
      if (response.data?.data?.token) {
        Cookies.set('token', response.data.data.token, { expires: 7, path: '/' });
      }
      return response.data;
    } catch (error) {
      console.error('API verify error:', error); // Debug log
      throw error;
    }
  },

  changePassword: async (data: { currentPassword: string; newPassword: string }) => {
    const response = await api.put('/auth/change-password', data);
    return response.data;
  },

  changeEmail: async (data: { newEmail: string; password: string }) => {
    const response = await api.put('/auth/change-email', data);
    return response.data;
  },

  getUserProfile: async () => {
    try {
      const response = await api.get('/users/me');
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    } 
  },

  updateProfile: async (data: { firstName: string; lastName: string }) => {
    const response = await api.put('/auth/profile', data);
    return response.data;
  },

  initiateEmailChange: async () => {
    const response = await api.post('/profile/initiate-email-change');
    return response.data;
  },

  verifyAndChangeEmail: async (data: { newEmail: string; verificationCode: string }) => {
    const response = await api.post('/profile/verify-and-change-email', data);
    return response.data;
  },

  createSubscription: async (data: CreateSubscriptionParams): Promise<ApiResponse<SubscriptionResponse>> => {
    return api.post('/subscriptions/create', data);
  },

  getSubscriptionStatus: async () => {
    const response = await api.get('/subscriptions/status');
    return response.data;
  },

  getSubscriptionHistory: async (page = 1, search = '') => {
    const response = await api.get(`/subscriptions/history?page=${page}&search=${search}`);
    return response.data;
  },

  cancelSubscription: async () => {
    const response = await api.post('/subscriptions/cancel');
    return response.data;
  },

  verifySubscription: async (sessionId: string) => {
    const response = await api.post('/subscriptions/verify', { sessionId });
    return response.data;
  },

  forgotPassword: async (email: string) => {
    return await api.post('/auth/forgot-password', { email });
  },

  resetPassword: async (data: { email: string; code: string; newPassword: string }) => {
    return await api.post('/auth/reset-password', data);
  },
};

export const documentService = {
  upload: async (formData: FormData) => {
    const response = await api.post('/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },
  listDocuments: async () => {
    const response = await api.get('/documents');
    return response.data;
  },
  getAllDocuments: async (page = 1, limit = 10) => {
    try {
      const response = await api.get(`/admin/documents?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching all documents:', error);
      throw error;
    }
  },
  getDownloadedDocuments: async (page = 1, limit = 10) => {
    const response = await api.get(`/documents/downloaded?page=${page}&limit=${limit}`);
    return response.data;
  },
  getAllDownloadedDocuments: async (page = 1, limit = 10) => {
    try {
      const response = await api.get(`/admin/downloads?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching all downloaded documents:', error);
      throw error;
    }
  },
  deleteDocument: async (id: string) => {
    const response = await api.delete(`/documents/${id}`);
    return response.data;
  },
  softDeleteDocument: async (id: string) => {
    const response = await api.put(`/documents/soft-delete/${id}`);
    return response.data;
  },
  downloadDocument: async (id: string) => {
    const response = await api.get(`/documents/download/${id}`);
    return response.data;
  }
};

export const videoService = {
  uploadVideo: async (formData: FormData): Promise<{ data: { video: VideoData } }> => {
    const response = await api.post('/videos/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getVideoStatus: async (videoId: string): Promise<{ data: { video: VideoData } }> => {
    try {
      const response = await api.get(`/videos/status/${videoId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching video status:', error);
      throw error;
    }
  },

  listVideos: async (page: number = 1): Promise<{ data: { videos: VideoData[], pagination: { total: number, pages: number, current: number } } }> => {
    const response = await api.get('/videos', {
      params: { page }
    });

    return response.data;
  },

  deleteVideo: async (videoId: string): Promise<void> => {
    await api.delete(`/videos/${videoId}`);
  },

  updateVideo: async (videoId: string, data: { title: string; description: string }): Promise<{ data: { video: VideoData } }> => {
    const response = await api.patch(`/videos/${videoId}`, data);
    return response.data;
  }
};

export const emailService = {
  sendEmail: async (formData: FormData, userId: string) => {
    formData.append('userId', userId);
    const response = await api.post('/admin/send-email', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  getEmailHistory: async (page = 1, search = '') => {
    const response = await api.get(`/admin/emails?page=${page}&search=${search}`);
    return response.data;
  }
};

export interface AdminUser {
  id: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}

export interface AdminDocument {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  url: string;
  downloaded: boolean;
  createdAt: string;
}

export interface AdminEmail {
  id: string;
  subject: string;
  message: string;
  attachments: { filename: string; path: string }[];
  sentAt: string;
}

export interface PaginationData {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface AdminApiResponse<T> {
  status: string;
  data: {
    [key: string]: T | PaginationData;
    pagination: PaginationData;
  };
}

export const adminService = {
  // User Management
  getAllUsers: async (page = 1, limit = 10) => {
    const response = await api.get<AdminApiResponse<AdminUser[]>>(`/admin/users?page=${page}&limit=${limit}`);
    return response.data;
  },

  getUserDetails: async (userId: string) => {
    const response = await api.get<AdminApiResponse<AdminUser>>(`/admin/users/${userId}`);
    return response.data;
  },

  deleteUser: async (userId: string) => {
    const response = await api.delete<AdminApiResponse<null>>(`/admin/users/${userId}`);
    return response.data;
  },

  banUser: async (userId: string) => {
    const response = await api.put<AdminApiResponse<null>>(`/admin/users/${userId}/ban`);
    return response.data;
  },

  // Document Management
  getUserDocuments: async (userId: string, page = 1, limit = 10) => {
    const response = await api.get<AdminApiResponse<AdminDocument[]>>(
      `/admin/documents?userId=${userId}&page=${page}&limit=${limit}`
    );
    return response.data;
  },

  getUserDownloadedFiles: async (userId: string, page = 1, limit = 10) => {
    const response = await api.get<AdminApiResponse<AdminDocument[]>>(
      `/admin/downloads?userId=${userId}&page=${page}&limit=${limit}`
    );
    return response.data;
  },

  uploadDocument: async (userId: string, formData: FormData) => {
    const response = await api.post<AdminApiResponse<AdminDocument>>(
      `/admin/users/${userId}/upload-document`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  deleteDocument: async (documentId: string) => {
    const response = await api.delete<AdminApiResponse<null>>(`/admin/documents/${documentId}`);
    return response.data;
  },

  // Email Management
  getUserEmails: async (userId: string, page = 1, limit = 10) => {
    const response = await api.get<AdminApiResponse<AdminEmail[]>>(
      `/admin/emails?userId=${userId}&page=${page}&limit=${limit}`
    );
    return response.data;
  },

  sendEmail: async (formData: FormData) => {
    const response = await api.post<AdminApiResponse<AdminEmail>>('/admin/send-email', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

export const notificationsService = {
  getNotifications: async () => {
    const response = await api.get('/notifications');
    return response.data;
  },
};

export default api; 