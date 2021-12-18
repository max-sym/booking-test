import React from "react"

export const Footer = () => (
  <div className="mt-32 bg-gray-800 py-12 px-80">
    <h2 className="text-white text-4xl font-bold text-center font-title">
      {"Nice Website"}
    </h2>
    <div className="mt-4 bg-white w-12 h-1 mx-auto"></div>
    <div className="flex justify-around">
      <div>
        <h3 className="font-bold uppercase tracking-widest text-white">
          {"Social"}
        </h3>
        <div className="mt-8">
          <p className="text-white hover:text-green-500 transition cursor-pointer">
            {"Facebook"}
          </p>
          <p className="text-white hover:text-green-500 transition cursor-pointer">
            {"Instagram"}
          </p>
          <p className="text-white hover:text-green-500 transition cursor-pointer">
            {"Twitter"}
          </p>
        </div>
      </div>
      <div>
        <h3 className="font-bold uppercase tracking-widest text-white">
          {"Developers"}
        </h3>
        <div className="mt-8">
          <p className="text-white hover:text-green-500 transition cursor-pointer">
            {"Docs"}
          </p>
          <p className="text-white hover:text-green-500 transition cursor-pointer">
            {"API"}
          </p>
          <p className="text-white hover:text-green-500 transition cursor-pointer">
            {"Jobs"}
          </p>
        </div>
      </div>
    </div>
    <div>
      <p className="text-gray-400 text-center mt-12">
        &copy;{" "}
        {`${new Date().getFullYear()} our-awesome-website-tutorial. All rights reserved.`}
      </p>
    </div>
  </div>
)

export const Layout = ({ children }) => (
  <div className="bg-gray-900">
    <div>{children}</div>
    <Footer />
  </div>
)
