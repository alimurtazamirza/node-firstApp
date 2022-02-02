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

const camundarequest = (req, res, next) => {
  try {
    const body = req.body;
    var postDataArray = [];
    body.map(async (element, index) => {
      postDataArray = {
        variables: {
          merchantID: {
            value: element.merchant_Id,
            type: "String",
          },
          orderId: {
            value: element.order_id,
            type: "String",
          },
          itemIds: {
            value: element.items,
            type: "String",
          },
        },
        businessKey: element.bpm_name,
      };
      let response = await api.post(
        "process-definition/key/" + element.bpm_name + "/start",
        JSON.stringify(postDataArray)
      );
      if (response.ok) {
        let postDataTwo = {
          processInstanceId: response.data.id,
        };
        let taskResponse = await api.post("task", JSON.stringify(postDataTwo));
        if (taskResponse.ok) {
          let taskResponseData = taskResponse.data;
          let postDataThree = { userId: "merchant_" + element.merchant_Id };
          let responseAssignee = await api.post(
            "task/" + taskResponseData[0]["id"] + "/assignee",
            JSON.stringify(postDataThree)
          );
          console.log(responseAssignee);
          return res.status(200).json({
            message: "response ok",
            status: responseAssignee.status,
          });
        } else {
          return res.status(400).json({
            message: taskResponse.originalError.message,
            status: taskResponse.status,
          });
        }
      }
      return res.status(400).json({
        message: response.originalError.message,
        status: response.status,
      });
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  resolvestatus,
  getcustomerorderslist,
  camundarequest,
};
