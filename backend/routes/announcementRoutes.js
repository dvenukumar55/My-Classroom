const express =require("express");
const router =express.Router();

const authMiddleware =require("../middleware/authMiddleware");

const {addAnnouncement,getAnnouncements,deleteAnnouncement}=require("../controllers/announcementController");

// faculty only

router.post("/",authMiddleware,(req,res,next)=>{
    if(req.user.role !== "faculty"){
      return res.status(403).json({ msg:"Faculty only"});
    }
    next();
  },addAnnouncement
);

// students view
router.get("/",getAnnouncements);
module.exports =router;

//delete announcement

router.delete( "/:id",authMiddleware,(req,res,next)=>{
    if(req.user.role !== "faculty"){
      return res.status(403).json({msg:"Faculty only"});
  }
    next();
},deleteAnnouncement
);
module.exports = router;