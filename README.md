# Xyra AI - Professional AI Assistant Frontend

A modern, professional AI website frontend built with Next.js, Tailwind CSS, and TypeScript. Features a clean black and white theme with dark mode support, responsive design, and ChatGPT-like interface.

## ✨ Features

- **Professional Design**: Clean black and white theme with 20px border radius
- **Dark/Light Mode**: Automatic theme switching with system preference support
- **Fully Responsive**: Optimized for all device sizes
- **Movable Sidebar**: Can be positioned on left or right, fully closable
- **Advanced Input Bar**: Integrated controls for search mode, deep research, AI model selection, image upload, and prompt enhancement
- **Chat Interface**: Professional conversation layout with user and AI message bubbles
- **Modern UX**: Smooth transitions, consistent spacing, and intuitive controls

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd xyra-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
xyra-ai/
├── app/                    # Next.js 13+ app directory
│   ├── dashboard/         # Dashboard page
│   ├── globals.css        # Global styles and Tailwind
│   ├── layout.tsx         # Root layout with theme provider
│   └── page.tsx           # Login page
├── components/            # Reusable components
│   ├── chat-area.tsx      # Main chat interface
│   ├── input-bar.tsx      # Input bar with all controls
│   ├── sidebar.tsx        # Movable sidebar
│   ├── theme-provider.tsx # Theme context provider
│   └── theme-toggle.tsx   # Theme toggle button
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── README.md              # This file
```

## 🎨 Design System

### Colors
- **Primary**: Black (#000000) / White (#FFFFFF)
- **Gray Scale**: Custom xyra-gray palette with 10 shades
- **Borders**: Consistent border colors for light/dark modes

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: Regular, Medium, Semibold, Bold

### Spacing
- **Border Radius**: 20px (rounded-5)
- **Padding**: Consistent 4px grid system
- **Margins**: Responsive spacing with Tailwind utilities

## 📱 Responsive Features

- **Mobile First**: Optimized for small screens
- **Sidebar**: Collapsible on mobile, full width on desktop
- **Input Bar**: All controls remain accessible on all screen sizes
- **Touch Friendly**: Proper touch targets and spacing

## 🔧 Customization

### Adding New AI Models
Edit `components/input-bar.tsx` and add to the `aiModels` array:

```typescript
const aiModels = [
  // ... existing models
  { id: 'your-model', name: 'Your Model', description: 'Model description' }
]
```

### Theme Colors
Modify `tailwind.config.js` to customize the color palette:

```javascript
colors: {
  'xyra-gray': {
    // Customize your gray scale
  }
}
```

### Component Styling
Use the custom CSS classes defined in `app/globals.css`:
- `.xyra-input` - Input field styling
- `.xyra-button` - Primary button styling
- `.xyra-button-secondary` - Secondary button styling
- `.xyra-card` - Card container styling

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Environment Variables
No environment variables required for the frontend. Backend integration can be added later.

## 📝 Notes

- **Frontend Only**: This is a UI demonstration without backend functionality
- **Authentication**: Login buttons are simulated (no actual auth)
- **AI Responses**: Chat responses are static examples
- **Images**: Upload/select image buttons are UI only

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

For questions or issues, please open an issue in the repository or contact the development team.

---

Built with ❤️ using Next.js, Tailwind CSS, and TypeScript
