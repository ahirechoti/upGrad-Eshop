const userObject = (users) => {
    try {
        if(!users){
            return [];
        }
        const result = [];
        if(Array.isArray(users)){
            users.forEach(user => {
                result.push({
                    id: user.id,
                    _id: user._id,
                    user_name: user.user_name,
                    full_name: (user.first_name+' '+user.last_name),
                    phone_number: user.phone_number,
                    role:user.role,
                    created_date: user.created_date
                })
            })
        }else{
            var user = users;
            result.push({
                id: user.id,
                _id: user._id,
                user_name: user.user_name,
                full_name: (user.first_name+' '+user.last_name),
                phone_number: user.phone_number,
                role:user.role,
                created_date: user.created_date
            })
        }
        return result;
    } catch (error) {
        console.error(error);
    }
}
module.exports =  userObject;