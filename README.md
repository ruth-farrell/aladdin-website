# Aladdin Schools Website

A Django-based website for Aladdin Schools. 

## Status

Currently in development (January 2026)
 
Testing URL hosted on Railway: https://web-production-c01f0.up.railway.app/

## Technology Stack

- **Backend**: Django 4.2.26
- **Frontend**: HTML, CSS (with CSS Custom Properties), JavaScript (ES6 modules)
- **Styling**: CSS with BEM methodology
- **Icons**: SVG sprite system

## Project Structure

```
aladdin/
├── mysite/           # Django project settings
├── ui/               # Main Django app
│   ├── static/       # Static files (CSS, JS, images)
│   └── templates/    # Django templates
├── venv/             # Python virtual environment (not in repo)
└── manage.py         # Django management script
```

## Setup Instructions

### Prerequisites

- Python 3.9 or higher
- pip (Python package manager)

### Installation

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd aladdin
   ```

2. Create a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install django
   ```

4. Run migrations (if needed):
   ```bash
   python manage.py migrate
   ```

5. Start the development server:
   ```bash
   python manage.py runserver
   ```

6. Open your browser and navigate to `http://127.0.0.1:8000/`

## Further Documentation 

See /docs

