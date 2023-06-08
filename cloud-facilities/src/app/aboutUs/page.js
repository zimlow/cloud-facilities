import React from "react";

const About = () => {
  return (
    <>
      <section className="relative block" style={{ height: "50vh" }}>
        <div
          className="absolute w-full h-full overflow-hidden bg-center bg-cover"
          style={{
            backgroundImage: "url('/team.jpg')",
          }}
        >
          <div className="flex text-center justify-center items-center text-8xl font-bold text-amber-100 h-full">
            <p className="drop-shadow-2xl">About Us</p>
          </div>
        </div>
      </section>
      <div class="bg-white py-24 sm:py-32">
        <div class="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
          <div class="max-w-2xl">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Meet our crew
            </h2>
            <p class="mt-6 text-lg leading-8 text-gray-600">
              Libero fames augue nisl porttitor nisi, quis. Id ac elit odio vitae elementum enim
              vitae ullamcorper suspendisse.
            </p>
          </div>
          <ul role="list" class="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
            <li>
              <div class="flex items-center gap-x-6">
                <img
                  class="h-16 w-16 rounded-full"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                <div>
                  <h3 class="text-base font-semibold leading-7 tracking-tight text-gray-900">
                    Tom
                  </h3>
                  <p class="text-sm font-semibold leading-6 text-indigo-600">15,000 jumps</p>
                  <p class="text-sm font-semibold leading-6 text-indigo-600">Tandem Master</p>
                </div>
              </div>
            </li>
            <li>
              <div class="flex items-center gap-x-6">
                <img
                  class="h-16 w-16 rounded-full"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                <div>
                  <h3 class="text-base font-semibold leading-7 tracking-tight text-gray-900">
                    Dick
                  </h3>
                  <p class="text-sm font-semibold leading-6 text-indigo-600">CEO / 20,000 jumps</p>
                  <p class="text-sm font-semibold leading-6 text-indigo-600">USPA Instructor</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default About;
