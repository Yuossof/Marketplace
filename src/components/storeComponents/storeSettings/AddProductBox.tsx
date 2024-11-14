'use client'

import { useState, useRef } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

const AddProductBox = ({ storeId }: { storeId: string }) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    // const [uploadedImages, setUploadedImages] = useState<Array<string | File>>([]);
    const [isDragging, setIsDragging] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0)
    const [fileUrl, setFileUrl] = useState("")
    const [uploadedImages, setUploadedImages] = useState<Array<{ file: File; preview: string }>>([]);

    const preset_name = "qiijedbj";
    const cloud_name = "dx9rie3vv";

    const handleFileChange = (files: FileList | null) => {
        if (files) {
            const newFiles = Array.from(files);
            const imagePreviews = newFiles.map(file => ({
                file,
                preview: URL.createObjectURL(file)
            }));
            setUploadedImages((prevImages) => [...prevImages, ...imagePreviews]);
        }
    };
        

    const handleUploadClick = () => {
        fileInputRef.current?.click()
    }

    const handleRemoveImage = (index: number) => {
        setUploadedImages(prevImages => prevImages.filter((_, i) => i !== index))
    }

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(true)
    }

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
        const files = e.dataTransfer.files
        handleFileChange(files)
    }
    const uploadImages = async (): Promise<string[]> => {
        try {
            const uploadPromises = uploadedImages.map(async (image) => {
                const form = new FormData();
                form.append("file", image.file); // استخدم image.file هنا
                form.append("upload_preset", preset_name);
    
                const res = await axios.post(
                    `https://api.cloudinary.com/v1_1/${cloud_name}/upload`,
                    form
                );
    
                return res.data.url;
            });
    
            const urls = await Promise.all(uploadPromises);
            console.log(urls);
            return urls;
        } catch (error) {
            console.error("Error uploading images:", error);
            return [];
        }
    };
    
    const handleClick = async () => {
        try {
            // setSelectImageError(false)
            setIsLoading(true);
            const imageUrl = await uploadImages();
            // console.log(imageUrl)
            // setUploading(true)
            if (imageUrl.length !== 0) {
                await axios.post("http://localhost:3000/api/products", {
                    name: name,
                    description: description,
                    price: price,
                    storeId: storeId,
                    fileUrl: fileUrl,
                    url: imageUrl
                });
                // setUploading(false)
                console.log("Store created successfully!");
                router.refresh()
            } else {

                // setSelectImageError(true)
            }


        } catch (error) {
            setIsLoading(false)
            console.error("Error creating product:", error);
        } finally {
            setIsLoading(false);
        }
    };




    return (
        <Card className="w-2/4 z-50 relative max-h-[95%] overflow-auto">
            <X className=' absolute top-2 right-2 opacity-85 cursor-pointer hover:opacity-60' />
            <CardHeader>
                <CardTitle onClick={() => console.log(uploadedImages)} className="text-2xl font-bold">Product Upload</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 ">
                <div className='grid grid-cols-2 gap-3'>
                    <div className="space-y-2">
                        <Label htmlFor="product-name">Product Name</Label>
                        <Input value={name} onChange={(eo) => setName(eo.target.value)} id="product-name" placeholder="Enter product name" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="file-url">File URL</Label>
                        <Input value={fileUrl} onChange={(eo) => setFileUrl(eo.target.value)} id="file-url" placeholder="Enter file URL" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="file-url">Price</Label>
                        <Input value={price} onChange={(eo) => setPrice(Number(eo.target.value))} id="file-url" placeholder="Enter file URL" />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="product-description">Product Description</Label>
                    <Textarea value={description} onChange={(eo) => setDescription(eo.target.value)} id="product-description" placeholder="Enter product description" rows={4} />
                </div>

                <div className="space-y-2">
                    <Label>Product Images</Label>
                    <div
                        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${isDragging ? 'border-primary bg-primary/10' : 'border-gray-300'
                            }`}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                    >
                        <ImageIcon className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                        <h3 className="text-xl font-semibold mb-2">Drag and drop your images here</h3>
                        <p className="text-sm text-gray-500 mb-6">or</p>
                        <Button
                            onClick={handleUploadClick}
                            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 px-6 rounded-full transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 shadow-lg"
                        >
                            <Upload className="w-5 h-5 mr-2" />
                            Select Files
                        </Button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={(e) => handleFileChange(e.target.files)}
                            hidden
                            multiple
                            accept="image/*"
                        />
                    </div>
                </div>
                {uploadedImages.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {uploadedImages.map((image, index) => (
                            <div key={index} className="relative group">
                                <Image
                                    src={image.preview}
                                    alt={`Uploaded image ${index + 1}`}
                                    width={200}
                                    height={200}
                                    className="rounded-lg object-cover w-full h-40 shadow-md transition-transform duration-200 ease-in-out group-hover:scale-105"
                                />
                                <button
                                    onClick={() => handleRemoveImage(index)}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                                    aria-label="Remove image"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                <Button disabled={isLoading} onClick={handleClick} className="w-full">Submit Product</Button>
            </CardContent>
        </Card>
    )
}


export default AddProductBox;






