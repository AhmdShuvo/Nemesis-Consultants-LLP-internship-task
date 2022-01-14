const { MongoClient, Admin } = require("mongodb");
const express=require('express');
const Objectid=require('mongodb').ObjectId;
const cors=require('cors');
require("dotenv").config();
const jwt =require ('jsonwebtoken')


const app=(express())




const port =process.env.PORT || 9000;




app.use(express.json())
app.use(cors())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0qtlc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
 
async function run() {
    try {
      await client.connect();
      console.log("connected");
      const database = client.db('insertDB5');
      const usersCollection = database.collection('user');
      // Query for a movie that has the title 'Back to the Future'
    app.post("/users",async(req,res)=>{

        console.log("api Hit", req.body);
        const user=req.body;
       const result=await  usersCollection.insertOne(user);
        res.json(user)

        
    })

    app.get("/users", varifyToken, async (req,res)=>{

        jwt.verify(req.token, 'privateKey', function(err, decoded) {
      if(err){

        res.sendStatus(403)
      }
    });

        const cursor= usersCollection.find({});
        const result= await cursor.toArray();
        res.json(result)
    })

    app.delete("/user/:id",async (req,res)=>{
  
      const id= req.params.id;
      const query={_id: Objectid(id)}
      console.log(id);
      const result=await usersCollection.deleteOne(query);

      res.send(result)
    })
    } finally {
      // Ensures that the client will close when you finish/error
    //   await client.close();
    }
  }
  run().catch(console.dir);


  app.post("/login", (req,res)=>{

  

    const user={
      id:1,
      email:"admin@namasys.co",
      password:'admin123'
    }
    jwt.sign({user}, "privateKey", function(err, token) {
  console.log(token);
  res.json(token)
    });

    
  })

function varifyToken(req,res,next){
  const barerHeader= req.headers['authorization'];
  if(typeof barerHeader!==undefined){

    const barer=barerHeader.split(" ");
    const barerToken=barer[1];

    req.token=barerToken;
    next()
  }
  else{
    res.sendStatus(403)
  }


  }

app.get('/',async(req,res)=>{
           
    res.send("server Running")
          
 
   })
 
   app.listen(port, () => {
     console.log(`Example app listening at http://localhost:${port}`)
   })