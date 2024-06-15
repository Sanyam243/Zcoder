const express = require("express");
const main = express();
const multer = require("multer");
const session = require('express-session');

const cors = require('cors');
main.use(cors({

  origin: 'http://localhost:5173',
  methods: ['GET', 'POST']
}));


main.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

const User = require("./user");
const Question = require("./questionschema");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./views/uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

main.use(express.json());
main.set("view engine", "ejs");
main.use(express.urlencoded({ extended: false }));
main.use(express.static("./views"));

main.listen(3000, () => {
  console.log("port connected");
});

main.get("/", async (req, res) => {
  const id = "665aa2ad3c5c5ce5ada302b0";
  const user = await User.findById(id);
  const questions = await Question.find();
  res.render("landing", { user, questions });
});
main.post("/questions", async (req, res) => {
  const userEmail = req.query.email;
  //const userId = "665aa2ad3c5c5ce5ada302b0";
  const { title, link, topics ,solution} = req.body;
  const topicsArray = Array.isArray(topics) ? topics : [topics];
  const question = new Question({
    title: title,
    link: link,
    topics: topicsArray,
    solution: solution
  });

  console.log(question);


  try {
    await question.save();
    const user = await User.findOne({ email: userEmail });
    if (user) {
      
        const questions = await Question.find();
        return res.json({ user, questions });
        //res.render("landing", { user, questions });
      
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});


main.post("/register", upload.single("profile_image"), async (req, res) => {
  try {

   
    if (!req.file) {
      console.log("here");
      return res.status(400).send("No file uploaded.");
     
    }

   

    const user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      city: req.body.city,
      college: req.body.college,
      email: req.body.email,
     userhandle: req.body.userhandle.toLowerCase(),
      profile_image: req.body.profile_image,
      password: req.body.password,
      bookmark: [],
      following: [],
    
    });
     console.log(user);

    try {
      await user.save();
      const questions = await Question.find();
      if (req.session.questionToBookmark) {
        user.bookmark.push(req.session.questionToBookmark);
        await user.save();
        req.session.questionToBookmark = null;
      }
      if (req.session.bookmark) {
        const bookmarkedQuestions = await Question.find({
          _id: { $in: user.bookmark },
        });
       // res.render("bookmarkquestions", { user, bookmarkedQuestions });
        req.session.bookmark = null;
        return;
      }
     return res.json({ user, questions });
    } catch (err) {
      if (err.code === 11000) {
        return res.status(400).send("Email already exists");
      } else {
        console.error("Error inserting data into MongoDB:", err);
        return res.status(500).send("Internal Server Error");

      }
    }
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).send("Error occurred");
  }
});

main.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user.password === req.body.password) {
      const questions = await Question.find();
      if (req.session.questionToBookmark) {
        user.bookmark.push(req.session.questionToBookmark);
        await user.save();
        req.session.questionToBookmark = null;
      }
      if (req.session.bookmark) {
        const bookmarkedQuestions = await Question.find({
          _id: { $in: user.bookmark },
        });
        req.session.bookmark = null;
       // return res.render("bookmarkquestions", { user, bookmarkedQuestions });
       return res.json({ user, bookmarkedQuestions });
      }

      console.log(user);
      //res.render("landing", { user, questions });
      return res.json({ user, questions });
    } else {

     
      console.log("Invalid credentials");
      return res.status(401).json({ message: "Invalid credentials" });
      //res.render("signin1");
    }
  } catch {
    
    return res.status(500).json({ message: "An error occurred during sign-in" });
  }
});

main.post("/bookmark/:questionId/:email", async (req, res) => {
  const userEmail = req.params.email;
  console.log(userEmail);
  //const userId = "665aa2ad3c5c5ce5ada302b0";
  const questionId = req.params.questionId;

  const user = await User.findOne({email: userEmail});
  if (user) {
    
      if (!user.bookmark.includes(questionId)) {
        user.bookmark.push(questionId);
        await user.save();
      }else{
        return res.status(400).send("Question already bookmarked");
      }
      const questions = await Question.find();
     return res.json({ user,bookmark: user.bookmark});
    
  } else {
    res.status(404).send("User not found");
  }
});

