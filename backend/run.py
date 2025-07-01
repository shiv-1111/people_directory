# entry point

from app import create_app

# calling the factory func to create an instance of Flask app
app = create_app()

# check to see if the script is run directly
# in python upon importing a file, the whole script runs
# this line of code ensures that server must only run if the script is run directly and not imported
# pyhton built in variable "__name__", when script is run directly, __name__ == "__main__"

if __name__ == "__main__":
    # start server
    app.run(debug=True)