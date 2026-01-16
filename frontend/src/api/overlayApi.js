import axios from "axios";

const API = "http://localhost:5000/overlays";

export const getOverlays = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const createOverlay = async (data) => {
  const res = await axios.post(API, data);
  return res.data;
};

export const updateOverlay = async (data) => {
  await axios.put(`${API}/${data._id}`, data);
};

export const deleteOverlay = async (id) => {
  await axios.delete(`${API}/${id}`);
};
