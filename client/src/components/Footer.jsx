



const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {/* <!-- About Section --> */}
                    <div>
                        <h5 className="text-lg font-semibold mb-4 hover:underline">About Us</h5>
                        <p className="text-sm text-gray-300">
                            Your trusted job portal for connecting top talent with amazing opportunities.
                            Join us to explore your next career move!
                        </p>
                    </div>

                    {/* <!-- Quick Links --> */}
                    <div>
                        <h5 className="text-lg font-semibold mb-4 hover:underline">Quick Links</h5>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><a href="/jobs" className="hover:underline">Browse Jobs</a></li>
                            <li><a href="/companies" className="hover:underline">Top Companies</a></li>
                            <li><a href="/faq" className="hover:underline">FAQs</a></li>
                            <li><a href="/contact" className="hover:underline">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* <!-- Resources --> */}
                    <div>
                        <h5 className="text-lg font-semibold mb-4 hover:underline">Resources</h5>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><a href="/blog" className="hover:underline">Career Advice</a></li>
                            <li><a href="/support" className="hover:underline">Support</a></li>
                            <li><a href="/privacy-policy" className="hover:underline">Privacy Policy</a></li>
                            <li><a href="/terms" className="hover:underline">Terms of Service</a></li>
                        </ul>
                    </div>

                    {/* <!-- Stay Connected --> */}
                    <div>
                        <h5 className="text-lg font-semibold mb-4 hover:underline">Stay Connected</h5>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-300 hover:text-white">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white">
                                <i className="fab fa-instagram"></i>
                            </a>
                        </div>
                        <form className="mt-4">
                            <label htmlFor="newsletter" className="text-sm text-gray-400">Subscribe to our Newsletter</label>
                            <div className="mt-2 flex">
                                <input
                                    type="email"
                                    id="newsletter"
                                    className="w-full px-3 py-2 rounded-l bg-gray-800 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring focus:ring-green-500"
                                    placeholder="Enter your email"
                                />
                                <button
                                    type="submit"
                                    className="bg-green-600 text-white px-4 py-2 rounded-r hover:bg-green-700">
                                    Subscribe
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="mt-8 border-t border-gray-700 pt-4 text-sm text-center text-gray-400">
                    © 2025 JobPortal. All rights reserved.
                </div>
            </div>
        </footer>

    )
}

export default Footer