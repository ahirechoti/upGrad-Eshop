const userObject = (users) => {
    try {
        if(!users){
            return [];
        }
        const result = [];
        if(Array.isArray(users)){
            users.forEach(user => {
                result.push({
                    _id: user._id,
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name
                })
            })
        }else{
            var user = users;
            result.push({
                _id: user._id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name
            })
        }
        return result;
    } catch (error) {
        console.error(error);
    }
}
module.exports =  userObject;