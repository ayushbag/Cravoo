import React, { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip"
import { Bookmark, Home, Save, SaveIcon } from "lucide-react"

export interface ReelItem {
  _id: string
  video: string
  description?: string
  likeCount?: number
  likesCount?: number
  likes?: number
  saveCount?: number
  bookmarks?: number
  saves?: number
  commentsCount?: number
  comments?: Array<any>
  foodPartner?: string
}

export interface ReelFeedProps {
  items?: ReelItem[]
  onLike: (item: ReelItem) => void | Promise<void>
  onSave: (item: ReelItem) => void | Promise<void>
  emptyMessage?: string
}

const ReelFeed: React.FC<ReelFeedProps> = ({
  items = [],
  onLike,
  onSave,
  emptyMessage = "No videos yet.",
}) => {
  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target
          if (!(video instanceof HTMLVideoElement)) return
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            video.play().catch(() => { })
          } else {
            video.pause()
          }
        })
      },
      { threshold: [0, 0.25, 0.6, 0.9, 1] }
    )

    videoRefs.current.forEach((vid) => observer.observe(vid))
    return () => observer.disconnect()
  }, [items])

  const setVideoRef = (id: string) => (el: HTMLVideoElement | null) => {
    if (!el) {
      videoRefs.current.delete(id)
      return
    }
    videoRefs.current.set(id, el)
  }

  return (
    <div className="max-w-[341px] mx-auto h-screen bg-background overflow-y-scroll scrollbar-none snap-y snap-mandatory pb-12">
      <div className="flex flex-col items-center">
        {items.length === 0 && (
          <div className="flex h-screen items-center justify-center text-muted-foreground text-lg">
            <p>{emptyMessage}</p>
          </div>
        )}

        <div>
          {items.map((item) => (
            <section
              key={item._id}
              className="relative w-full h-screen snap-start flex items-center justify-center bg-background"
            >
              {/* Video */}
              <video
                ref={setVideoRef(item._id)}
                className="w-full h-full object-contain bg-background"
                src={item.video}
                muted
                playsInline
                loop
                preload="metadata"
              />

              {/* Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end">
                <div className="relative flex justify-between items-end w-full p-4 pb-12">
                  <div className="text-white z-20 space-y-2 max-w-[70%]">
                    {item.description && (
                      <p className="text-sm line-clamp-2">{item.description}</p>
                    )}
                    {item.foodPartner && (
                      <Button
                        asChild
                        size="sm"
                        variant="secondary"
                      >
                        <Link to={"/food-partner/" + item.foodPartner}>
                          Visit store
                        </Link>
                      </Button>
                    )}
                  </div>

                  {/* Right side: actions */}
                  <div className="flex flex-col space-y-4 items-center text-white mb-2">
                    <TooltipProvider>
                      {/* Like */}
                      <div className="flex flex-col items-center">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="rounded-full text-white"
                              onClick={onLike ? () => onLike(item) : undefined}
                            >
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
                              </svg>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Like</TooltipContent>
                        </Tooltip>
                        <span className="text-sm mt-1">
                          {item.likeCount}
                        </span>
                      </div>

                      {/* Save */}
                      <div className="flex flex-col items-center">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="rounded-full text-white"
                              onClick={onSave ? () => onSave(item) : undefined}
                            >
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
                              </svg>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Save</TooltipContent>
                        </Tooltip>
                        <span className="text-sm mt-1">
                          {item.saveCount ?? 0}
                        </span>
                      </div>

                      {/* Comments */}
                      <div className="flex flex-col items-center">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="rounded-full text-white"
                            >
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
                              </svg>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Comments</TooltipContent>
                        </Tooltip>
                        <span className="text-sm mt-1">
                          {item.commentsCount ??
                            (Array.isArray(item.comments)
                              ? item.comments.length
                              : 0)}
                        </span>
                      </div>
                    </TooltipProvider>
                  </div>
                </div>
                <div className="flex justify-evenly items-center bg-muted w-full h-10 fixed bottom-0 left-0 right-0 z-10 max-w-[341px] mx-auto">
                  <Link to="/">
                    <Home size={20} />
                  </Link>
                  <Link to="/saved">
                    <Bookmark size={20} />
                  </Link>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ReelFeed