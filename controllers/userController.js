const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
const User = require('../models/user');

const register = async (req, res) => {
  try {
    const {
      email,
      fname,
      lname,
      password,
      phone,
      code,
      address,
      city,
      zip,
      country,
    } = req.body;

    if (
      !email ||
      !fname ||
      !lname ||
      !password ||
      !phone ||
      !code ||
      !address ||
      !city ||
      !zip ||
      !country
    ) {
      return res.status(400).send({ error: 'All fields are required' });
    }

    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res.status(409).send({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email: email.toLowerCase(),
      fname,
      lname,
      password: hashedPassword,
      phone,
      code,
      address,
      city,
      zip,
      country,
      otp: 0,
      resetAttempts: 0,
    });

    const token = jwt.sign(
      { id: user._id, email: email, name: fname + ' ' + lname },
      process.env.SECRET_KEY,
      { expiresIn: '24h' }
    );

    res.status(201).send({
      data: {
        token: token,
        email: email,
        name: fname + ' ' + lname,
      },
    });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ error: 'All fields are required' });
    }

    const existingUser = User.findOne({ email });

    if (
      existingUser &&
      (await bcrypt.compare(password, existingUser.password))
    ) {
      const token = jwt.sign(
        {
          id: existingUser._id,
          email: email,
          name: existingUser.fname + ' ' + existingUser.lname,
        },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
      );

      return res.status(200).send({
        data: {
          token: token,
          email: email,
          name: existingUser.fname + ' ' + existingUser.lname,
        },
      });
    }

    res.status(401).send({ error: 'Invalid credentials' });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const email = req.body;

    if (!email) {
      return res.status(400).send({ error: 'All fields are required' });
    }

    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      const otp = Math.floor(1000 + Math.random() * 9000);
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to: email,
        from: process.env.MAIL_DEFAULT_SENDER,
        dynamic_template_data: { otp: otp },
        template_id: process.env.SENDGRID_TEMPLATE_ID,
      };

      await sgMail.send(msg);
      await User.updateOne({ email: email }, { $set: { otp: otp } });
      return res.status(200).send({ message: 'OTP successfully sent' });
    }

    res.status(401).send({ error: 'Email does not exist' });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

const checkOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).send({ error: 'All fields are required' });
    }

    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      const dbOtp = existingEmail.otp;
      if (dbOtp != otp) {
        if (existingEmail.resetAttempts == 2) {
          await User.updateOne(
            { email: email },
            { $set: { otp: 0, resetAttempts: 0 } }
          );
          return res.status(429).send({
            error: 'You have entered the incorrect OTP too many times',
          });
        }

        await User.updateOne(
          { email: email },
          { $set: { resetAttempts: existingEmail.resetAttempts + 1 } }
        );
        return res.status(401).send({ error: 'Incorrect OTP' });
      }
      await User.updateOne(
        { email: email },
        { $set: { otp: 0, resetAttempts: 0 } }
      );
      return res.status(200).send({ message: 'OTP verification successful' });
    }

    res.status(401).send({ error: 'Email does not exist' });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ error: 'All fields are required' });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.updateOne(
        { email: email },
        { $set: { password: hashedPassword } }
      );
      return res.status(200).send({ message: 'Password reset successful' });
    }
    res.status(401).send({ error: 'Email does not exist' });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

const updateDetails = async (req, res) => {
  try {
    const {
      id,
      email,
      fname,
      lname,
      phone,
      code,
      address,
      city,
      zip,
      country,
    } = req.body;
    if (
      !email ||
      !fname ||
      !lname ||
      !phone ||
      !code ||
      !address ||
      !city ||
      !zip ||
      !country
    ) {
      return res.status(400).send({ error: 'All fields are required' });
    }

    const existingUser = await User.findOne({ _id: id });

    if (existingUser) {
      if (existingUser.email == email) {
        await User.updateOne(
          { _id: id },
          {
            $set: {
              fname,
              lname,
              phone,
              code,
              address,
              city,
              zip,
              country,
            },
          }
        );
        const token = jwt.sign(
          { id: id, email: email, name: fname + ' ' + lname },
          process.env.SECRET_KEY,
          { expiresIn: '24h' }
        );
        return res.status(200).send({
          data: {
            token: token,
            email: email,
            name: fname + ' ' + lname,
          },
        });
      } else {
        const existingEmail = await User.findOne({ email: email });
        if (existingEmail) {
          return res.status(409).send({ error: 'Email already exists' });
        } else {
          await User.updateOne(
            { _id: id },
            {
              $set: {
                email: email.toLowerCase(),
                fname,
                lname,
                phone,
                code,
                address,
                city,
                zip,
                country,
              },
            }
          );

          const token = jwt.sign(
            { id: id, email: email, name: fname + ' ' + lname },
            process.env.SECRET_KEY,
            { expiresIn: '24h' }
          );
          return res.status(200).send({
            data: {
              token: token,
              email: email,
              name: fname + ' ' + lname,
            },
          });
        }
      }
    }
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

module.exports = {
  register,
  login,
  forgotPassword,
  checkOtp,
  resetPassword,
  updateDetails,
};
