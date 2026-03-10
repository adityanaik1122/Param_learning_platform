import pyodbc

print("="*60)
print("SQL Server Connection Diagnostics - Extended")
print("="*60)

# Test with various encryption and authentication options
connection_strings = [
    # Test 1: No encryption
    ("No Encryption", "DRIVER={ODBC Driver 17 for SQL Server};SERVER=77.245.76.122,1433;DATABASE=ParamLearningHub;UID=userLoanDB;PWD=Rahulmore@123;Encrypt=no"),
    
    # Test 2: With TrustServerCertificate
    ("Trust Certificate", "DRIVER={ODBC Driver 17 for SQL Server};SERVER=77.245.76.122,1433;DATABASE=ParamLearningHub;UID=userLoanDB;PWD=Rahulmore@123;TrustServerCertificate=yes"),
    
    # Test 3: With Encrypt=yes and Trust
    ("Encrypt + Trust", "DRIVER={ODBC Driver 17 for SQL Server};SERVER=77.245.76.122,1433;DATABASE=ParamLearningHub;UID=userLoanDB;PWD=Rahulmore@123;Encrypt=yes;TrustServerCertificate=yes"),
    
    # Test 4: Without database specified
    ("No DB Specified", "DRIVER={ODBC Driver 17 for SQL Server};SERVER=77.245.76.122,1433;UID=userLoanDB;PWD=Rahulmore@123;TrustServerCertificate=yes"),
    
    # Test 5: Connect to master database
    ("Master DB", "DRIVER={ODBC Driver 17 for SQL Server};SERVER=77.245.76.122,1433;DATABASE=master;UID=userLoanDB;PWD=Rahulmore@123;TrustServerCertificate=yes"),
    
    # Test 6: Different port
    ("Port 1434", "DRIVER={ODBC Driver 17 for SQL Server};SERVER=77.245.76.122,1434;DATABASE=ParamLearningHub;UID=userLoanDB;PWD=Rahulmore@123;TrustServerCertificate=yes"),
    
    # Test 7: Named instance with no encryption
    ("Named Instance", "DRIVER={ODBC Driver 17 for SQL Server};SERVER=77.245.76.122\\MSSQLSERVER2019;DATABASE=ParamLearningHub;UID=userLoanDB;PWD=Rahulmore@123;Encrypt=no"),
]

success = False
working_config = None

for name, conn_str in connection_strings:
    print(f"\n[{name}] Testing...")
    try:
        conn = pyodbc.connect(conn_str, timeout=15)
        print(f"✓✓✓ SUCCESS! '{name}' works! ✓✓✓")
        
        cursor = conn.cursor()
        
        # Get SQL Server version
        cursor.execute("SELECT @@VERSION, @@SERVERNAME")
        row = cursor.fetchone()
        version = row[0]
        servername = row[1]
        
        print(f"\n  Server: {servername}")
        version_line = version.split('\n')[0] if '\n' in version else version[:100]
        print(f"  Version: {version_line}")
        
        # Get current database
        cursor.execute("SELECT DB_NAME()")
        current_db = cursor.fetchone()[0]
        print(f"  Current Database: {current_db}")
        
        # List all databases user has access to
        try:
            cursor.execute("SELECT name FROM sys.databases ORDER BY name")
            print(f"\n  Available databases:")
            has_param_db = False
            for row in cursor.fetchall():
                db_name = row[0]
                if db_name == 'ParamLearningHub':
                    print(f"    ✓ {db_name} (TARGET DATABASE)")
                    has_param_db = True
                else:
                    print(f"    - {db_name}")
            
            if not has_param_db:
                print(f"\n  ⚠ WARNING: 'ParamLearningHub' database not found!")
                print(f"  You may need to create it or use a different database name.")
        except Exception as e:
            print(f"  Could not list databases: {e}")
        
        conn.close()
        success = True
        working_config = conn_str
        
        print(f"\n{'='*60}")
        print(f"✓ WORKING CONFIGURATION FOUND")
        print(f"{'='*60}")
        break
        
    except pyodbc.Error as e:
        error_msg = str(e)
        error_code = error_msg[:10] if error_msg else ""
        
        if "28000" in error_code or "Login failed" in error_msg:
            print(f"  ✗ Auth failed: {error_msg[:150]}")
        elif "08001" in error_code or "timeout" in error_msg.lower():
            print(f"  ✗ Connection timeout/network error")
        else:
            print(f"  ✗ Error: {error_msg[:150]}")

if success and working_config:
    print(f"\nDjango Configuration:")
    print(f"{'='*60}")
    
    # Parse the working config to provide Django settings
    if "Encrypt=no" in working_config:
        encrypt_param = ""
    elif "Encrypt=yes" in working_config:
        encrypt_param = "Encrypt=yes;"
    else:
        encrypt_param = ""
    
    if "TrustServerCertificate=yes" in working_config:
        trust_param = "TrustServerCertificate=yes"
    else:
        trust_param = ""
    
    extra_params = encrypt_param + trust_param
    
    if ",1433" in working_config:
        host_value = "'HOST': '77.245.76.122,1433',"
    elif ",1434" in working_config:
        host_value = "'HOST': '77.245.76.122,1434',"
    elif "MSSQLSERVER2019" in working_config:
        host_value = "'HOST': '77.245.76.122\\\\\\\\MSSQLSERVER2019',"
    else:
        host_value = "'HOST': '77.245.76.122',"
    
    print("DATABASES = {")
    print("    'default': {")
    print("        'ENGINE': 'mssql',")
    print("        'NAME': 'ParamLearningHub',")
    print("        'USER': 'userLoanDB',")
    print("        'PASSWORD': 'Rahulmore@123',")
    print(f"        {host_value}")
    print("        'PORT': '',")
    print("        'OPTIONS': {")
    print("            'driver': 'ODBC Driver 17 for SQL Server',")
    if extra_params:
        print(f"            'extra_params': '{extra_params}',")
    print("        },")
    print("    }")
    print("}")
    
else:
    print(f"\n{'='*60}")
    print("❌ ALL CONNECTION ATTEMPTS FAILED")
    print("="*60)
    print("\nPossible issues:")
    print("1. SQL Server is set to 'Windows Authentication Only'")
    print("   - Needs to be changed to 'Mixed Mode' (SQL + Windows auth)")
    print("2. The user 'userLoanDB' might be a Windows user, not SQL user")
    print("3. Firewall or network security blocking the connection")
    print("4. SQL Server service might not be running")
    print("\nContact your DBA to:")
    print("- Enable 'SQL Server and Windows Authentication mode'")
    print("- Verify 'userLoanDB' is a SQL Server login (not Windows)")
    print("- Check SQL Server error logs for failed login attempts")
    print("="*60)
