from google import genai
from PIL import Image
import io
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get API key from environment variable
gemini_api_key = os.getenv('GEMINI_API_KEY')
if not gemini_api_key:
    raise ValueError("GEMINI_API_KEY environment variable is required")

gemini_client = genai.Client(api_key=gemini_api_key)

def get_llm_response(image_data: bytes) -> str:
    try:
        # Convert bytes to PIL Image
        image = Image.open(io.BytesIO(image_data))
        
        # Create a prompt for short, funny analysis
        prompt = """Look at this image and roast it with humor in 2-3 sentences max. Be witty, sarcastic, or funny. Keep it short and punchy!"""
        
        # Generate response using Gemini
        response = gemini_client.models.generate_content(
            model='gemini-2.0-flash-exp',
            contents=[
                {
                    'parts': [
                        {'text': prompt},
                        {'inline_data': {
                            'mime_type': 'image/jpeg',
                            'data': image_data
                        }}
                    ]
                }
            ]
        )
        
        return response.text
        
    except Exception as e:
        return f"Error analyzing image: {str(e)}"