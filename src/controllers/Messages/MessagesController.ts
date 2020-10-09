import { Request, Response } from "express";

import MessageSchema from "../../models/Message";

import { decryptRSA } from "../../utils/cryptRSA";
import { decrypt } from "../../utils/crypt";

class MessagesController {
  async create(req: Request, res: Response) {
    const { hash, key, userId } = req.body;

    try {
      const message = await MessageSchema.create({
        hash,
        key,
        user_id: userId,
      });

      return res.status(201).json({ id: message._id });
    } catch (err) {
      return res.status(400).json({ error: "Creation failed" });
    }
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const { userId } = req.body;

    try {
      const message = await MessageSchema.findOne({ _id: id, user_id: userId });

      if (message) {
        const keyDec = decryptRSA(message.key);
        const messageDec = decrypt(message.hash, keyDec);

        return res.status(200).json({ message: messageDec });
      } else {
        return res.status(400).json({ error: "Not Found" });
      }
    } catch (err) {
      return res.status(400).json({ error: "Show failed" });
    }
  }
}

export default MessagesController;