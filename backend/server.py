from flask import Flask

app = Flask(__name__)


@app.route("/api/hello")
def count_day():
    return "hello world"


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8080)
