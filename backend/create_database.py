"""
Create the ParamLearningHub database in LocalDB
Run this before running migrations
"""
import os
import pyodbc
from dotenv import load_dotenv

load_dotenv()

def create_database():
    """Create the database if it doesn't exist"""
    
    server = os.getenv('DB_HOST', '(localdb)\\MSSQLLocalDB')
    database = os.getenv('DB_NAME', 'ParamLearningHub')
    
    print("=" * 60)
    print("Creating Database in LocalDB")
    print("=" * 60)
    print(f"Server: {server}")
    print(f"Database: {database}")
    print("-" * 60)
    
    try:
        # Connect to master database (always exists)
        conn_str = (
            f'DRIVER={{ODBC Driver 17 for SQL Server}};'
            f'SERVER={server};'
            f'DATABASE=master;'
            f'Trusted_Connection=yes;'
            f'TrustServerCertificate=yes;'
        )
        
        print("Connecting to master database...")
        conn = pyodbc.connect(conn_str, timeout=10)
        conn.autocommit = True
        cursor = conn.cursor()
        
        # Check if database exists
        cursor.execute(f"SELECT name FROM sys.databases WHERE name = '{database}'")
        exists = cursor.fetchone()
        
        if exists:
            print(f"\n✓ Database '{database}' already exists!")
        else:
            print(f"\nCreating database '{database}'...")
            cursor.execute(f"CREATE DATABASE {database}")
            print(f"✓ Database '{database}' created successfully!")
        
        cursor.close()
        conn.close()
        
        # Test connection to new database
        print("\nTesting connection to new database...")
        test_conn_str = (
            f'DRIVER={{ODBC Driver 17 for SQL Server}};'
            f'SERVER={server};'
            f'DATABASE={database};'
            f'Trusted_Connection=yes;'
            f'TrustServerCertificate=yes;'
        )
        
        test_conn = pyodbc.connect(test_conn_str, timeout=10)
        test_cursor = test_conn.cursor()
        test_cursor.execute("SELECT DB_NAME()")
        db_name = test_cursor.fetchone()[0]
        test_cursor.close()
        test_conn.close()
        
        print(f"✓ Successfully connected to: {db_name}")
        print("\n" + "=" * 60)
        print("✓ Database is ready!")
        print("=" * 60)
        print("\nNext steps:")
        print("1. Run: python manage.py makemigrations")
        print("2. Run: python manage.py migrate")
        print("3. Run: python manage.py runserver")
        print("=" * 60)
        
        return True
        
    except pyodbc.Error as e:
        print("\n✗ Failed to create database!")
        print("-" * 60)
        print(f"Error: {e}")
        print("-" * 60)
        print("\nTroubleshooting:")
        print("1. Make sure LocalDB is running:")
        print("   sqllocaldb start MSSQLLocalDB")
        print("\n2. Check ODBC Driver 17 is installed:")
        print("   Download: https://docs.microsoft.com/en-us/sql/connect/odbc/download-odbc-driver-for-sql-server")
        print("\n3. Try creating manually:")
        print(f'   sqlcmd -S "{server}" -Q "CREATE DATABASE {database}"')
        print("=" * 60)
        return False

if __name__ == "__main__":
    create_database()
