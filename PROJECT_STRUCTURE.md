# CV Pro - Project Structure

## 📁 Complete Folder Structure

```
cv-pro/
├── 📁 public/                          # Static assets
│   ├── cv-icon.svg                     # Favicon
│   ├── profile.jpg                     # User profile image (add your own)
│   ├── cv.pdf                          # Sample CV file (add your own)
│   └── .gitkeep                        # Ensures folder is tracked
│
├── 📁 src/                             # Source code
│   ├── 📁 components/                  # React components
│   │   ├── About.tsx                   # About section component
│   │   ├── ATSOptimization.tsx         # ATS optimization guide
│   │   ├── Contact.tsx                 # Contact form component
│   │   ├── CVAnalysis.tsx              # CV analysis tool
│   │   ├── CVBuilder.tsx               # Interactive CV builder
│   │   ├── CVTemplate.tsx              # CV templates showcase
│   │   ├── CVTips.tsx                  # CV writing tips
│   │   ├── FeaturedBooks.tsx           # Featured books (legacy)
│   │   ├── Footer.tsx                  # Footer component
│   │   ├── Hero.tsx                    # Hero/landing section
│   │   ├── IndustryGuides.tsx          # Industry-specific guides
│   │   ├── Navigation.tsx              # Navigation bar
│   │   ├── Newsletter.tsx              # Newsletter signup (legacy)
│   │   ├── Projects.tsx                # Projects showcase (legacy)
│   │   ├── Skills.tsx                  # Skills display (legacy)
│   │   ├── Testimonials.tsx            # Customer testimonials (legacy)
│   │   └── WorldsComparison.tsx        # Worlds comparison (legacy)
│   │
│   ├── 📁 contexts/                    # React contexts
│   │   └── ThemeContext.tsx            # Theme management context
│   │
│   ├── 📁 hooks/                       # Custom React hooks
│   │   └── useScrollspy.ts             # Scroll spy functionality
│   │
│   ├── 📁 lib/                         # Utilities and configuration
│   │   └── portfolio-config.json       # Portfolio configuration data
│   │
│   ├── App.tsx                         # Main application component
│   ├── main.tsx                        # Application entry point
│   ├── index.css                       # Global styles (Tailwind imports)
│   └── vite-env.d.ts                   # Vite type definitions
│
├── 📁 node_modules/                    # Dependencies (auto-generated)
│
├── .env                                # Environment variables
├── .gitignore                          # Git ignore rules
├── eslint.config.js                   # ESLint configuration
├── index.html                          # HTML template
├── package.json                        # Project dependencies and scripts
├── package-lock.json                  # Dependency lock file
├── postcss.config.js                  # PostCSS configuration
├── tailwind.config.js                 # Tailwind CSS configuration
├── tsconfig.json                       # TypeScript configuration
├── tsconfig.app.json                  # App-specific TypeScript config
├── tsconfig.node.json                 # Node-specific TypeScript config
├── vite.config.ts                     # Vite build configuration
└── README.md                          # Project documentation
```

## 🎯 Key Folders Explained

### **📁 src/components/**
Contains all React components organized by functionality:

#### **Core CV Components:**
- `CVAnalysis.tsx` - CV upload and analysis tool
- `CVBuilder.tsx` - Step-by-step CV builder
- `CVTemplate.tsx` - Professional CV templates
- `CVTips.tsx` - Expert CV writing advice
- `ATSOptimization.tsx` - ATS optimization guide
- `IndustryGuides.tsx` - Industry-specific CV advice

#### **Layout Components:**
- `Navigation.tsx` - Main navigation bar
- `Hero.tsx` - Landing page hero section
- `Footer.tsx` - Site footer
- `Contact.tsx` - Contact form and information

#### **Legacy Components:**
- `About.tsx`, `Projects.tsx`, `Skills.tsx` - Portfolio components
- `FeaturedBooks.tsx`, `WorldsComparison.tsx` - Bookstore components
- `Newsletter.tsx`, `Testimonials.tsx` - Marketing components

### **📁 src/lib/**
- `portfolio-config.json` - Configuration data for portfolio sections

### **📁 src/hooks/**
- `useScrollspy.ts` - Custom hook for navigation scroll tracking

### **📁 src/contexts/**
- `ThemeContext.tsx` - Dark/light theme management

### **📁 public/**
- Static assets that don't need processing
- Add your own `profile.jpg` and `cv.pdf` here

## 🚀 Getting Started

### **1. Install Dependencies**
```bash
npm install
```

### **2. Start Development Server**
```bash
npm run dev
```

### **3. Build for Production**
```bash
npm run build
```

### **4. Preview Production Build**
```bash
npm run preview
```

## 🔧 Configuration Files

### **package.json**
- Project metadata and dependencies
- Scripts for development and building

### **tailwind.config.js**
- Tailwind CSS configuration
- Custom colors and fonts (Mistica Blue)

### **vite.config.ts**
- Vite build tool configuration
- React plugin setup

### **tsconfig.json**
- TypeScript compiler configuration
- Type checking rules

## 📝 Key Features by Component

### **CVAnalysis.tsx**
- File upload functionality
- CV scoring and analysis
- Verification button with states
- Strengths/weaknesses feedback

### **CVBuilder.tsx**
- Multi-step form wizard
- Real-time validation
- Dynamic button states
- Form completion tracking

### **CVTemplate.tsx**
- Template gallery
- Category filtering
- Preview modals
- Download functionality

### **ATSOptimization.tsx**
- ATS education content
- Dos and don'ts lists
- Keyword examples
- Checklist functionality

### **Contact.tsx**
- Contact form with validation
- Service type selection
- Submit status tracking
- Business information display

## 🎨 Styling

- **Framework:** Tailwind CSS
- **Font:** Mistica Blue (primary), Inter (fallback)
- **Icons:** Lucide React
- **Animations:** Framer Motion

## 📱 Responsive Design

All components are built with mobile-first responsive design:
- Mobile: Base styles
- Tablet: `md:` prefix
- Desktop: `lg:` prefix
- Large screens: `xl:` prefix

## 🔄 State Management

- **Local State:** React useState hooks
- **Form State:** React Hook Form with Zod validation
- **Theme State:** React Context API
- **Notifications:** React Hot Toast

## 🚀 Deployment

The project is configured for easy deployment to:
- **Netlify** (recommended)
- **Vercel**
- **GitHub Pages**

Build command: `npm run build`
Output directory: `dist`