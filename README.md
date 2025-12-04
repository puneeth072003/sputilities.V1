<!-- Badges -->
[![Last Commit][last-commit-shield]][last-commit-url]
[![Issues][issues-shield]][issues-url]
[![License][license-shield]][license-url]
[![Top Language][top-language-shield]][top-language-url]

<br>
<div align="center">
  <div align="center">
    <img src="https://raw.githubusercontent.com/puneeth072003/sputilities.V1/main/Frontend/sputilities/src/App/assets/sputilities.svg" alt="Sputilities Logo" width="200" align="center" />
  </div>

<br>
  <h3 align="center">Sputilities</h3>

  <p align="center">
    Modern Spotify Playlist & Music Library Management Platform
    <br />
    <a href="https://github.com/puneeth072003/sputilities.V1"><strong>Explore the repo »</strong></a>
    <br />
    <br />
    <a href="#demo">View Demo</a>
    &middot;
    <a href="https://github.com/puneeth072003/sputilities.V1/issues/new?labels=bug">Report Bug</a>
    &middot;
    <a href="https://github.com/puneeth072003/sputilities.V1/issues/new?labels=enhancement">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#key-features">Key Features</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#environment-setup">Environment Setup</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#project-structure">Project Structure</a></li>
    <li><a href="#deployment">Deployment</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

## About The Project

<div align="center">
  <img src="https://img.shields.io/badge/Spotify-1DB954?style=for-the-badge&logo=spotify&logoColor=white" alt="Spotify" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
</div>

<br>

**Sputilities** is a powerful, modern web application designed to enhance your Spotify experience by providing advanced playlist and music library management tools that go beyond Spotify's native capabilities. Built with React and a beautiful Spotify-inspired UI, Sputilities makes managing your music collection effortless and enjoyable.

### Why Sputilities?

Spotify is amazing for discovering and playing music, but it has limitations when it comes to managing large music libraries:
- **Liked Songs are private** - You can't easily share your entire liked songs collection
- **No bulk operations** - Managing hundreds of playlists manually is tedious
- **Limited filtering** - Can't filter by audio features like tempo, energy, or mood
- **No duplicate detection** - Hard to find and remove duplicate tracks
- **Basic analytics** - Limited insights into your music preferences

**Sputilities solves all of these problems and more!**

### Key Features

#### 🎵 **Playlist Management**
- Create, edit, and delete playlists with ease
- Bulk operations for managing multiple playlists at once
- Drag-and-drop playlist organization
- Quick playlist duplication and cloning

#### ❤️ **Liked Songs Control**
- Convert your private liked songs into shareable playlists
- Backup and restore your liked songs collection
- Sync liked songs across devices
- Export liked songs to various formats

#### 🧠 **Smart Features**
- **Duplicate Detection**: Find and remove duplicate tracks across playlists
- **Playlist Comparison**: Compare two playlists to find common or unique tracks
- **Smart Merging**: Intelligently merge multiple playlists with conflict resolution
- **Auto-sorting**: Sort playlists by various criteria (artist, album, date added, etc.)

#### 🔍 **Advanced Search & Filtering**
- Filter tracks by audio features (tempo, energy, danceability, mood)
- Search by genre, artist, album, or release year
- Create smart playlists based on complex criteria
- Save and reuse filter presets

#### 📊 **Analytics & Insights**
- Visualize your music taste with interactive charts
- Track listening patterns and trends
- Discover your most played artists and genres
- Get personalized music recommendations

#### ⚡ **Real-time Operations**
- Background task processing for large operations
- Live progress tracking with detailed status updates
- Operation history and logs
- Automatic retry on failures

### Built With

