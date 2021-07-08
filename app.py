from flask import *
import os


app=Flask(__name__,template_folder='templates')


@app.route('/')
def upload():
    return render_template("annotator.html")

@app.route('/save', methods=["POST", "GET"])
def save_json():
    # POST request
    if request.method == 'POST':
        print('Incoming..')
        print(request.get_json()["data"])  # parse as JSON
        data = request.get_json()["data"]
        annotationpath = 'static/json/annotations.json'
        os.remove(annotationpath)

        with open(annotationpath, 'a') as f:
            f.write(data + '\n')

        return 'OK', 200

if __name__ == '__main__':
    app.run(debug=True)
