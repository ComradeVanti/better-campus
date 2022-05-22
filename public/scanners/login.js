/**
 * @type {Scanner}
 */
const scanner = (doc) => {
  const loginToken = doc.querySelector("input[name='logintoken']").value;
  return { loginToken };
};

export default scanner;