main.get("/bookmarkquestions", async (req, res) => {
  const userEmail = req.query.email;
  const userId = "665aa2ad3c5c5ce5ada302b0";

  try {
    const user = await User.findOne({ email: userEmail });
    if (user) {
    
        const bookmarkedQuestions = await Question.find({
          _id: { $in: user.bookmark },
        });
       return res.json({ user, bookmarkedQuestions });
      
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

main.post("/unbookmark/:questionId/:email", async (req, res) => {
  const userEmail = req.params.email;
  const questionId = req.params.questionId;

  const user = await User.findOne({ email: userEmail });
  if (user) {
    index = user.bookmark.findIndex((id) => id !== questionId);
    if (index !== -1) {
      user.bookmark.splice(index, 1);
    }
    await user.save();
      const bookmarkedQuestions = await Question.find({
      _id: { $in: user.bookmark },
    });
    return res.json({ user, bookmarkedQuestions });
  } else {
    res.status(404).send("User not found");
  }
});

main.get("/landing", async (req, res) => {
  const userId = req.query.userId;

  try {
    const user = await User.findById(userId);
      const questions = await Question.find();
      res.render("landing", { user, questions });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

main.get("/question", async (req, res) => {
  const userEmail = req.query.email;
  const user = await User.findOne({ email: userEmail });
  const questions = await Question.find();
  return res.json({ user, questions });
});

main.get('/profile', async (req, res) => {
  const userId = "6662cd42490ac3d411468604";
  try {
    const user = await User.findOne({ email: req.query.email });
    
       // console.log('Profile Image:', user.profile_image);
       // res.render('profile', { user });
        return res.json({ user });
      
    }
  catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).send('Internal Server Error');
  }
});

main.get("/edit", async (req, res) => {
  const userId = req.query.userId;

  try {
    const user = await User.findById(userId);
    res.render("edit", { user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

main.post("/update", async (req, res) => {
  try {
      const userId = req.query.userId; 
      const updatedUserData = {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          city: req.body.city,
          college: req.body.college,
          email: req.body.email,
          userhandle: req.body.userhandle,
          password: req.body.password, 
    };
    console.log(updatedUserData);

      const updatedUser = await User.findOneAndUpdate(
          { _id: userId },
          updatedUserData,
          { new: true } 
      );
     

      if (!updatedUser) {
          return res.status(404).send("User not found"); 
      }

      return res.json({ user: updatedUser });
  } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).send("Internal Server Error");
  }
});

main.get("/handle", async (req, res) => {
  const userId = req.query.userId;

  try {
    const user = await User.findById(userId);
    res.render("addhandle", { user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

main.post("/addHandles", async (req, res) => {

  try {
      const { userId, handleName, handleLink } = req.body;

      const updatedUser = await User.findOneAndUpdate(
          { _id: userId },
          { $set: { [`handles.${handleName}`]: handleLink } },
          { new: true }
      );

     return res.json({ user: updatedUser });
  } catch (error) {
      console.error("Error updating handles:", error);
      res.status(500).send("Internal Server Error");
  }
});

main.get('/searchUser', async (req, res) => {
 // const usercurrId = req.query.userId; // Use req.query.userId for GET requests
  try {
      const userhandle = req.query.userhandle.toLowerCase();
      const user = await User.findOne({ userhandle });

      if (!user) {
          return res.status(404).send("User not found");
      }
      console.log(user);

      return res.json({ user }); 
  } catch (error) {
      console.error("Error searching user:", error);
      res.status(500).send("Internal Server Error");
  }
});


main.get("/profile", async (req, res) => {
  const userId = req.query.userId;

  try {
    const user = await User.findById(userId);
    res.render("profile", { user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

main.post('/follow/:userId', async (req, res) => {
  const userId = req.params.userId;
  const userIdToFollow = req.body.userIdtofollow;

  if (userIdToFollow === userId) {
      return res.status(400).send("You cannot follow yourself");
  }

  try {
    const user = await User.findById(userId);

      if (!user.following) {
        user.following = [];
        user.following.push(userIdToFollow);
      }
      if (!user.following.includes(userIdToFollow)) {
        user.following.push(userIdToFollow);
        await user.save();
    }
    

      //res.render("profile", { user });
      return res.json({ user });
  } catch (error) {
      console.error("Error following user:", error);
      res.status(500).send("Internal Server Error");
  }
});




