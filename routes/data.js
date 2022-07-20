const express = require("express");
const { default: mongoose } = require("mongoose");
const AllData = require("../models/data");

const app = express();
app.use(express.json({ extended: false }));

const router = express.Router();

//GET USERS
/**
 * @swagger
 * /:
 *   get:
 *     summary: Get Users
 *     description: Get all the existing Users
 *     responses:
 *       '200':
 *         content:
 *           application/json:
 *             schema:
 *               type: Array
 *               properties:
 *               - _id:
 *                   type: string
 *                   description: Id of User
 *                   example: 62d7e3d6c4c4
 *                 name:
 *                   type: string
 *                   description: Name of User
 *                   example: Fred
 *                 sex:
 *                   type: string
 *                   description: Sex of User
 *                   example: male
 *                 age:
 *                   type: number
 *                   description: Age of User
 *                   example: '32'
 */
router.get("/", async (req, res) => {
  try {
    const data = await AllData.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// //GET SPECIFIC DATA
// router.get("/user/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const data = await AllData.findById(id);
//     res.status(200).json(data);
//   } catch (err) {
//     res.status(500).json({ message: err });
//   }
// });

//PUT SPECIFIC DATA
/**
 * @swagger
 * paths:
 *   "/user/{id}":
 *     put:
 *       summary: Updated User
 *       description: Update User
 *       parameters:
 *          - in: path
 *            name: id of the user
 *            description: Id of user
 *            type: string
 *            required: true
 *          - name: user
 *            in: body
 *            required: true
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  example: "John Doe"
 *                sex:
 *                   type: string
 *                   example: "Male"
 *                age:
 *                  type: integer
 *                  example: 20
 *       responses:
 *         '200':
 *            description: User Updated
 */
router.put("/user/:id", async (req, res) => {
  const { name, sex, age } = req.body;
  const { id } = req.params;
  try {
    const data = await AllData.findOneAndUpdate(
      id,
      { $set: { name: name, sex: sex, age: age } },
      { new: true }
    );
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
