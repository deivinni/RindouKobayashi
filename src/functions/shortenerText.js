module.exports = (text, maxLen = 1500) => (text.length > maxLen ? `${text.substr(0, maxLen - 3)}...` : text);
