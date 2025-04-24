import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import CtaSection from '@/components/cta-section';
const ServiceDetailPage: React.FC = () => {
  return (
    <>
    <Header/>
    <div className="bg-white min-h-screen mb-12">
      {/* Main container */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Back button */}
        <Link href="/services" className="flex items-center text-gray-700 mb-6 text-4xl font-medium">
          <ArrowLeft className="mr-2 h-8 w-8" />
          <span>Services Detail Page</span>
        </Link>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="bg-white rounded-lg shadow p-6">
            <ul className="space-y-4">
              <li className="flex items-center">
                <div className="w-6 h-6 flex items-center justify-center mr-3">
                  <Image src="/power-hour-icon.png" alt="Power Hour" width={20} height={20} />
                </div>
                <span className="text-gray-600">Power Hour</span>
              </li>
              <li className="flex items-center">
                <div className="w-6 h-6 flex items-center justify-center mr-3">
                  <Image src="/support-icon.png" alt="Support" width={20} height={20} />
                </div>
                <span className="text-gray-600 font-medium">Support</span>
              </li>
              <li className="flex items-center">
                <div className="w-6 h-6 flex items-center justify-center mr-3">
                  <Image src="/training-icon.png" alt="Training" width={20} height={20} />
                </div>
                <span className="text-gray-600">Training</span>
              </li>
              <li className="flex items-center">
                <div className="w-6 h-6 flex items-center justify-center mr-3">
                  <Image src="/payroll-icon.png" alt="Payroll" width={20} height={20} />
                </div>
                <span className="text-gray-600">Payroll Management Services</span>
              </li>
              <li className="flex items-center">
                <div className="w-6 h-6 flex items-center justify-center mr-3">
                  <Image src="/admin-icon.png" alt="Admin" width={20} height={20} />
                </div>
                <span className="text-gray-600">Admin Services</span>
              </li>
              <li className="flex items-center">
                <div className="w-6 h-6 flex items-center justify-center mr-3">
                  <Image src="/client-icon.png" alt="New Client" width={20} height={20} />
                </div>
                <span className="text-gray-600">New Client</span>
              </li>
              <li className="flex items-center">
                <div className="w-6 h-6 flex items-center justify-center mr-3">
                  <Image src="/onboarding-icon.png" alt="Onboarding" width={20} height={20} />
                </div>
                <span className="text-gray-600">Onboarding For Client Services</span>
              </li>
              <li className="flex items-center">
                <div className="w-6 h-6 flex items-center justify-center mr-3">
                  <Image src="/communication-icon.png" alt="Communication" width={20} height={20} />
                </div>
                <span className="text-gray-600">Communication Skills Training</span>
              </li>
              <li className="flex items-center">
                <div className="w-6 h-6 flex items-center justify-center mr-3">
                  <Image src="/education-icon.png" alt="Educational Support" width={20} height={20} />
                </div>
                <span className="text-gray-600">Educational Support Only</span>
              </li>
              <li className="flex items-center">
                <div className="w-6 h-6 flex items-center justify-center mr-3">
                  <Image src="/win-icon.png" alt="Win a Free Power Hour" width={20} height={20} />
                </div>
                <span className="text-gray-600">Win a Free Power Hour</span>
              </li>
            </ul>
          </div>

          {/* Main content */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg shadow p-8">
              {/* Service header */}
              <div className="w-full h-full mb-8">
                <img
                  src="/image (8).png"
                  alt="About Us"
                  className="w-full h-full rounded-lg"
                  width={400}
                  height={400}
                />
              </div>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Support</h1>
                <div className="text-blue-600 font-bold text-xl">£99/1 Hour</div>
              </div>

              {/* Service description */}
              <div className="text-gray-600 mb-8">
                <p>
                  Eleifend mi in nulla posuere sollicitudin aliquam. Sagittis orci a
                  scelerisque purus semper eget duis at tellus. Interdum varius sit
                  amet mattis vulputate enim nulla. Dignissim sodales ut eu sem
                  integer vitae justo eget magna. Quis hendrerit dolor magna eget est
                  lorem. Nunc sed blandit libero volutpat sed cras. Vivamus arcu felis
                  bibendum ut tristique et egestas. Fringilla phasellus faucibus
                  scelerisque eleifend donec. Volutpat odio facilisis mauris sit amet
                  massa vitae tortor. Massa id neque aliquam vestibulum morbi. Sit
                  amet cursus sit amet dictum sit. Neque volutpat ac tincidunt vitae
                  semper quis lectus nulla. Sollicitudin aliquam ultricies sagittis orci a.
                  Sit amet aliquam id diam maecenas ultricies mi eget mauris.
                </p>
              </div>

              {/* What we offer */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">What we Offer</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-6 rounded-lg">
                <img
                  src="/correct-icon.png"
                  alt="correct-icon"
                  className=" rounded-lg"
                  width={30}
                  height={30}
                />
                              <p className="text-gray-600">
                      Habitasse platea dictumst vestibulum rhoncus est pellentesque elit. Est velit
                      egestas dui id ornare.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
    <img
                  src="/correct-icon.png"
                  alt="correct-icon"
                  className=" rounded-lg"
                  width={30}
                  height={30}
                />                    <p className="text-gray-600">
                      Tellus at molestie fames ac turpis egestas sed tempus. Sed turpis tincidunt id aliquet
                      risus.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
    <img
                  src="/correct-icon.png"
                  alt="correct-icon"
                  className=" rounded-lg"
                  width={30}
                  height={30}
                />                    <p className="text-gray-600">
                      Amet facilisis magna etiam tempor orci. Mortes nascetur ridiculus mus mauris vitae
                      ultricies leo integer.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
    <img
                  src="/correct-icon.png"
                  alt="correct-icon"
                  className=" rounded-lg"
                  width={30}
                  height={30}
                />                    <p className="text-gray-600">
                      Aliquam faucibus purus in massa. Eu nisi
                      nunc mi ipsum faucibus vitae aliquet nec ullamcorper.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
    <img
                  src="/correct-icon.png"
                  alt="correct-icon"
                  className=" rounded-lg"
                  width={30}
                  height={30}
                />                    <p className="text-gray-600">
                      Fusce sagittis semper feugiat. Cras neque
                      sapien, volutpat id sed.
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional description */}
              <div className="text-gray-600">
                <p>
                  Eu nisi nunc mi ipsum faucibus vitae aliquet nec ullamcorper. Nulla
                  facilisi morbi tempus iaculis urna id. Morbi tempus iaculis urna id
                  volutpat lacus laoreet non curabitur. Vitae purus faucibus ornare
                  suspendisse sed nisi lacus sed.
                </p>
              </div>
            </div>

            {/* CTA Section */}
          </div>
        </div>
      </div>
            <CtaSection />
    </div>
    <Footer/>
    </>

  );
};

export default ServiceDetailPage;