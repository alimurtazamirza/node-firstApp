const api = require("../util/api");

// fetch
const resolvestatus = async (req, res, next) => {
  try {
    let response = await api.get("api/complain/resolvestatus");
    if (!response.ok) {
      throw new Error(`${response.originalError.message}`);
    }
    res.status(200).json(response.data);
  } catch (error) {
    res.status(200).json({ message: error.message });
  }
};

const getcustomerorderslist = async (req, res, next) => {
  try {
    let response = await api.post("api/getcustomerorderslist", {
      customerdata: {
        custid: "",
        msisdn: "",
        email: "",
      },
    });
    if (!response.ok) {
      throw new Error(`${response.originalError.message}`);
    }
    res.status(200).json(response.data);
  } catch (error) {
    res.status(200).json({ message: error.message });
  }
};

module.exports = {
  resolvestatus,
  getcustomerorderslist,
};
