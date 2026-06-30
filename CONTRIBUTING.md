# Contributing to VisioConnect

Thank you for your interest in contributing to VisioConnect! This document provides guidelines for contributing to the project.

## 📋 Code of Conduct

By participating in this project, you agree to:

- Be respectful to all contributors
- Accept constructive criticism
- Focus on what's best for the community
- Show empathy towards other community members

## 🚀 How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/AidoTokihisa11/visiconnect/issues)
2. Create a new issue with clear details:
   - Description of the bug
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment (OS, browser, Node.js version)

### Suggesting Features

1. Check if the feature already exists
2. Create an issue describing:
   - The problem it solves
   - Your proposed solution
   - Any alternatives you've considered

### Submitting Changes

#### 1. Fork and Clone

```bash
git clone https://github.com/YOUR-USERNAME/visiconnect.git
cd visiconnect
```

#### 2. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

Branch naming:

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation
- `refactor/` - Code refactoring
- `test/` - Tests

#### 3. Make Your Changes

```bash
# Install dependencies
npm install
cd client && npm install
cd ../server && npm install

# Start development
cd server && npm start  # Terminal 1
cd client && npm start  # Terminal 2
```

#### 4. Commit Your Changes

Use clear and descriptive commit messages:

```bash
git commit -m "Add feature: screen sharing"
git commit -m "Fix: socket connection timeout"
git commit -m "Docs: update installation guide"
```

#### 5. Run Tests

```bash
# Client tests
cd client && npm test

# Server tests
cd server && npm test
```

#### 6. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Create a Pull Request on GitHub with:

- Clear title
- Detailed description
- Reference to related issues
- Screenshots if applicable

## 📝 Code Standards

### JavaScript/React

- Use ES6+ syntax
- Follow ESLint rules
- Use functional components with hooks
- Add PropTypes validation
- Comment complex logic

### Styling

- Use Tailwind CSS
- Follow mobile-first approach
- Ensure accessibility (ARIA labels, contrast)

### Example Component

```jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const MyComponent = ({ title, onAction }) => {
  const [state, setState] = useState(null);

  return (
    <div className="p-4">
      <h2>{title}</h2>
    </div>
  );
};

MyComponent.propTypes = {
  title: PropTypes.string.isRequired,
  onAction: PropTypes.func,
};

export default MyComponent;
```

## 🧪 Testing

Write tests for new features:

```javascript
describe('MyComponent', () => {
  it('should render correctly', () => {
    // Test
  });
});
```

## 📚 Documentation

- Comment complex code
- Update README if needed
- Add JSDoc for public functions

## 🔍 Code Review

Expect:

- Questions about design choices
- Requests for changes
- Improvement suggestions

This is a normal and constructive process!

## 📞 Need Help?

- Open a discussion issue
- Ask questions in your PR

## 🙏 Thank You

Thank you for contributing to VisioConnect!

---

**Happy Coding! 🚀**
