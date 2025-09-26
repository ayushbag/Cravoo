import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { Button } from "../../components/ui/button"
import { Label } from "../../components/ui/label"
import WrapperLayout from "../../layouts/wrapperLayout"
import { useState, useRef, useEffect } from "react"
import { X, Pencil } from "lucide-react"
import axiosInstance from "../../services/axios"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

const CreateFood = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    return () => {
      if (videoPreviewUrl) {
        URL.revokeObjectURL(videoPreviewUrl);
      }
    };
  }, [videoPreviewUrl]);

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setVideoFile(file);
    if (file) {
      setVideoPreviewUrl(URL.createObjectURL(file));
    } else {
      setVideoPreviewUrl(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!videoFile || !name || !description) {
      alert("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("name", name);
    formData.append("description", description);

    try {
      setIsLoading(true)
      const response = await axiosInstance.post("/food", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Food created successfully:", response.data);
      toast.success("posted food");
      // Optionally, clear the form
      navigate("/")
      setVideoFile(null);
      setName("");
      setDescription("");
    } catch (err) {
      toast.error("error while posting")
      alert("Error creating food.");
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <WrapperLayout>
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-sm sm:w-sm">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Create Food</CardTitle>
              <CardDescription>
                Upload a short video, give it a name, and add a description.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-1.5 text-xs pt-3">
                <Label htmlFor="video">
                  Food Video
                </Label>
                {videoPreviewUrl ? (
                  <div className="relative h-40 md:h-48 rounded-xl overflow-hidden">
                    <video src={videoPreviewUrl} controls className="w-full h-full object-cover" />
                    <Button
                      className="absolute top-2 right-2"
                      size="icon"
                      variant="destructive"
                      onClick={() => {
                        setVideoFile(null);
                        setVideoPreviewUrl(null);
                      }}
                    >
                      <X />
                    </Button>
                    <Button
                      className="absolute top-2 right-12"
                      size="icon"
                      variant="secondary"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Pencil />
                    </Button>
                  </div>
                ) : (
                  <div
                    className="border-2 border-dashed border-gray-600 rounded-xl h-40 md:h-48 flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-primary/20 transition"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <span>
                      {videoFile ? videoFile.name : "Tap to upload or drag and drop"}
                    </span>
                    <span className="text-xs md:text-sm text-gray-500 mt-1">
                      MP4, WebM, MOV · Up to 100MB
                    </span>
                  </div>
                )}
                <Input id="video" type="file" accept="video/*" className="hidden" onChange={handleVideoChange} ref={fileInputRef} />
              </div>
              <div className="flex flex-col gap-3 pt-4">
                <div className="grid gap-1.5 text-xs w-full">
                  <Label htmlFor="email">Name</Label>
                  <Input
                    name="name"
                    type="text"
                    placeholder="e.g., Spicy Paneer Wrap"
                    className="text-sm"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="grid gap-1.5 text-xs">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Write a short description: ingredients, taste, spice level, etc."
                    className="border-none focus:ring-2 focus:ring-primary resize-none text-sm"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>

            </CardContent>
            <CardFooter className="flex-col gap-2 pt-4">
              <Button type="submit" className="w-full">
                {isLoading ? "Posting..." : "Save Food"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </WrapperLayout >
  )
}

export default CreateFood
