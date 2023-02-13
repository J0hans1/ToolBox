import { DocumentData, onSnapshot, QuerySnapshot } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { usersCollection } from "../lib/controller";
import { User } from "../types/users";
import InformationUser from "./information";


export default function UserInfo(){
    const [users, setUsers] = useState<User[]>([]);

    useEffect(
        () => 
            onSnapshot(usersCollection, (snapshot: QuerySnapshot<DocumentData>) => {
                setUsers(
                    snapshot.docs.map((doc) => {
                        return {
                            id: doc.id,
                            ...doc.data(),
                        };
                    })
                );
            }),
        []
    );

    return (
        <div className="test">
            <div>
                {users.map((user => (
                    <InformationUser key={user.id} user ={user} />
                )))}
            </div>
        </div>
    )
}