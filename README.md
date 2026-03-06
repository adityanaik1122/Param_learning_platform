# Param Learning Hub - AI & ML Learning Platform

A comprehensive, full-stack AI/ML learning platform with interactive code execution, personalized learning paths, and real-time progress tracking.

## 🚀 Features

- **Interactive Learning Path**: Structured curriculum from Python fundamentals to advanced ML
- **Live Code Compiler**: Execute Python/ML code directly in the browser with Docker-based sandboxing
- **AI-Powered Search**: Search and learn AI/ML concepts with definitions and video tutorials
- **Progress Tracking**: Track your learning journey with detailed analytics
- **Premium SaaS UI**: Modern dark theme with ultraviolet accents (Vercel/Linear inspired)
- **Secure Authentication**: JWT-based auth with Google OAuth integration
- **Payment Integration**: Razorpay payment gateway for premium subscriptions
- **Translation Support**: Multi-language support with IndicTrans2 (currently disabled)

## 🏗️ Architecture

### Tech Stack

**Frontend:**
- React 18 + TypeScript
- Vite (build tool)
- TailwindCSS (styling)
- Monaco Editor (code editor)
- React Router (routing)
- Axios (HTTP client)

**Backend:**
- Django 5.0 + Django REST Framework
- JWT Authentication (djangorestframework-simplejwt)
- SQL Server (MSSQL)
- Redis (caching & rate limiting)
- Celery (async tasks)

**Compiler Service:**
- FastAPI
- Docker (code sandboxing)
- Python execution environment

**Infrastructure:**
- Docker & Docker Compose
- SQL Server 2019
- Redis

## 📋 Prerequisites

- Docker & Docker Compose
- Node.js 18+ (for local frontend development)
- Python 3.10+ (for local backend development)
- SQL Server (or use Docker container)

## 🚀 Quick Start

### Using Docker Compose (Recommended)

1. **Clone the repository**
```bash
git clone <repository-url>
cd ML_platform_v01
```

2. **Set up environment variables**

Create `.env` files in respective directories:

**backend/.env:**
```env
DJANGO_SECRET_KEY=your-secret-key-here
DEBUG=True
DB_NAME=neuralpath_db
DB_USER=sa
DB_PASSWORD=YourStrongPassword123!
DB_HOST=sqlserver
DB_PORT=1433

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Razorpay (optional)
RAZORPAY_KEY_ID=your-razorpay-key
RAZORPAY_KEY_SECRET=your-razorpay-secret

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
```

**frontend/.env:**
```env
VITE_API_URL=http://localhost:8000/api
VITE_COMPILER_URL=http://localhost:8001
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

3. **Start all services**
```bash
docker-compose up -d
```

4. **Run database migrations**
```bash
docker-compose exec backend python manage.py migrate
```

5. **Create superuser**
```bash
docker-compose exec backend python manage.py createsuperuser
```

6. **Access the application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- Compiler API: http://localhost:8001
- Admin Panel: http://localhost:8000/admin

### Local Development Setup

#### Backend Setup

1. **Create virtual environment**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. **Install dependencies**
```bash
pip install -r requirements.txt
```

3. **Run migrations**
```bash
python manage.py migrate
```

4. **Start development server**
```bash
python manage.py runserver
```

#### Frontend Setup

1. **Install dependencies**
```bash
cd frontend
npm install
```

2. **Start development server**
```bash
npm run dev
```

#### Compiler Service Setup

1. **Create virtual environment**
```bash
cd compiler
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. **Install dependencies**
```bash
pip install -r requirements.txt
```

3. **Start service**
```bash
uvicorn main:app --reload --port 8001
```

## 📁 Project Structure

