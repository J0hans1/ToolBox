import Title from "../components/Title";
import EditUser from "../components/EditUser";
import ProfileSidebar from "../components/ProfileBar";

const ProfilePage = () => {

    return (
        <div className='flex w-screen h-auto text-current flex-wrap flex-row gap-20 bg-slate-100 overscroll-x-none'>
            <div className="flex flex-col">
                <ProfileSidebar />
            </div><div className="pt-60 text-left flex flex-col gap-10 pb-10">
                <div>
                    <Title heading="Min " span="profil" size="text-7xl" />
                </div>
                <div className="flex flex-row">
                    <div>
                        <EditUser />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;