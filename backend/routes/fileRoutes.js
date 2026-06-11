const express =require("express");

const router =express.Router();

const upload =require("../config/multer");

const authMiddleware =require("../middleware/authMiddleware");

const {uploadFile,getFiles,deleteFile} = require("../controllers/fileController");

// FACULTY ONLY UPLOAD

router.post("/",authMiddleware,(req,res,next)=>{
if(req.user.role!== "faculty"){

return res.status(403).json({
msg:"Faculty only"
});
}
next();
},
upload.single("file"),uploadFile
);


// ALL STUDENTS VIEW FILES
router.get("/",getFiles);

// FACULTY ONLY DELETE FILE

router.delete(
  "/:id",

  authMiddleware,

  (req,res,next)=>{

    if(req.user.role !== "faculty"){

      return res.status(403).json({
        msg:"Faculty only"
      });

    }

    next();

  },

  deleteFile
);
module.exports =router;