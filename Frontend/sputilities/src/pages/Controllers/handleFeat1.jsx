import axios from "axios";

async function handleFeat1() {
  try {
    const response = await axios.get("http://localhost:3600/api/v1/feat_1");
    return true;
  } catch (error) {
    throw false;
  }
}
export default handleFeat1;
