import { ArrowRight } from 'lucide-react';

export default function About() {
  return (
    <section className="bg-white pt-16 sm:pt-20 lg:pt-32 pb-12 sm:pb-16 lg:pb-24 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Badge row */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <div
            className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#1D4ED8] text-white font-semibold flex items-center justify-center flex-shrink-0"
            style={{ fontSize: 'clamp(11px, 1.2vw, 12px)' }}
          >
            1
          </div>
          <span
            className="font-medium border border-blue-200 text-gray-600 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 whitespace-nowrap"
            style={{ fontSize: 'clamp(12px, 1.2vw, 13px)' }}
          >
            Introducing AigentG9
          </span>
        </div>

        {/* Heading */}
        <h2
          className="font-medium text-gray-900 leading-[1.12] tracking-[-0.02em] mb-12 sm:mb-16 lg:mb-28 max-w-4xl"
          style={{ fontSize: 'clamp(1.5rem, 4vw, 3.2rem)' }}
        >
          <span className="sm:hidden">
            Strategy-led AI agents, delivering demand intelligence and beyond.
          </span>
          <span className="hidden sm:block">
            Strategy-led AI agents, delivering
            <br />
            demand intelligence and beyond.
          </span>
        </h2>

        {/* MOBILE/TABLET Content */}
        <div className="lg:hidden">
          <p
            className="font-medium text-gray-900 leading-[1.6] mb-8 max-w-xl"
            style={{ fontSize: 'clamp(15px, 1.8vw, 17px)' }}
          >
            Through intelligent forecasting, deviation detection, and market
            signal analysis, AigentG9 empowers growing enterprises to realize
            their full demand potential.
          </p>

          <a
            href="#platform"
            className="group bg-[#1D4ED8] hover:bg-[#1e40af] text-white font-medium rounded-full pl-5 pr-2 py-2 inline-flex items-center gap-2 transition-colors duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] mb-10"
            style={{ fontSize: 'clamp(13px, 1.5vw, 14px)' }}
          >
            <div className="text-roll">
              <span>About our platform</span>
              <span>About our platform</span>
            </div>
            <span className="w-7 h-7 bg-white rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:rotate-[-45deg]">
              <ArrowRight size={14} className="text-[#1D4ED8]" />
            </span>
          </a>

          {/* Mobile images */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mt-6">
            <div className="sm:w-[45%] aspect-[438/346] rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 to-blue-50">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="w-14 h-14 mx-auto mb-3 bg-[#1D4ED8]/10 rounded-2xl flex items-center justify-center">
                    <span className="text-[#1D4ED8] font-bold text-xl">G9</span>
                  </div>
                  <p className="text-gray-500 text-xs">Demand Engine</p>
                </div>
              </div>
            </div>
            <div className="sm:w-[55%] aspect-[900/600] rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="grid grid-cols-3 gap-2 mb-3 mx-auto w-fit">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                      <div
                        key={n}
                        className="w-8 h-8 rounded-lg bg-[#1D4ED8]/10 flex items-center justify-center"
                      >
                        <span className="text-[#1D4ED8] text-xs font-semibold">
                          {n}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-500 text-xs">9 Agent Stack</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DESKTOP Content */}
        <div className="hidden lg:grid grid-cols-[26%_1fr_48%] items-end gap-6 xl:gap-8">
          {/* Left column — Small image */}
          <div className="self-end">
            <div className="aspect-[438/346] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 to-blue-50">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="w-16 h-16 mx-auto mb-3 bg-[#1D4ED8]/10 rounded-2xl flex items-center justify-center">
                    <span className="text-[#1D4ED8] font-bold text-2xl">G9</span>
                  </div>
                  <p className="text-gray-500 text-sm">Demand Engine</p>
                </div>
              </div>
            </div>
          </div>

          {/* Center column — Text + Button */}
          <div className="self-end flex flex-col">
            <p
              className="font-medium text-gray-900 leading-[1.65] mb-8"
              style={{ fontSize: 'clamp(16px, 1.5vw, 18px)' }}
            >
              Through intelligent forecasting,
              <br />
              deviation detection, and market
              <br />
              signal analysis, AigentG9 empowers
              <br />
              growing enterprises to realize
              <br />
              their full demand potential.
            </p>

            <a
              href="#platform"
              className="group bg-[#1D4ED8] hover:bg-[#1e40af] text-white font-medium rounded-full pl-5 pr-2 py-2 inline-flex items-center gap-2 transition-colors duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] self-start"
              style={{ fontSize: '14px' }}
            >
              <div className="text-roll">
                <span>About our platform</span>
                <span>About our platform</span>
              </div>
              <span className="w-7 h-7 bg-white rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:rotate-[-45deg]">
                <ArrowRight size={14} className="text-[#1D4ED8]" />
              </span>
            </a>
          </div>

          {/* Right column — Large image */}
          <div className="self-end">
            <div className="aspect-[3/2] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="grid grid-cols-3 gap-3 mb-4 mx-auto w-fit">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                      <div
                        key={n}
                        className="w-12 h-12 rounded-xl bg-[#1D4ED8]/10 flex items-center justify-center"
                      >
                        <span className="text-[#1D4ED8] text-sm font-semibold">
                          {n}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-500 text-sm">9 Agent Stack</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
