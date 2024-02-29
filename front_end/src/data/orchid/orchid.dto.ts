interface OrchidDto {
    slug: string
    name: string
    image: string
    category: {
        name: string
    }
}

interface OrchidDetailsDto {
    slug: string
    name: string
    image: string
    isNature: boolean
    origin: string
    comments: string[]
    category: {
        name: string
    }
}

export type { OrchidDto, OrchidDetailsDto }