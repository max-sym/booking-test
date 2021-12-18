import React, { useMemo } from "react"
import { PageProps } from "gatsby"
import { cities } from "@/components/cities"
import moment from "moment"
import { Layout } from "@/components/layout"

const getRoomsFromAPI = () => {
  return [
    {
      name: "Hotel 5 Stars",
      price: 155,
    },
    {
      name: "Cozy House 56",
      price: 100,
    },
    {
      name: "Room in center",
      price: 70,
    },
  ]
}

const SearchResults = () => {
  const results = useMemo(() => {
    const params = new URLSearchParams(location.search)
    const results = {
      location: params.get("location"),
      checkIn: params.get("checkIn"),
      checkOut: params.get("checkOut"),
      guestsAdults: params.get("guests-adults"),
    }
    return results
  }, [])

  const city = cities.find((city) => city.value === results.location)

  const rooms = useMemo(() => getRoomsFromAPI(), [])

  return (
    <div className="relative">
      <h2 className="text-white font-bold text-center mt-8 text-4xl">
        Rooms in {city.label} at{" "}
        {moment(results.checkIn, "DD-MM-YYYY").format("LL")}
      </h2>
      <div className="space-y-8 px-80 mt-12">
        {rooms.map((room) => (
          <div className="bg-black bg-opacity-50 border border-gray-500 backdrop-filter backdrop-blur-xl rounded-xl p-4">
            <p className="text-xl text-white font-bold">{room.name}</p>
            <p className="mt-4 text-white font-bold">{room.price}$</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const Background = () => (
  <div className="absolute top-0 left-0 right-0 h-screen">
    <img
      className="h-full w-full object-cover"
      src="https://images.unsplash.com/photo-1599578705716-8d3d9246f53b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    />
  </div>
)

const ResultsSection = () => (
  <div className="z-10 relative h-screen -mb-48">
    <h1 className="text-white text-4xl font-bold text-center mt-12 font-title">
      {"Visit South Corea"}
    </h1>
    <p className="text-white text-xl mt-4 text-center">
      {"This is an amazing country! 🚀"}
    </p>
    <div>
      <SearchResults />
    </div>
  </div>
)

const Home: React.FC<PageProps> = () => (
  <Layout>
    <div>
      <Background />
      <ResultsSection />
    </div>
  </Layout>
)

export default Home
