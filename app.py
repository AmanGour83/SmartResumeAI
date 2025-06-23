import os
import json
from flask import Flask, render_template, send_from_directory, request, jsonify
from openai import OpenAI

# Create Flask app
app = Flask(__name__, static_folder='.', template_folder='.')
app.secret_key = os.environ.get("SESSION_SECRET", "dev-secret-key-for-resume-builder")

# Initialize OpenAI client
client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

@app.route('/')
def index():
    """Serve the main resume builder page"""
    return send_from_directory('.', 'index.html')

@app.route('/api/ai-suggestions', methods=['POST'])
def get_ai_suggestions():
    """Get AI suggestions for resume improvement"""
    try:
        data = request.get_json()
        resume_data = data.get('resumeData', {})
        section = data.get('section', 'overall')
        
        # Create prompt based on section
        if section == 'summary':
            prompt = f"""Analyze this professional summary and provide 3 specific improvement suggestions:

Summary: "{resume_data.get('summary', '')}"
Job Title: "{resume_data.get('jobTitle', '')}"

Please provide actionable suggestions to make it more compelling and professional. Focus on:
1. Impact and achievements
2. Industry-specific keywords
3. Professional tone and clarity

Respond in JSON format:
{{"suggestions": ["suggestion 1", "suggestion 2", "suggestion 3"]}}"""

        elif section == 'experience':
            experiences = resume_data.get('experience', [])
            if experiences:
                exp_text = "\n".join([f"Position: {exp.get('position', '')} at {exp.get('company', '')}\nDescription: {exp.get('description', '')}" for exp in experiences])
                prompt = f"""Analyze these work experiences and provide 3 specific improvement suggestions:

{exp_text}

Job Title: "{resume_data.get('jobTitle', '')}"

Focus on:
1. Quantifying achievements with numbers/metrics
2. Using strong action verbs
3. Highlighting relevant skills and impact

Respond in JSON format:
{{"suggestions": ["suggestion 1", "suggestion 2", "suggestion 3"]}}"""
            else:
                return jsonify({"suggestions": ["Add work experience entries to get personalized suggestions"]})

        elif section == 'skills':
            prompt = f"""Analyze these skills and provide 3 specific improvement suggestions:

Skills: "{resume_data.get('skills', '')}"
Job Title: "{resume_data.get('jobTitle', '')}"

Focus on:
1. Industry-relevant technical skills
2. Soft skills that complement the role
3. Proper categorization and presentation

Respond in JSON format:
{{"suggestions": ["suggestion 1", "suggestion 2", "suggestion 3"]}}"""

        else:  # overall
            prompt = f"""Analyze this complete resume and provide 3 overall improvement suggestions:

Name: {resume_data.get('fullName', '')}
Job Title: {resume_data.get('jobTitle', '')}
Summary: {resume_data.get('summary', '')}
Skills: {resume_data.get('skills', '')}
Number of experiences: {len(resume_data.get('experience', []))}
Number of education entries: {len(resume_data.get('education', []))}

Focus on:
1. Overall structure and completeness
2. Professional presentation
3. Industry standards and best practices

Respond in JSON format:
{{"suggestions": ["suggestion 1", "suggestion 2", "suggestion 3"]}}"""

        # Get AI response
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a professional resume expert helping people improve their resumes. Always respond with valid JSON containing practical, actionable suggestions."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=500,
            temperature=0.7
        )
        
        # Parse the response
        ai_response = response.choices[0].message.content or ""
        ai_response = ai_response.strip()
        
        # Try to parse as JSON
        try:
            if ai_response:
                suggestions_data = json.loads(ai_response)
                return jsonify(suggestions_data)
            else:
                return jsonify({"suggestions": ["Unable to generate suggestions at this time"]})
        except json.JSONDecodeError:
            # If JSON parsing fails, extract suggestions manually
            suggestions = ai_response.split('\n')
            clean_suggestions = [s.strip('- "').strip() for s in suggestions if s.strip() and not s.startswith('{') and not s.startswith('}')][:3]
            return jsonify({"suggestions": clean_suggestions if clean_suggestions else ["Unable to generate suggestions at this time"]})
            
    except Exception as e:
        print(f"Error getting AI suggestions: {e}")
        return jsonify({"error": "Unable to get AI suggestions at this time"}), 500

@app.route('/<path:filename>')
def static_files(filename):
    """Serve static files (CSS, JS, etc.)"""
    return send_from_directory('.', filename)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)