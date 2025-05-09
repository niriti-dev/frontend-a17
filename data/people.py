def sanitize_user(user_data):
    """Remove sensitive information from user data before sending to client."""
    if not user_data:
        return None
    
    # Create a copy to avoid modifying the original
    safe_data = user_data.copy()
    
    # Remove sensitive fields
    safe_data.pop('password', None)
    
    return safe_data

def read():
    """
    Returns all people in the database.
    """
    all_people = get_people()
    return {email: sanitize_user(data) for email, data in all_people.items()}

def read_one(email):
    """
    Returns a specific person from the database.
    """
    person = get_people().get(email)
    return sanitize_user(person) if person else None 