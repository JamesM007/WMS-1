const User = ({ id, first_name, last_name, username, email, role_type }) => {
    return (
            <a
                href="#"
                className="list-group-item list-group-item-action active"
                aria-current="true"
            >
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">
                        {first_name} {last_name}
                    </h5>
                    <span class="badge bg-primary rounded-pill">
                        {role_type}
                    </span>
                </div>
                <p className="mb-1">
                    {username} &middot; {email}
                </p>
            </a>
        </div>
    );
};
