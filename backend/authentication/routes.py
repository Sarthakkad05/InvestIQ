import firebase_admin
from firebase_admin import auth, credentials 
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
from google.cloud import bigquery
import requests
import os
import datetime


router = APIRouter()
load_dotenv()

cred = credentials.Certificate("backend/authentication/firebase-adminsdk.json")
firebase_admin.initialize_app(cred)

os.environ["BIG_QUERY_CREDENTIALS"] = "backend/authentication/big-query-key.json"
# bigquery_client = bigquery.Client()

bigquery_client = bigquery.Client(project="smiling-sweep-450612-g4")


DATASET_ID = ''
TABLE_ID = ''
TABLE_REF = f"{bigquery_client.project}.{DATASET_ID}.{TABLE_ID}"

FIREBASE_API_KEY = ""
FIREBASE_AUTH_URL = f"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={FIREBASE_API_KEY}"

class GoogleLoginRequest(BaseModel):
    id_token: str

class SignupRequest(BaseModel):
    email: str
    password: str
    display_name: str = ""

class LoginRequest(BaseModel):
    email: str
    password: str

@router.post("/signup")
async def signup(user: SignupRequest):
    try:
        firebase_user = auth.create_user(email=user.email, password=user.password, display_name=user.display_name)

        rows_to_insert = [{
            "user_id": firebase_user.uid,
            "timestamp": datetime.datetime.utcnow().isoformat()
        }]

        errors = bigquery_client.insert_rows_json(TABLE_REF, rows_to_insert)

        if errors:
            raise HTTPException(status_code=500, detail=f"BigQuery insert error: {errors}")

        return {"message": "User signed up and stored in BigQuery", "uid": firebase_user.uid}

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/login")
async def login_user(user: LoginRequest):
    data = {
        "email": user.email,
        "password": user.password,
        "returnSecureToken": True
    }

    response = requests.post(FIREBASE_AUTH_URL, json=data)
    firebase_response = response.json()

    if response.status_code == 200:
        try:
            decoded_token = auth.verify_id_token(firebase_response["idToken"])
            user_id = decoded_token.get("uid")
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Failed to decode ID token: {str(e)}")

        return {
            "message": "Login successful",
            "user_id": user_id,
            "idToken": firebase_response["idToken"],
            "refreshToken": firebase_response["refreshToken"],
            "expiresIn": firebase_response["expiresIn"]
        }
    else:
        raise HTTPException(status_code=400, detail=f"Login failed: {firebase_response.get('error', {}).get('message', 'Unknown error')}")

    

@router.post("/logout")
async def logout(id_token: str):
    try:
        decoded_token = auth.verify_id_token(id_token)
        uid = decoded_token["uid"]

        auth.revoke_refresh_tokens(uid)

        return {"message": "User logged out successfully. Token revoked."}

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/google-login")
async def google_login(request: GoogleLoginRequest):
    try:
        decoded_token = auth.verify_id_token(request.id_token)
        uid = decoded_token.get("uid")
        email = decoded_token.get("email")
        name = decoded_token.get("name")

        try:
            firebase_user = auth.get_user(uid)
        except firebase_admin.auth.UserNotFoundError:
            firebase_user = auth.create_user(uid=uid, email=email, display_name=name)

        return {
            "message": "Google login successful",
            "uid": firebase_user.uid,
            "email": email,
            "display_name": name,
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))