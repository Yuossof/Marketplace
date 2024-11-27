"use client";
import React, { useState } from 'react';
import { Button, buttonVariants } from '../ui/button';
import { CircleFadingPlus, CirclePlus, Diff, Grid2x2Plus, Plus, PlusCircle, PlusSquare } from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import './animate.css';
import { Textarea } from '../ui/textarea';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Upload, X } from 'lucide-react'
interface Props {
    userId: string;
}
interface CloudinaryResponse {
    url: string;
}

const CreateStoreBox = ({ userId }: Props) => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [storeImage, setStoreImage] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [scl, setScl] = useState("0");
    const [uploading, setUploading] = useState<boolean>(false);

    const [showBox, setShowBox] = useState(false)
    const [imageFile, setImageFile] = useState<File | null>(null)



    const preset_name = "qiijedbj";
    const cloud_name = "dx9rie3vv";

    const uploadImage = async (): Promise<string | null> => {
        if (storeImage) {
            try {
                const form = new FormData();
                form.append('file', storeImage);
                form.append("upload_preset", preset_name);

                const res = await axios.post<CloudinaryResponse>(
                    `https://api.cloudinary.com/v1_1/${cloud_name}/upload`,
                    form
                );

                const imageUrl = res.data.url;
                console.log(imageUrl);
                return imageUrl;
            } catch (error) {
                console.error("Error uploading image:", error);
                return null;
            }
        } else {
            console.log("No image selected");
            return null;
        }
    };


    const handleClick = async (eo: React.FormEvent) => {
        eo.preventDefault()
        try {
            setIsLoading(true);
            const imageUrl = await uploadImage();

            if (imageUrl) {
                await axios.post("http://localhost:3000/api/store", {
                    name,
                    description,
                    userId,
                    storeImage: imageUrl,
                    storeBanner: {
                        bannerTitle: "Title",
                        bannerImage: "",
                        bannerDescrip: "bannerDescrip",
                        titleColor: "#fff",
                        titleSize: 30,
                        descriptionColor: "fff",
                        descriptionSize: 16
                    }
                });

                console.log("Store created successfully!");
                window.location.reload()
                setScl("0")
                setShowBox(false)
            } else {
                console.log("Failed to upload image.");
            }
        } catch (error) {
            console.error("Error creating store:", error);
        } finally {
            setIsLoading(false);
            router.refresh()
            setScl("0")
            setShowBox(false)
        }
    }

    const handleFileChange = (eo: React.ChangeEvent<HTMLInputElement>) => {
        const file = eo.target.files ? eo.target.files[0] : null;
        setStoreImage(file);
        setImageFile(file)
        if (file) {
            setUploading(true);
            setTimeout(() => setUploading(false), 1000);
        }
    };






    return (
        <div className="flex flex-col items-center justify-center ">
            <div onClick={()=> setShowBox(true)} className='w-[300px] transition bg-slate-50 h-[420px] rounded-md border-2 shadow-lg flex justify-center items-center hover:bg-slate-100 cursor-pointer'>
                {/* <Button onClick={() => setShowBox(true)}> */}
                   {/* <PlusCircle className='w-[200px] h-[200px] text-gray-500'/> */}
                   <CircleFadingPlus strokeWidth={0.7} size={170} className='text-gray-500'/>
                {/* </Button> */}
            </div>

            {showBox && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <Card className="w-full max-w-md">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Create Your Store</CardTitle>
                            <Button variant="ghost" size="icon" onClick={() => setShowBox(false)}>
                                <X className="h-4 w-4" />
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="store-name">Store Name</Label>
                                    <Input
                                        id="store-name"
                                        placeholder="Enter store name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="store-description">Store Description</Label>
                                    <Textarea
                                        id="store-description"
                                        placeholder="Enter store description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="image-upload">Store Image</Label>
                                    <div className="flex items-center space-x-2">
                                        <Input
                                            id="image-upload"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleFileChange}
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => document.getElementById('image-upload')?.click()}
                                        >
                                            <Upload className="w-4 h-4 mr-2" />
                                            Upload Image
                                        </Button>
                                        {imageFile && <span className="text-sm text-muted-foreground">{imageFile.name}</span>}
                                    </div>
                                </div>

                                <Button disabled={isLoading} onClick={handleClick} type="submit" className="w-full">Create Store</Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    )
};

export default CreateStoreBox;
