import { useGetUserQuery } from "../../store/api/UserSlice ";

const Profile = () => {

    const {data: users=[]} =useGetUserQuery();
    console.log(users);
    


 
    return (
        <div className="bg-blue-800 md:w-3/4 lg:w-1/2 shadow p-10 rounded-md">
            <h1 className="font-bold text-2xl text-white">WELCOME TO MY PROFILE</h1>
            <h3 className="font-medium text-white mt-4 text-lg">About me </h3>
            <p className="font-semibold text-white">Name: {users.name}</p>
            <p className="font-semibold text-white">Email: {users.email}</p>
        </div>
    )
}

export default Profile;