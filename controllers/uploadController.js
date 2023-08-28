import slugify from "slugify";
import fs from "fs";
import dotenv from "dotenv";
import uploadModel from "../models/uploadModel.js";

//createProductController:
export const createUploadController = async (req, res) => {
  try {
    const { name } = req.fields;
    const { photo } = req.files;
    //validation:
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "Photo is Required & should be less than 1mb" });
    }

    const product = await new uploadModel({
      ...req.fields,
      slug: slugify(name),
    });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();
    res.status(201).send({
      success: true,
      message: "Upload created successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while Creating Upload",
    });
  }
};
