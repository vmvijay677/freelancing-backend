import FreelancerModel from "../Models/Freelancer.js";
import ClientModel from "../Models/Client.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//freelancer registration
export const registerFreelancer = async (req, res) => {
    const salt = await bcrypt.genSalt(10);

    const hashedPass = await bcrypt.hash(req.body.password, salt);

    req.body.password = hashedPass;
    const newUser = new FreelancerModel(req.body);

    const { email } = req.body;

    try {
        const oldUser = await FreelancerModel.findOne({ email });

        if (oldUser) {
            return res.status(400).json({ message: "User already exists!" });
        }
        const user = await newUser.save();

        const token = jwt.sign({
            name: user.name,
            id: user._id
        }, process.env.JWT_KEY, { expiresIn: '1h' });

        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//client registration
export const registerClient = async (req, res) => {
    const salt = await bcrypt.genSalt(10);

    const hashedPass = await bcrypt.hash(req.body.password, salt);

    req.body.password = hashedPass;
    const newUser = new ClientModel(req.body);

    const { email } = req.body;

    try {
        const oldUser = await ClientModel.findOne({ email });

        if (oldUser) {
            return res.status(400).json({ message: "User already exists!" });
        }
        const user = await newUser.save();

        const token = jwt.sign({
            name: user.name,
            id: user._id
        }, process.env.JWT_KEY, { expiresIn: '1h' });

        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//freelancer login
export const loginFreelancer = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await FreelancerModel.findOne({ email: email });

        if (user) {
            const validity = await bcrypt.compare(password, user.password);

            if (!validity) {
                res.status(400).json("Email or password is incorrect!");
            } else {
                const token = jwt.sign({
                    email: user.email,
                    id: user._id
                }, process.env.JWT_KEY, { expiresIn: '1h' });

                res.status(200).json({ user, token });
            }
        } else {
            res.status(404).json("User does not exists!");
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//client login
export const loginClient = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await ClientModel.findOne({ email: email });

        if (user) {
            const validity = await bcrypt.compare(password, user.password);

            if (!validity) {
                res.status(400).json("Email or password is incorrect!");
            } else {
                const token = jwt.sign({
                    email: user.email,
                    id: user._id
                }, process.env.JWT_KEY, { expiresIn: '1h' });

                res.status(200).json({ user, token });
            }
        } else {
            res.status(404).json("User does not exists!");
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//get all freelancers
export const getFreelancers = async (req, res) => {
    try {
        const freelancer = await FreelancerModel.find({});

        res.status(200).json(freelancer);
    } catch (error) {
        res.status(500).json(error);
    }
};

//get freelancer by id
export const getFreelancerById = async (req, res) => {
    const userId = req.params.id;

    try {
        const freelancer = await FreelancerModel.findById(userId);

        res.status(200).json(freelancer);
    } catch (error) {
        res.status(500).json(error);
    }
}