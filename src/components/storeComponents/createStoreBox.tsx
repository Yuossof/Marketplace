"use client";
import React, { useState } from 'react';
import { Button, buttonVariants } from '../ui/button';
import { Plus } from 'lucide-react';
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

const CreateStoreBox = ({ userId }: Props) => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [storeImage, setStoreImage] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [scl, setScl] = useState("0");
    const [uploading, setUploading] = useState<boolean>(false);

    const [showBox, setShowBox] = useState(false)
    const [storeName, setStoreName] = useState('')
    const [storeDescription, setStoreDescription] = useState('')
    const [imageFile, setImageFile] = useState<File | null>(null)



    const preset_name = "qiijedbj";
    const cloud_name = "dx9rie3vv";

    const uploadImage = async (): Promise<string | null> => {
        if (storeImage) {
            try {
                const form = new FormData();
                form.append('file', storeImage);
                form.append("upload_preset", preset_name);

                const res = await axios.post(
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
                        bannerImage: imageUrl,
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

        if (file) {
            setUploading(true);
            setTimeout(() => setUploading(false), 1000);
        }
    };






    return (
        <div className="flex flex-col items-center justify-center ">
            <Button onClick={() => setShowBox(true)}>
                Create New Store
            </Button>

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

// return (
//     <div
//         onClick={() => {
//             setScl("1");
//             setShowBox("block");
//         }}
//         className="w-full flex justify-center"
//     >
//         <div
//             className={buttonVariants({
//                 className: "cursor-pointer",
//             })}
//         >
//             <h1>Create new store</h1>
//             <Plus />
//         </div>
//         <div 
//             style={{ backgroundColor: "rgb(0 0 0 / 0.8)", display: showBox, animationName: "showBa" }}
//             className="fixed showBa2 right-0 left-0 top-0 bottom-0 z-50"
//         >
//             <div className="w-full h-full flex justify-center items-center ">
//                 <div
//                     style={{ scale: scl, animationName: "showB" }}
//                     className="h-[550px] lg:h-[450px] w-[350px] lg:w-[850px] md:w-[580px] showBa bg-slate-50 rounded-lg p-7 flex flex-col justify-between"
//                 >
//                     <div className="flex flex-col gap-4 mt-4">
//                         <div className="flex-wrap lg:flex-nowrap md:flex sm:flex-wrap gap-3">
//                             <div className="flex flex-col gap-2 md:w-[100%] w-[100%] lg:w-[100%] sm:w-[100%]">
//                                 <label className="text-gray-600">Store Name</label>
//                                 <input
//                                     value={name}
//                                     onChange={(eo) => setName(eo.target.value)}
//                                     type="text"
//                                     placeholder="store name"
//                                     className="outline-1 outline-gray-600 border-[1px] rounded-md border-gray-400 w-[100%] h-10 pl-3"
//                                 />
//                             </div>
//                             <div className="flex flex-col gap-2 md:w-[100%] w-[100%] lg:w-[100%] sm:w-[100%]">
//                                 <label className="text-gray-600">Store Logo</label>
//                                 <div className="relative">
//                                     <input

//                                         onChange={handleFileChange}
//                                         type="file"
//                                         className="border-gray-400 w-[100%] h-10 pl-3"
//                                     />
//                                     {uploading && (
//                                         <span className="absolute right-3 top-2 text-gray-500">تحميل...</span>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="flex flex-col gap-2">
//                             <label className="text-gray-600">Store Description</label>
//                             <textarea
//                                 value={description}
//                                 onChange={(eo) => setDescription(eo.target.value)}
//                                 className="outline-1 outline-gray-600 border-[1px] rounded-md border-gray-400 w-[100%] h-[200px] pl-3 pt-2 text-[17px] text-gray-600"
//                                 placeholder="store description (optional)"
//                             ></textarea>
//                         </div>
//                     </div>
//                     <div className="flex items-center justify-between">
//                         <button
//                             onClick={(e) => {
//                                 e.stopPropagation();
//                                 setShowBox("none");
//                             }}
//                         >
//                             Cancel
//                         </button>
//                         <div
//                             onClick={handleClick}
//                             className={buttonVariants({
//                                 className: "cursor-pointer",
//                             })}
//                         >
//                             {isLoading ? <span>Loading...</span> : <>
//                                 <h1>Create Store</h1>
//                                 <Plus className="w-5 h-5 text-white" />
//                             </>}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
export default CreateStoreBox;
