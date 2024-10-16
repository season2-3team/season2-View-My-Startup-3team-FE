export const formatAmount = (amount) => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return 'N/A'; // 값이 없거나 유효하지 않은 경우 'N/A'를 반환
  }  
  const hundredMillion = amount / 100000000;

  if (hundredMillion >= 1) {
    // 1억 이상이면 소수점 첫째 자리까지 표시, 정수인 경우는 소수점 없이 표시
    return hundredMillion % 1 === 0
      ? `${hundredMillion.toLocaleString()} 억`
      : `${hundredMillion.toFixed(1)} 억`;
  } else if (hundredMillion >= 0.01) {
    // 1억 미만이지만 백만 이상이면 소수점 둘째 자리까지 표시
    return `${hundredMillion.toFixed(2)} 억`;
  } else {
    // 1억 미만이고 백만 미만이면 원 단위로 표시
    return `${amount.toLocaleString()}`;
  }
};