#### Frontend Technologies
- **[React 18](https://react.dev/)** - Modern UI library with hooks and concurrent features
- **[Vite](https://vitejs.dev/)** - Lightning-fast build tool and dev server
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Production-ready animation library

#### State Management & Data
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Lightweight state management
- **[React Query](https://tanstack.com/query/latest)** - Powerful data synchronization and caching
- **[Axios](https://axios-http.com/)** - Promise-based HTTP client with interceptors

#### UI Components & Styling
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Headless UI](https://headlessui.com/)** - Unstyled, accessible UI components
- **[Lucide React](https://lucide.dev/)** - Beautiful, consistent icon set
- **[React Hot Toast](https://react-hot-toast.com/)** - Lightweight notification system

#### Routing & Navigation
- **[React Router v6](https://reactrouter.com/)** - Declarative routing with lazy loading

#### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting and quality checks
- **[Vitest](https://vitest.dev/)** - Fast unit testing framework
- **[PostCSS](https://postcss.org/)** - CSS transformations and optimizations

#### Backend Integration
- **[Node.js](https://nodejs.org/)** - Backend runtime environment
- **[Express](https://expressjs.com/)** - Web application framework
- **[MongoDB](https://www.mongodb.com/)** - NoSQL database for data persistence
- **[Spotify Web API](https://developer.spotify.com/documentation/web-api)** - Official Spotify API integration

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v9.0.0 or higher) - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)
- **Spotify Account** - [Sign up](https://www.spotify.com/)

### Installation

Follow these steps to get Sputilities running on your local machine:

#### 1. Clone the Repository

```bash
# Clone the repository
git clone https://github.com/yourusername/sputilities.git

# Navigate to the frontend directory
cd sputilities/Frontend/sputilities
```

#### 2. Install Dependencies

```bash
# Install all required packages
npm install
```

This will install all dependencies listed in `package.json`, including:
- React and React DOM
- Vite build tool
- Tailwind CSS
- Framer Motion
- Zustand and React Query
- And many more...

#### 3. Environment Setup

Create a `.env` file in the `Frontend/sputilities` directory:

```bash
# Copy the example environment file
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
# API Configuration
VITE_API_URL=http://localhost:3601/api/v1

# Application Environment
VITE_APP_ENV=development

# Feature Flags
VITE_ENABLE_PERFORMANCE_MONITORING=true
VITE_ENABLE_ANALYTICS=false

# Optional: Monitoring & Analytics
VITE_SENTRY_DSN=your-sentry-dsn-here
VITE_GA_TRACKING_ID=your-google-analytics-id
```

#### 4. Start the Development Server

```bash
# Start the Vite development server
npm run dev
```

The application will be available at **http://localhost:5173** 🎉

#### 5. Start the Backend (Required)

In a separate terminal, start the backend server:

```bash
# Navigate to the backend directory
cd ../../Backend

# Install backend dependencies
npm install

# Start the backend server
npm start
```

The backend API will run on **http://localhost:3601**

### Quick Start Commands

```bash
# Development
npm run dev              # Start development server (port 5173)
npm run build            # Build for production
npm run preview          # Preview production build locally
npm run lint             # Run ESLint to check code quality

# Testing
npm run test             # Run unit tests
npm run test:ui          # Run tests with UI interface
```

---

## Usage

### First Time Setup

1. **Login with Spotify**
   - Click "Login with Spotify" on the landing page
   - Authorize Sputilities to access your Spotify account
   - You'll be redirected to the dashboard

2. **Explore Your Music**
   - View your playlists in the Playlist Manager
   - Check out your liked songs collection
   - Explore analytics and insights

3. **Try Smart Features**
   - Use duplicate detection to clean up your playlists
   - Compare playlists to find common tracks
   - Merge playlists intelligently

### Common Use Cases

#### Converting Liked Songs to a Playlist

```
1. Navigate to "Liked Songs" page
2. Click "Convert to Playlist"
3. Choose a name for your new playlist
4. Select tracks to include (or select all)
5. Click "Create Playlist"
```

#### Finding and Removing Duplicates

```
1. Go to "Smart Features" page
2. Select "Duplicate Detection"
3. Choose playlists to scan
4. Review detected duplicates
5. Select duplicates to remove
6. Click "Remove Selected"
```

#### Filtering Tracks by Audio Features

```
1. Open any playlist
2. Click "Advanced Filters"
3. Adjust sliders for tempo, energy, danceability, etc.
4. Apply filters to see matching tracks
5. Save as a new playlist or update existing
```

---

## Project Structure

```
Frontend/sputilities/
├── public/                      # Static assets
│   ├── _redirects              # Netlify redirects for SPA routing
│   └── robots.txt              # SEO robots configuration
│
├── src/
│   ├── App/                    # Legacy app components
│   │   └── assets/             # Images, fonts, and static files
│   │       ├── sputilities.svg # App logo
│   │       └── fonts/          # Custom Spotify fonts
│   │
│   ├── components/             # Reusable UI components
│   │   ├── Alert.jsx           # Alert/notification component
│   │   ├── Badge.jsx           # Badge component
│   │   ├── Button.jsx          # Custom button component
│   │   ├── Card.jsx            # Card container component
│   │   ├── ErrorBoundary.jsx   # Error boundary wrapper
│   │   ├── Header.jsx          # Application header
│   │   ├── Input.jsx           # Form input component
│   │   ├── Layout.jsx          # Main layout wrapper
│   │   ├── LoadingSpinner.jsx  # Loading indicator
│   │   ├── Modal.jsx           # Modal dialog component
│   │   ├── PlaylistCard.jsx    # Playlist display card
│   │   ├── Progress.jsx        # Progress bar component
│   │   ├── ProtectedRoute.jsx  # Route authentication wrapper
│   │   ├── Sidebar.jsx         # Navigation sidebar
│   │   ├── Skeleton.jsx        # Loading skeleton component
│   │   └── Tooltip.jsx         # Tooltip component
│   │
│   ├── pages/                  # Page components (routes)
│   │   ├── AuthCallback.jsx    # OAuth callback handler
│   │   ├── Dashboard.jsx       # Main dashboard page
│   │   ├── LandingPage.jsx     # Marketing landing page
│   │   ├── LikedSongs.jsx      # Liked songs management
│   │   ├── Login.jsx           # Login page
│   │   ├── NotFound.jsx        # 404 error page
│   │   ├── Operations.jsx      # Background operations tracking
│   │   ├── PlaylistManager.jsx # Playlist CRUD operations
│   │   ├── Settings.jsx        # User settings page
│   │   └── SmartFeatures.jsx   # Advanced features page
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── useApiQuery.js      # Enhanced React Query hooks
│   │   ├── useAuth.js          # Authentication hook
│   │   ├── useKeyboardNavigation.js # Keyboard navigation
│   │   └── useResponsive.js    # Responsive design hook
│   │
│   ├── services/               # API services
│   │   └── api.js              # Axios API client with interceptors
│   │
│   ├── store/                  # State management (Zustand)
│   │   ├── appStore.js         # Global application state
│   │   └── authStore.js        # Authentication state
│   │
│   ├── utils/                  # Utility functions
│   │   ├── dataManager.js      # Data caching and synchronization
│   │   ├── lazyLoading.jsx     # Lazy loading utilities
│   │   ├── performance.js      # Performance monitoring
│   │   └── testUtils.js        # Testing utilities
│   │
│   ├── Router/                 # Routing configuration
│   │   └── Content.jsx         # Main router with lazy loading
│   │
│   ├── index.css               # Global styles and Tailwind imports
│   └── main.jsx                # Application entry point
│
├── .env.example                # Environment variables template
├── .env.production.example     # Production environment template
├── .gitignore                  # Git ignore rules
├── index.html                  # HTML template with SEO meta tags
├── netlify.toml                # Netlify deployment configuration
├── package.json                # Dependencies and scripts
├── postcss.config.js           # PostCSS configuration
├── README.md                   # This file
├── tailwind.config.js          # Tailwind CSS configuration
├── vercel.json                 # Vercel deployment configuration
└── vite.config.js              # Vite build configuration
```

---

## Deployment

### Production Build

Build the application for production:

```bash
# Create optimized production build
npm run build

# Preview the production build locally
npm run preview
```

The build output will be in the `dist/` folder, ready for deployment.

### Build Statistics

```
Total Bundle Size: ~515 KB (gzipped: ~166 KB)
├── Vendor chunk: 141 KB (gzipped: 45.5 KB)
├── UI chunk: 121 KB (gzipped: 38.5 KB)
├── Main app: 108 KB (gzipped: 36.8 KB)
└── Other chunks: ~145 KB (gzipped: ~45 KB)

Build Time: ~4.5 seconds
Modules: 1,956
```

### Deployment Platforms

#### Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to production
vercel --prod
```

**Environment Variables in Vercel:**
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add: `VITE_API_URL` = `https://your-api-domain.com/api/v1`

#### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy to production
netlify deploy --prod
```

**Environment Variables in Netlify:**
1. Go to Site settings → Build & deploy → Environment
2. Add: `VITE_API_URL` = `https://your-api-domain.com/api/v1`

#### Manual Deployment

1. Build the application: `npm run build`
2. Upload the `dist/` folder to your hosting provider
3. Configure environment variables on your hosting platform
4. Ensure your server is configured for SPA routing (all routes → index.html)

### Deployment Checklist

- [ ] Backend API is deployed and accessible
- [ ] `VITE_API_URL` environment variable is set correctly
- [ ] CORS is configured on the backend for your frontend domain
- [ ] SSL certificate is active (HTTPS)
- [ ] Environment variables are set in hosting platform
- [ ] Build completes without errors
- [ ] All routes work correctly (SPA routing configured)
- [ ] Assets load properly
- [ ] Test login flow end-to-end

---

## Roadmap

### Completed Features ✅

- [x] Spotify OAuth authentication
- [x] Dashboard with user statistics
- [x] Playlist CRUD operations
- [x] Liked songs management
- [x] Duplicate detection
- [x] Playlist comparison
- [x] Smart playlist merging
- [x] Advanced filtering by audio features
- [x] Real-time operation tracking
- [x] Responsive design
- [x] Error handling and retry logic
- [x] Performance optimizations

### Upcoming Features 🚀

- [ ] **Collaborative Playlists**: Manage collaborative playlists with friends
- [ ] **Playlist Templates**: Create and share playlist templates
- [ ] **Music Discovery**: AI-powered music recommendations
- [ ] **Listening History**: Track and analyze your listening history
- [ ] **Social Features**: Share playlists and follow other users
- [ ] **Mobile App**: Native iOS and Android applications
- [ ] **Offline Mode**: Download playlists for offline access
- [ ] **Advanced Analytics**: More detailed insights and visualizations
- [ ] **Playlist Scheduling**: Auto-update playlists based on schedules
- [ ] **Integration with Other Services**: Apple Music, YouTube Music, etc.

### Future Enhancements 💡

- [ ] Dark/Light theme toggle
- [ ] Customizable dashboard widgets
- [ ] Keyboard shortcuts
- [ ] Playlist versioning and history
- [ ] Export playlists to various formats (CSV, JSON, M3U)
- [ ] Bulk playlist operations
- [ ] Advanced search with regex support
- [ ] Playlist recommendations based on mood/activity

See the [open issues](https://github.com/yourusername/sputilities/issues) for a full list of proposed features and known issues.

---

## Contributing

We welcome contributions from the community! Here's how you can help:

> Before you start, please review the following project documents:
>
> - Contributing Guide: [CONTRIBUTING.md](CONTRIBUTING.md)
> - Code of Conduct: [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
> - Security Policy: [SECURITY.md](SECURITY.md)



### How to Contribute

1. **Fork the Repository**
   ```bash
   git clone https://github.com/yourusername/sputilities.git
   cd sputilities
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make Your Changes**
   - Write clean, readable code
   - Follow the existing code style
   - Add comments where necessary
   - Update documentation if needed

4. **Test Your Changes**
   ```bash
   npm run lint        # Check code quality
   npm run test        # Run tests
   npm run build       # Ensure build works
   ```

5. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "Add amazing feature"
   ```

6. **Push to Your Fork**
   ```bash
   git push origin feature/amazing-feature
   ```

7. **Open a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Describe your changes in detail
   - Link any related issues

### Code Guidelines

- **Code Style**: Follow the ESLint configuration
- **Components**: Use functional components with hooks
- **State Management**: Use Zustand for global state, React Query for server state
- **Styling**: Use Tailwind CSS utility classes
- **Accessibility**: Include ARIA labels and keyboard navigation
- **Error Handling**: Always include error boundaries and loading states
- **Testing**: Write tests for new features and bug fixes
- **Documentation**: Update README and add JSDoc comments

### Reporting Bugs

Found a bug? Please [open an issue](https://github.com/yourusername/sputilities/issues/new?labels=bug) with:
- Clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Browser and OS information

### Requesting Features

Have an idea? [Open a feature request](https://github.com/yourusername/sputilities/issues/new?labels=enhancement) with:
- Clear description of the feature
- Use cases and benefits
- Possible implementation approach
- Mockups or examples (if applicable)

---

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Sputilities

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## Contact

**Project Maintainer**: Your Name

- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com
- Twitter: [@yourhandle](https://twitter.com/yourhandle)

**Project Link**: [https://github.com/yourusername/sputilities](https://github.com/yourusername/sputilities)

**Live Demo**: [https://sputilities.vercel.app](https://sputilities.vercel.app)

---

## Acknowledgments

Special thanks to:

- **[Spotify](https://www.spotify.com/)** - For the amazing music streaming platform and API
- **[Spotify Web API](https://developer.spotify.com/documentation/web-api)** - For comprehensive API documentation
- **[React Team](https://react.dev/)** - For the incredible React library
- **[Vite Team](https://vitejs.dev/)** - For the blazing-fast build tool
- **[Tailwind CSS](https://tailwindcss.com/)** - For the utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - For beautiful animations
- **[Radix UI](https://www.radix-ui.com/)** - For accessible component primitives
- **[Lucide Icons](https://lucide.dev/)** - For the beautiful icon set
- **[TanStack Query](https://tanstack.com/query)** - For powerful data synchronization
- **[Zustand](https://zustand-demo.pmnd.rs/)** - For simple state management

### Inspiration

This project was inspired by the need for better playlist management tools and the limitations of Spotify's native interface. Special thanks to the open-source community for providing excellent tools and libraries that made this project possible.

### Resources

- [Spotify for Developers](https://developer.spotify.com/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [MDN Web Docs](https://developer.mozilla.org/)

---

<div align="center">
  <p>Made with ❤️ and ☕ by the Sputilities Team</p>
  <p>
    <a href="#about-the-project">Back to Top ↑</a>
  </p>
</div>

---

<!-- MARKDOWN LINKS & IMAGES -->
[last-commit-shield]: https://img.shields.io/github/last-commit/puneeth072003/sputilities.V1?style=for-the-badge
[last-commit-url]: https://github.com/puneeth072003/sputilities.V1/commits/main
[issues-shield]: https://img.shields.io/github/issues/puneeth072003/sputilities.V1?style=for-the-badge
[issues-url]: https://github.com/puneeth072003/sputilities.V1/issues
[license-shield]: https://img.shields.io/github/license/puneeth072003/sputilities.V1?style=for-the-badge
[license-url]: https://github.com/puneeth072003/sputilities.V1/blob/main/LICENSE
[top-language-shield]: https://img.shields.io/github/languages/top/puneeth072003/sputilities.V1?style=for-the-badge
[top-language-url]: https://github.com/puneeth072003/sputilities.V1
