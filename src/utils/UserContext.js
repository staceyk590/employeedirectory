import React from "react";

const UserContext = React.createContext({
    headings: [{}],
    users: [{}],
    filteredUsers: [{}],
})

export default UserContext;