export interface storeDataDto {
    userId: string
    name: string,
    description?: string,
    storeImage?: string,
    storeBanner?: {
        bannerTitle?: string,
        bannerImage?: string,
        bannerDescrip?: string,
        height?: number,
        titleColor?: string,
        titleSize?: number,
        descriptionColor?: string,
        descriptionSize?: number
    }
}
export type storeDataPutDto = {
    userId: string
    name: string,
    description?: string,
    storeImage?: string,
    storeBanner?: {
        bannerTitle?: string,
        bannerImage?: string,
        bannerDescrip?: string,
        height?: number,
        titleColor?: string,
        titleSize?: number,
        descriptionColor?: string,
        descriptionSize?: number
    }

}

// export type storeBannerDto = {
//     bannerTitle?: string,
//     bannerImage?: string,
//     bannerDescrip?: string,
//     height?: number,
//     titleColor?: string,
//     titleSize?: number,
//     descriptionColor?: string,
//     descriptionSize?: number
// }