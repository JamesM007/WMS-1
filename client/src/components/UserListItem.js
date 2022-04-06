const UserListItem = ({
    id,
    first_name,
    last_name,
    username,
    email,
    role_type,
}) => {
    return (
        <div
            className="list-group-item list-group-item-action"
            aria-current="true"
        >
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-0">
                    {first_name} {last_name}
                </h5>
                {role_type === "Management" || role_type === "Operations" ? (
                    <span className="badge bg-danger pill py-2 px-3 m-0">
                        {role_type}
                    </span>
                ) : (
                    <span className="badge bg-primary pill py-2 px-3 m-0">
                        {role_type}
                    </span>
                )}
            </div>
            <p className="mb-1">
                {username} &middot; {email}
            </p>
        </div>
    );
};

export default UserListItem;
