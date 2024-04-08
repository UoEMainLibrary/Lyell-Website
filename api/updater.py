import sys
import updater
import logging
from boltons import *
from logging.handlers import RotatingFileHandler
from updater.main import Updater


def setup_logging():
    # Create a logger
    # Create logger
    logger = logging.getLogger(__name__)
    logger.setLevel(logging.DEBUG)

    # Create RotatingFileHandler
    file_handler = RotatingFileHandler('logs/updater.log', maxBytes=1024 * 1024,
                                       backupCount=5)  # Rotate after 1 MB, keep up to 5 old log files
    file_handler.setLevel(logging.DEBUG)
    file_handler.setFormatter(logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s'))

    # Add RotatingFileHandler to logger
    logger.addHandler(file_handler)

    return logger


# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s', filename='logs/update.log')


def normal_run():
    try:
        logging.info("Starting normal run...")
        response = Updater("n")
        logging.info("Success")
    except Exception as e:
        logging.error(f"Error during normal run: {e}")
        print("An error occurred during the normal run. Please check the logs for details.")


def hard_reset_run():
    try:
        logging.info("Starting hard reset run...")
        response = Updater("hr")
    except Exception as e:
        logging.error(f"Error during hard reset run: {e}")
        print("An error occurred during the hard reset run. Please check the logs for details.")


def single_update_run(update_type):
    try:
        logging.info(f"Starting single {update_type} update run...")
        response = Updater(update_type)
        logging.info(f"Single {update_type} update run completed successfully.")
    except Exception as e:
        logging.error(f"Error during single {update_type} update run: {e}")
        print(f"An error occurred during the single {update_type} update run. Please check the logs for details.")


def main():
    if len(sys.argv) > 1:
        if sys.argv[1] == "--hard-reset":
            confirm = input("This will perform a hard reset. Are you sure? (yes/no): ")
            if confirm.lower() == "yes":
                hard_reset_run()
            else:
                print("Hard reset aborted.")
        elif sys.argv[1] == "--single-update":
            if len(sys.argv) > 2:
                update_type = sys.argv[2]
                single_update_run(update_type)
            else:
                print("Please provide the update type as an argument for single update.")
        else:
            print("Invalid argument.")
    else:
        normal_run()


if __name__ == "__main__":
    main()
