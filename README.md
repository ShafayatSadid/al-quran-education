```markdown
# 🕌 Al-Quran Education

An Islamic education platform designed for learning the Quran with proper Tajweed, Tafseer, and Arabic language. This modern web application offers courses, teacher profiles, student reviews, and a full-featured admin panel.

**Live Demo:** [al-quran-education.vercel.app](https://al-quran-education.vercel.app/)  
**Frontend Repository:** [ShafayatSadid/al-quran-education](https://github.com/ShafayatSadid/al-quran-education)  
**Backend Server:** [al-quran-education-server.vercel.app](https://al-quran-education-server.vercel.app/)

---

## ✨ Features

### 🌐 Frontend (Public Pages)
- **Homepage** – Hero banner, Why Choose Us section, Courses, Teachers, Student Testimonials
- **Courses Page** – List of all courses with details and features
- **Teachers Page** – Teacher profiles and listing
- **Free Trial Class** – Form with WhatsApp number validation, integrated with Web3Forms for email notifications
- **Admin Login & Register** – Secure authentication using Better Auth
- **Dark Theme** – Dark mode enabled by default for better user experience
- **Fully Responsive** – Optimized for mobile, tablet, and desktop devices

### 🛠️ Admin Dashboard
- **Dashboard Home** – Quick actions and statistics overview
- **Teacher Management** – Add, edit, view details, and delete teachers
- **Course Management** – Add, edit, view details, and delete courses (with feature lists)
- **Review Management** – Add, edit, and delete student testimonials
- **Image Upload** – Cloudinary integration for teacher images
- **Secure Routes** – All dashboard routes protected by middleware

### 🔐 Security
- Better Auth (JWT) based authentication
- Middleware protection for all `/dashboard/*` routes
- JWT token verification on all protected API endpoints
- Secure password hashing with bcrypt

---

## 🧰 Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16.3.3 |
| **Library** | React 19.2.8 |
| **UI** | HeroUI, Tailwind CSS 4 |
| **Authentication** | Better Auth, MongoDB Adapter |
| **Image Upload** | Cloudinary (next-cloudinary) |
| **Carousel** | Embla Carousel |
| **Form Handling** | React Hook Form (via HeroUI) |
| **Notifications** | React Hot Toast |
| **Icons** | React Icons, Gravity UI Icons |
| **Backend** | Express.js, MongoDB |
| **Database** | MongoDB Atlas |
| **Deployment** | Vercel (Frontend & Backend) |

---

## 🚀 Getting Started (Local Development)

### 1. Clone the Repository
```bash
git clone https://github.com/ShafayatSadid/al-quran-education.git
cd al-quran-education
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env.local` file in the root directory and add the following variables:

```env
# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Backend Server URL
NEXT_PUBLIC_BACKEND_URL="http://localhost:5000"

# Better Auth
BETTER_AUTH_SECRET="your_secret_key"
BETTER_AUTH_URL="http://localhost:3000"

# MongoDB
MONGODB_URI="mongodb+srv://<username>:<password>@cluster.mongodb.net/"

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="your_upload_preset"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# Web3Forms (for free trial form)
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY="your_access_key"

# WhatsApp (for contact button)
NEXT_PUBLIC_WHATSAPP_NUMBER="8801xxxxxxxxx"
```

### 4. Run the Development Server
```bash
npm run dev
```

### 5. Open Your Browser
Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
al-quran-education/
├── app/
│   ├── (auth)/               # Authentication pages (login, register)
│   ├── (public)/             # Public pages (home, courses, teachers, free trial)
│   ├── admin/                # Admin dashboard
│   │   ├── layout.jsx        # Dashboard layout (sidebar + content)
│   │   ├── page.jsx          # Dashboard home
│   │   ├── courses/          # Course management
│   │   ├── reviews/          # Review management
│   │   └── teachers/         # Teacher management
│   ├── api/                  # API routes
│   └── layout.jsx            # Root layout
├── components/
│   ├── admin/                # Admin components (Sidebar)
│   ├── sections/             # Homepage sections
│   └── shared/               # Shared components (NavBar, Footer, DeleteButton)
├── hooks/                    # Custom hooks (useLocalStorage)
├── lib/
│   ├── actions/              # Server actions
│   ├── auth-client.js        # Better Auth client
│   └── auth.js               # Better Auth server configuration
├── public/                   # Static files
└── styles/                   # Global styles
```

---

## 📦 Deployment

### Frontend (Vercel)
```bash
npm run build
# or use Vercel CLI
vercel --prod
```

### Backend Server
The backend server is deployed separately. Check the [al-quran-education-server](https://github.com/ShafayatSadid/al-quran-education-server) repository for details.

### Environment Variables for Production
Make sure to add all environment variables to your Vercel project settings for both frontend and backend deployments.

---

## 👨‍💻 Developer

**Shafayat Hossain**  
[GitHub](https://github.com/ShafayatSadid) | [LinkedIn](https://linkedin.com/in/shafayathossain)

---

## 📄 License

This project is for personal use only. All rights reserved.

---

## 🙏 Acknowledgments

- [Better Auth](https://better-auth.com) – Authentication solution
- [HeroUI](https://heroui.com) – UI component library
- [Cloudinary](https://cloudinary.com) – Image hosting
- [Web3Forms](https://web3forms.com) – Form handling
- [Embla Carousel](https://www.embla-carousel.com) – Smooth carousel
- [Next.js](https://nextjs.org) – React framework
- [Tailwind CSS](https://tailwindcss.com) – Styling

---

## 📬 Contact

For any questions or support, please reach out to the developer.

---

**Made with ❤️ by Shafayat Hossain**
```