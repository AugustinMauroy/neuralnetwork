function parseCJSON(data) {
    const regex = /\/\/.*$|\/\*[\s\S]*?\*\//gm;
    const cleanedData = data.replace(regex, '');
    return JSON.parse(cleanedData);
  }

export default parseCJSON;
