
const mongoose=require('mongoose');
const marked=require('marked')
const  slugify=require('slugify');
const createDOMPurify=require('dompurify');
const { JSDOM }=require('jsdom')
//  const domPurify=createDomPurify(new JSDOM().window);


const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);


           

  const articlesSchema=new mongoose.Schema({
     title:{
         type:String,
         required:true
     },
     description:{
        type:String,
        // required:true
    },
    markdown:{
        type:String,
        required:true
    },
    createdAt:{
          type:Date,
          default:Date.now
    },
    slug:
    {
        type:String,
        required:true,
        unique:true
    },
    sanitizedHtml:
    {
      type:String,
      required:true
    }
  })

        articlesSchema.pre('validate',function(next){

            if(this.title)
            {
              this.slug=slugify(this.title,{lower:true,strict:true});
            }
            if(this.markdown)
            {
              this.sanitizedHtml=DOMPurify.sanitize(this.markdown);
            }
            next();
        });
    const articleModel= mongoose.model('Article',articlesSchema);

     module.exports=articleModel;