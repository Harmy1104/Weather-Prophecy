from flask import Flask, render_template, url_for
app = Flask(__name__)

@app.route('/')
def index1():
    return render_template('index.html')

@app.route('/index')
def index2():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/state/<place>')
def state_page(place):
    return render_template(f'state/{place}.html')

if __name__ == '__main__':
	app.run(debug = True)
