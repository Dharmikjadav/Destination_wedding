from fastapi import FastAPI, HTTPException
from database import *
from models import *
from schemas import serialize, serialize_list
from fastapi.middleware.cors import CORSMiddleware
from bson.objectid import ObjectId

app = FastAPI(title="Destination Wedding API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Destination Wedding API!"}



# Authentication Endpoint
@app.post("/login")
def login_user(user: Login):
    db_user = users_col.find_one({"email": user.email})

    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    if db_user.get("password") != user.password:
        raise HTTPException(status_code=401, detail="Invalid password")

    return {
        "status": "success",
        "message": "Login successful",
        "user": {
                "name": db_user.get("name"),
                "email": db_user.get("email"),
                "role": db_user.get("role")
            },
        "role": db_user.get("role"),
        "id": str(db_user["_id"])
    }


# User Endpoints
@app.post("/users")
def create_user(user: User):
    # prevent duplicate emails
    if users_col.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already registered")

    id = users_col.insert_one(user.dict()).inserted_id

    return {
        "status": "success",
        "message": "User created successfully",
        "id": str(id)
    }


@app.get("/users")
def get_users():
    return serialize_list(users_col.find())

@app.put("/users/{user_id}")
def update_user(user_id: str, user: User):
    try:
        obj_id = ObjectId(user_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid user id format")

    result = users_col.update_one({"_id": obj_id}, {"$set": user.dict()})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "User updated successfully"}

@app.delete("/users/{user_id}")
def delete_user(user_id: str):
    try:
        obj_id = ObjectId(user_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid user id format")

    result = users_col.delete_one({"_id": obj_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "User deleted successfully"}

#____________________________________________________________________________

# Package Endpoints
@app.post("/packages")
def create_package(package: Package):
    id = packages_col.insert_one(package.dict()).inserted_id
    return {"id": str(id)}

@app.get("/packages")
def get_packages():
    return serialize_list(packages_col.find())

@app.put("/packages/{package_id}")
def update_package(package_id: str, package: Package):
    try:
        obj_id = ObjectId(package_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid package id format")

    result = packages_col.update_one({"_id": obj_id}, {"$set": package.dict()})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Package not found")
    return {"message": "Package updated successfully"}

@app.delete("/packages/{package_id}")
def delete_package(package_id: str):
    try:
        obj_id = ObjectId(package_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid package id format")

    result = packages_col.delete_one({"_id": obj_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Package not found")
    return {"message": "Package deleted successfully"}

#__________________________________________________________________


# Destination Endpoints
@app.post("/destinations")
def create_destination(destination: Destination):
    id = destinations_col.insert_one(destination.dict()).inserted_id
    return {"id": str(id)}

@app.get("/destinations")
def get_destinations():
    return serialize_list(destinations_col.find())

@app.put("/destinations/{destination_id}")
def update_destination(destination_id: str, destination: Destination):
    try:
        obj_id = ObjectId(destination_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid destination id format")

    result = destinations_col.update_one({"_id": obj_id}, {"$set": destination.dict()})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Destination not found")
    return {"message": "Destination updated successfully"}

@app.delete("/destinations/{destination_id}")
def delete_destination(destination_id: str):
    try:
        obj_id = ObjectId(destination_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid destination id format")

    result = destinations_col.delete_one({"_id": obj_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Destination not found")
    return {"message": "Destination deleted successfully"}

#__________________________________________________________________


# Service Endpoints
@app.post("/services")
def create_service(service: Service):
    id = services_col.insert_one(service.dict()).inserted_id
    return {"id": str(id)}

@app.get("/services")
def get_services():
    return serialize_list(services_col.find())

@app.put("/services/{service_id}")
def update_service(service_id: str, service: Service):
    try:
        obj_id = ObjectId(service_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid service id format")

    result = services_col.update_one({"_id": obj_id}, {"$set": service.dict()})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Service not found")
    return {"message": "Service updated successfully"}

@app.delete("/services/{service_id}")
def delete_service(service_id: str):
    try:
        obj_id = ObjectId(service_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid service id format")

    result = services_col.delete_one({"_id": obj_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Service not found")
    return {"message": "Service deleted successfully"}

#__________________________________________________________________


# Booking Endpoints
@app.post("/bookings")
def create_booking(booking: Booking):
    # validate referenced IDs exist
    try:
        user_obj_id = ObjectId(booking.user_id)
        package_obj_id = ObjectId(booking.package_id)
        dest_obj_id = ObjectId(booking.destination_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid id format for user/package/destination")

    if not users_col.find_one({"_id": user_obj_id}):
        raise HTTPException(status_code=404, detail="User not found")
    if not packages_col.find_one({"_id": package_obj_id}):
        raise HTTPException(status_code=404, detail="Package not found")
    if not destinations_col.find_one({"_id": dest_obj_id}):
        raise HTTPException(status_code=404, detail="Destination not found")

    id = bookings_col.insert_one(booking.dict()).inserted_id
    return {"id": str(id)}

@app.get("/bookings")
def get_bookings():
    return serialize_list(bookings_col.find())

@app.put("/bookings/{booking_id}")
def update_booking(booking_id: str, booking: Booking):
    try:
        obj_id = ObjectId(booking_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid booking id format")

    result = bookings_col.update_one({"_id": obj_id}, {"$set": booking.dict()})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Booking not found")
    return {"message": "Booking updated successfully"}

@app.delete("/bookings/{booking_id}")
def delete_booking(booking_id: str):
    try:
        obj_id = ObjectId(booking_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid booking id format")

    result = bookings_col.delete_one({"_id": obj_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Booking not found")
    return {"message": "Booking deleted successfully"}

#__________________________________________________________________



# Gallery Endpoints
@app.post("/gallery")
def add_gallery(gallery: Gallery):
    id = gallery_col.insert_one(gallery.dict()).inserted_id
    return {"id": str(id)}

@app.get("/gallery")
def get_gallery():
    return serialize_list(gallery_col.find())

@app.put("/gallery/{gallery_id}")
def update_gallery(gallery_id: str, gallery: Gallery):
    try:
        obj_id = ObjectId(gallery_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid gallery id format")

    result = gallery_col.update_one({"_id": obj_id}, {"$set": gallery.dict()})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Gallery item not found")
    return {"message": "Gallery item updated successfully"}

@app.delete("/gallery/{gallery_id}")
def delete_gallery(gallery_id: str):
    try:
        obj_id = ObjectId(gallery_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid gallery id format")

    result = gallery_col.delete_one({"_id": obj_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Gallery item not found")
    return {"message": "Gallery item deleted successfully"}

#__________________________________________________________________

# Testimonial Endpoints
@app.post("/testimonials")
def add_testimonial(testimonial: Testimonial):
    id = testimonials_col.insert_one(testimonial.dict()).inserted_id
    return {"id": str(id)}

@app.get("/testimonials")
def get_testimonials():
    return serialize_list(testimonials_col.find())  


# Inquiries Endpoints
@app.post("/inquiries")
def add_inquiry(inquiry: Inquiry):
    id = inquiries_col.insert_one(inquiry.dict()).inserted_id
    return {"id": str(id)}

@app.get("/inquiries")
def get_inquiries():
    return serialize_list(inquiries_col.find())