import { deleteUser } from "../lib/controller";
import { User } from "../types/types";

interface IProps{
    user: User;
}

function deleteUserButton(user: string){
    if (user != null)
        deleteUser(user);
}

export default function InformationUser({user}: IProps){
    return (
        <div className="information">
            <br />
            {/* <h2>Brukernavn: {user.username}</h2>
            <h2>Passord: {user.password}</h2>
            <h2>Sted: {user.location}</h2> */}
            {/* <button onClick={() => deleteUserButton(user.id)}>Delete user above</button> */}
        </div>
        
    )
}