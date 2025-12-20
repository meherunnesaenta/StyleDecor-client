import React from 'react';
import { Link } from 'react-router';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-base-300 text-base-content mt-auto">
            <div className="container mx-auto px-4 py-12">
                {/* Main Footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand & Tagline */}
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center gap-2">
                            <h3 className="text-3xl font-bold text-primary">StyleDecor</h3>
                        </Link>
                        <p className="text-base-content/70 max-w-xs">
                            Transforming homes & ceremonies with elegant, timeless decoration solutions.
                        </p>
                        <p className="text-secondary text-sm">✦ Elegant Living, Beautiful Moments</p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-xl font-semibold text-primary mb-4">Quick Links</h4>
                        <ul className="space-y-3">
                            <li><Link to="/" className="link link-hover text-base-content/80 hover:text-secondary">Home</Link></li>
                            <li><Link to="/services" className="link link-hover text-base-content/80 hover:text-secondary">Services</Link></li>
                            <li><Link to="/about" className="link link-hover text-base-content/80 hover:text-secondary">About Us</Link></li>
                            <li><Link to="/contact" className="link link-hover text-base-content/80 hover:text-secondary">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-xl font-semibold text-primary mb-4">Contact Us</h4>
                        <ul className="space-y-3 text-base-content/80">
                            <li className="flex items-center gap-3">
                                <FaPhone className="text-secondary" />
                                <span>+880 1234 567 890</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaEnvelope className="text-secondary" />
                                <span>info@styledecor.com</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <FaMapMarkerAlt className="text-secondary mt-1" />
                                <span>Dhaka, Bangladesh</span>
                            </li>
                        </ul>
                    </div>

                    {/* Working Hours & Social */}
                    <div>
                        <h4 className="text-xl font-semibold text-primary mb-4">Working Hours</h4>
                        <div className="flex items-start gap-3 text-base-content/80 mb-6">
                            <FaClock className="text-secondary mt-1" />
                            <div>
                                <p>Sat - Thu: 9:00 AM - 8:00 PM</p>
                                <p>Friday: Closed</p>
                            </div>
                        </div>

                        {/* Social Icons */}
                        <div className="flex gap-4">
                            <a href="#" className="bg-base-100 p-3 rounded-full hover:bg-secondary hover:text-white transition-all">
                                <FaFacebookF size={20} />
                            </a>
                            <a href="#" className="bg-base-100 p-3 rounded-full hover:bg-secondary hover:text-white transition-all">
                                <FaInstagram size={20} />
                            </a>
                            <a href="#" className="bg-base-100 p-3 rounded-full hover:bg-secondary hover:text-white transition-all">
                                <FaTwitter size={20} />
                            </a>
                            <a href="#" className="bg-base-100 p-3 rounded-full hover:bg-secondary hover:text-white transition-all">
                                <FaLinkedinIn size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="flex items-center justify-center my-8">
                    <div className="border-t border-primary/20 w-32"></div>
                    <span className="mx-4 text-primary/40 text-2xl">✦</span>
                    <div className="border-t border-primary/20 w-32"></div>
                </div>

                {/* Copyright */}
                <div className="text-center text-base-content/60 text-sm">
                    © {currentYear} StyleDecor. All rights reserved. Crafted with elegance.
                </div>
            </div>
        </footer>
    );
};

export default Footer;