import bcrypt from "bcryptjs"

const users = [
    {
        name: "Admin User",
        email: "admin@example.com",
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: "Robert",
        email: "robert@example.com",
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: "Sam",
        email: "sam@example.com",
        password: bcrypt.hashSync('123456', 10),
    }
];

export default users;