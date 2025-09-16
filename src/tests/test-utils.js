import { prismaClient } from "../application/database.js";

export const removeTestUser = async () => {
    await prismaClient.user.deleteMany({
        where: {
            username: 'test-user'
        }
    })
}
