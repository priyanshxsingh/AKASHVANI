import os


class Settings:
    APP_NAME = os.getenv(
        "APP_NAME",
        "AKASHVANI The Voice Of The Sky"
    )

    APP_VERSION = os.getenv(
        "APP_VERSION",
        "1.0.0"
    )

    FRONTEND_URL = os.getenv(
        "FRONTEND_URL",
        "http://localhost:5173"
    )


settings = Settings()