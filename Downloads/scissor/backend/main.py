import os
from scissor_app import app, engine, models
from scissor_app.models import Base
from config import SECRET_KEY, DATABASE_URI
from dotenv import load_dotenv
from sqlalchemy import inspect


load_dotenv()

os.environ["SECRET_KEY"] = os.getenv("SECRET_KEY", SECRET_KEY)
os.environ["DATABASE_URI"] = os.getenv("DATABASE_URI", DATABASE_URI)

print("Database URI:", DATABASE_URI)

# Test
# Base.metadata.drop_all(bind=engine)

Base.metadata.create_all(bind = engine)

print("Tables created")

from sqlalchemy.orm import sessionmaker
Session = sessionmaker(autocommit=False, autoflush=False, bind=engine)

with Session() as session:
    inspector = inspect(engine)
    existing_tables = Base.metadata.tables.keys()
    print("Existing tables:", existing_tables)
    session.commit()
print("Server running on port 8000")

if __name__ == "__main__":
    import uvicorn
    
    uvicorn.run("scissor_app.main:app", host="0.0.0.0", port=8000, reload=True)