import axios from "axios";
import { clodudinaryImage } from "../dev.env";

const upload = async (file) => {
	const data = new FormData();
	data.append("file", file);
	data.append("upload_preset", "fiverrfol");

	try {
		const res = await axios.post(clodudinaryImage, data);
		const { url } = res.data;
		return url;
	} catch (err) {
		// console.log(err);
	}
};

export default upload;