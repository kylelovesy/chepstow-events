# 🐆 Chepstow Events - Summer Holiday Planner

A beautiful, responsive React application for managing summer holiday events within 75 miles of Chepstow, Monmouthshire. Built with React, Tailwind CSS, and Supabase for a seamless collaborative experience.

## ✨ Features

- **🔐 User Authentication** - Secure sign-up and sign-in with Supabase Auth
- **📅 Event Management** - Add, edit, delete, and view events with rich details
- **🔍 Smart Search & Filtering** - Search by name, location, or description
- **📊 Multiple Sorting Options** - Sort by date, distance, cost, or rating
- **📱 Responsive Design** - Works perfectly on desktop and mobile devices
- **🎨 Beautiful UI** - Fun cheetah-themed design with smooth animations
- **📍 Distance Calculation** - Automatic distance calculation from Chepstow
- **⭐ Rating System** - Rate events with a 5-star system
- **💰 Cost Tracking** - Track both text descriptions and numeric costs
- **👨‍👩‍👧‍👦 Family-Friendly** - Special fields for child-friendly features
- **♿ Accessibility** - Carer and disability information support

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (or npm/yarn)
- Supabase account (free tier is sufficient)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd chepstow-events
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Update `.env.local` with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

4. **Set up Supabase database**
   - Follow the detailed instructions in `supabase-setup-guide.md`
   - Run the SQL scripts provided to create tables and policies

5. **Start the development server**
   ```bash
   pnpm run dev
   ```

6. **Open your browser**
   - Navigate to `http://localhost:5173`
   - Create an account and start adding events!

## 📁 Project Structure

```
chepstow-events/
├── public/                 # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── AuthForm.jsx  # Authentication form
│   │   ├── EventCard.jsx # Event display card
│   │   ├── EventForm.jsx # Add/edit event form
│   │   ├── EventList.jsx # Event listing with filters
│   │   └── Header.jsx    # App header with user menu
│   ├── hooks/            # Custom React hooks
│   │   ├── useAuth.js    # Authentication hook
│   │   └── useEvents.js  # Event management hook
│   ├── lib/              # Utility libraries
│   │   └── supabase.js   # Supabase client configuration
│   ├── App.jsx           # Main application component
│   ├── App.css           # Custom styles and animations
│   └── main.jsx          # Application entry point
├── supabase-setup-guide.md # Detailed Supabase setup instructions
├── deployment-guide.md     # Deployment instructions
└── README.md              # This file
```

## 🎯 Usage

### Adding Events

1. Click the "Add Event" button
2. Fill in the event details:
   - **Event Name** (required)
   - **Date** (required) and optional end date
   - **Location** (required)
   - **Coordinates** (optional, for distance calculation)
   - **Description**
   - **Cost** (both text description and numeric value)
   - **Rating** (0-5 stars)
   - **Website URL**
   - **Child-friendly features**
   - **Carer/disability information**
   - **Source** (where you found the event)

### Searching and Filtering

- **Search**: Type in the search box to find events by name, location, or description
- **Filter**: Use the dropdown to filter by:
  - All events
  - Free events only
  - Paid events only
  - Nearby events (≤25 miles)
  - Highly rated events (4+ stars)

### Sorting

Click the sort buttons to organize events by:
- **Date** (chronological order)
- **Distance** (closest first)
- **Cost** (lowest first)
- **Rating** (highest first)

## 🛠️ Technical Details

### Built With

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible UI components
- **Lucide React** - Consistent icon library
- **Supabase** - Backend-as-a-Service with PostgreSQL
- **date-fns** - Date manipulation library

### Key Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: ARIA labels and keyboard navigation support
- **Performance**: Optimized with React hooks and efficient re-renders
- **Security**: Row Level Security (RLS) with Supabase
- **Real-time**: Automatic updates when data changes
- **Offline-ready**: Graceful handling of network issues

## 🚀 Deployment

See `deployment-guide.md` for detailed deployment instructions including:
- Vercel deployment (recommended)
- Netlify deployment
- Self-hosted options

## 🤝 Collaboration

This app is designed for small groups (family and friends) to collaborate on event planning:

- **Shared Database**: All users see the same events
- **User Attribution**: Events show who added them
- **Permission System**: Users can edit their own events
- **Free Tier Friendly**: Designed to work within Supabase free limits

## 📊 Data Model

### Events Table

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| event_name | TEXT | Event name (required) |
| event_date | DATE | Start date (required) |
| end_date | DATE | End date (optional) |
| location | TEXT | Event location (required) |
| latitude | DECIMAL | Latitude for distance calculation |
| longitude | DECIMAL | Longitude for distance calculation |
| description | TEXT | Event description |
| cost_text | TEXT | Cost description (e.g., "Adult: £10, Child: £5") |
| cost_numeric | DECIMAL | Numeric cost for sorting |
| carer_disability_info | TEXT | Accessibility information |
| rating | DECIMAL | Rating (0-5) |
| url | TEXT | Event website |
| child_friendly_features | TEXT | Family-friendly information |
| source | TEXT | Where the event was found |
| is_active | BOOLEAN | Soft delete flag |
| created_at | TIMESTAMP | Creation time |
| updated_at | TIMESTAMP | Last update time |
| created_by | UUID | User who created the event |

## 🎨 Customization

### Theming

The app uses a cheetah-inspired theme with orange and yellow colors. To customize:

1. **Colors**: Update the CSS custom properties in `src/App.css`
2. **Animations**: Modify the keyframes and transition classes
3. **Layout**: Adjust the Tailwind classes in components

### Adding Features

The modular structure makes it easy to add new features:

- **New Event Fields**: Update the database schema and forms
- **Additional Filters**: Extend the filtering logic in `EventList.jsx`
- **New Views**: Create new components and add routing
- **Integrations**: Add external APIs in the `lib/` directory

## 🐛 Troubleshooting

### Common Issues

1. **Blank Page**: Check browser console for errors, ensure environment variables are set
2. **Authentication Issues**: Verify Supabase URL and API key
3. **Database Errors**: Ensure RLS policies are correctly configured
4. **Styling Issues**: Clear browser cache and restart dev server

### Getting Help

- Check the browser console for error messages
- Verify Supabase dashboard for database issues
- Ensure all environment variables are correctly set
- Review the setup guides for missing steps

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- **Supabase** for the excellent backend-as-a-service
- **shadcn/ui** for the beautiful component library
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the consistent icon set

---

**Happy event planning! 🐆✨**

