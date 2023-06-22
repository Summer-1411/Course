const APIFeatures = require("./../../utill/callApi");
const Coures = require("../models/coures");
const handleFactory = require("./handleFactory");

exports.updateCoures = async (req, res, next) => {
  const updateCoures = await Coures.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    newUpdateCoures: updateCoures,
  });
};
exports.getAllCoures = async (req, res, next) => {
  try {
    let fillter = {};
    // if (req.params.id) {
    //     fillter = { coures: req.params.id }
    // }
    const coures = new APIFeatures(Coures.find(fillter), req.query)
      .fillter()
      .sort()
      .limitFields()
      .page();
    const doc = await coures.query;
    res.status(200).json({
      status: "success",
      Document: doc,
    });
  } catch (err) {
    res.status(200).json({
      status: "failed",
      err,
    });
  }
};

exports.deleteCoures = handleFactory.DeleteResources(Coures);
exports.newCoures = handleFactory.CreateResources(Coures);
exports.getCoures = handleFactory.getResoures(Coures);
