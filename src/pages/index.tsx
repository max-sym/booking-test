import React from "react"
import { PageProps } from "gatsby"
import { BookingForm } from "@/components/booking-form"
import { Footer, Layout } from "@/components/layout"

const MainSection = () => (
  <div className="z-10 relative h-screen">
    <h1 className="text-white text-5xl font-bold text-center mt-12 font-title">
      {"Visit Our Country"}
    </h1>
    <p className="text-white text-xl mt-4 text-center">
      {"This is an amazing country! 🚀"}
    </p>
    <div className="mt-12 w-1/2 mx-auto">
      <BookingForm />
    </div>
  </div>
)

const MainSectionBackground = () => (
  <div className="absolute top-0 left-0 right-0 h-screen">
    <img
      className="h-full w-full object-cover"
      src="https://images.unsplash.com/Ys-DBJeX0nE.JPG?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    />
    <div className="absolute bottom-0 left-0 right-0 h-64 z-10 bg-gradient-to-t from-gray-900 to-transparent" />
  </div>
)

const DetailsSection = () => {
  const onBookNowClick = () => {
    window.location.href = "/#"
  }

  return (
    <div className="relative pb-12 z-10">
      <h1 className="text-white text-5xl font-bold text-center mt-12 font-title">
        {"About Us"}
      </h1>
      <div className="px-80 flex mt-20 gap-x-12">
        <div className="w-1/2 space-y-4">
          <div>
            <h3 className="mt-12 text-4xl text-white font-bold font-title">
              {"We're the best in town"}
            </h3>
            <p className="mt-8 text-white">
              {
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, repellendus rerum ullam ducimus officia at esse iure obcaecati delectus illo in dignissimos voluptates expedita rem iste voluptatibus earum facere autem."
              }
            </p>
          </div>
          <div className="">
            <button
              onClick={onBookNowClick}
              className="appearance-none mt-8 border h-10 rounded-full flex justify-center items-center bg-transparent hover:bg-green-500 hover:border-green-500 text-2xl transition text-white font-bold px-8 py-6"
            >
              <div className="">{"Book Now"}</div>
            </button>
          </div>
        </div>
        <div className="w-1/2">
          <div className="rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1599578705716-8d3d9246f53b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const Home: React.FC<PageProps> = () => (
  <Layout>
    <div>
      <MainSectionBackground />
      <MainSection />
      <DetailsSection />
    </div>
  </Layout>
)

export default Home
