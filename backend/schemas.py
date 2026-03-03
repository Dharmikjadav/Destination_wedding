def serialize(doc) -> dict:
    doc["_id"] = str(doc["_id"])
    return doc

def serialize_list(docs) -> list:
    return [serialize(doc) for doc in docs]