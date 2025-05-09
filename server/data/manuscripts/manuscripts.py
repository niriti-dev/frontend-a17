from bson.objectid import ObjectId
from flask import jsonify
from data.db import db

MANUSCRIPTS_COLLECTION = 'manuscripts'
AUTHOR_NAME = 'author'
LATEST_VERSION = 'latest_version'
TITLE = 'title'
TEXT = 'text'
STATUS = 'status'

def create_manuscript(author, title, text):
    """
    Create a new manuscript entry
    Args:
        author: Name of the author
        title: Title of the manuscript
        text: Text content of the manuscript
    Returns:
        Created manuscript document or None if creation failed
    """
    try:
        manuscript = {
            AUTHOR_NAME: author,
            LATEST_VERSION: {
                TITLE: title,
                TEXT: text
            },
            STATUS: 'pending'  # Set initial status to pending
        }
        
        result = db[MANUSCRIPTS_COLLECTION].insert_one(manuscript)
        if result.inserted_id:
            return read_one_manuscript(result.inserted_id)
        return None
        
    except Exception as e:
        print(f"Error creating manuscript: {e}")
        return None

def read_all_manuscripts():
    """
    Retrieve all manuscripts from the database
    Returns:
        Dictionary of all manuscripts with their IDs as keys
    """
    try:
        manuscripts = db[MANUSCRIPTS_COLLECTION].find()
        result = {}
        for manuscript in manuscripts:
            manuscript['_id'] = str(manuscript['_id'])  # Convert ObjectId to string
            result[manuscript['_id']] = manuscript
        return result
    except Exception as e:
        print(f"Error reading all manuscripts: {e}")
        return {}

def read_one_manuscript(manuscript_id):
    """
    Retrieve a single manuscript by ID
    Args:
        manuscript_id: ID of the manuscript to retrieve
    Returns:
        Manuscript document or None if not found
    """
    try:
        if isinstance(manuscript_id, str):
            manuscript_id = ObjectId(manuscript_id)
        manuscript = db[MANUSCRIPTS_COLLECTION].find_one({'_id': manuscript_id})
        if manuscript:
            manuscript['_id'] = str(manuscript['_id'])  # Convert ObjectId to string
        return manuscript
    except Exception as e:
        print(f"Error reading manuscript: {e}")
        return None

def read_manuscripts_by_author(author_name):
    """
    Retrieve all manuscripts by a specific author
    Args:
        author_name: Name of the author
    Returns:
        List of manuscript documents
    """
    try:
        manuscripts = db[MANUSCRIPTS_COLLECTION].find({AUTHOR_NAME: author_name})
        result = []
        for manuscript in manuscripts:
            manuscript['_id'] = str(manuscript['_id'])  # Convert ObjectId to string
            result.append(manuscript)
        return result
    except Exception as e:
        print(f"Error reading manuscripts by author: {e}")
        return []

def process_manuscript_action(manuscript_id, action, comment=''):
    """
    Process an action (accept/reject/revise) on a manuscript
    Args:
        manuscript_id: ID of the manuscript
        action: One of 'accept', 'reject', 'revise'
        comment: Optional comment for the action
    Returns:
        Updated manuscript document or None if not found
    """
    try:
        manuscript = read_one_manuscript(manuscript_id)
        if not manuscript:
            return None

        # Update the manuscript with new status and comment
        update = {
            '$set': {
                STATUS: action,
                'comment': comment
            }
        }
        
        result = db[MANUSCRIPTS_COLLECTION].update_one(
            {'_id': ObjectId(manuscript_id)},
            update
        )

        if result.modified_count > 0:
            return read_one_manuscript(manuscript_id)
        return None

    except Exception as e:
        print(f"Error processing manuscript action: {e}")
        return None

def delete_manuscript(manuscript_id):
    """
    Delete a manuscript by ID
    Args:
        manuscript_id: ID of the manuscript to delete
    Returns:
        True if deletion was successful, False otherwise
    """
    try:
        result = db[MANUSCRIPTS_COLLECTION].delete_one({'_id': ObjectId(manuscript_id)})
        return result.deleted_count > 0
    except Exception as e:
        print(f"Error deleting manuscript: {e}")
        return False 