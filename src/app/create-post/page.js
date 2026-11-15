"use client"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { supabase } from "../../../supabase/client"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const Page = () => {
    const [file, setFile] = useState(null)
    const [caption, setCaption] = useState(null)
    const [uploadedImgUrl, setUploadedImgUrl] = useState(null)

    const handleFile = async (e) => {
        setFile(e.target.files[0])
        const response = await supabase.storage.from("POST_IMAGES").upload(`images/${e.target.files[0].name}`, e.target.files[0])
        console.log(response)

        const { data } = supabase.storage.from("POST_IMAGES").getPublicUrl(`images/${e.target.files[0].name}`)
        console.log(data, "data")

        setUploadedImgUrl(data.publicUrl)
    }
    console.log(file, "file")

    const handleCaptionValue = (e) => {
        setCaption(e.target.value)
    }

    const handlePost = async () => {
        await supabase.from("posts").insert({
            imageUrl: uploadedImgUrl,
            caption: caption
        })
    }

    return (
        <div>
            <Input type={"file"} onChange={(e) => handleFile(e)}></Input>
            <Textarea placeholder="caption" value={caption} onChange={(e) => handleCaptionValue(e)} />
            <Button onClick={handlePost}>Post</Button>
        </div>
    )
}
export default Page