exports.getAllResources = (Model) => async (req, res, next) => {
  try {
    const Doc = await Model.find({});
    res.status(200).json({
      status: "success",
      Document: Doc,
    });
  } catch (error) {
    res.status(200).json({
      status: "failed",
      error,
    });
  }
};
exports.GetUser = (Model) => async (req, res, next) => {
  try {
    const Doc = await Model.findById(req.params.id).select("+password");
    if (!Doc) return res.status(500).json("user này ko tồn tại");

    Doc.confirmpassword = undefined;
    res.status(200).json({
      status: "success",
      Document: Doc,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error,
    });
  }
};

exports.CreateResources = (Model) => async (req, res, next) => {
  try {
    const Doc = await Model.create(req.body);

    res.status(200).json({
      status: "success",
      Document: Doc,
    });
    
  } catch (error) {
    console.log(error);
    res.status(200).json({
      status: "failed",
      error,
    });
  }
};

exports.UpdateResources = (Model) => async (req, res, next) => {
  try {
    const Doc = await Model.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    
    if (!Doc) res.status(500).json("Resources ko tồn tại");
    res.status(200).json({
      status: "success",
      Document: Doc,
    });
  } catch (error) {
    res.status(200).json({
      status: "failed",
      error,
    });
  }
};

exports.DeleteResources = (Model) => async (req, res, next) => {
  try {
    const Doc = await Model.deleteOne({ _id: req.params.id });
    res.status(200).json({
      status: "success",
      Document: Doc,
    });
  } catch (error) {
    res.status(200).json({
      status: "failed",
      error,
    });
  }
};

exports.getResoures = (Model) => async (req, res, next) => {
  try {
    const Doc = await Model.findById({ _id: req.params.id });
    res.status(200).json({
      status: "success",
      Document: Doc,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error,
    });
  }
};
