from flask import Flask, request, jsonify, render_template
from analyze import get_llm_response

app = Flask(__name__, template_folder='templates')

@app.route("/")
def home():
    return render_template('index.html')


@app.route("/api/v1/analyze", methods=['POST', 'OPTIONS'])
def analyze():
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