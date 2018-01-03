module.exports = {
    saveUser: (req, res) => {
        const db = req.app.get('db');
        const user = req.body;
        const userId = req.params.id;

        db.update_user([userId, user.firstName, user.lastName, user.userEmail, user.imgUrl, user.city, user.USstate, false]).then(user => {
            res.send(user);
        })
    },
    getAllUsers: (req, res) => {
        const db = req.app.get('db');
        db.get_all_users().then(users => {
            res.send(users);
        })
    },
    getUserById: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.params;

        db.get_user_by_id([id]).then(user => {
            res.send(user);
        })
    },
    removeUser: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.params;
        db.remove_user([id]);
    }
}
