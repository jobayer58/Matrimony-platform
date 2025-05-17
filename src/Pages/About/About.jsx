const About = () => {
    return (
      <div className="bg-gradient-to-b from-pink-50 via-white to-rose-100 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-pink-600 mb-4">About MatrimonyMatch</h2>
          <p className="text-gray-700 text-lg mb-10 leading-relaxed">
            MatrimonyMatch is a trusted matrimonial platform dedicated to helping individuals find their ideal life partner.
            With a focus on honesty, compatibility, and community values, we’ve built a platform that goes beyond profiles—
            it brings hearts together.
          </p>
  
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-white hover:border-pink-400 p-6 rounded-2xl border-2 border-pink-100 hover:shadow-2xl hover:scale-105 transition">
              <h3 className="text-xl font-semibold text-pink-600 mb-3">Our Vision</h3>
              <p className="text-gray-600">
                To create lasting and meaningful relationships by offering a platform that prioritizes trust, transparency,
                and genuine connection.
              </p>
            </div>
  
            <div className="bg-white hover:border-pink-400 p-6 rounded-2xl border-2 border-pink-100 hover:shadow-2xl hover:scale-105 transition">
              <h3 className="text-xl font-semibold text-pink-600 mb-3">Our Values</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Privacy & Safety First</li>
                <li>Respect for Traditions</li>
                <li>Inclusivity & Empathy</li>
                <li>Verified Profiles Only</li>
              </ul>
            </div>
  
            <div className="bg-white hover:border-pink-400 p-6 rounded-2xl border-2 border-pink-100 hover:shadow-2xl hover:scale-105 transition">
              <h3 className="text-xl font-semibold text-pink-600 mb-3">Why Choose Us?</h3>
              <p className="text-gray-600">
                We offer advanced matchmaking filters, safe communication tools, premium biodata highlights, and dedicated support to guide your journey.
              </p>
            </div>
          </div>
  
          <div className="mt-16 max-w-4xl mx-auto">
            <h4 className="text-2xl font-bold text-pink-500 mb-4">Our Journey</h4>
            <p className="text-gray-700 leading-relaxed">
              Since our inception, we’ve proudly helped thousands of individuals discover companionship and love.
              Every profile you see is carefully reviewed and verified to ensure authenticity. Our team continuously
              works to improve the platform, keeping your experience safe, efficient, and meaningful.
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default About;
  