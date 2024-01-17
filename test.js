const [$code, _code,dotCode] = ["$", "_",'.'].map((item) => item.charCodeAt(0));
const checkIsVar = (target) => {
	if(!target)return false
	const targetCode=target.charCodeAt(0)
  if (targetCode >= 65 && targetCode <= 122) {
    return true;
  }
  if (targetCode >= 48 && targetCode <= 57) {
    return true;
  }
  if (targetCode === _code) {
    return true;
  }
	if(targetCode===dotCode){
		return true
	}
  return false;
};
const checkIsScope = (code, position) => {
  for (let i = position; i >= 0; i--) {
    const target = code[i];

    if (checkIsVar(target)) continue;
		
    if (!checkIsVar(code[i-1])) {
			if(target==='$')return true;
			return false
    }
  }

  return false;
};
const code='$abc.bcd'
const res=checkIsScope('$abc.bcd',code.length-1)
console.log(res)