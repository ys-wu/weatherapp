import json
from flask import Flask, jsonify


with open("data/weather.json") as f:
    weather_data = json.loads(f.read())

with open("data/forecast.json") as f:
    forecast_data = json.loads(f.read())


app = Flask(__name__)


@app.route("/")
def hello():
    return "Hello World!"


@app.route("/weather")
def get_weather():
    return jsonify(weather_data)


@app.route("/forecast")
def get_forecast():
    return jsonify(forecast_data)


if __name__ == "__main__":
    app.run()
