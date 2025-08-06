# Matias Gallardo - Personal Portfolio

A modern and responsive personal portfolio built with **Next.js**, **TypeScript**, and **Tailwind CSS**, designed to be exported as a static site and deployed to AWS S3 + CloudFront.

## 🚀 Features

- **Modern Design**: Clean and professional interface with smooth animations
- **Fully Responsive**: Optimized for all devices
- **Static Export**: Configured to generate static files
- **SEO Optimized**: Proper metadata and semantic structure
- **TypeScript**: Typed code for better robustness
- **Tailwind CSS**: Modern and consistent styling

## 📁 Project Structure

```
Portfolio-Front/
├── components/          # Reusable components
│   ├── Navbar.tsx      # Main navigation
│   ├── Footer.tsx      # Footer
│   └── ProjectCard.tsx # Project card component
├── pages/              # Application pages
│   ├── index.tsx       # Home page
│   ├── about.tsx       # About me
│   ├── projects.tsx    # Projects
│   ├── contact.tsx     # Contact
│   ├── _app.tsx        # App configuration
│   └── _document.tsx   # HTML document
├── public/             # Static files
│   └── avatar.jpg      # Profile image
├── styles/             # Global styles
│   └── globals.css     # CSS with Tailwind
├── next.config.js      # Next.js configuration
├── tailwind.config.js  # Tailwind configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Project dependencies
```

## 🛠️ Technologies Used

- **Next.js 14**: React framework with SSR/SSG
- **TypeScript**: Static typing for JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **React 18**: UI library
- **PostCSS**: CSS processor

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/matiasgallardo196/portfolio-front.git
   cd portfolio-front
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run in development**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🏗️ Build and Export

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

This command runs `next build`, generating an `/out` folder with all static files ready for deployment.

### Verify Export

```bash
# Serve static files locally
npx serve out
```

## 🚀 Deploy to AWS S3 + CloudFront

### 1. Prepare S3 Bucket

```bash
# Create bucket (replace 'your-domain.com')
aws s3 mb s3://your-domain.com

# Configure bucket for static hosting
aws s3 website s3://your-domain.com --index-document index.html --error-document 404.html
```

### 2. Configure Bucket Policy

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-domain.com/*"
    }
  ]
}
```

### 3. Upload Files

```bash
# Build the project
npm run build

# Sync with S3
aws s3 sync out/ s3://your-domain.com --delete
```

### 4. Configure CloudFront (Optional)

- Create CloudFront distribution
- Origin: your S3 bucket
- Configure custom domain
- Configure SSL certificate

## ✏️ Customization

### Personal Information

Edit the following files to customize your information:

- `pages/index.tsx`: Name, title, and main description
- `pages/about.tsx`: Personal story and skills
- `pages/projects.tsx`: Project list
- `pages/contact.tsx`: Contact information
- `components/Footer.tsx`: Social links

### Images

- Replace `/public/avatar.jpg` with your profile photo
- Add project images in `/public/` (project1.jpg, project2.jpg, etc.)

### Colors and Styles

- Modify `tailwind.config.js` to change the color palette
- Edit `styles/globals.css` for custom styles

## 📝 Available Scripts

- `npm run dev`: Development server
- `npm run build`: Build and static export
- `npm run start`: Production server
- `npm run lint`: Code verification

## 🔧 Configuration

### Next.js (`next.config.js`)

```javascript
{
  output: 'export',           // Static export
  images: {
    unoptimized: true,        // For static export
  },
  trailingSlash: true,        // URLs with trailing slash
}
```

### Tailwind CSS (`tailwind.config.js`)

- Custom color configuration
- Optimized content paths
- Theme extensions

## 🌐 Custom Domain

To use a custom domain:

1. **Configure DNS**

   ```
   CNAME: www.your-domain.com → your-distribution.cloudfront.net
   A: your-domain.com → CloudFront IP
   ```

2. **Configure CloudFront**
   - Add alternate domain
   - Configure SSL certificate
   - Configure www → no-www redirect

## 📊 SEO and Metadata

The project includes:

- Dynamic metadata per page
- Open Graph tags
- HTML5 semantic structure
- SEO-friendly URLs
- Automatic sitemap (configure)

## 🤝 Contributions

Contributions are welcome. Please:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is under the MIT License. See the `LICENSE` file for more details.

## 📞 Contact

- **Email**: matiasgallardo196@gmail.com
- **GitHub**: [@matiasgallardo196](https://github.com/matiasgallardo196)
- **LinkedIn**: [Matias Gallardo](https://linkedin.com/in/matiasgallardo-dev)

---

**Note**: This portfolio showcases Matias Gallardo's work as a Full Stack Web Developer with strong Back-End orientation, specializing in NestJS, TypeScript, PostgreSQL, and scalable systems.
