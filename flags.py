from flask import Flask
from lib.codes import codes

app = Flask(__name__)


@app.route("/")
def index():
    return translate("ne")


@app.route("/<phrase>")
def translate(phrase):
    phrase = phrase.upper()
    result = ""
    for i in range(0, len(phrase), 2):
        curr = phrase[i:i + 2]
        if curr in codes:
            result += codes[curr]
        else:
            result += curr

    return result

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5050)
