import { Router } from "express";
import { protect } from "../middleware/protect.middlewate.js";
const router = Router()

router.route('/')
    .all(protect)
    .get((req, res) => {
        console.log("here in the endpoint");
        console.log(req.user);
    })


export default router