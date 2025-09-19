import { Star } from "lucide-react"

export const renderStars= (rating : number)=> {
    const stars = []
    const fullStars = Math.floor(rating)
    const halfStar = rating % 1 !==0

    for(let i=0 ; i<fullStars ; i++){
        stars.push(
            <Star key={i} className="fill-yellow-300 text-yellow-300 h-5 w-5"/>
        )
    }
    if(halfStar){
        stars.push(
            <Star key={'half'} className="fill-yellow-300/50 text-yellow-300 h-5 w-5"/>
        )
    }
    const emptyStars = 5 - Math.ceil(rating)
    for(let i=0 ; i<emptyStars ; i++){
        stars.push(
            <Star key={`empty-${i}`} className="text-grey-300 h-5 w-5"/>
        )
    }
    return stars;
}