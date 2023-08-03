import flask
from flask import Flask, render_template, jsonify, request, url_for, redirect
from flask_cors import CORS
from flask_mysqldb import MySQL
import os
import smtplib
import email.message

menu_img = './static/images/SVG/menu.svg'
fklogo = './static/images/SVG/FK_logo.svg'

app = Flask(__name__)
CORS(app)

app.config['MYSQL_HOST'] = os.getenv('HOST')
app.config['MYSQL_USER'] = os.getenv('USER')
app.config['MYSQL_PASSWORD'] = os.getenv('PASSWORD')
app.config['MYSQL_DB'] = os.getenv('DATABASE')

mysql = MySQL(app)

@app.route('/')
def page():
    return render_template('home.html', img = menu_img)

@app.route('/home')
def home_page():
    return render_template('home.html', img = menu_img)

@app.route('/news')
def news_db():
    cur = mysql.connection.cursor()
    cur.execute(f"SELECT * FROM news ORDER BY id DESC LIMIT 3")
    fetchdata = cur.fetchall()
    fetchdata = jsonify(fetchdata)
    return fetchdata

@app.route('/agenda')
def agenda_page():
    return render_template('agenda.html', img = menu_img)

@app.route('/agendadb/<info>')
def agenda_db(info):
    cur = mysql.connection.cursor()
    if info == 'every':
        cur.execute(f"SELECT * FROM events")
    else:
        info = info.split('&')
        cur.execute(f"SELECT * FROM events WHERE eventmonth='{info[0]}' and eventyear='{info[1]}'")
    fetchdata = cur.fetchall()
    fetchdata = jsonify(fetchdata)
    return fetchdata

@app.route('/rocksession')
def rocksession_page():
    return render_template('rocksession.html', img = menu_img, fklogo = fklogo)

@app.route('/rocksessiondb')
def rocksession_db():
    cur = mysql.connection.cursor()
    cur.execute(f"SELECT * FROM rocksession")
    fetchdata = cur.fetchall()
    fetchdata = jsonify(fetchdata)
    return fetchdata

@app.route('/musicas')
def musicas_page():
    return render_template('musicas.html', img = menu_img)

@app.route('/contato', methods=["POST", "GET"])
def contato_page():
    if request.method == "POST":
        content = f"""
        <p>Nome: {request.form['name']}<p>
        <p>E-mail: {request.form['email']}<p>
        <p>{request.form['email-content']}<p>
        """
        msg = email.message.Message()
        msg['Subject'] = request.form['subject']
        msg['From'] = "contact.freaktheband@gmail.com"
        msg['To'] = "contact.freaktheband@gmail.com"
        msg.add_header("Content-Type", 'text/html')
        password = os.getenv("EMAIL_PW")
        msg.set_payload(content)
        send = smtplib.SMTP('smtp.gmail.com: 587')
        send.starttls()
        send.login(msg['From'], password)
        send.sendmail(msg['From'], msg['To'], msg.as_string().encode('utf-8'))
    return render_template('contato.html', img = menu_img)

@app.route('/login', methods=["POST", "GET"])
def login_page():
    return render_template('login.html', img = menu_img)

@app.route('/admin', methods=["POST", "GET"])
def admin_access():
    cur = mysql.connection.cursor()
    if request.method == "POST":

        cur.execute(f"SELECT * from login WHERE usuario='{request.form['user']}'")
        fetchdata = cur.fetchall()
        if fetchdata[0][1] == request.form['password']:
            return render_template('admin.html')
        else:
            return redirect(url_for("login_page"))
    else:
        return redirect(url_for("login_page"))

@app.route('/dbpost', methods=["POST"])
def db_post():
    cur = mysql.connection.cursor()
    if request.method == "POST":

        if request.form['table'] == 'events':
            command = f"INSERT INTO {request.form['table']} (id, name, eventtype, descriptiontxt, eventyear, eventday, eventmonth) VALUES (DEFAULT, '{request.form['name']}', '{request.form['tag']}', '{request.form['description']}', {request.form['year']}, {request.form['day']}, '{request.form['month']}');"
        elif request.form['table'] == 'news':
            command = f"INSERT INTO {request.form['table']} (id, name, descriptiontxt) VALUES (DEFAULT, '{request.form['name']}', '{request.form['description']}');"
        elif request.form['table'] == 'rocksession':
            command = f"INSERT INTO {request.form['table']} (id, descriptiontxt, guest_band, guest_band_txt, guest_band_link, guest_appearance, guest_appearance_txt, guest_appearance_link) VALUES (DEFAULT, '{request.form['description']}', '{request.form['bandname']}', '{request.form['banddescription']}, '{request.form['bandlink']}', '{request.form['appearancename']}', '{request.form['appearancedescription']}, '{request.form['appearancelink']}');"
        cur.execute(command)
        mysql.connection.commit()
        cur.close()
    return render_template('admin.html')

@app.route('/dbdelete', methods=["POST"])
def delete_db():
    cur = mysql.connection.cursor()
    if request.method == "POST":
        cur.execute(f"DELETE FROM {request.form['table']} WHERE id='{request.form['id']}'")
        mysql.connection.commit()
        cur.close()
        return render_template('admin.html')
    
if __name__ == "__main__":
    # Setting debug to True enables debug output. This line should be
    # removed before deploying a production app.
    app.run(debug=False)
