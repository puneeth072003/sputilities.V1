import { legacyAPI } from "../../services/api";

async function handleFeat1() {
  try {
    const response = await legacyAPI.feat1();
    return true;
  } catch (error) {
    throw false;
  }
}
export default handleFeat1;
