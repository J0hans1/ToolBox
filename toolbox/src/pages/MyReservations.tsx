import Title from "../components/Title";
import ProfileSidebar from "../components/ProfileBar";



const MyReservations = () => {
    
   

    return (
        <div className='flex w-screen h-auto text-current flex-wrap flex-row gap-20 bg-slate-100'>
            <div className="flex flex-col">
                <ProfileSidebar />
            </div>
            <div className="pt-60 text-left flex flex-col gap-10 pb-10">
                <div>
                    <Title heading="Mine " span="reservasjoner" size="text-7xl" />
                </div>
                <section className='flex flex-col h-auto'>
                    
                </section>
            </div>
        </div>
    );
}

export default MyReservations;



