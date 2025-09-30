import { useEffect, useState } from "react";
import ReelFeed from "../../components/reelFeed";
import BottomNavbar from "../../components/bottomNavbar";
import axiosInstance from "../../services/axios";
import { toast } from "sonner";

interface Video {
  _id: string;
  video: string;
  description?: string;
  likeCount?: number;
  likesCount?: number;
  likes?: number;
  saveCount?: number;
  bookmarks?: number;
  saves?: number;
  commentsCount?: number;
  comments?: Array<any>;
  foodPartner?: string;
}

const Home = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  const postLike = async (foodId: string) => {
    try {
      const res = await axiosInstance.post("/food/like", {
        foodId: foodId
      })
      console.log(res.data.message);
      setVideos(videos.map((video) => video._id === foodId ? { ...video, likeCount: (video.likeCount == 0 ? 1 : 0) } : video))
    } catch (err: any) {
      toast.error(err.response.data?.errors || err.response.data?.message || "Something went wrong");
    }
  }

  const postSave = async (foodId: string) => {
    try {
      const res = await axiosInstance.post("/food/save", {
        foodId: foodId
      })
      console.log(res.data.message);
      setVideos(videos.map((video) => video._id === foodId ? { ...video, saveCount:  (video.saveCount == 0 ? 1 : 0) } : video));
    }
    catch (err: any) {
      toast.error(err.response.data?.errors || err.response.data?.message || "Something went wrong");
    }
  }
  
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axiosInstance.get("/food");
        console.log(res.data.message);
        setVideos(res.data.foodItems);
      } catch (err: any) {
        toast.error(err.response.data?.errors || err.response.data?.message || "Something went wrong");
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="w-full h-full">
      <ReelFeed
        items={videos}
        onLike={(item) => postLike(item._id)}
        onSave={(item) => postSave(item._id)}
        emptyMessage="No videos available."
      />
      {/* <BottomNavbar /> */}
    </div>
  );
};

export default Home;