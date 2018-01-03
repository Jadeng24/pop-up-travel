UPDATE users 
SET first_name = $2,
    last_name = $3,
    email = $4,  
    image = $5,
    location_city = $6, 
    location_state = $7,
    new_user = $8
WHERE id =$1


