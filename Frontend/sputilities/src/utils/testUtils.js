import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';

// Mock data generators
export const mockUser = {
  id: 'test-user-123',
  name: 'Test User',
  email: 'test@example.com',
  spotify_id: 'spotify-test-123',
};

export const mockPlaylist = (overrides = {}) => ({
  spotify_id: 'playlist-123',
  name: 'Test Playlist',
  description: 'A test playlist',
  total_tracks: 25,
  is_public: false,
  created_via_app: true,
  images: [{ url: 'https://example.com/image.jpg' }],
  external_urls: { spotify: 'https://open.spotify.com/playlist/123' },
  createdAt: new Date().toISOString(),
  ...overrides,
});

export const mockTrack = (overrides = {}) => ({
  spotify_track_id: 'track-123',
  track_name: 'Test Song',
  artists: [{ name: 'Test Artist' }],
  album: { name: 'Test Album', image_url: 'https://example.com/album.jpg' },
  duration_ms: 180000,
  liked_at: new Date().toISOString(),
  ...overrides,
});

export const mockOperation = (overrides = {}) => ({
  _id: 'operation-123',
  operation_type: 'like_all_playlist_songs',
  status: 'in_progress',
  progress: { percentage: 50, current: 10, total: 20 },
  metadata: { playlist_name: 'Test Playlist' },
  createdAt: new Date().toISOString(),
  ...overrides,
});

// Test wrapper with providers
export const TestWrapper = ({ children, queryClient, initialEntries = ['/'] }) => {
  const testQueryClient = queryClient || new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return (
    <QueryClientProvider client={testQueryClient}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </QueryClientProvider>
  );
};

// Custom render function with providers
export const renderWithProviders = (ui, options = {}) => {
  const { queryClient, initialEntries, ...renderOptions } = options;
  
  const Wrapper = ({ children }) => (
    <TestWrapper queryClient={queryClient} initialEntries={initialEntries}>
      {children}
    </TestWrapper>
  );

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
};

// Mock API responses
export const mockApiResponse = (data, status = 200) => ({
  data: { data },
  status,
  statusText: 'OK',
  headers: {},
  config: {},
});

export const mockApiError = (message = 'API Error', status = 500) => {
  const error = new Error(message);
  error.response = {
    status,
    data: { message },
  };
  return error;
};

// Mock fetch for API calls
export const mockFetch = (response, shouldReject = false) => {
  global.fetch = vi.fn(() => {
    if (shouldReject) {
      return Promise.reject(response);
    }
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(response),
    });
  });
};

// Wait for loading to complete
export const waitForLoadingToFinish = async () => {
  await waitFor(() => {
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });
};

// Common test utilities
export const expectElementToBeVisible = (element) => {
  expect(element).toBeInTheDocument();
  expect(element).toBeVisible();
};

export const expectElementToHaveText = (element, text) => {
  expect(element).toBeInTheDocument();
  expect(element).toHaveTextContent(text);
};

// Mock intersection observer for lazy loading tests
export const mockIntersectionObserver = () => {
  const mockIntersectionObserver = vi.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
  window.IntersectionObserverEntry = vi.fn();
};

// Mock resize observer
export const mockResizeObserver = () => {
  window.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));
};

// Mock performance API
export const mockPerformanceAPI = () => {
  Object.defineProperty(window, 'performance', {
    value: {
      now: vi.fn(() => Date.now()),
      memory: {
        usedJSHeapSize: 1000000,
        totalJSHeapSize: 2000000,
        jsHeapSizeLimit: 4000000,
      },
    },
    writable: true,
  });
};

// Mock local storage
export const mockLocalStorage = () => {
  const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  };
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  });
  return localStorageMock;
};

// Test data factories
export const createMockPlaylists = (count = 5) => {
  return Array.from({ length: count }, (_, index) => 
    mockPlaylist({
      spotify_id: `playlist-${index}`,
      name: `Test Playlist ${index + 1}`,
      total_tracks: Math.floor(Math.random() * 100) + 1,
    })
  );
};

export const createMockTracks = (count = 10) => {
  return Array.from({ length: count }, (_, index) => 
    mockTrack({
      spotify_track_id: `track-${index}`,
      track_name: `Test Song ${index + 1}`,
      artists: [{ name: `Test Artist ${index + 1}` }],
    })
  );
};

export const createMockOperations = (count = 3) => {
  const statuses = ['pending', 'in_progress', 'completed', 'failed'];
  return Array.from({ length: count }, (_, index) => 
    mockOperation({
      _id: `operation-${index}`,
      status: statuses[index % statuses.length],
      progress: { percentage: Math.floor(Math.random() * 100) },
    })
  );
};

// Async test helpers
export const waitForElement = async (selector) => {
  return await screen.findByTestId(selector);
};

export const waitForText = async (text) => {
  return await screen.findByText(text);
};

// Form testing helpers
export const fillForm = async (user, formData) => {
  for (const [field, value] of Object.entries(formData)) {
    const input = screen.getByLabelText(new RegExp(field, 'i'));
    await user.clear(input);
    await user.type(input, value);
  }
};

export const submitForm = async (user, buttonText = /submit/i) => {
  const submitButton = screen.getByRole('button', { name: buttonText });
  await user.click(submitButton);
};

// Accessibility testing helpers
export const checkAccessibility = (container) => {
  // Check for proper heading hierarchy
  const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
  headings.forEach(heading => {
    expect(heading).toBeInTheDocument();
  });

  // Check for alt text on images
  const images = container.querySelectorAll('img');
  images.forEach(img => {
    expect(img).toHaveAttribute('alt');
  });

  // Check for proper button labels
  const buttons = container.querySelectorAll('button');
  buttons.forEach(button => {
    expect(button).toHaveAccessibleName();
  });
};

export default {
  renderWithProviders,
  TestWrapper,
  mockUser,
  mockPlaylist,
  mockTrack,
  mockOperation,
  mockApiResponse,
  mockApiError,
  waitForLoadingToFinish,
  expectElementToBeVisible,
  expectElementToHaveText,
  createMockPlaylists,
  createMockTracks,
  createMockOperations,
  checkAccessibility,
};
