
//importing modules
import express from "express";

//initiating the router
const router = express.Router()

router.get("/", (req, res) => {
	res.send("Hello");
})

export default router;