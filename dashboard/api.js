// API URLs
const USERS_API = "https://dummyjson.com/users";
const REPORTS_API = "https://jsonplaceholder.typicode.com/posts";


async function fetchUsers() {
    try {
        const response = await fetch(USERS_API);

        if (!response.ok) {
            throw new Error("Failed to fetch users.");
        }

        const data = await response.json();
        return data.users;

    } catch (error) {
        console.error(error);
        return [];
    }
}

async function fetchReports() {
    try {
        const response = await fetch(REPORTS_API);

        if (!response.ok) {
            throw new Error("Failed to fetch reports.");
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error(error);
        return [];
    }
}