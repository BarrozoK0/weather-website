import path from "path";
import url from "url";

// Returns current directory path
function getCurrentDir(fileUrl) {
    const __filename = url.fileURLToPath(fileUrl)
    console.log(__filename)
    return path.dirname(__filename);
}

export default getCurrentDir;