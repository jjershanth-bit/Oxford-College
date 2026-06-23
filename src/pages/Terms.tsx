import HeroBanner from '@/components/HeroBanner';
import useScrollReveal from '@/hooks/useScrollReveal';

export default function Terms() {
  useScrollReveal();

  return (
    <main>
      <HeroBanner
        title="Terms and Conditions"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Terms and Conditions' },
        ]}
        backgroundImage="/images/hero-programs.jpg"
      />

      <section className="section-padding bg-white">
        <div className="content-max-width max-w-3xl reveal">
          <h2 className="font-heading text-2xl font-medium text-brand-dark mb-6">
            Terms and Conditions
          </h2>
          <div className="space-y-6 text-text-dark font-light leading-relaxed">
            <p>
              Welcome to Oxford College. By accessing and using our website and services, 
              you agree to comply with and be bound by the following terms and conditions.
            </p>
            <h3 className="font-heading text-xl font-medium text-brand-dark">1. Enrollment</h3>
            <p>
              All course enrollments are subject to availability and confirmation. Payment 
              must be made in full before the commencement of the course unless otherwise agreed.
            </p>
            <h3 className="font-heading text-xl font-medium text-brand-dark">2. Refund Policy</h3>
            <p>
              Refunds are available within 7 days of enrollment, provided that the student 
              has not attended more than one class session. After this period, refunds are 
              at the discretion of the administration.
            </p>
            <h3 className="font-heading text-xl font-medium text-brand-dark">3. Course Materials</h3>
            <p>
              All course materials provided by Oxford College are for personal use only. 
              Reproduction or distribution of materials without written permission is prohibited.
            </p>
            <h3 className="font-heading text-xl font-medium text-brand-dark">4. Code of Conduct</h3>
            <p>
              Students are expected to maintain respectful behavior towards instructors and 
              fellow students. Oxford College reserves the right to terminate enrollment for 
              violations of the code of conduct.
            </p>
            <h3 className="font-heading text-xl font-medium text-brand-dark">5. Privacy</h3>
            <p>
              Your personal information is handled in accordance with our Privacy Policy. 
              We are committed to protecting your privacy and maintaining the confidentiality 
              of your information.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
