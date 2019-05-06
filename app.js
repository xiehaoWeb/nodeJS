const
	mysql = require('mysql'),
	express = require('express'),
	fs = require('fs');
var app = express();
var connection = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '5232567',
	database: 'xh'
});

app.get("/", (req, res) => {
	var fileName = "./index.html";
	fs.readFile(fileName, function(err, data) {
		if (err) alert("对不起，您所访问的路径出错");
		else {
			res.write(data);
			res.end();
		}
	})
})

app.get("/login", (req, res) => {
	connection.getConnection((err, con) => {
		con.query('select name from users', function(error, results, fields) {
			if (error) throw error;
			con.release();
			results = JSON.parse(JSON.stringify(results));
			const LEN = results.length;
			for (let i = 0; i < LEN; ++i) {
				console.log(results[i].name)
				if (results[i].name == req.query.name) {
					res.json(true);
					return
				}
			}
			res.json(false);
			return
		});

	})
})
app.listen(8081)
