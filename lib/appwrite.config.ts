import * as sdk from 'node-appwrite'; //Importing the SDK

export const {
    PROJECT_ID, API_KEY, DATABASE_ID, PATIENT_COLLECTION_ID, DOCTOR_COLLECTION_ID, APPOINTMENT_COLLECTION_ID, 
    NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
    NEXT_PUBLIC_ENDPOINT: ENDPOINT
} = process.env; //Destructuring environment variables

const client = new sdk.Client(); //Creating a new instance of the client

client
    .setEndpoint(ENDPOINT!) //Setting the endpoint
    .setProject(PROJECT_ID!) //Setting the project ID
    .setKey(API_KEY!); //Setting the API key


export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);
