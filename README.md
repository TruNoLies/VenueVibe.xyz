 | **Section**           | **Content**                                                                                                                                                                                                                                                                                                                                                                                                |
|-----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Title**             | # Venue Vibe <br> A performer-focused platform that empowers musicians to discover, rate, and review music venues from a backstage perspective—ensuring you know exactly where to play and where to steer clear.                                                                                                                                                                                           |
| **About the Project** | **Venue Vibe** addresses a common gap in traditional venue reviews by spotlighting what truly matters to artists: <br> • Fair payment practices <br> • Stage and sound quality <br> • Professional staff interactions <br> • Comfortable backstage conditions <br><br> Our primary goal is to provide transparent, real-time insights so musicians can make confident decisions when booking gigs, tours, or one-off performances. |
| **Key Features**      | • **Artist-Centric Reviews:** Focus on backstage experiences, payment reliability, and overall hospitality. <br> • **Complaint Rating (0–5 “Trash Cans”):** Quickly see if a venue has red flags or is artist-friendly. <br> • **Real-Time Updates:** Venue pages automatically refresh ratings and complaint scores as new reviews come in. <br> • **Search & Filter:** Easily find venues by name, location, or rating.          |
| **Vision**            | Our vision is to **revolutionize** the live music ecosystem by placing the power back into the hands of the performers. By creating a **global community** of transparent reviews, **Venue Vibe** aspires to: <br> 1. Uplift reliable, artist-friendly venues. <br> 2. Reduce unpleasant surprise gigs. <br> 3. Foster a more **equitable and rewarding** environment for all musicians.                                                  |
| **Project Structure** | ```plaintext
venuevibe/
 ├─ server/                # Backend (Node.js + Express + MongoDB)
 │   ├─ models/
 │   │   ├─ User.js        # Defines the User schema
 │   │   ├─ Venue.js       # Defines the Venue schema
 │   │   └─ Review.js      # Defines the Review schema
 │   ├─ routes/
 │   │   ├─ auth.js        # Authentication routes
 │   │   ├─ venues.js      # Venue CRUD routes
 │   │   └─ reviews.js     # Review CRUD routes
 │   ├─ index.js           # Server entry point
 │   └─ package.json
 ├─ client/               # Frontend (React)
 │   ├─ public/
 │   ├─ src/
 │   │   ├─ components/    # Reusable UI components
 │   │   ├─ pages/         # Page-level components (Landing, Venue Detail, etc.)
 │   │   ├─ App.js         # Main App component
 │   │   └─ index.js       # React entry point
 │   └─ package.json
 └─ README.md
```                                                                                                                                                                                                                                                                                                                                                                                           |
