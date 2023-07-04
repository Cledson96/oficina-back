import { Router } from "express";
import { produto } from "../controllers/produto.controller";
import path from "path";
import multer from "multer";
import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
   
      const extension = path.extname(file.originalname);
      const filename = `foto-${uuidv4()}${extension}`;
      cb(null, filename);
    },
  });

  const upload3 = multer({ storage: storage })

const router = Router();

router.post("/produtos",upload3.fields([{ name: 'foto', maxCount: 1 }, { name: 'fotos', maxCount: 8 }]),produto);

export default router;
