# 🚢 Shipping Line Management System

A modern, full-stack web application for managing shipping vessels, schedules, and maritime operations built with TypeScript, React, Node.js, and MongoDB.

## ✨ Features

### 🔐 Authentication & Security
- JWT-based authentication with HTTP-only cookies
- Bcrypt password hashing
- Role-based access control (Admin/User)
- Rate limiting and security headers
- CORS protection

### 🚢 Vessel Management
- Complete CRUD operations for vessels
- Advanced search and filtering
- Real-time data with server-side pagination
- Bulk operations for admin users
- Vessel statistics and dashboard

### 🎨 Modern UI/UX
- Responsive design with Tailwind CSS
- Smooth animations with Framer Motion
- Accessibility compliant (WCAG 2.1 AA)
- Dark mode support
- Mobile-first approach

### 📊 Advanced Features
- Debounced search functionality
- Sorting and pagination
- Optimistic UI updates
- Error handling and validation
- Health monitoring endpoints

## 🏗️ Architecture

### Tech Stack

**Frontend:**
- React 18 with TypeScript
- React Router for navigation
- Framer Motion for animations
- Tailwind CSS for styling
- Axios for API calls
- React Hook Form for form handling
- Zod for validation

**Backend:**
- Node.js with Express
- TypeScript for type safety
- MongoDB with Mongoose
- JWT authentication
- Zod validation
- Comprehensive middleware

**DevOps:**
- Docker containers
- GitHub Actions CI/CD
- Health checks
- Structured logging

### Project Structure

```
ShippingLineApp/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   ├── lib/            # Utilities and API client
│   │   ├── routes/         # Route configuration
│   │   └── assets/         # Static assets
│   ├── public/
│   └── package.json
│
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/     # Custom middleware
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── schemas/        # Validation schemas
│   │   ├── scripts/        # Database seeding
│   │   ├── utils/          # Utility functions
│   │   └── tests/          # Test files
│   └── package.json
│
├── docker-compose.yml      # Docker configuration
├── .env.example           # Environment variables template
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm 9+
- MongoDB Atlas account or local MongoDB
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ShippingLineApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration:
   - Generate JWT secret: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`
   - Configure MongoDB URI
   - Set up WhatsApp URL

4. **Start development servers**
   ```bash
   npm run dev
   ```

5. **Seed the database** (optional)
   ```bash
   npm run seed
   ```

### Default Login Credentials

After seeding:
- **Admin**: `admin` / `AdminPass123!`
- **User**: `operator1` / `OperatorPass123!`
- **Manager**: `manager` / `ManagerPass123!`

## 📝 API Documentation

### Authentication Endpoints

- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user
- `POST /api/auth/refresh` - Refresh JWT token
- `GET /api/auth/check` - Check auth status

### Vessel Endpoints

- `GET /api/vessels` - List vessels (with search, filter, pagination)
- `POST /api/vessels` - Create new vessel
- `GET /api/vessels/:id` - Get vessel by ID
- `PUT /api/vessels/:id` - Update vessel
- `DELETE /api/vessels/:id` - Delete vessel
- `GET /api/vessels/stats` - Get dashboard statistics
- `DELETE /api/vessels/bulk` - Bulk delete (Admin only)

### Health Endpoints

- `GET /api/health` - Health check
- `GET /api/health/ready` - Readiness probe
- `GET /api/health/live` - Liveness probe

## 🧪 Testing

### Run Tests

```bash
# Backend tests
npm run test --workspace=server

# Frontend tests  
npm run test --workspace=client

# All tests
npm test
```

### Test Coverage

```bash
npm run test:coverage --workspace=server
```

## 🏭 Production Deployment

### Using Docker

1. **Build and start containers**
   ```bash
   docker-compose up -d
   ```

2. **Scale services**
   ```bash
   docker-compose up -d --scale server=3
   ```

### Manual Deployment

1. **Build applications**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

### Environment Configuration

**Development:**
- Server: `http://localhost:5000`
- Client: `http://localhost:5173`

**Production:**
- Configure reverse proxy (Nginx)
- Set up SSL certificates
- Use environment-specific values
- Enable monitoring and logging

## 🔧 Scripts

### Root Level
- `npm run dev` - Start both client and server in development
- `npm run build` - Build both applications
- `npm test` - Run all tests
- `npm run lint` - Lint all code
- `npm run seed` - Seed database

### Server Specific
- `npm run dev --workspace=server` - Start server only
- `npm run build --workspace=server` - Build server
- `npm run start --workspace=server` - Start production server

### Client Specific
- `npm run dev --workspace=client` - Start client only
- `npm run build --workspace=client` - Build client
- `npm run preview --workspace=client` - Preview build

## 📊 Performance

### Lighthouse Scores (Target)
- Performance: ≥85
- Accessibility: ≥90
- Best Practices: ≥90
- SEO: ≥85

### Features for Performance
- Code splitting and lazy loading
- Image optimization
- Gzip compression
- Efficient database queries
- Caching strategies
- Bundle optimization

## 🔒 Security

### Frontend
- XSS protection
- Input sanitization
- Secure routing
- Environment variable protection

### Backend
- Helmet security headers
- Rate limiting
- CORS configuration
- Input validation
- SQL injection prevention
- Authentication tokens in HTTP-only cookies

## 🌐 Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write tests for new features
- Update documentation
- Follow conventional commits
- Ensure accessibility compliance

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Maritime industry standards
- Open source community
- Modern web development practices
- Security best practices

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact: support@yourshippingco.com
- Documentation: [Link to detailed docs]

---

**Built with ❤️ for the maritime industry**
