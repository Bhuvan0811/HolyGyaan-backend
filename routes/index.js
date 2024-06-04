const express = require("express");
const userRouter = require("./userRouter.js");
const BhagavadGitaRouter = require("./Bhagavad_Gita.js");
const HolyBibleRouter = require("./Bible.js");
const QuranRouter = require("./Quran.js");
const TranslateRouter = require("./translate.js");
const router = express.Router();

router.use("/BhagavadGita", BhagavadGitaRouter);
router.use("/Bible", HolyBibleRouter);
router.use("/Quran", QuranRouter);
router.use("/translate", TranslateRouter);
router.use("/user", userRouter);

module.exports = router

