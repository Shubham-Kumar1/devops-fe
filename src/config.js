// config.js
const getProtocol = () => process.env.REACT_APP_TLS === "true" ? "https" : "http";

export { getProtocol };