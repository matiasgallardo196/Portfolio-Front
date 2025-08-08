# Authentication System

This project now includes a complete authentication system with the following features:

## Implemented Routes

### 1. `/login`

- **Functionality**: Sign in page
- **Fields**: Email and password
- **Validations**: Required fields
- **API**: POST to `/auth/login`
- **Redirect**: To `/dashboard` on success
- **Features**:
  - Authentication error handling
  - JWT token storage in localStorage
  - Automatic redirect if already authenticated
  - Link to registration

### 2. `/register`

- **Functionality**: User registration page
- **Fields**: Email, password and confirm password
- **Validations**:
  - Passwords must match
  - Minimum password length of 6 characters
  - Valid email
- **API**: POST to `/auth/register`
- **Redirect**: To `/login` on success
- **Features**:
  - Real-time validation
  - Registration error handling
  - Link to login

### 3. `/dashboard`

- **Functionality**: Protected control panel
- **Access**: Authenticated users only
- **Protection**: Automatic redirect to `/login` if no token
- **Features**:
  - User information
  - Sign out button
  - Session statistics
  - Link back to portfolio

## Created Components

### AuthContext (`context/AuthContext.tsx`)

- Global authentication state management
- Login, registration and logout functions
- Persistent token storage
- Centralized error handling

### ProtectedRoute (`components/ProtectedRoute.tsx`)

- HOC component to protect routes
- Automatic token verification
- Automatic redirect to login
- Loading state during verification

## Project Integration

### Updated Navbar

- Dynamic links based on authentication status
- Sign out button when authenticated
- Login/register links when not authenticated
- Mobile and desktop support

### App Provider

- AuthProvider integrated in the component tree
- Keeps authentication context available globally

## Aesthetics and UX

### Consistent Design

- Uses the same CSS classes as the project
- Gradients and colors from the existing theme
- Reused card and button components
- Complete dark/light mode support

### User Experience

- Loading states during operations
- Clear and contextual error messages
- Real-time validations
- Smooth transitions between states
- Complete responsive design

## Backend Configuration

For the system to work correctly, the backend must implement:

### Endpoint `/auth/login`

```json
POST /auth/login
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123"
}

Response (200):
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "usuario@ejemplo.com",
    "name": "Nombre Usuario"
  }
}

Response (401):
{
  "message": "Invalid credentials"
}
```

### Endpoint `/auth/register`

```json
POST /auth/register
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123"
}

Response (201):
{
  "message": "User registered successfully"
}

Response (400):
{
  "message": "Email already registered"
}
```

## Security

- JWT tokens stored in localStorage
- **Frontend token validation:**
  - Automatic expiration check on app load
  - Token expiry monitoring with alerts
  - Automatic cleanup of expired tokens
  - Protection against direct access to protected routes
- **Backend token validation:**
  - Signature verification
  - Expiration validation
  - User existence verification
  - Optional endpoint for token validation (`/auth/validate`)

### Token Validation Strategy

#### Frontend Validation (Client-side)

- **Expiration Check**: Decodes JWT payload to check `exp` field
- **Automatic Cleanup**: Removes expired tokens from localStorage
- **User Experience**: Shows alerts when token is expiring soon
- **Performance**: Fast validation without server requests

#### Backend Validation (Server-side)

- **Signature Verification**: Ensures token hasn't been tampered with
- **Database Check**: Verifies user still exists and is active
- **Security**: Ultimate authority on token validity
- **Refresh Logic**: Can issue new tokens when needed

## Future Improvements

- **Enhanced Token Management:**
  - Refresh token implementation
  - Automatic token refresh before expiry
  - Token blacklisting for logout
- **Security Enhancements:**
  - CSRF protection
  - Rate limiting for auth endpoints
  - Two-factor authentication
- **User Experience:**
  - Password recovery
  - Email verification
  - Editable user profile
  - Session history
  - Remember me functionality
