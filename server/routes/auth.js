const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const sharp = require("sharp");

const User = require("../models/User");

/* Configuration Multer for File Upload */
/* const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/"); // Store uploaded files in the 'uploads' folder
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original file name
    },
}); */
const storage = multer.memoryStorage({})

const upload = multer({ storage });

router.get('/img', (req, res) => {
    console.log('first')
    res.json('hi ')
    let data = Date.now()
    console.log(data)


    sharp('public/uploads/green-forest-desktop-sugd8ukg12nr9rmv.webp').extract({ left: 30, top: 30, })

        .toFile('public/uploads/' + data + 'green-forest-desktop-sugd8ukg12nr9rmv.webp', (err, info) => { console.log(err, info) });
})


/* USER REGISTER */
router.post("/register", upload.single("profileImage"), async (req, res) => {
    try {
        /* Take all information from the form */
        const { firstName, lastName, email, password } = req.body;
        console.log('first', req.body)
        /* The uploaded file is available as req.file */
        const profileImage = req.file;
        const profileImageName = profileImage.originalname.split('.')[0]
        if (!profileImage) {
            return res.status(400).send("No file uploaded");
        }
        console.log(profileImage)
        /*  sharp(profileImage.buffer).resize(300).toFile('public/uploads/' + Date.now() + profileImage.originalname + '.webp', (er, inf) => console.log(er, inf))
         return res.json('hisdf') */
        /* path to the uploaded profile photo */
        /*  let profileImagePath = profileImage.path;
         let e = profileImage.destination + Date.now() + '_Date_' + profileImageName + '.webp' */
        let pathToSave = 'public/uploads/' + Date.now() + '_Date_' + profileImageName + '.webp'
        sharp(profileImage.buffer)
            .resize(100)
            .toFile(pathToSave, (err, info) => { console.log(err, info) });
        profileImagePath = pathToSave
        console.log(profileImagePath, "e")
        /* Check if user exists */
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists!" });
        }

        /* Hass the password */
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        /* Create a new User */
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            profileImagePath,
        });

        /* Save the new User */
        await newUser.save();

        /* Send a successful message */
        res
            .status(200)
            .json({ message: "User registered successfully!", user: newUser });
    } catch (err) {
        console.log(err);
        res
            .status(500)
            .json({ message: "Registration failed!", error: err.message });
    }
});

/* USER LOGIN*/
router.post("/login", async (req, res) => {
    try {
        /* Take the infomation from the form */
        const { email, password } = req.body

        /* Check if user exists */
        console.log('req.body', req.body)
        const user = await User.findOne({ email });
        console.log('user : ', user)
        if (!user) {
            return res.status(409).json({ message: "User doesn't exist!" });
        }

        /* Compare the password with the hashed password */
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials!" })
        }

        /* Generate JWT token */
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        delete user.password

        res.status(200).json({ token, user })

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message })
    }
})

module.exports = router