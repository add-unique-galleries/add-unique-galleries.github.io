export interface IPhotosPixels {
    id: number
    height: number
    width: number
    photographer: string
    url: string
    src: {
        landscape: string
        large: string
        large2x: string
        medium: string
        original: string
        portrait: string
        small: string
        tiny: string
    }
}
