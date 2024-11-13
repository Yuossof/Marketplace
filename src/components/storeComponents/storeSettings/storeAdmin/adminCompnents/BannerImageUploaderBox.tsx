'use client'

import { useState, useRef } from 'react'
import axios from 'axios'
import { put } from '@vercel/blob'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Upload, Image as ImageIcon, FileImage } from 'lucide-react'

export default function BannerImageUploaderBox({ setBannerImageUrl, setDisableSaveButton, uploadImage, settingsStoreId }: { setBannerImageUrl: any, setDisableSaveButton: any ,uploadImage: any, settingsStoreId: string }) {
    const [image, setImage] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const [uploading, setUploading] = useState(false)
    const [uploadedUrl, setUploadedUrl] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [disButtonAfterUploading, setDisButtonAfterUploading] = useState(false)
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setBannerImageUrl(file)
            setImage(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleUpload = async () => {
        if (!image) return
        setDisableSaveButton(true)
        setUploading(true)
        setDisButtonAfterUploading(true)
        try {
            
            const url = await uploadImage()
            console.log(url)
            await axios.put(`http://localhost:3000/api/store/settings/${settingsStoreId}`, {
                storeBanner: {
                    bannerImage: url
                }
            })
            setDisButtonAfterUploading(true)
            setDisableSaveButton(false)
            setUploading(false)
            setBannerImageUrl(null)
            setImage(null)
            setPreview("")
        } catch (error) {
            console.error('Upload failed:', error)
            alert('Upload failed. Please try again.')
        } 
    }

    const triggerFileInput = () => {
        fileInputRef.current?.click()
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Image Uploader</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid w-full  items-center gap-1.5">
                    <Label htmlFor="image" className="sr-only">Image</Label>
                    <input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        ref={fileInputRef}
                    />
                    <Button
                        type="button"
                        onClick={triggerFileInput}
                        variant="outline"
                        className="w-full"
                    >
                        <FileImage className="mr-2 h-4 w-4" />
                        Choose Image
                    </Button>
                </div>
                {preview && (
                    <div className="aspect-video relative">
                        <img
                            src={preview}
                            alt="Preview"
                            className="rounded-md object-cover w-full h-full"
                        />
                    </div>
                )}
                {image && (
                    <div className="text-sm text-muted-foreground flex items-center">
                        <ImageIcon className="mr-2" size={16} />
                        <span className="truncate">{image.name}</span>
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
                <Button onClick={()=>{
                    handleUpload()
                }} disabled={!image || disButtonAfterUploading} className="w-full">
                    {uploading ? 'Uploading...' : 'Upload Image'}
                    <Upload className="ml-2" size={16} />
                </Button>
                {uploadedUrl && (
                    <p className="text-sm text-muted-foreground">
                        Uploaded successfully! URL: <a href={uploadedUrl} target="_blank" rel="noopener noreferrer" className="underline">{uploadedUrl}</a>
                    </p>
                )}
            </CardFooter>
        </Card>
    )
}