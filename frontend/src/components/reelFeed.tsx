import React, { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip"

export interface ReelItem {
  _id: string
  video: string
  description?: string
  likeCount?: number
  likesCount?: number
  likes?: number
  savesCount?: number
  bookmarks?: number
  saves?: number
  commentsCount?: number
  comments?: Array<any>
  foodPartner?: string
}

export interface ReelFeedProps {
  items?: ReelItem[]
  onLike?: (item: ReelItem) => void | Promise<void>
  onSave?: (item: ReelItem) => void | Promise<void>
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
            video.play().catch(() => {})
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
    <div className="max-w-sm mx-auto h-screen bg-background overflow-y-scroll scrollbar-none snap-y snap-mandatory">
      <div className="flex flex-col items-center">
        {items.length === 0 && (
          <div className="flex h-screen items-center justify-center text-muted-foreground text-lg">
            <p>{emptyMessage}</p>
          </div>
        )}

        {items.map((item) => (
          <section
            key={item._id}
            className="relative w-full h-screen snap-start flex items-center justify-center bg-black"
          >
            {/* Video */}
            <video
              ref={setVideoRef(item._id)}
              className="w-full h-full object-contain bg-black"
              src={item.video}
              muted
              playsInline
              loop
              preload="metadata"
            />

            {/* Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-4">
              {/* Bottom bar like Instagram reels */}
              <div className="flex justify-between items-end w-full">
                {/* Left side: description + visit store */}
                <div className="text-white max-w-sm space-y-2 ml-6 mask-gradient-to-t from-black to-">
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
                <div className="flex flex-col space-y-5 items-center text-white mr-2 mb-2">
                  <TooltipProvider>
                    {/* Like */}
                    <div className="flex flex-col items-center mr-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="icon"
                            variant="secondary"
                            className="rounded-full bg-black/40 hover:bg-black/60 text-white"
                            onClick={onLike ? () => onLike(item) : undefined}
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
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
                        {item.likeCount ?? item.likesCount ?? item.likes ?? 0}
                      </span>
                    </div>

                    {/* Save */}
                    <div className="flex flex-col items-center">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="icon"
                            variant="secondary"
                            className="rounded-full bg-black/40 hover:bg-black/60 text-white"
                            onClick={onSave ? () => onSave(item) : undefined}
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
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
                        {item.savesCount ?? item.bookmarks ?? item.saves ?? 0}
                      </span>
                    </div>

                    {/* Comments */}
                    <div className="flex flex-col items-center">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="icon"
                            variant="secondary"
                            className="rounded-full bg-black/40 hover:bg-black/60 text-white"
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
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
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

export default ReelFeed