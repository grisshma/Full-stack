import mysql from "mysql2";
 const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "susy",
 });

db.connect((err)=>{
    if(err) {
        console.log(err);
    } else {
        console.log("Database connected sucessfully");
    }
})


 export default db