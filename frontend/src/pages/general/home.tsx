import { useEffect, useState } from "react"
import ReelFeed from "../../components/reelFeed"
import axiosInstance from "../../services/axios"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const [videos, setVideos] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setIsLoading(true);
        const res = await axiosInstance.get("/food");
        console.log(res)
        setVideos(res.data.foodItems);
      } catch (err: any) {
        toast.error(err.response.data?.errors || err.response.data?.message || "Something went wrong");
        if (err.response.data?.errors || err.response.data?.message) {
          toast.error("Login to proceed")
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchVideos();
  }, [])


  return (
    <ReelFeed
      items={videos}
      onLike={() => console.log("on like")}
      onSave={() => console.log("on like")}
      emptyMessage="No videos available."
    />
  )
}

export default Home