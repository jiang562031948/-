let express = require("express")();
let mysql = require("mysql");
const port = 8080;

// Node解决跨域问题
express.all("/*", function(req,res, next) {
    // 跨域处理
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next(); // 执行下一个路由
})

// 规划mysql链接
let sql = mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"123456",
	database:"school",
	port: 3307,
	timezone:"08:00"
})

// 尝试链接
sql.connect();
//登录接口
express.get("/login",(request,response)=>{
	let username = request.query.username;
	let password = request.query.password;

	sql.query(`SELECT * FROM user WHERE username="${username}" AND password="${password}"`,(error)=>{
		if(error){
			console.log(error);
			response.send("error")
		}
		else{
			if(!data.length){
				response.end("error")
			}
			else{
				response.send("success")
			}
		}
	})

})
//注册接口
express.get("/addUser",(request,response)=>{
	let username = request.query.username;
	let password = request.query.password;
	

	sql.query(`INSERT INTO user (username,password) VALUES ("${username}","${password}")`,(error)=>{
		if(error){
			console.log(error);
			response.send("error")
		}
		else{
			response.send("success")
		}
	})

})
//获取学生数据
express.get("/getStudents",(request,response)=>{
	const id = request.query.id;
	let s = id ? `SELECT * FROM stu WHERE id=${id}`:`SELECT * FROM stu`;
	sql.query(s,(error,data)=>{
		if(error){
			console.log(error)
			response.end("error")
		}else{
			response.send(data)
		}
	})
})
//删除学生数据
express.get("/deleteStudent",(request,response)=>{
	const id = request.query.id;
	sql.query(`DELETE FROM stu WHERE id=${id}`,(error,data) => {
		if (error) {
			console.log(error);
			response.end("error");
		}
		else {
			response.send("success");
		}
	})
})
//增加学生
express.get("/addStudent",(request,response)=>{
	// const id = request.query.id;
	const name = request.query.name;
	const age = request.query.age;
	const sex = request.query.sex;
	const city = request.query.city;
	const joinDate = request.query.joinDate;

	console.log(name)
	console.log(age)
	console.log(sex)
	console.log(city)
	console.log(joinDate)
	if(name && age && sex && joinDate){
		sql.query(`INSERT INTO stu (name,age,sex,city,joinDate) VALUES ("${name}","${age}","${sex}","${city}","${joinDate}")`,(error,data)=>{
			if(error){
				console.log(error)
				response.end("error")
			}else{
				response.send("success")
			}
		})
	}
	else{
		console.log(1)
		response.end("error");
	}

})
//修改学生信息
express.get("/editorStudent",(request,response)=>{
	const id = request.query.id;
	const name = request.query.name;
	const age = request.query.age;
	const sex = request.query.sex;
	const city = request.query.city;
	const joinDate = request.query.joinDate;

	// console.log(name)
	// console.log(age)
	// console.log(sex)
	// console.log(city)
	// console.log(joinDate)
	if(name && age && sex && joinDate){
		sql.query(`UPDATE stu SET name="${name}",sex="${sex}",age="${age}",city="${city}",joinDate="${joinDate}" WHERE id="${id}"`,(error,data) => {
			if(error){
				console.log(error)
				response.end("error")
			}else{
				// console.log(data)
				response.send("success")
			
			}
		})
	}else{
		// console.log("123")
		response.end("error");
	}
})
// express.get("/getStudentsList",(request,response)=>{
// 	// 获取来自前端请求name参数的参数值
// 	let name = request.query.name;
// 	let s = name ? `SELECT * FROM stu WHERE name="${name}"`: "SELECT * FROM stu";
// 	sql.query(s,(error,data)=>{
// 		response.send(data)
// 	})
// })
// //接收来自前端的请求并查找数据库并向前端返回查找结果 
// express.get("/getStudentsList",(request,response)=>{
// 	sql.query(`SELECT * FROM stu WHERE name="${name}"`,(error,data)=>{
// 		if(error){
// 			console.log(error);
// 		}
// 		else{
// 			response.send(data)
// 		}
// 	})
// })
// 监听来自前端的get请求(不是一个静态请求，而是一个路由请求)
// express.get("/list",(request,response)=>{
// 	// 在后端控制台输出内容
// 	console.log("接收到来自前端发送的请求");


// 	// 向前端返回数据
// 	response.send("success!!!!")
// })

// 监听来自前端的get请求(不是一个静态请求，而是一个路由请求)
// express.get("/details",(request,response)=>{
// 	// 在后端控制台输出内容
// 	console.log("接收到来自前端发送的details路由请求");
// 	// 向前端返回数据
// 	response.send("哈哈哈哈哈")
// })


// 监听在哪一个8080端口上
express.listen(port)
console.log("server is running at " + port)