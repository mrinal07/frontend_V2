import React from "react";
import SectionTitle from "../../components/SectionTitle";

function Services() {
  return (
    <div id="Services" className="mt-20">
      <SectionTitle title="My Services"></SectionTitle>

      <div>
        <section id="services" className="py-10">
          <div className="container mx-auto text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:grid-cols-1">
              <div className="service-item our-services">                
                <h3 className="text-xl font-semibold mb-5">
                  Website Design & Development
                </h3>
                <p>
                  From stunning designs to robust development, we offer
                  end-to-end solutions for your website needs.
                </p>
              </div>

              <div className="service-item our-services ">
                <h3 className="text-xl font-semibold mb-5">
                  Bug Identification & Fixing
                </h3>
                <p>
                  We thoroughly identify and resolve bugs to ensure a seamless
                  and error-free experience.
                </p>
              </div>

              <div className="service-item our-services">
                <h3 className="text-xl font-semibold mb-5">Customized Plans</h3>
                <p>
                  Get personalized plans tailored to your specific needs and
                  goals for a perfect fit.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Services;
