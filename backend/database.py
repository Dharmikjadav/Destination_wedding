from pymongo import MongoClient

MONGO_URL = "mongodb+srv://dharmikjadav11:KSu0PRN5aACbc8UK@cluster0.bgesvgg.mongodb.net/?appName=Cluster0"

client = MongoClient(MONGO_URL)

db = client["Destination_Wedding"]

# Collections
users_col = db["user"]
packages_col = db["packages"]
destinations_col = db["destinations"]
services_col = db["services"]
bookings_col = db["bookings"]
gallery_col = db["gallery"]
testimonials_col = db["testimonials"]
inquiries_col = db["inquiries"]