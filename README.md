# SCM INTERIORS - Premium Interior Design Website

A modern, responsive website for SCM Interiors - a premium interior design and renovation company. Built with React, TypeScript, and Tailwind CSS with a beautiful dark theme and smooth animations.

🔗 **Live Demo**: [https://scm-interiors.vercel.app](https://scm-interiors.vercel.app)

![SCM Interiors Preview](https://via.placeholder.com/800x400/1a1a2e/C9A962?text=SCM+INTERIORS+-+Premium+Design)

## 🚀 Features

### Modern Landing Page
- Stunning hero section with premium typography and animations
- Showcase of services with elegant card designs
- End-to-end service visualization
- Customer testimonials carousel
- Responsive navigation with mobile menu

### Project Gallery
- Beautiful masonry-style gallery layout
- Category filtering (Living Room, Bedroom, Kitchen, etc.)
- Lightbox image viewing with zoom
- Optimized image loading via Cloudinary CDN

### Customer Reviews
- Dynamic reviews section with star ratings
- User-submitted reviews functionality
- Verified customer testimonials

### Contact & Booking
- Professional contact form with validation
- EmailJS integration for instant notifications
- Location map integration
- Multiple contact methods (Phone, Email, Location)

### Admin Dashboard
- Secure admin authentication
- Contact submissions management
- Reviews moderation and management
- Gallery management with Cloudinary integration
- Settings and configuration panel

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Backend**: Supabase (PostgreSQL database & Auth)
- **Image Storage**: Cloudinary CDN
- **Email Service**: EmailJS
- **State Management**: React Query + React Context
- **Routing**: React Router DOM
- **Icons**: Lucide React

## 📦 Installation

### Prerequisites
- Node.js 18+
- npm or bun

### Setup
1. **Clone the repository**
```bash
git clone https://github.com/Pankaj-jangidd/SCM-INTERIORS.git
cd SCM-INTERIORS/scminteriors
```

2. **Install dependencies**
```bash
npm install
# or
bun install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```
Add your Supabase and EmailJS credentials to `.env`

4. **Run the development server**
```bash
npm run dev
```

5. **Open the application**
```
http://localhost:5173
```

## 📁 Project Structure
```
├── src/
│   ├── app/
│   │   ├── App.tsx            # Main application with routes
│   │   ├── main.tsx           # Application entry point
│   │   └── index.css          # Global styles
│   ├── components/
│   │   ├── Navbar.tsx         # Navigation bar
│   │   ├── Footer.tsx         # Footer section
│   │   ├── ServicesSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── ContactForm.tsx
│   │   ├── admin/             # Admin components
│   │   └── ui/                # shadcn/ui components
│   ├── pages/
│   │   ├── Index.tsx          # Landing page
│   │   ├── About.tsx          # About us page
│   │   ├── Gallery.tsx        # Project gallery
│   │   ├── Reviews.tsx        # Customer reviews
│   │   ├── Contact.tsx        # Contact page
│   │   └── admin/             # Admin pages
│   │       ├── Login.tsx
│   │       ├── Dashboard.tsx
│   │       ├── ReviewsManagement.tsx
│   │       ├── ContactSubmissions.tsx
│   │       ├── GalleryManagement.tsx
│   │       └── Settings.tsx
│   ├── integrations/
│   │   └── supabase/          # Supabase client & queries
│   ├── contexts/              # React contexts
│   ├── hooks/                 # Custom React hooks
│   └── lib/                   # Utility functions
├── public/                    # Static assets
├── tailwind.config.ts         # Tailwind configuration
├── vite.config.ts             # Vite configuration
└── package.json
```

## 🎨 Pages & Features

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero, services, testimonials |
| `/about` | About the company page |
| `/gallery` | Project gallery with category filters |
| `/reviews` | Customer reviews and ratings |
| `/contact` | Contact form and company information |
| `/admin` | Admin login portal |
| `/admin/dashboard` | Admin dashboard overview |
| `/admin/reviews` | Reviews management |
| `/admin/contacts` | Contact submissions |
| `/admin/gallery` | Gallery image management |
| `/admin/settings` | Admin settings |

## 🎯 Services Offered

| Service | Description |
|---------|-------------|
| Residential Design | Complete home interior solutions |
| Commercial Design | Office and retail space design |
| Modular Kitchen | Custom kitchen designs and fittings |
| Furniture Design | Bespoke furniture solutions |
| Renovation | Complete home and office renovation |
| Consultation | Expert interior design consultation |

## 🔧 Configuration

### Environment Variables
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
VITE_EMAILJS_SERVICE_ID=your_emailjs_service
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

### Cloudinary Setup
Images are served via Cloudinary CDN for optimal performance. Configure your cloud name in the integration files.

## 🚀 Deployment

This application is deployed on **Vercel**:

```bash
npm run build
```

Then deploy to Vercel:
```bash
vercel --prod
```

Or connect your GitHub repository to Vercel for automatic deployments.

## 📄 License

MIT License - feel free to use this project for learning and personal purposes.

## 👤 Author

**Pankaj Kumar**

- GitHub: [@Pankaj-jangidd](https://github.com/Pankaj-jangidd)

---

Built with ❤️ using React, TypeScript, and Tailwind CSS
