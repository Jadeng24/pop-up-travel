INSERT INTO users
(   first_name,
    last_name,
    email,
    image,
    location_city,
    location_state,
    is_admin,
    auth_id,
    new_user)
VALUES
($1, $2, $3, $4, $5, $6, $7, $8, $9)
RETURNING *;