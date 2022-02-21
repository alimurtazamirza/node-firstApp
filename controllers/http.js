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

const camundarequest = async (req, res, next) => {
  try {
    const body = req.body;
    let array = body.array;
    let successCount = 0;
    for (let index = 0; index < body.length; index++) {
      const element = body[index];
      var result;
      if (element.type == "bundle") {
        result = await bundleProducts(element, index);
      } else {
        result = await simpleProducts(element, index);
      }
      if (result.flag) {
        successCount++;
      }
    }
    if (count == successCount) {
      return res.status(200).json({
        message: "Response ok",
        status: 200,
      });
    } else {
      return res.status(400).json({
        message: "something went wrong on the request # " + successCount,
        status: 400,
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const simpleProducts = async (element, index) => {
  var responseAssignee = "";
  var flag = false;
  var postDataArray = {
    variables: {
      merchantID: {
        value: element.merchant_id,
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
      let postDataThree = { userId: "merchant_" + element.merchant_id };
      responseAssignee = await api.post(
        "task/" + taskResponseData[0]["id"] + "/assignee",
        JSON.stringify(postDataThree)
      );
      flag = true;
    }
  }
  return { message: responseAssignee, flag };
};

const bundleProducts = async (element, index) => {
  var responseAssignee = "";
  var flag = false;
  var postDataArray = {
    variables: {
      merchantID: {
        value: element.merchant_id,
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
    flag = true;
  }
  return { message: response, flag };
};

module.exports = {
  resolvestatus,
  getcustomerorderslist,
  camundarequest,
};
