import { useCallback, useEffect, useRef, useState } from "react";
import ReelFeed from "../../components/reelFeed";
import axiosInstance from "../../services/axios";
import { toast } from "sonner";
import Layout from "../../layouts/layout";

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
  likedByCurrentUser?: boolean
  savedByCurrentUser?: boolean
}

const Home = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false)

  const observer = useRef<IntersectionObserver | null>(null)

  const fetchVideos = async (pageNum: number) => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/food?page=${pageNum}&limit=5`);
      console.log(res.data);
      setVideos((prev) => [...prev, ...res.data.foodItems]);
      setHasMore(res.data.hasMore);
    } catch (err: any) {
      toast.error(err.response.data?.errors || err.response.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos(page);
  }, [page]);

  // Infinite scroll trigger
  const lastVideoRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  )

  const postLike = async (foodId: string) => {
    try {
      // Optimised like update
      setVideos((prevVideos) =>
        prevVideos.map((video) =>
          video._id === foodId
            ? {
              ...video,
              likedByCurrentUser: !video.likedByCurrentUser,
              likeCount: video.likedByCurrentUser
                ? video.likeCount! - 1
                : video.likeCount! + 1,
            }
            : video
        )
      );

      // Backend call
      const res = await axiosInstance.post("/food/like", { foodId });

      const updated = res.data;

      // TODO: server confirmation

      // setVideos((prevVideos) =>
      //   prevVideos.map((video) =>
      //     video._id === updated.like.food
      //       ? { ...video, likeCount: updated.likeCount, likedByCurrentUser: updated.likedByCurrentUser }
      //       : video
      //   )
      // );
    } catch (err: any) {
      toast.error(
        err.response?.data?.errors || err.response?.data?.message || "Something went wrong"
      );
    }
  };


  const postSave = async (foodId: string) => {
    try {
      setVideos((prevVideos) =>
        prevVideos.map((video) =>
          video._id === foodId
            ? {
              ...video,
              savedByCurrentUser: !video.savedByCurrentUser,
              saveCount: video.savedByCurrentUser
                ? video.saveCount! - 1
                : video.saveCount! + 1
            }
            : video
        )
      )
      const res = await axiosInstance.post("/food/save", {
        foodId: foodId
      })

      // TODO: update from server
    }
    catch (err: any) {
      toast.error(err.response.data?.errors || err.response.data?.message || "Something went wrong");
    }
  }

  return (
    <Layout>
      <ReelFeed
        items={videos}
        onLike={(item) => postLike(item._id)}
        onSave={(item) => postSave(item._id)}
        emptyMessage="No videos available."
        sentinel={lastVideoRef}
      />
      {/* Loader*/}
      {loading && <p className="text-center text-gray-500">Loading more reels...</p>}
    </Layout>
  );
};

export default Home;