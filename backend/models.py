from ast import pattern

from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import date
from enum import Enum


# Users
class User(BaseModel):
    name: Optional[str] = None
    email: EmailStr
    password: str = Field(..., min_length=6)
    role: str = Field(..., pattern="^(admin|user|vendor)$")
    number: Optional[str] = Field(None, pattern=r'^\+?\d{7,15}$')
    businessName: Optional[str] = None
    adminKey: Optional[str] = None


class Login(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=6)


class PackageStatus(str, Enum):
    pending = "pending"
    approved = "approved"
    rejected = "rejected"

# Packages
class PackageCreate(BaseModel):
    package_name: str
    price: int = Field(..., ge=0)
    duration_days: int = Field(..., ge=0)
    services_included: List[str]
    description: Optional[str] = None
    vendor_id: str

class Package(BaseModel):
    package_name: str
    price: int = Field(..., ge=0)
    duration_days: int = Field(..., ge=0)
    services_included: List[str]
    description: Optional[str] = None
    status: str = PackageStatus.pending
    vendor_id: str
    


# Destinations
class Destination(BaseModel):
    destination_name: str
    location: str
    type: str
    price_range: Optional[str] = None
    description: Optional[str] = None


# Services
class Service(BaseModel):
    image: Optional[str] = None
    category: str
    service_name: str
    description: Optional[str] = None
    price: int = Field(..., ge=0)
    status: str = "pending"
    vendor_id: str


# Bookings
class Booking(BaseModel):
    user_id: str
    package_id: str
    destination_id: str
    event_date: date
    guest_count: int = Field(..., ge=1)
    total_price: int = Field(..., ge=0)
    status: str = "pending"


# Gallery
class Gallery(BaseModel):
    title: str
    image: str
    destination: Optional[str] = None


# Testimonials
class Testimonial(BaseModel):
    client_name: str
    message: str
    rating: int = Field(..., ge=1, le=5)


# Inquiries
class Inquiry(BaseModel):
    name: str
    email: EmailStr
    phone: str = Field(..., pattern=r'^\+?\d{7,15}$')
    destination: Optional[str] = None
    message: Optional[str] = None


# Payments
class Payment(BaseModel):
    booking_id: str
    amount: float = Field(..., ge=0)
    method: str
    status: str = Field(..., pattern=r"^(pending|completed|failed|refunded)$")
    transaction_date: date