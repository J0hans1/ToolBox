import { User } from "../types/users";

interface IProps{
    user: User;
}

export default function Information({user}: IProps){
    return (
        <div className="information">
            <h2>{user.username}</h2>
            <h2>{user.password}</h2>
            <h2>{user.location}</h2>
            <div>
                {user.Adds?.map(add => 
                    <h3>{add.category}</h3>
                    )}
            </div>
        </div>
    )
}