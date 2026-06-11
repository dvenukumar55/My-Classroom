const File =require("../models/file");

// UPLOAD FILE
const uploadFile =async(req,res)=>{

try{

const file =await File.create({

subject:req.body.subject,

filename:req.file.filename,

filepath:req.file.path

});
res.status(201).json(file);
}

catch(err){
res.status(500).json({
msg:err.message
});
}
};


// GET FILES

const getFiles =async(req,res)=>{

try{
const files =await File.find();
res.status(200).json(files);
}

catch(err){
res.status(500).json({
msg:err.message
});
}
};

// DELETE FILE

const deleteFile = async(req,res)=>{

  try{

    await File.findByIdAndDelete(
      req.params.id
    );

    res.json({
      msg:"File deleted"
    });

  }

  catch(err){

    res.status(500).json({
      msg:err.message
    });

  }

};

module.exports = {uploadFile,getFiles,deleteFile};