import pandas as pd
from google.cloud import bigquery
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer

client = bigquery.Client()

def fetch_data_from_bigquery():
    query = """
    SELECT message, reply FROM `smiling-sweep-450612-g4.ai_training_dataset.user_activity`
    """
    df = client.query(query).to_dataframe()
    return df

def load_and_preprocess_data():
   
    df = fetch_data_from_bigquery()
    
  
    df.dropna(inplace=True)

    X = df['message'].values 
    Y = df['reply'].values

    vectorizer = TfidfVectorizer()
    X_transformed = vectorizer.fit_transform(X)

    X_train, X_test, Y_train, Y_test = train_test_split(X_transformed, Y, test_size=0.2, random_state=42)

    return X_train, X_test, Y_train, Y_test, vectorizer

if __name__ == "__main__":
    X_train, X_test, Y_train, Y_test, vectorizer = load_and_preprocess_data()
    print("Preprocessing done! Train size:", X_train.shape, "Test size:", X_test.shape)