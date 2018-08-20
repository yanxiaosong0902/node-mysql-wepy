const UserSql = {
    insert:'INSERT into user(name,age) VALUES(?,?)',
    queryAll:'SELECT * FROM user',
    getUserInfo:'SELECT * FROM user WHERE id = ?',
    delete:'DELETE FROM user WHERE id = ?',
    isExist:'SELECT * FROM user WHERE'
}
module.exports = UserSql;