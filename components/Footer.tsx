export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary-700 text-white">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">ResponsiveWorks</h3>
            <p className="text-secondary-200 mb-4">
              Custom software development for small to mid-sized businesses.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-secondary-200">
              <p>Auburn, NH USA</p>
              <p>
                <a href="tel:6032068395" className="hover:text-white transition-colors">
                  603.206.8395
                </a>
              </p>
              <p>
                <a href="mailto:contact@responsiveworks.io" className="hover:text-white transition-colors">
                  contact@responsiveworks.io
                </a>
              </p>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <a href="#portfolio" className="block text-secondary-200 hover:text-white transition-colors">
                Portfolio
              </a>
              <a href="#about" className="block text-secondary-200 hover:text-white transition-colors">
                About
              </a>
              <a href="#contact" className="block text-secondary-200 hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-600 mt-12 pt-8 text-center text-secondary-200">
          <p>&copy; {currentYear} ResponsiveWorks. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
