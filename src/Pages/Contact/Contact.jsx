const Contact = () => {
    return (
      <div className="bg-gradient-to-b from-rose-100 via-white to-pink-50 py-20 px-6">
        <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-xl border border-pink-100">
          <h2 className="text-3xl font-bold text-pink-600 text-center mb-4">Contact Us</h2>
          <p className="text-center text-gray-600 mb-10">
            Feel free to get in touch for support, feedback, partnership, or just to say hello.
            We’re here to help you find your perfect match.
          </p>
          
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Your full name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-300"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-300"
                  required
                />
              </div>
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                placeholder="Reason for contact"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-300"
                required
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
              <textarea
                rows="5"
                placeholder="Type your message here..."
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-300"
                required
              ></textarea>
            </div>
  
            <div className="text-center mt-8">
              <button
                type="submit"
                className="bg-pink-500 text-white px-8 py-3 rounded-xl hover:bg-pink-600 transition"
              >
                Send Message
              </button>
            </div>
          </form>
  
          <div className="mt-12 text-center text-sm text-gray-500">
            Or email us directly at <span className="text-pink-500 font-semibold">support@matrimonymatch.com</span>
          </div>
        </div>
      </div>
    );
  };
  
  export default Contact;
  