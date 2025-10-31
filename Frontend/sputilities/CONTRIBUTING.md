# Contributing to Sputilities

First off, thank you for considering contributing to Sputilities! 🎉

It's people like you that make Sputilities such a great tool for the Spotify community. We welcome contributions from everyone, whether you're fixing a typo, adding a feature, or improving documentation.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Your First Code Contribution](#your-first-code-contribution)
  - [Pull Requests](#pull-requests)
- [Development Setup](#development-setup)
- [Style Guides](#style-guides)
  - [Git Commit Messages](#git-commit-messages)
  - [JavaScript Style Guide](#javascript-style-guide)
  - [CSS/Tailwind Style Guide](#csstailwind-style-guide)
  - [Documentation Style Guide](#documentation-style-guide)
- [Project Structure](#project-structure)
- [Testing Guidelines](#testing-guidelines)
- [Community](#community)

## Code of Conduct

This project and everyone participating in it is governed by the [Sputilities Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [your.email@example.com](mailto:your.email@example.com).

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the [existing issues](https://github.com/yourusername/sputilities/issues) to avoid duplicates.

When you create a bug report, include as many details as possible:

**Use the Bug Report Template:**

```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
 - OS: [e.g. Windows 11, macOS 14]
 - Browser: [e.g. Chrome 120, Firefox 121]
 - Version: [e.g. 1.0.0]

**Additional context**
Add any other context about the problem here.
```

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

**Use the Feature Request Template:**

```markdown
**Is your feature request related to a problem?**
A clear and concise description of what the problem is. Ex. I'm always frustrated when [...]

**Describe the solution you'd like**
A clear and concise description of what you want to happen.

**Describe alternatives you've considered**
A clear and concise description of any alternative solutions or features you've considered.

**Additional context**
Add any other context, mockups, or screenshots about the feature request here.
```

### Your First Code Contribution

Unsure where to begin? You can start by looking through these issues:

- **Good First Issue** - Issues labeled `good-first-issue` are great for newcomers
- **Help Wanted** - Issues labeled `help-wanted` need community assistance

### Pull Requests

1. **Fork the Repository**
   ```bash
   git clone https://github.com/yourusername/sputilities.git
   cd sputilities
   ```

2. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

3. **Make Your Changes**
   - Write clean, readable code
   - Follow the style guides
   - Add tests for new features
   - Update documentation as needed

4. **Test Your Changes**
   ```bash
   npm run lint          # Check code style
   npm run test          # Run tests
   npm run build         # Ensure build works
   ```

5. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

6. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Open a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Fill out the PR template
   - Link related issues

**Pull Request Guidelines:**

- ✅ Follow the code style of the project
- ✅ Write clear, descriptive commit messages
- ✅ Include tests for new features
- ✅ Update documentation for API changes
- ✅ Keep PRs focused on a single feature/fix
- ✅ Ensure all tests pass
- ✅ Add screenshots for UI changes
- ✅ Request review from maintainers

## Development Setup

### Prerequisites

- Node.js 18+ and npm 9+
- Git
- A Spotify Developer account

### Setup Steps

1. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/sputilities.git
   cd sputilities
   ```

2. **Install dependencies**
   ```bash
   cd Frontend/sputilities
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Start the backend** (in a separate terminal)
   ```bash
   cd ../../Backend
   npm install
   npm start
   ```

### Development Workflow

1. **Create a feature branch** from `main`
2. **Make your changes** with frequent commits
3. **Write/update tests** for your changes
4. **Run tests** to ensure nothing breaks
5. **Update documentation** if needed
6. **Push to your fork** and create a PR

## Style Guides

### Git Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

**Format:**
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Code style changes (formatting, missing semi-colons, etc.)
- `refactor`: Code refactoring without changing functionality
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks, dependency updates

**Examples:**
```bash
feat(playlist): add bulk delete functionality
fix(auth): resolve token refresh issue
docs(readme): update installation instructions
style(components): format code with prettier
refactor(api): simplify error handling logic
perf(dashboard): optimize playlist loading
test(smart-features): add duplicate detection tests
chore(deps): update react to v18.3.0
```

### JavaScript Style Guide

We use ESLint with the following principles:

**General Rules:**
- Use functional components with hooks
- Prefer `const` over `let`, avoid `var`
- Use arrow functions for callbacks
- Use template literals for string interpolation
- Use destructuring for objects and arrays
- Use async/await over promises when possible

**Example:**
```javascript
// ✅ Good
const PlaylistCard = ({ playlist, onDelete }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deletePlaylist(playlist.id);
      onDelete(playlist.id);
    } catch (error) {
      console.error('Failed to delete playlist:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <h3>{playlist.name}</h3>
      <Button onClick={handleDelete} disabled={isLoading}>
        Delete
      </Button>
    </Card>
  );
};

// ❌ Bad
function PlaylistCard(props) {
  var loading = false;
  
  function handleDelete() {
    loading = true;
    deletePlaylist(props.playlist.id).then(function() {
      props.onDelete(props.playlist.id);
      loading = false;
    });
  }

  return (
    <div>
      <h3>{props.playlist.name}</h3>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
```

**Component Structure:**
```javascript
// 1. Imports
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/Button';

// 2. Component definition
export const MyComponent = ({ prop1, prop2 }) => {
  // 3. Hooks
  const [state, setState] = useState(null);
  const { data, isLoading } = useQuery(...);
  
  // 4. Effects
  useEffect(() => {
    // Effect logic
  }, [dependencies]);
  
  // 5. Event handlers
  const handleClick = () => {
    // Handler logic
  };
  
  // 6. Render helpers
  const renderContent = () => {
    // Render logic
  };
  
  // 7. Return JSX
  return (
    <div>
      {/* JSX */}
    </div>
  );
};
```

### CSS/Tailwind Style Guide

- Use Tailwind utility classes
- Group related utilities together
- Use custom classes for repeated patterns
- Follow mobile-first responsive design

**Example:**
```jsx
// ✅ Good - Organized utilities
<div className="
  flex items-center justify-between gap-4
  p-4 rounded-lg
  bg-gray-800 hover:bg-gray-700
  transition-colors duration-200
">
  <h3 className="text-lg font-semibold text-white">Title</h3>
  <Button variant="primary">Action</Button>
</div>

// ❌ Bad - Unorganized
<div className="bg-gray-800 flex p-4 rounded-lg items-center hover:bg-gray-700 gap-4 justify-between transition-colors duration-200">
  <h3 className="font-semibold text-white text-lg">Title</h3>
  <Button variant="primary">Action</Button>
</div>
```

### Documentation Style Guide

- Use clear, concise language
- Include code examples
- Add screenshots for UI features
- Keep documentation up-to-date with code changes
- Use proper markdown formatting

## Project Structure

```
Frontend/sputilities/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components (routes)
│   ├── hooks/          # Custom React hooks
│   ├── services/       # API services
│   ├── store/          # State management
│   ├── utils/          # Utility functions
│   └── Router/         # Routing configuration
```

**Where to add your code:**
- **New UI component** → `src/components/`
- **New page** → `src/pages/`
- **Custom hook** → `src/hooks/`
- **API integration** → `src/services/`
- **State management** → `src/store/`
- **Utility function** → `src/utils/`

## Testing Guidelines

### Writing Tests

- Write tests for all new features
- Test edge cases and error scenarios
- Use descriptive test names
- Keep tests focused and isolated

**Example:**
```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import { PlaylistCard } from './PlaylistCard';

describe('PlaylistCard', () => {
  it('renders playlist name', () => {
    const playlist = { id: '1', name: 'My Playlist' };
    render(<PlaylistCard playlist={playlist} />);
    expect(screen.getByText('My Playlist')).toBeInTheDocument();
  });

  it('calls onDelete when delete button is clicked', () => {
    const playlist = { id: '1', name: 'My Playlist' };
    const onDelete = jest.fn();
    render(<PlaylistCard playlist={playlist} onDelete={onDelete} />);
    
    fireEvent.click(screen.getByText('Delete'));
    expect(onDelete).toHaveBeenCalledWith('1');
  });
});
```

### Running Tests

```bash
npm run test          # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:ui       # Run tests with UI
```

## Community

- **GitHub Discussions**: Ask questions and share ideas
- **Issues**: Report bugs and request features
- **Pull Requests**: Contribute code
- **Discord**: Join our community (coming soon)

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project website (coming soon)

## Questions?

Feel free to:
- Open a [GitHub Discussion](https://github.com/yourusername/sputilities/discussions)
- Create an [Issue](https://github.com/yourusername/sputilities/issues)
- Email us at [your.email@example.com](mailto:your.email@example.com)

---

Thank you for contributing to Sputilities! 🎵✨

