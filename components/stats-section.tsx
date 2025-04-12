export default function StatsSection() {
  return (
    <section className="w-full py-12 bg-[#2A3356] text-white">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {/* First block */}
          <div>
            <div className="relative">
              <div className="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-[#F0D68700] via-[#F0D687] to-[#F0D68700]"></div>
              <div className="p-4">
                <h3 className="text-2xl md:text-7xl font-semibold mb-5 text-[#F8D77E]">
                  15+
                </h3>
                <p className="text-lg text-gray-300">Years Of Experience</p>
              </div>
            </div>
          </div>

          {/* Second block */}
          <div>
            <div className="relative">
              <div className="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-[#F0D68700] via-[#F0D687] to-[#F0D68700]"></div>
              <div className="p-4">
                <h3 className="text-2xl md:text-7xl font-semibold mb-5 text-[#F8D77E]">
                  90%
                </h3>
                <p className="text-lg text-gray-300">Satisfied Clients</p>
              </div>
            </div>
          </div>

          {/* Third block */}
          <div>
            <div className="relative">
              <div className="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-[#F0D68700] via-[#F0D687] to-[#F0D68700]"></div>
              <div className="p-4">
                <h3 className="text-2xl md:text-7xl font-semibold mb-5 text-[#F8D77E]">
                  85%
                </h3>
                <p className="text-lg text-gray-300">Problem Solved</p>
              </div>
            </div>
          </div>

          {/* Fourth block (no gradient border) */}
          <div>
            <div className="p-4">
              <h3 className="text-2xl md:text-7xl font-semibold mb-5 text-[#F8D77E]">
                100+
              </h3>
              <p className="text-lg text-gray-300">Expert Accountants</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
