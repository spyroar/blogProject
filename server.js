const express=require('express');
// const ejs=require('ejs')
const articleRoute=require('./routes/articles');
const Article=require('./models/article')
const mongoose=require('mongoose');
const methodOverride=require('method-override')

const app=express();

const port=process.env.port || 5555;

  //  Database Connection
 
      mongoose.connect('mongodb://127.0.0.1:27017/blog').
      then(()=>{
              console.log("Connected");
      }).
      catch((err)=>{
            console.log(err);
      })


  app.use(express.urlencoded({extended:false}));
  app.use(methodOverride('_method'))

  app.set('view engine','ejs')
  app.get('/',async(req,res)=>{
    
       let articles=await Article.find().sort({createdAt:'desc'});
       

      res.render('articles/index',{articles:articles})
  })
  app.use('/articles',articleRoute);
app.listen(port,()=>{
      console.log(`Port is Running on Number: ${port}`);
})

