import Company from "../models/companyModel.js";

export const registerCompany = async (req, res) => {
  const userId = req.userId;
  const { name, location, website, description } = req.body;


  if (!name || !location || !website || !description) {
    throw new Error("Please provide all required details...❌");
  }

  if (!userId) {
    return res.status(401).json({
      success: false,
      error: true,
      message: "Please login first...❌",
    });
  }

  try {
    let company = await Company.create({
      name: name,
      location: location,
      description: description,
      website: website,
      userId: userId,
    });

    await company.save();

    res.status(200).json({
      success: true,
      error: false,
      message: `Company ${company.name} registered successfully...✅`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      success: false,
      message: error.message,
    });
  }
};

export const updateCompany = async (req, res) => {
  const userId = req.userId;
  const { companyId, name, location, website, description } = req.body;

  // Check for required fields
  if (!companyId || !userId) {
    return res.status(400).json({
      success: false,
      error: true,
      message: "Please provide company ID and ensure you're logged in...❌",
    });
  }

  if (!name && !location && !website && !description) {
    return res.status(400).json({
      success: false,
      error: true,
      message: "Please provide at least one field to update...❌",
    });
  }

  try {
    const company = await Company.findOne({ _id: companyId, userId: userId });
    if (!company) {
      return res.status(404).json({
        success: false,
        error: true,
        message:
          "Company not found or you don't have permission to update this company...❌",
      });
    }

    if (name) company.name = name;
    if (location) company.location = location;
    if (website) company.website = website;
    if (description) company.description = description;

    await company.save();

    res.status(200).json({
      success: true,
      error: false,
      message: `Company ${company.name} updated successfully...✅`,
      data: company,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: true,
      message:
        "An error occurred while updating the company. Please try again later...❌",
    });
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.userId;
    const companies = await Company.find({ userId });
    if (!companies) {
      throw new Error("Companies not found...❌");
    }


    return res.status(200).json({
      success: true,
      error: false,
      data: companies,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      throw new Error("Company not found...✅");
    }

    return res.status(200).json({
      success: true,
      error: false,
      data: company,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};
