from fastapi import FastAPI, HTTPException
from database import *
from models import *
from schemas import serialize, serialize_list
from fastapi.middleware.cors import CORSMiddleware
from bson import ObjectId

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
                "id": str(db_user["_id"]),
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
def create_package(package: PackageCreate):
    package_dict = package.dict()
    package_dict["status"] = PackageStatus.pending.value

    result = packages_col.insert_one(package_dict)
    return {
        "status": "success",
        "message": "Package submitted for approval",
        "id": str(result.inserted_id)
    }


@app.get("/packages/status/pending")
def get_pending_packages():
    """Get all pending packages (for admin review)"""
    packages = packages_col.find({"status": PackageStatus.pending.value})
    return serialize_list(packages)


@app.get("/packages")
def get_approved_packages():
    """Get all approved packages (for users)"""
    packages = packages_col.find({"status": PackageStatus.approved.value})
    return serialize_list(packages)


@app.get("/packages/all")
def get_all_packages():
    """Get all packages (admin only)"""
    return serialize_list(packages_col.find())


@app.put("/packages/{package_id}")
def update_package(package_id: str, package: PackageCreate):
    """Update an existing package"""
    try:
        obj_id = ObjectId(package_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid package id format")

    update_data = package.dict()
    update_data["status"] = PackageStatus.pending.value  # Reset to pending after edit

    result = packages_col.update_one(
        {"_id": obj_id},
        {"$set": update_data}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Package not found")

    return {"status": "success", "message": "Package updated successfully"}


@app.delete("/packages/{package_id}")
def delete_package(package_id: str):
    """Delete a package"""
    try:
        obj_id = ObjectId(package_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid package id format")

    result = packages_col.delete_one({"_id": obj_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Package not found")
    return {"status": "success", "message": "Package deleted successfully"}


@app.patch("/packages/{package_id}/approve")
def approve_package(package_id: str):
    """Approve a pending package"""
    try:
        obj_id = ObjectId(package_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid package id format")

    result = packages_col.update_one(
        {"_id": obj_id},
        {"$set": {"status": PackageStatus.approved.value}}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Package not found")

    return {"status": "success", "message": "Package approved"}


@app.patch("/packages/{package_id}/reject")
def reject_package(package_id: str):
    """Reject a pending package"""
    try:
        obj_id = ObjectId(package_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid package id format")

    result = packages_col.update_one(
        {"_id": obj_id},
        {"$set": {"status": PackageStatus.rejected.value}}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Package not found")

    return {"status": "success", "message": "Package rejected"}


@app.get("/packages/vendor/{vendor_id}")
def get_vendor_packages(vendor_id: str):
    """Get all packages for a specific vendor"""
    try:
       packages = packages_col.find({"vendor_id": vendor_id})
       return serialize_list(packages)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid vendor id format")

    # Check if vendor exists
    if not users_col.find_one({"_id": vendor_obj_id, "role": "vendor"}):
        raise HTTPException(status_code=404, detail="Vendor not found")

    packages = packages_col.find({"vendor_id": vendor_id})
    return serialize_list(packages)

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
    service_data = service.dict()
    service_data["status"] = "pending"  # Set initial status to pending
    result = services_col.insert_one(service_data)
    return {
         "message": "Service submitted for approval",
        "id": str(result.inserted_id)
        }

@app.get("/services")
def get_services():
    services = services_col.find({"status": "approved"})
    return serialize_list(services)

@app.get("/admin/services/pending")
def get_pending_services():
    services = services_col.find({"status": "pending"})
    return serialize_list(services)

@app.put("/admin/services/approve/{service_id}")
def approve_service(service_id: str):
    obj_id = ObjectId(service_id)

    services_col.update_one(
        {"_id": obj_id},
        {"$set": {"status": "approved"}}
    )

    return {"message": "Service approved"}

@app.put("/admin/services/reject/{service_id}")
def reject_service(service_id: str):
    obj_id = ObjectId(service_id)

    services_col.update_one(
        {"_id": obj_id},
        {"$set": {"status": "rejected"}}
    )

    return {"message": "Service rejected"}

# @app.get("/services")
# def get_services():
#     return serialize_list(services_col.find())


@app.get("/vendor/services/{vendor_id}")
def get_vendor_services(vendor_id: str):
    services = services_col.find({"vendor_id": vendor_id})
    return serialize_list(services)



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


# payment endpoints
@app.post("/payments")
def create_payment(payment: Payment):
    id = payments_col.insert_one(payment.dict()).inserted_id
    return {"id": str(id)}

@app.get("/payments")
def get_payments():
    return serialize_list(payments_col.find())
