export const updateObject = (oldObj, newProps) => {
    return {
        ...oldObj,
        ...newProps
    }
}

export const checkValidity = (value, rule) => {
    let isValid = true;

    if (!rule) return isValid;

    if (rule.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rule.minLength) {
        isValid = value.length >= rule.minLength && isValid;
    }

    if (rule.maxLength) {
        isValid = value.length <= rule.maxLength && isValid;
    }

    if (rule.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    if (rule.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }

    return isValid
}