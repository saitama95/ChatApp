import { Camera,User,Mail } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import {useState } from "react";
export const ProfilePage = () => {
     const { authUser ,isupdatingProfile, updateProfile } = useAuthStore();
     const [selectedImg,setSelectedImg] = useState(null);

     const handleImageUpload = (e) => {
        let file = e.target.files[0];
        if(!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async() => {
            const base64Image = reader.result;
            await updateProfile({ profilePic:base64Image});
        }
     };
    return (
        <div className="h-screen pt-20">
            <div className="max-w-2xl mx-auto p-4 py-8">
                <div className="bg-base-300 rounded-xl p-6 space-y-8">
                    <div className="text-center">
                        <h1 className="text-2xl font-semibold">Profile</h1>
                        <p className="mt-2">Your profile information</p>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        <div className="relative">
                            <img src={authUser.profilePic || "/avatar.png"} 
                            alt="Profile" 
                            className="size-34 rounded-full object-cover border-4"/>
                            <label htmlFor="avator-upload"
                                className={`
                                    absolute bottom-0 right-0
                                    bg-base-content hover:scale-105
                                    p-2 rounded-full cursor-pointer
                                    transition-all duration-200
                                    ${isupdatingProfile ? "animate-pulse pointer-events-none":""}
                                `}
                            >
                            <Camera className="w-5 h-5 text-base-200"/>
                            <input type="file" 
                            id="avator-upload"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={isupdatingProfile}
                            />
                            </label>
                        </div>
                        <p className="text-sm text-zinc-400">
                            {isupdatingProfile?"Uploading...":"Click the camera icon to update photo"}
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-1 5">
                            <div className="text-sm text-zinc-400 flex items-center gap-2">
                                <User className="w-4 h-4"/>
                                Full Name
                            </div>
                            <p className="px-4 py-2 5 bg-base-200 rounded-lg border">
                                {authUser?.fullName}
                            </p>
                        </div>

                        <div className="space-y-1 5">
                            <div className="text-sm text-zinc-400 flex items-center gap-2">
                                <Mail className="w-4 h-4"/>
                                Email
                            </div>
                            <p className="px-4 py-2 5 bg-base-200 rounded-lg border">
                                {authUser?.email}
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}