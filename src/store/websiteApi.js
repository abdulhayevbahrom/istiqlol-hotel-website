import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../config/apiConfig';

const normalizeList = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.innerData)) return payload.innerData;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
};

export const websiteApi = createApi({
  reducerPath: 'websiteApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getPublicRoomCategories: builder.query({
      query: () => '/public/room-categories',
      transformResponse: normalizeList,
    }),
    getPublicRooms: builder.query({
      query: () => '/rooms',
      transformResponse: normalizeList,
    }),
    getPublicRoomAvailability: builder.query({
      query: ({ checkIn, checkOut }) => ({
        url: '/public/room-availability',
        params: { checkIn, checkOut },
      }),
      transformResponse: (payload) => payload?.innerData || payload?.data || payload || {},
    }),
    createPublicBooking: builder.mutation({
      query: (booking) => ({
        url: '/public/booking',
        method: 'POST',
        body: { ...booking, source: 'website' },
      }),
      transformResponse: (payload) => payload?.innerData || payload?.data || payload,
    }),
    getPublicBookingConfirmation: builder.query({
      query: (token) => `/public/booking/${token}`,
      transformResponse: (payload) => payload?.innerData || payload?.data || payload,
    }),
  }),
});

export const {
  useGetPublicRoomCategoriesQuery,
  useGetPublicRoomsQuery,
  useGetPublicRoomAvailabilityQuery,
  useCreatePublicBookingMutation,
  useGetPublicBookingConfirmationQuery,
} = websiteApi;
