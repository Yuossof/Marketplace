"use client"
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Input } from "@/components/ui/input"
import Image from 'next/image'
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import BannerImageUploaderBox from './adminCompnents/BannerImageUploaderBox'
interface getStoreIdProps {
    params: { settingsStoreId: string },
    userId: string
}

interface Store {
    id: string;
    name: string;
    description?: string;
    storeImage?: string;
    createdAt: Date,
    updatedAt: Date,
    storeBanner?: {
        bannerTitle?: string,
        titleSize?: number,
        bannerDescrip?: string,
        descriptionSize?: number,
        titleColor?: string,
        descriptionColor?: string,
        bannerImage?: string,
        height?: string
    }
}

const SettingsComp = ({ params, userId }: getStoreIdProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [bannerImageUrl, setBannerImageUrl] = useState<File | null>(null)
    const [bannerImage, setBannerImage] = useState("")
    const [storeImage, setStoreImage] = useState("")
    const [disableSaveButton, setDisableSaveButton] = useState(false)

    //store banner states start

    const [bannerTitle, setBannerTitle] = useState<string>("")
    const [bannerDescrip, setBannerDescrip] = useState<string>("")

    //store banner states end



    const [bannerHeight, setBannerHeight] = useState(400)
    const [bannerColor, setBannerColor] = useState('#f0f0f0') //TODO: add to db
    const [title, setTitle] = useState('Welcome to Our Store')
    const [titleFontSize, setTitleFontSize] = useState(24)
    const [titleColor, setTitleColor] = useState('#000000')
    const [titleBold, setTitleBold] = useState(false) //TODO: add to db
    const [description, setDescription] = useState('Discover amazing products and great deals!')
    const [descriptionFontSize, setDescriptionFontSize] = useState(16)
    const [descriptionColor, setDescriptionColor] = useState('#333333')
    const [descriptionBold, setDescriptionBold] = useState(false) //TODO: add to db

    const preset_name = "qiijedbj";
    const cloud_name = "dx9rie3vv";

    const uploadImage = async () => {
        if (bannerImageUrl) {
            try {
                const form = new FormData();
                form.append('file', bannerImageUrl);
                form.append("upload_preset", preset_name);
                const res = await axios.post(
                    `https://api.cloudinary.com/v1_1/${cloud_name}/upload`,
                    form
                );

                const imageUrl = res.data.url;
                setBannerImage(imageUrl)
                return imageUrl;
            } catch (error) {
                console.error("Error uploading image:", error);
                return null;
            }
        } else {
            console.log("No image selected");
        }
    };



    const UpdateStore = async () => {
        try {
            setIsLoading(true)
            const imageUrl = await uploadImage()
            await axios.put(`http://localhost:3000/api/store/settings/${params.settingsStoreId}`, {
                name: title,
                description: description,
                storeImage: storeImage,
                userId: userId,
                storeBanner: {
                    bannerTitle: bannerTitle,
                    bannerImage: imageUrl,
                    bannerDescrip: bannerDescrip,
                    titleColor: titleColor,
                    titleSize: titleFontSize,
                    descriptionColor: descriptionColor,
                    descriptionSize: descriptionFontSize,
                    height: bannerHeight
                }
            })

            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }
    }


    // const handleFileChange = (eo: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = eo.target.files ? eo.target.files[0] : null;

    //     if (file) {
    //         setBannerImageUrl(file);
    //     }
    // };

    useEffect(() => {
        const getStoreData = async () => {
            const response = await axios.get(`http://localhost:3000/api/store/settings/${params.settingsStoreId}`)
            const resData = await response.data as Store
            setTitle(resData?.name)
            setDescription(resData?.description || "")
            setStoreImage(resData?.storeImage || "")
            setBannerTitle(resData.storeBanner?.bannerTitle || "")
            setBannerImage(resData.storeBanner?.bannerImage || "")
            setTitleFontSize(resData.storeBanner?.titleSize || 0)
            setTitleColor(resData.storeBanner?.titleColor || "")
            setBannerDescrip(resData?.storeBanner?.bannerDescrip || "")
            setDescriptionColor(resData.storeBanner?.descriptionColor || "")
            setBannerHeight(Number(resData.storeBanner?.height))
            setDescriptionFontSize(resData.storeBanner?.descriptionSize || 0)
            // console.log(resData)
        }
        getStoreData()
    }, [])
    const products = [
        { id: 1, name: "Elegant Watch", price: 199.99, image: "/placeholder.svg" },
        { id: 2, name: "Leather Bag", price: 89.99, image: "/placeholder.svg" },
        { id: 3, name: "Sunglasses", price: 59.99, image: "/placeholder.svg" },
        { id: 3, name: "Sunglasses", price: 59.99, image: "/placeholder.svg" }
    ]



    return (
        <>
            <div className="mt-[70px]">
                <main className="flex-grow flex flex-col md:flex-row justify-start w-full gap-4">
                    <div className="w-full md:w-1/3 p-4 overflow-y-auto ">
                            <Tabs defaultValue="banner" className="space-y-4">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="nav">nav</TabsTrigger>
                                    <TabsTrigger value="banner">Banner</TabsTrigger>
                                    <TabsTrigger value="text">Text</TabsTrigger>
                                </TabsList>
                                <TabsContent value="nav">
                                    <Card>
                                        <CardContent className="space-y-4 pt-6">
                                            <div className="space-y-2">
                                                nn
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="banner-color">Background Color</Label>
                                                <div className="flex items-center space-x-2">
                                                    <Input
                                                        id="banner-color"
                                                        type="color"
                                                        value={bannerColor}
                                                        onChange={(e) => setBannerColor(e.target.value)}
                                                        className="w-12 h-12 p-1 rounded-md"
                                                    />
                                                    <Input
                                                        type="text"
                                                        value={bannerColor}
                                                        onChange={(e) => setBannerColor(e.target.value)}
                                                        className="flex-grow"
                                                    />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                                <TabsContent value="banner">
                                    <Card>
                                        <CardContent className="space-y-4 pt-6 ">
                                            <div className="space-y-2">
                                                <Label htmlFor="banner-height">Height (px)</Label>
                                                <Slider
                                                    id="banner-height"
                                                    min={100}
                                                    max={1000}
                                                    step={10}
                                                    value={[bannerHeight]}
                                                    onValueChange={(value) => setBannerHeight(value[0])}
                                                />
                                                <div className="text-right text-sm text-muted-foreground">{bannerHeight}px</div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="banner-color">Background Color</Label>
                                                <div className="flex items-center space-x-2">
                                                    <Input
                                                        id="banner-color"
                                                        type="color"
                                                        value={bannerColor}
                                                        onChange={(e) => setBannerColor(e.target.value)}
                                                        className="w-12 h-12 p-1 rounded-md"
                                                    />
                                                    <Input
                                                        type="text"
                                                        value={bannerColor}
                                                        onChange={(e) => setBannerColor(e.target.value)}
                                                        className="flex-grow"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2 flex w-full justify-start ">
                                                <BannerImageUploaderBox setDisableSaveButton={setDisableSaveButton} settingsStoreId={params.settingsStoreId} uploadImage={uploadImage} setBannerImageUrl={setBannerImageUrl} />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                                <TabsContent value="text">
                                    <Card>
                                        <CardContent className="space-y-4 pt-6">
                                            <h3 className="text-lg font-semibold">Text</h3>
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="title-text">Title</Label>
                                                    <Input
                                                        id="title-text"
                                                        value={bannerTitle}
                                                        onChange={(e) => setBannerTitle(e.target.value)}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="title-font-size">Title Font Size (px)</Label>
                                                    <Slider
                                                        id="title-font-size"
                                                        min={12}
                                                        max={100}
                                                        step={1}
                                                        value={[titleFontSize]}
                                                        onValueChange={(value) => setTitleFontSize(value[0])}
                                                    />
                                                    <div className="text-right text-sm text-muted-foreground">{titleFontSize}px</div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="title-color">Title Color</Label>
                                                    <div className="flex items-center space-x-2">
                                                        <Input
                                                            id="title-color"
                                                            type="color"
                                                            value={titleColor}
                                                            onChange={(e) => setTitleColor(e.target.value)}
                                                            className="w-12 h-12 p-1 rounded-md"
                                                        />
                                                        <Input
                                                            type="text"
                                                            value={titleColor}
                                                            onChange={(e) => setTitleColor(e.target.value)}
                                                            className="flex-grow"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Switch
                                                        id="title-bold"
                                                        checked={titleBold}
                                                        onCheckedChange={setTitleBold}
                                                    />
                                                    <Label htmlFor="title-bold">Title Bold</Label>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="description-text">Description</Label>
                                                    <Input
                                                        id="description-text"
                                                        value={bannerDescrip}
                                                        onChange={(e) => setBannerDescrip(e.target.value)}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="description-font-size">Description Font Size (px)</Label>
                                                    <Slider
                                                        id="description-font-size"
                                                        min={8}
                                                        max={24}
                                                        step={1}
                                                        value={[descriptionFontSize]}
                                                        onValueChange={(value) => setDescriptionFontSize(value[0])}
                                                    />
                                                    <div className="text-right text-sm text-muted-foreground">{descriptionFontSize}px</div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="description-color">Description Color</Label>
                                                    <div className="flex items-center space-x-2">
                                                        <Input
                                                            id="description-color"
                                                            type="color"
                                                            value={descriptionColor}
                                                            onChange={(e) => setDescriptionColor(e.target.value)}
                                                            className="w-12 h-12 p-1 rounded-md"
                                                        />
                                                        <Input
                                                            type="text"
                                                            value={descriptionColor}
                                                            onChange={(e) => setDescriptionColor(e.target.value)}
                                                            className="flex-grow"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Switch
                                                        id="description-bold"
                                                        checked={descriptionBold}
                                                        onCheckedChange={setDescriptionBold}
                                                    />
                                                    <Label htmlFor="description-bold">Description Bold</Label>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                            <div className='w-full flex justify-end'>
                                <Button className='mt-4' disabled={isLoading || disableSaveButton} onClick={UpdateStore}>Save</Button>
                            </div>
                    

                    </div>
                    <div className="w-full flex flex-col">
                        <Card className="w-full md:w-2/3 lg:w-full sm:w-full mt-5 pt-4">
                            <CardContent className="p-6 w-full max-h-screen overflow-auto ">
                                <h2 className="text-lg font-semibold mb-4">Banner Preview</h2>
                                <div className="relative" style={{ height: `${bannerHeight}px` }}>
                                    <div
                                        style={{
                                            backgroundColor: bannerColor,
                                            height: "100%",
                                            width: "100%",
                                            position: "relative",
                                            overflow: "hidden",
                                        }}
                                        className="rounded-md shadow-sm"
                                    >
                                        <Image
                                            src={bannerImage}
                                            alt="Store Banner"
                                            layout="fill"
                                            objectFit="cover"
                                            priority
                                        />
                                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center flex-col p-4">
                                            <h2
                                                style={{
                                                    fontSize: `${titleFontSize}px`,
                                                    color: titleColor,
                                                    fontWeight: titleBold ? "bold" : "normal",
                                                }}
                                                className="text-center mb-2"
                                            >
                                                {bannerTitle}
                                            </h2>
                                            <p
                                                style={{
                                                    fontSize: `${descriptionFontSize}px`,
                                                    color: descriptionColor,
                                                    fontWeight: descriptionBold ? "bold" : "normal",
                                                }}
                                                className="text-center"
                                            >
                                                {bannerDescrip}
                                            </p>
                                        </div>
                                    </div>
                                </div>


                                <div className="w-full mt-8">
                                    <h2 className="text-2xl font-semibold mb-6">Our Products</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                        {products.map((product) => (
                                            <Card key={product.id} className="flex flex-col">
                                                <CardContent className="p-4 flex-grow flex flex-col">
                                                    <div className="relative h-48 mb-4">
                                                        <Image
                                                            src={product.image}
                                                            alt={product.name}
                                                            layout="fill"
                                                            objectFit="cover"
                                                            className="rounded-md"
                                                        />
                                                    </div>
                                                    <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                                                    <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
                                                    <Button className="mt-auto">Add to Cart</Button>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>

        </>
    )
}


export default SettingsComp