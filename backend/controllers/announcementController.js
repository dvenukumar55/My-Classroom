const Announcement =require("../models/announcement");
// ADD
const addAnnouncement =async(req,res)=>{
try{
console.log(req.body);
const announcement =await Announcement.create(req.body);
console.log("Saved:", announcement);
res.json(announcement);
}
catch(err){
res.status(500)
.json({msg:err.message});}
};

// GET
const getAnnouncements =async(req,res)=>{
try{
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const announcements =await Announcement.find({
      createdAt:{ $gte: thirtyDaysAgo}
    });
    res.json(announcements);
  }
  catch(err){
    res.status(500).json({
      msg:err.message
    });
  }
};
//delete announcements
const deleteAnnouncement =async(req,res)=>{
  try{
    await Announcement.findByIdAndDelete(
      req.params.id
    );

    res.json({
      msg:"Announcement deleted"
    });

  }
  catch(err){
    res.status(500).json({
      msg:err.message
    });

  }

};

module.exports = {addAnnouncement,getAnnouncements,deleteAnnouncement};

