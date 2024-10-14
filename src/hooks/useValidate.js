import { useState } from 'react';

export default function useValidate(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const formatNumber = (value) => {
    return value.replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const validate = () => {
    let isValid = true;
    let newError = {};

    if (!values.name || values.name.length < 1 || values.name.length > 10) {
      isValid = false;
      newError.name = '10자 이내로 입력해주세요.';
    }

    if (!values.comment || values.comment.length < 10) {
      isValid = false;
      newError.comment = '10자 이상 입력해주세요.';
    } else if (!values.comment || values.comment.length > 100) {
      isValid = false;
      newError.comment = '100자 이내로 입력해주세요.';
    }

    const investAmount = values.investAmount.replace(/,/g, '');
    if (
      !values.investAmount ||
      values.investAmount.length < 1 ||
      isNaN(values.investAmount)
    ) {
      isValid = false;
      newError.investAmount = '숫자로 입력해주세요.';
    }

    if (!values.password || values.password.length < 6) {
      isValid = false;
      newError.password = '6자 이상 입력해주세요.';
    }

    if (!values.checkPassword || !(values.password === values.checkPassword)) {
      isValid = false;
      newError.checkPassword = '비밀번호가 일치하지 않습니다.';
    }

    setErrors(newError);
    return isValid;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === 'investAmount') {
      const formattedValue = formatNumber(value);
      setValues({
        ...values,
        [id]: formattedValue
      });
    } else {
      setValues({
        ...values,
        [id]: value
      });
    }

    // 에러 초기화
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: ''
    }));
  };

  const handleBlur = (e) => {
    const { id } = e.target;
    let newError = {};

    if (!values[id] || values[id].trim() === '') {
      newError[id] = '* 필수 입력 항목입니다.';
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: newError[id] || ''
    }));
  };

  return {
    values,
    errors,
    validate,
    handleChange,
    handleBlur
  };
}
