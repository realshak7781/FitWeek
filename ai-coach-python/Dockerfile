# Use a lightweight Python 3.11 image for speed and security
FROM python:3.11-slim

# Set the working directory inside the container
WORKDIR /app

# Install system-level dependencies required for PostgreSQL (psycopg2)
RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy the requirements file first to leverage Docker's caching
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy all your application code (main.py, graph.py, etc.)
COPY . .

# Expose the port FastAPI runs on
EXPOSE 8000

# Start the server using the host 0.0.0.0 so it's reachable in AWS
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]