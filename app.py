from flask import Flask, request, jsonify, render_template
from flasgger import Swagger
from analyze import get_llm_response

app = Flask(__name__, template_folder='templates')
swagger = Swagger(app)

@app.route("/")
def home():
    return render_template('index.html')


@app.route("/api/v1/analyze", methods=['POST', 'OPTIONS'])
def analyze():
    """
    Analyze an image using Gemini AI
    ---
    tags:
      - Image Analysis
    consumes:
      - image/jpeg
      - image/png
      - multipart/form-data
    produces:
      - application/json
    parameters:
      - name: image
        in: formData
        type: file
        required: true
        description: Image file to analyze
    responses:
      200:
        description: Analysis successful
        schema:
          type: object
          properties:
            text:
              type: string
              description: AI analysis result
        examples:
          application/json:
            text: "This image shows a beautiful sunset over a mountain landscape."
      500:
        description: Error occurred during analysis
        schema:
          type: object
          properties:
            error:
              type: string
              description: Error message
        examples:
          application/json:
            error: "Error retrieving response from LLM. Error: Invalid image format"
    """
    if request.method == 'OPTIONS':
        response = jsonify({'status': 'ok'})
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        return response, 200
    try:
        image_data = request.get_data(cache=False)
        llm_response = get_llm_response(image_data)
        response_data = {
            "text": llm_response
        }
        response = jsonify(response_data)
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'POST'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        return response, 200
    except Exception as e:
        error_response = jsonify({'error': f'Error retrieving response from LLM. Error: {e}'})
        error_response.headers['Access-Control-Allow-Origin'] = '*'
        return error_response, 500




if __name__ == "__main__":
    app.run(host='0.0.0.0', port=3000, debug=True)