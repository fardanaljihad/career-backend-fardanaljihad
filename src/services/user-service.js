import { prismaClient } from "../application/database.js";
import { ResponseError } from "../errors/response-error.js";
import { deleteUserValidation, getUserValidation, loginUserValidation, registerUserValidation, updateUserValidation } from "../validations/user-validation.js"
import { validate } from "../validations/validation.js";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

const register = async (request) => {

    const user = validate(registerUserValidation, request);

    const userCount = await prismaClient.user.count({
        where: {
            username: user.username
        }
    });

    if (userCount === 1) {
        throw new ResponseError(400, "Username already exists");
    }

    user.password = await bcrypt.hash(user.password, 10);

    return prismaClient.user.create({
        data: user,
        select: {
            name: true,
            username: true
        }
    });
}

const login = async (request) => {
    const loginRequest = validate(loginUserValidation, request);

    const user = await prismaClient.user.findUnique({
        where: {
            username: loginRequest.username
        },
        select: {
            username: true,
            password: true
        }
    });

    if (!user) {
        throw new ResponseError(401, 'Username or password is wrong');
    }

    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
    if (!isPasswordValid) {
        throw new ResponseError(401, 'Username or password is wrong');
    }

    const token = uuid().toString();
    return prismaClient.user.update({
        data: {
            token: token
        },
        where: {
            username: user.username
        },
        select: {
            token: true
        }
    });    
}

const get = async (username) => {
    username = validate(getUserValidation, username);

    const user = await prismaClient.user.findFirst({
        where: {
            username: username
        },
        select: {
            name: true,
            username: true
        }
    });

    if (!user) {
        throw new ResponseError(404, 'User is not found')
    }

    return user;
}

const update = async (request) => {
    const updateRequest = validate(updateUserValidation, request);

    const isUserExists = await prismaClient.user.count({
        where: {
            username: updateRequest.username
        }
    })
    if (isUserExists !== 1) {
        throw new ResponseError(404, 'User is not found')
    }

    const data = {}
    if (updateRequest.name) {
        data.name = updateRequest.name;
    }
    if (updateRequest.password) {
        data.password = await bcrypt.hash(updateRequest.password, 10);
    }

    return prismaClient.user.update({
        where: {
            username: updateRequest.username
        },
        data: data,
        select: {
            name: true,
            username: true,
        }
    })
}

const deleteUser = async (id) => {
    id = validate(deleteUserValidation, id);

    const user = await prismaClient.user.findUnique({
        where: {
            id: id
        }
    });

    if (!user) {
        throw new ResponseError(404, 'User is not found');
    }

    return prismaClient.user.delete({
        where: {
            id: id
        }
    });
}

export default {
    register,
    login,
    get,
    update,
    deleteUser
}
