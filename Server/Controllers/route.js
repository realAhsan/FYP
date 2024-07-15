import Route from "../Models/routes.js";

export const getRoute = async (req, res) => {
  try {
    const routes = await Route.find();
    res.json(routes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addNewRoute = async (req, res) => {
  try {
    const { name, no, startPoint, endPoint } = req.body;
    // const newRoute = new Route({ name, no, startPoint, endPoint });
    const savedRoute = await Route.create({ name, no, startPoint, endPoint });
    res.status(201).json({ message: "success" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateRoute = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, no, startPoint, endPoint } = req.body;
    const updatedRoute = await Route.findByIdAndUpdate(
      id,
      { name, no, startPoint, endPoint },
      { new: true, runValidators: true }
    );
    if (!updatedRoute) {
      return res.status(404).json({ error: "Route not found" });
    }
    res.json(updatedRoute);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteRoute = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRoute = await Route.findByIdAndDelete(id);
    if (!deletedRoute) {
      return res.status(404).json({ error: "Route not found" });
    }
    res.json({ message: "Route deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
