import sqlite3

conn = sqlite3.connect("data.db")
cursor = conn.cursor()

# List all tables
cursor.execute("SELECT name FROM sqlite_master WHERE type = 'table';")
tables = cursor.fetchall()

if not tables:
    print("No tables found in the database.")
else:
    print("Tables in the database:", tables)

conn.close()