// test/utils.js

exports.assertVMException = error => {
  const hasException = error.toString().search("VM Exception");
  assert(hasException, "Should expect a VM Exception error");
}