```
ML_platform_v01/
├── backend/                 # Django backend
│   ├── core/               # Django project settings
│   ├── users/              # User management
│   ├── syllabus/           # Learning curriculum
│   ├── progress/           # Progress tracking
│   ├── payments/           # Payment integration
│   ├── translation/        # Translation service
│   └── search/             # AI search functionality
├── compiler/               # FastAPI compiler service
│   ├── main.py            # FastAPI app
│   └── sandbox_manager.py # Docker sandbox manager
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── features/      # Feature modules
│   │   ├── pages/         # Page components
│   │   ├── shared/        # Shared utilities
│   │   └── styles/        # Design system
│   └── public/            # Static assets
├── docs/                   # Documentation
├── docker-compose.yml      # Docker orchestration
└── README.md              # This file
```

## 🎨 Design System

The platform uses a Premium SaaS design system with:

- **Rich Black Background Hierarchy**:
  - Tier 1 (Sidebar): #0A0A0A
  - Tier 2 (Background): #111111
  - Tier 3 (Cards/Editor): #1A1A1A

- **Purple Accent System**:
  - Muted Purple (Secondary UI): #8B7BA8
  - Neon Purple (Primary Actions): #A78BFA

- **Typography**:
  - Primary Text: #EDEDED (12.8:1 contrast - AAA)
  - Secondary Text: #A1A1A1 (5.8:1 contrast - AA)
  - Tertiary Text: #6B6B6B (4.5:1 contrast - AA)

All colors meet WCAG 2.1 AA accessibility standards.

See `docs/PREMIUM_SAAS_DESIGN_SPEC.md` for complete design specifications.

## 🔐 Security Features

- JWT-based authentication
- Rate limiting (django-ratelimit)
- CORS protection
- SQL injection prevention (Django ORM)
- XSS protection
- Docker-based code sandboxing
- Secure password hashing (Argon2)
- Login attempt tracking (django-axes)

## 📊 Database Schema

### Core Models

- **User**: Custom user model with profile fields
- **Phase**: Learning curriculum phases
- **Module**: Individual learning modules
- **Lesson**: Lesson content with validation
- **UserProgress**: Track user completion
- **Payment**: Payment transactions
- **Subscription**: User subscriptions

## 🧪 Testing

### Backend Tests
```bash
cd backend
python manage.py test
```

### Frontend Tests
```bash
cd frontend
npm run test
```

## 📦 Deployment

### Production Checklist

1. **Environment Variables**
   - Set `DEBUG=False` in backend
   - Use strong `DJANGO_SECRET_KEY`
   - Configure production database
   - Set up Redis for production
   - Configure CORS allowed origins

2. **Database**
   - Run migrations
   - Create superuser
   - Backup strategy

3. **Static Files**
   - Collect static files: `python manage.py collectstatic`
   - Configure CDN for frontend assets

4. **Security**
   - Enable HTTPS
   - Configure firewall
   - Set up monitoring
   - Regular security updates

5. **Performance**
   - Enable Redis caching
   - Configure CDN
   - Optimize database queries
   - Enable gzip compression

### Docker Production Build

```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Start services
docker-compose -f docker-compose.prod.yml up -d
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is proprietary and confidential.

## 👥 Team

- **Developer**: [Your Name]
- **Project**: Param Learning Hub

## 📞 Support

For support, email support@paramlearninghub.com or open an issue in the repository.

## 🗺️ Roadmap

- [ ] Mobile app (React Native)
- [ ] AI chatbot assistant
- [ ] Live coding sessions
- [ ] Peer code review
- [ ] Certification system
- [ ] Community forum
- [ ] Project showcase
- [ ] Job board integration

## 📚 Documentation

- [Quick Start Guide](docs/QUICK_START.md)
- [Design System](docs/PREMIUM_SAAS_DESIGN_SPEC.md)
- [API Documentation](docs/API_DOCUMENTATION.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Deployment Guide](docs/DEPLOYMENT_GUIDE.md)

## 🙏 Acknowledgments

- React team for the amazing framework
- Django team for the robust backend framework
- Monaco Editor for the code editor
- TailwindCSS for the utility-first CSS framework
- All open-source contributors

---

Made with ❤️ by the Param Learning Hub Team
#   P a r a m _ l e a r n i n g _ p l a t f o r m  
 