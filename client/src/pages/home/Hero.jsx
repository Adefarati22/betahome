import Sort from "@/features/home/Sort";
import Card from "./Card";


export default function Hero() {
  return (
    <>
    <div className='text-white text-center mt-40 space-y-6 '>
        <h1 className='text-4xl lg:text-7xl font-bold'>Browse Our Properties</h1>
        <p className='text-2xl'>Find your perfect home among our curated properties. Start browsing now!</p>
        <Sort/>
    </div>
    <Card/>
    </>
  )
}
