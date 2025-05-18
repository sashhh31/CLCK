import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL =`${process.env.NEXT_PUBLIC_APP_URL}/api`;

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
export interface MeetingData {
  id: string;
  title: string;
  description: string;
  datetime: Date;
  meetLink: string;
  createdBy: string;
  createdAt: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface ScheduleMeetingData {
  title: string;
  description: string;
  datetime: Date;
  duration: number; // Duration in minutes
  attendees: string[]; // Array of attendee emails
}

export const CalendarService = {
  scheduleMeeting: async (data: ScheduleMeetingData) => {
    const response = await api.post('/meetings', data);
    return response.data;
  },

  getUpcomingMeetings: async () => {
    const response = await api.get('/meetings/upcoming');
    return response.data;
  },

  getMeetingDetails: async (meetingId: string) => {
    const response = await api.get(`/meetings/${meetingId}`);
    return response.data;
  },

  cancelMeeting: async (meetingId: string) => {
    const response = await api.put(`/meetings/${meetingId}/cancel`);
    return response.data;
  },

  updateMeeting: async (meetingId: string, data: Partial<ScheduleMeetingData>) => {
    const response = await api.put(`/meetings/${meetingId}`, data);
    return response.data;
  },

  // Cal.com specific methods
  getAvailableSlots: async (date: string) => {
    const response = await api.get(`/meetings/available-slots?date=${date}`);
    return response.data;
  },

  getEventTypes: async () => {
    const response = await api.get('/meetings/event-types');
    return response.data;
  },

  // Admin methods
  getAllBookings: async () => {
    const response = await api.get('/meetings/admin/bookings');
    return response.data;
  }
}; 