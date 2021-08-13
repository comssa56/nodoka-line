// millisecond単位の一時停止
// 呼び出し側でawaitすること
exports.sleep = async function(_ms) {
    const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await _sleep(_ms);
}
