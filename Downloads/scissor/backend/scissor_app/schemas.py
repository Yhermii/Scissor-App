from datetime import datetime
from pydantic import BaseModel
from typing import Optional, List



class RegisterRequest(BaseModel):
    user_fname: str
    user_lname: str
    email: str
    pwd: str
    cpwd: str

class LoginRequest(BaseModel):
    email: str
    pwd: str

class Token(BaseModel):
    access_token: str
    token_type: str

class UpdateRequest(BaseModel):
    user_fname: Optional[str] = None
    user_lname: Optional[str] = None
    email: Optional[str] = None

class UserResponse(BaseModel):
    user_id: int
    user_fname: str
    user_lname: str
    email: str


class ShortenerRequest(BaseModel):
    original_url: str
    user_id: int 


class ShortenerResponse(BaseModel):
    original_url: str
    shortened_url:str
    qr_code_image: str
    user_id: int

class CheckerResponse(BaseModel):
    shortened_url: str
    qr_code_image: str

class ShortenResponse(BaseModel):
    original_url: str
    shortened_url: str
    qr_code_path: Optional[str]
    visit_count: Optional[int]
    visit_time: Optional[datetime]

class LinkHistoryResponse(BaseModel):
    user_id: int
    original_url: str
    shortened_url: str
    visit_count: int
    times_visited: List[datetime]

class URLRequest(BaseModel):
    id: Optional[int]
    original_url: str
    shortened_url: str
    qr_code_path: Optional[str]
    visit_count: Optional[int]
    visit_time: Optional[datetime]


class URLResponse(BaseModel):
    shortened_url: str
    original_url: str

class QRRequest(BaseModel):
    short_url: str

class QRResponse(BaseModel):
    qr_code_path: str
    original_url: str


class VisitDetail(BaseModel):
    visit_time: datetime

class VisitResponse(BaseModel):
    original_url: str
    short_url: str
    visit_times: List[VisitDetail]
    visit_count: int
    visits: List[VisitDetail]

