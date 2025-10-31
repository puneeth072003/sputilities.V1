# Sputilities Frontend

A modern, responsive React application for managing Spotify playlists and music libraries with advanced features like duplicate detection, smart merging, and comprehensive analytics.

## 🚀 Features

- **Modern UI/UX**: Built with React, Tailwind CSS, and Framer Motion for smooth animations
- **Responsive Design**: Fully responsive layout that works on all devices
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support
- **Performance Optimized**: Code splitting, lazy loading, and performance monitoring
- **Real-time Updates**: Live operation tracking and automatic data synchronization
- **Error Handling**: Comprehensive error boundaries and retry mechanisms
- **State Management**: Zustand for global state and React Query for server state

## 🛠️ Tech Stack

- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS with custom Spotify-inspired design system
- **Animations**: Framer Motion for smooth transitions and micro-interactions
- **State Management**: 
  - Zustand for global client state
  - React Query for server state and caching
- **Routing**: React Router v6 with lazy loading
- **HTTP Client**: Axios with interceptors and retry logic
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Development**: ESLint, Prettier, and Vite dev tools

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Frontend/sputilities
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:3601/api/v1
   VITE_ENABLE_PERFORMANCE_MONITORING=true
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components (Button, Input, etc.)
│   ├── Layout.jsx      # Main layout component
│   ├── Header.jsx      # Application header
│   ├── Sidebar.jsx     # Navigation sidebar
│   └── ...
├── pages/              # Page components
│   ├── Dashboard.jsx   # Main dashboard
│   ├── PlaylistManager.jsx
│   ├── LikedSongs.jsx
│   └── ...
├── hooks/              # Custom React hooks
│   ├── useAuth.js      # Authentication hook
│   ├── useApiQuery.js  # Enhanced API query hooks
│   └── ...
├── services/           # API services and utilities
│   ├── api.js          # Main API client
│   └── ...
├── store/              # Global state management
│   ├── authStore.js    # Authentication state
│   ├── appStore.js     # Application state
│   └── ...
├── utils/              # Utility functions
│   ├── dataManager.js  # Data caching and sync
│   ├── performance.js  # Performance monitoring
│   └── ...
└── Router/             # Routing configuration
    └── Content.jsx     # Main router component
```

## 🎨 Design System

The application uses a custom design system based on Spotify's visual language:

### Colors
- **Primary**: Spotify Green (#1DB954)
- **Background**: Dark theme with multiple gray shades
- **Text**: White and gray variants for hierarchy

### Components
All components follow consistent patterns:
- Hover effects with subtle animations
- Focus states for accessibility
- Loading states with skeletons
- Error states with retry options

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

### Code Style

The project uses ESLint and Prettier for code formatting. Configuration files:
- `.eslintrc.js` - ESLint rules
- `.prettierrc` - Prettier configuration

### Performance Monitoring

The app includes built-in performance monitoring:
- Core Web Vitals tracking
- Component render time monitoring
- API response time tracking
- Memory usage monitoring

Enable in development:
```env
REACT_APP_ENABLE_PERFORMANCE_MONITORING=true
```

## 🧪 Testing

### Test Setup
```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
```

### Running Tests
```bash
npm run test        # Run tests
npm run test:watch  # Run tests in watch mode
npm run test:ui     # Run tests with UI
```

### Test Utilities
The project includes comprehensive test utilities in `src/utils/testUtils.js`:
- Mock data generators
- Custom render functions with providers
- Accessibility testing helpers
- Async testing utilities

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Environment Variables
Set these in your production environment:
```env
VITE_API_URL=https://your-api-domain.com/api/v1
VITE_ENABLE_PERFORMANCE_MONITORING=false
```

### Performance Optimizations
- Code splitting by route
- Lazy loading of components
- Image optimization
- Bundle size monitoring
- Caching strategies

## 🔐 Security

- No sensitive data in localStorage
- CSRF protection via cookies
- XSS prevention through React's built-in protections
- Content Security Policy headers (configure in server)

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Ensure all tests pass
6. Submit a pull request

### Code Guidelines
- Use TypeScript for new components (migration in progress)
- Follow the existing component patterns
- Add proper accessibility attributes
- Include loading and error states
- Write tests for new features

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review existing issues for solutions

## 🔄 Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history and updates.
