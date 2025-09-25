# AbiPoet - AI-Powered Poetry Generator

A beautiful web-based AI poetry generator where users input keywords and select a poetry genre or form to generate unique, structured, and beautiful poems.

## 🎯 Features

✅ **Core Features:**
- Keyword input field with validation
- 40+ poetry genres and forms to choose from
- "Surprise Me" button for random genre selection
- Customizable line count per poem
- Generate button with loading animation
- Copy to clipboard functionality
- Download as .txt file
- Genre-specific formatting and styling
- Light and dark mode toggle
- Responsive, mobile-first UI
- Smooth transitions and animations

✅ **New Feature:**
- **Line Count Customization** - Choose exactly how many lines you want in your poem with genre-specific constraints and recommendations

## 🛠 Technology Stack

### **Frontend**
- **React** - JavaScript library for building user interfaces
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Axios** - HTTP client for API requests
- **Lucide React** - Beautiful icons

### **Backend**
- **Django** - Python web framework for routing and serving frontend
- **FastAPI** - Modern Python framework for AI API calls
- **Gemini API** (Google) - For generating poetic content
- **REST Framework** - For building Django APIs

## 🏗 Project Structure

```
abipoet/
├── backend/
│   ├── django_project/
│   │   ├── manage.py
│   │   ├── django_project/
│   │   │   ├── __init__.py
│   │   │   ├── settings.py
│   │   │   ├── urls.py
│   │   │   ├── wsgi.py
│   │   │   └── asgi.py
│   │   └── api/
│   │       ├── __init__.py
│   │       ├── urls.py
│   │       └── views.py
│   ├── fastapi_app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── models.py
│   │   └── gemini_service.py
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── index.css
│   │   └── components/
│   │       ├── PoetryGenerator.js
│   │       └── ThemeToggle.js
│   ├── package.json
│   └── tailwind.config.js
│
└── README.md
```

## 🚀 Setup Instructions

### **Prerequisites**
- Python 3.8+
- Node.js 16+
- Gemini API key from Google AI Studio

### **Backend Setup**

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Create and activate virtual environment:**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies:**
```bash
pip install -r requirements.txt
```

4. **Set up Django:**
```bash
cd django_project
python manage.py migrate
python manage.py runserver  # Runs on http://localhost:8000
```

5. **Set up FastAPI:**
```bash
cd ../fastapi_app
# Set GEMINI_API_KEY environment variable
export GEMINI_API_KEY="your-gemini-api-key-here"
python main.py  # Runs on http://localhost:8001
```

### **Frontend Setup**

1. **Navigate to frontend directory:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start development server:**
```bash
npm start  # Runs on http://localhost:3000
```

### **Environment Variables**

Create a `.env` file in the `backend/fastapi_app` directory:
```env
GEMINI_API_KEY=your-gemini-api-key-here
```

## 📱 Usage

1. **Open the application** at http://localhost:3000
2. **Enter keywords** that describe your desired poem theme
3. **Select a poetry genre/form** from the dropdown menu
4. **Choose the number of lines** (constrained by genre requirements)
5. **Click "Generate Poem"** or use "Surprise Me" for random selection
6. **Copy or download** your generated poem

## 🎭 Supported Poetry Forms

### **Traditional Forms**
- Haiku (3 lines, 5-7-5 syllables)
- Sonnet (14 lines, iambic pentameter)
- Villanelle (19 lines with repeating refrains)
- Ballad, Ode, Elegy, Epic, Ghazal, Tanka, Cinquain

### **Modern Forms**
- Free Verse, Blank Verse, Prose Poetry
- Narrative Poetry, Lyric Poetry, Dramatic Poetry
- Confessional Poetry, Speculative Poetry

### **Structured Forms**
- Acrostic, Cento, Found Poem, Golden Shovel
- Pantoum, Sestina, Terza Rima, Triolet
- Couplet, Quatrain, Blues Poem, Bop

### **Visual & Experimental**
- Concrete/Visual Poetry, Erasure/Blackout
- Abecedarian, Alexandrine, Allegory

## 🌟 Key Features

### **Smart Line Count System**
- **Genre Constraints**: Each form has appropriate line count limits
- **Recommendations**: Smart suggestions for optimal poem length
- **Validation**: Prevents impossible combinations (like 10-line Haiku)
- **Flexibility**: Customizable for forms that allow variation

### **Genre-Specific Formatting**
- **Visual Styling**: Different fonts, alignments, and colors per genre
- **Structural Formatting**: Proper stanza breaks and line arrangements
- **Thematic Elements**: Color schemes that match poetic traditions

### **User Experience**
- **Intuitive Interface**: Clean, modern design with helpful guidance
- **Responsive Design**: Works perfectly on all devices
- **Dark Mode**: Easy on the eyes for extended use
- **Instant Feedback**: Real-time validation and helpful hints

## 🔧 API Endpoints

### **Django Backend**
- `GET /api/health/` - Health check endpoint
- Serves frontend static files

### **FastAPI Backend**
- `GET /` - API status
- `POST /generate-poem` - Generate poem with keywords, genre, and line count

## 📦 Deployment

### **Frontend (Netlify)**
```bash
cd frontend
npm run build
# Deploy the build/ directory to Netlify
```

### **Backend (Render/Heroku)**
1. Deploy Django app to Render/Heroku
2. Deploy FastAPI app to Render/Heroku
3. Set environment variables for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Google Gemini API** for providing the AI poetry generation capabilities
- **React** and **Tailwind CSS** for the beautiful frontend
- **Django** and **FastAPI** for the robust backend architecture

---

**Created with ❤️ for poetry lovers and AI enthusiasts everywhere!**