import { Card, CardContent } from "../../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Badge } from "../../components/ui/badge"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axiosInstance from "../../services/axios"
import { toast } from "sonner"

interface FoodPartner {
  _id: string;
  name: string;
  address: string;
  // add more fields as per your model (e.g., email, phone, etc.)
}

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState<FoodPartner | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchFoodPartner = async () => {
      try {
        setIsLoading(true);
        const res = await axiosInstance.get(`/food-partner/${id}`);
        setProfile(res.data.foodPartner);
        setVideos(res.data.foodPartner.foodItems);
      } catch (err: any) {
        toast.error(err.response.data?.errors || err.response.data?.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }

    fetchFoodPartner();
  }, [id])

  return (
    <div className="min-h-screen w-full bg-background text-foreground p-4 flex justify-center">
      <div className="w-full max-w-5xl space-y-8">
        {/* Top Profile Card */}
        <Card className="bg-muted border-none rounded-2xl px-2 py-4 sm:px-6 sm:py-6">
          <CardContent className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Avatar + Name */}
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 md:h-20 md:w-20">
                <AvatarImage className="object-cover" src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg" alt="business" />
                <AvatarFallback>BN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-2">
                <span className="font-semibold text-lg md:text-xl">{profile?.name}</span>
                <Badge
                  variant="secondary"
                  className="bg-[#2a3247] text-xs md:text-sm text-gray-300 w-fit"
                >
                  {profile?.address || "Address"}
                </Badge>
              </div>
            </div>

            {/* Stats */}
            <div className="flex justify-around w-full md:w-auto gap-6 text-center">
              <div>
                <p className="text-sm text-gray-400">total meals</p>
                <p className="text-xl md:text-2xl font-bold">43</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">customer serve</p>
                <p className="text-xl md:text-2xl font-bold">15K</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Video Grid (Vertical Reels) */}
        {/* Video Grid (Vertical Reels) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {videos.length > 0 ? (
            videos.map((video: any) => (
              <Card
                key={video._id}
                className="bg-muted border-none rounded-xl overflow-hidden aspect-[9/16]"
              >
                <video
                  src={video.video}
                  muted
                  className="w-full h-full object-cover scale-120 hover:scale-125 duration-500 ease-out cursor-pointer"
                />
              </Card>
            ))
          ) : (
            <p className="text-gray-400 col-span-full text-center">
              No videos available
            </p>
          )}
        </div>

      </div>
    </div>
  )
}

export default Profile
