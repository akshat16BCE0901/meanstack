var http=require("http");
var fs= require("fs");
var mongoClient = require("mongodb").MongoClient;
var url  = "mongodb://localhost:27017/";

http.createServer(function(req,res)
{
    mongoClient.connect(url,function(err,db)
    {
        if(err) throw err;
        var dbo = db.db("signature");
        // dbo.createCollection("details",function(err,res)
        // {
        //     if(err) throw err;
        //     console.log("collection created");
        // });
        var obj = {username:"akki",password:"akshat_71"};
        // dbo.collection("details").insertOne(obj,function(err,res)
        // {
        //     if(err) throw err;
        //     console.log("Document inserted");
        // });
        dbo.collection("details").find({}).toArray(function(error,result)
        {
            if(error) throw error;
            console.log(result);
            var myobj = JSON.stringify({records:result});
            res.writeHead(200,{"Content-Type":"text/html"});
            res.write(myobj);
            res.end();
            fs.writeFile("myfile.php",myobj,function(err)
            {
                if(err) throw err;
                console.log("saved");
            });
        });
    });
}).listen(3000);
