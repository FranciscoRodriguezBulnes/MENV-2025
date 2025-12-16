import { Router } from "express";
import {
  getLinks,
  createLink,
  getLink,
  removeLink,
} from "../controllers/link.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import {
  bodyLinkValidator,
  // paramLinkValidator,
} from "../middlewares/validatorManager.js";
const router = Router();

//GET all links /api/v1/links/
router.get("/", requireToken, getLinks);

// GET a specific link /api/v1/links/:id
router.get("/:id", requireToken, getLink);

// POST create a new link /api/v1/links/
router.post("/", requireToken, bodyLinkValidator, createLink);

//PATCH/PUT update a link /api/v1/links/:id

// DELETE a link /api/v1/links/:id
router.delete("/:id", requireToken, removeLink);

export default router;
