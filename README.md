# Diaz-Chatbot-chat-

AI-powered chatbot for American Tree Experts using OpenAI GPT-3.5-Turbo

## Features

- 🤖 Intelligent AI responses using OpenAI GPT-3.5-Turbo
- 🌳 Tree service expertise (removal, trimming, emergency services)
- 💬 Natural conversation flow
- 📍 Service areas: Evansville, Newburgh, Boonville, Henderson KY, Warrick County
- 🔒 Secure backend API to protect API keys
- 📱 Responsive design

## Company Information

- **Name:** American Tree Experts
- **Location:** Evansville, IN
- **Phone:** 812-457-3433
- **Email:** Thetreexperts@gmail.com
- **Hours:** 24/7 for emergencies, Mon-Sat 7AM-6PM for regular services

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript (ES6 Modules)
- **Backend:** Node.js, Express
- **AI:** OpenAI GPT-3.5-Turbo API
- **Optional:** Firebase Firestore (for custom Q&A pairs)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/mudassir779/Diaz-Chatbot-chat-.git
cd Diaz-Chatbot-chat-
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file from the example:
```bash
cp .env.example .env
```

4. Add your OpenAI API key in `.env`:
```
OPENAI_API_KEY=your-actual-api-key-here
PORT=3000
```

**Note:** Never commit your `.env` file to version control!

## Running the Application

1. Start the backend server:
```bash
node server.js
```
Server will run on `http://localhost:3000`

2. In a new terminal, start the frontend server:
```bash
python3 -m http.server 8080
```
Frontend will run on `http://localhost:8080`

3. Open your browser and navigate to `http://localhost:8080`

## Project Structure

```
.
├── index.html          # Main chatbot interface
├── admin.html          # Admin panel for Firebase Q&A management
├── script.js           # Frontend JavaScript
├── styles.css          # Styling
├── server.js           # Backend API server
├── package.json        # Node.js dependencies
└── README.md          # This file
```

## API Endpoints

- `POST /api/chat` - Send message to chatbot
- `GET /health` - Health check endpoint

## Services Offered

1. Tree Trimming/Pruning
2. Tree Removal
3. Stump Grinding/Removal
4. Emergency Tree Service (24/7)
5. Tree Health Assessment
6. Tree Planting
7. Storm Damage Cleanup

## Service Areas

- Evansville, IN
- Newburgh, IN
- Boonville, IN
- Henderson, KY
- Warrick County

## License

Private - American Tree Experts

## Contact

For support or inquiries, contact: Thetreexperts@gmail.com
