# Roast My Pic

An AI-powered image analysis web application that uses Google's Gemini 2.0 to deliver witty, humorous roasts of uploaded images. Built with a modern React frontend and Flask backend API.

## Features

- **Smart Image Analysis**: Powered by Google's Gemini 2.0 Flash model for accurate image understanding
- **Humorous Roasting**: AI generates witty, sarcastic commentary about uploaded images
- **Modern UI**: Clean, responsive React interface with TypeScript and Tailwind CSS
- **Drag & Drop Upload**: Intuitive file upload experience with react-dropzone
- **Real-time Processing**: Instant feedback and loading states during analysis
- **Secure API**: Environment-based configuration with proper CORS handling
- **Interactive API Documentation**: Auto-generated Swagger UI for easy API testing and exploration

## Tech Stack

**Frontend:**
- React 19 with TypeScript
- Tailwind CSS for styling
- Headless UI components
- Heroicons and Lucide React icons
- React Dropzone for file uploads
- Axios for API communication

**Backend:**
- Python Flask API server
- Google GenAI SDK integration
- PIL (Pillow) for image processing
- python-dotenv for environment management
- Flasgger for automated Swagger API documentation

## Getting Started

### Prerequisites
- Python 3.8+
- Node.js 16+
- Google Gemini API Key ([Get one free](https://aistudio.google.com/apikey))

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd gemini-image-analyzer
   ```

2. **Set up the backend**
   ```bash
   # Create virtual environment
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   
   # Install dependencies
   pip install -r requirements.txt
   
   # Set up environment variables
   echo "GEMINI_API_KEY=your_api_key_here" > .env
   ```

3. **Set up the frontend**
   ```bash
   cd frontend
   npm install
   ```

### Running the Application

1. **Start the Flask backend**
   ```bash
   python app.py
   ```
   Backend runs on `http://localhost:3000`
   
   **API Documentation available at:** `http://localhost:3000/apidocs/`

2. **Start the React frontend** (in a new terminal)
   ```bash
   cd frontend
   npm start
   ```
   Frontend runs on `http://localhost:3001`

## Usage

1. Visit the web application at `http://localhost:3001`
2. Drag and drop an image or click to upload
3. Wait for the AI to analyze and roast your image
4. Enjoy the witty commentary!

## API Reference

### Interactive Documentation
Visit `http://localhost:3000/apidocs/` for interactive Swagger UI documentation where you can:
- View all API endpoints with detailed descriptions
- Test endpoints directly from the browser
- Upload images and see live responses
- View request/response schemas and examples

### POST `/api/v1/analyze`

Analyzes an uploaded image and returns a humorous roast.

**Request:**
- Method: POST
- Content-Type: Binary image data or multipart/form-data
- Body: Raw image file (JPEG, PNG, etc.)

**Response:**
```json
{
  "text": "AI-generated roast of the image"
}
```

**Example using curl:**
```bash
curl -X POST -H "Content-Type: application/octet-stream" \
     --data-binary @your-image.jpg \
     http://localhost:3000/api/v1/analyze
```

**Example using Swagger UI:**
1. Go to `http://localhost:3000/apidocs/`
2. Click on the `/api/v1/analyze` endpoint
3. Click "Try it out"
4. Upload your image file
5. Click "Execute" to see the response

## Security Features

- Environment-based API key management
- No hardcoded credentials in source code
- CORS properly configured for cross-origin requests
- Error handling for malformed requests

## Architecture

```
├── app.py              # Flask API server
├── analyze.py          # Gemini AI integration
├── requirements.txt    # Python dependencies
├── .env               # Environment variables (create this)
└── frontend/          # React application
    ├── src/
    │   ├── components/    # React components
    │   │   ├── Header.tsx
    │   │   ├── ImageUpload.tsx
    │   │   └── ResultsDisplay.tsx
    │   └── App.tsx       # Main application
    └── package.json      # Node dependencies
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Google's Gemini AI for powerful image analysis capabilities
- React and Flask communities for excellent documentation
- All the images that bravely volunteered to be roasted
