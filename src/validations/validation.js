const validate = (schema, request) => {
    const result = schema.validate(request, {
        abortEarly: false
    })

    if (result.error) {
        throw result.error;
    }

    return result.value;
}

export {
    validate
}